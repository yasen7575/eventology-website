import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'mock-db.json');

// Ensure DB exists
if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify({ applications: [], users: [], profiles: [] }, null, 2));
}

interface MockDb {
    applications: Record<string, unknown>[];
    users: Record<string, unknown>[];
    profiles: Record<string, unknown>[];
    [key: string]: Record<string, unknown>[];
}

const getDb = (): MockDb => {
    try {
        const data = fs.readFileSync(DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch {
        return { applications: [], users: [], profiles: [] };
    }
};

interface QueryBuilder {
    select: (cols?: string) => QueryBuilder;
    insert: (row: Record<string, unknown> | Record<string, unknown>[]) => QueryBuilder;
    update: (newValues: Record<string, unknown>) => QueryBuilder;
    eq: (col: string, val: unknown) => QueryBuilder;
    order: (col: string, options: { ascending?: boolean }) => QueryBuilder;
    single: () => Promise<{ data: Record<string, unknown> | null; error: unknown }>;
    maybeSingle: () => Promise<{ data: Record<string, unknown> | null; error: unknown }>;
    then: (resolve: (val: { data: Record<string, unknown>[]; error: unknown }) => void) => void;
}

const saveDb = (data: MockDb) => {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};

const createBuilder = (table: string): QueryBuilder => {
    let dataResolver: () => { data: Record<string, unknown>[]; error: unknown } = () => ({ data: [], error: null });
    let isInsert = false;
    let updates: Record<string, unknown> | null = null;

    const builder: QueryBuilder = {
        select: () => {
            if (isInsert || updates) return builder;

            dataResolver = () => {
                const db = getDb();
                return { data: db[table] || [], error: null };
            };
            return builder;
        },
        insert: (row: Record<string, unknown> | Record<string, unknown>[]) => {
            isInsert = true;
            dataResolver = () => {
                const db = getDb();
                if (!db[table]) db[table] = [];
                const rows = Array.isArray(row) ? row : [row];
                // Add simple ID if missing
                const rowsWithId = rows.map((r) => ({
                    ...r,
                    id: (r.id as string) || Date.now().toString(),
                    created_at: new Date().toISOString()
                })) as Record<string, unknown>[];
                db[table].push(...rowsWithId);
                saveDb(db);
                return { data: rowsWithId, error: null };
            };
            return builder;
        },
        update: (newValues: Record<string, unknown>) => {
            updates = newValues;
            return builder;
        },
        eq: (col: string, val: unknown) => {
            const prevResolver = dataResolver;
            dataResolver = () => {
                // If update, we need to perform the update on filtered rows
                if (updates) {
                    const db = getDb();
                    const rows = db[table] || [];
                    const updatedRows: Record<string, unknown>[] = [];

                    db[table] = rows.map((r) => {
                        if (r[col] === val) {
                            const newRow = { ...r, ...updates };
                            updatedRows.push(newRow as Record<string, unknown>);
                            return newRow as Record<string, unknown>;
                        }
                        return r;
                    });
                    saveDb(db);
                    return { data: updatedRows, error: null };
                }

                // Normal select filter
                const res = prevResolver();
                if (res.data) {
                    return { ...res, data: res.data.filter((r) => r[col] === val) };
                }
                return res;
            };
            return builder;
        },
        order: (col: string, { ascending }: { ascending?: boolean }) => {
            const prevResolver = dataResolver;
            dataResolver = () => {
                const res = prevResolver();
                if (res.data && Array.isArray(res.data)) {
                    res.data.sort((a: Record<string, unknown>, b: Record<string, unknown>) => {
                        const aVal = (a[col] as string | number | boolean) ?? '';
                        const bVal = (b[col] as string | number | boolean) ?? '';
                        if (aVal < bVal) return (ascending ?? true) ? -1 : 1;
                        if (aVal > bVal) return (ascending ?? true) ? 1 : -1;
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
        then: (resolve) => {
            try {
                resolve(dataResolver());
            } catch (e) {
                console.error(e);
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
