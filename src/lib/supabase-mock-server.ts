import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'mock-db.json');

// Ensure DB exists
if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify({ applications: [], users: [], profiles: [] }, null, 2));
}

const getDb = () => {
    try {
        const data = fs.readFileSync(DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch {
        return { applications: [], users: [], profiles: [] };
    }
};

const saveDb = (data: any) => {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};

const createBuilder = (table: string) => {
    let dataResolver: () => any = () => ({ data: [], error: null });
    let isInsert = false;
    let updates: any = null;

    const builder: any = {
        select: (cols: string = '*') => {
            if (isInsert || updates) return builder; // Return data from mutation

            dataResolver = () => {
                const db = getDb();
                return { data: db[table] || [], error: null };
            };
            return builder;
        },
        insert: (row: any) => {
            isInsert = true;
            dataResolver = () => {
                const db = getDb();
                if (!db[table]) db[table] = [];
                const rows = Array.isArray(row) ? row : [row];
                // Add simple ID if missing
                const rowsWithId = rows.map((r: any) => ({ ...r, id: r.id || Date.now().toString(), created_at: new Date().toISOString() }));
                db[table].push(...rowsWithId);
                saveDb(db);
                return { data: rowsWithId, error: null };
            };
            return builder;
        },
        update: (newValues: any) => {
            updates = newValues;
            return builder;
        },
        eq: (col: string, val: any) => {
            const prevResolver = dataResolver;
            dataResolver = () => {
                // If update, we need to perform the update on filtered rows
                if (updates) {
                    const db = getDb();
                    const rows = db[table] || [];
                    const updatedRows: any[] = [];

                    db[table] = rows.map((r: any) => {
                        if (r[col] === val) {
                            const newRow = { ...r, ...updates };
                            updatedRows.push(newRow);
                            return newRow;
                        }
                        return r;
                    });
                    saveDb(db);
                    return { data: updatedRows, error: null };
                }

                // Normal select filter
                const res = prevResolver();
                if (res.data) {
                    return { ...res, data: res.data.filter((r: any) => r[col] === val) };
                }
                return res;
            };
            return builder;
        },
        order: (col: string, { ascending }: any) => {
            const prevResolver = dataResolver;
            dataResolver = () => {
                const res = prevResolver();
                if (res.data && Array.isArray(res.data)) {
                    res.data.sort((a: any, b: any) => {
                        if (a[col] < b[col]) return ascending ? -1 : 1;
                        if (a[col] > b[col]) return ascending ? 1 : -1;
                        return 0;
                    });
                }
                return res;
            };
            return builder;
        },
        single: async () => {
            const res = dataResolver();
            if (res.data && res.data.length > 0) return { data: res.data[0], error: null };
            return { data: null, error: { message: 'No rows' } };
        },
        maybeSingle: async () => {
            const res = dataResolver();
            if (res.data && res.data.length > 0) return { data: res.data[0], error: null };
            return { data: null, error: null };
        },
        then: (resolve: any, reject: any) => {
            try {
                resolve(dataResolver());
            } catch (e) {
                reject(e);
            }
        }
    };
    return builder;
};

export const mockServerClient = {
    auth: {
        getSession: async () => ({ data: { session: { user: { email: 'ya3777250@gmail.com' } } }, error: null }),
        getUser: async () => ({ data: { user: { email: 'ya3777250@gmail.com' } }, error: null }),
    },
    from: (table: string) => createBuilder(table),
};
