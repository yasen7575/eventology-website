## 2024-05-20 - [Hardcoded Credentials]
**Vulnerability:** Found hardcoded super admin credentials in storage.ts
**Learning:** Mock implementations often leak into production if not carefully guarded.
**Prevention:** Use environment variables even for mock/dev data.
