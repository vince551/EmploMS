# EmploMS

Premium full-stack Employee Management System / Workforce OS.

## Stack
- Next.js App Router + React 19 + TypeScript
- Prisma + PostgreSQL
- JWT sessions in httpOnly cookies
- bcrypt password hashing
- Zod validation
- Recharts-ready analytics layer
- Responsive premium UI

## Modules
- Authentication and role-based access control
- Employee directory and CRUD
- Departments
- Attendance and check-in
- Leave applications and approval workflow
- Payroll calculations and payslip-ready records
- Performance reviews
- Goals-ready data model
- Dashboard analytics
- CSV reporting
- Audit logs

## Local setup

1. Install Node.js 20+.
2. Create a PostgreSQL database.
3. Copy `.env.example` to `.env` and set `DATABASE_URL` and a strong `JWT_SECRET`.
4. Run:

```bash
npm install
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

Open `http://localhost:3000`.

The seed creates an admin account using `SEED_ADMIN_PASSWORD` (default: `Admin@12345`). Change it before production.

## Production

Deploy the Next.js application to Vercel or another Node-compatible host and connect it to managed PostgreSQL (Neon, Supabase, Railway, Render, etc.). Set `DATABASE_URL`, `JWT_SECRET`, and `SEED_ADMIN_PASSWORD` as server environment variables. Run `prisma generate` during build.

## Security notes

Use a long random JWT secret, HTTPS, a managed PostgreSQL database, backups, least-privilege database credentials, and rotate credentials before production. Payroll and employee data should never be exposed through client-side environment variables.
