# 🧩 EmploMS — Workforce OS

**A full-stack employee management system built around real HR workflows, secure authentication and persistent business data.**

![Next.js](https://img.shields.io/badge/NEXT.JS-APP%20ROUTER-111827?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TYPESCRIPT-STRICT-3178c6?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/PRISMA-POSTGRES-2d3748?style=for-the-badge&logo=prisma&logoColor=white)
![Status](https://img.shields.io/badge/STATUS-ACTIVE-00ff88?style=for-the-badge&labelColor=0b1020)

## 🎯 Product

EmploMS is the **full-stack Workforce OS variant** of Vince's employee-management work. It focuses on server-side business logic, authentication, database persistence and HR workflows rather than a frontend-only dashboard.

### Modules

- 🔐 Authentication + role-based access control
- 👥 Employee directory and CRUD
- 🏢 Departments
- 🕒 Attendance and check-in
- 📝 Leave applications and approvals
- 💰 Payroll calculations and payslip-ready records
- ⭐ Performance reviews
- 🎯 Goals-ready data model
- 📊 Dashboard analytics
- 📤 CSV reporting
- 🧾 Audit-log foundations

## 🏗️ Architecture

```text
Next.js App Router
       │
       ├── Server / client UI
       ├── Route handlers / server actions
       └── Authentication
                │
             Prisma
                │
          PostgreSQL
```

## 🧰 Stack

- Next.js App Router
- React 19
- TypeScript
- Prisma + PostgreSQL
- JWT sessions in httpOnly cookies
- bcrypt password hashing
- Zod validation
- Recharts-ready analytics
- Responsive premium UI

## 🚀 Local setup

1. Install Node.js 20+.
2. Create a PostgreSQL database.
3. Copy `.env.example` to `.env`.
4. Set `DATABASE_URL` and a strong `JWT_SECRET`.
5. Configure the seed password through `SEED_ADMIN_PASSWORD`.

```bash
npm install
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

Open the local application using the URL printed by Next.js.

### ⚠️ Seed credentials

The seed script may use a development default if `SEED_ADMIN_PASSWORD` is not provided. **Always set an explicit strong password for local/shared environments and never carry development credentials into production.**

## 🔐 Security

Employee and payroll information is sensitive business data. Before production:

- Use a long random JWT secret.
- Enforce role checks server-side for every privileged operation.
- Keep authentication cookies `httpOnly`, `secure` and appropriately scoped.
- Validate all input with server-side schemas.
- Use least-privilege PostgreSQL credentials.
- Add audit logging for sensitive HR actions.
- Enable HTTPS and secure headers.
- Configure backups and recovery procedures.
- Rotate credentials after accidental exposure.
- Never expose database credentials or secrets to the browser.

## ☁️ Production

Deploy to Vercel or another Node-compatible host with managed PostgreSQL. Configure all secrets through the deployment platform and run Prisma generation/migrations as part of the release process.

## 🗺️ Roadmap

- [ ] Automated API/integration tests
- [ ] Fine-grained permissions matrix
- [ ] Complete attendance overtime rules
- [ ] Payroll export and payslips
- [ ] Advanced performance analytics
- [ ] Audit-log viewer
- [ ] Email notifications
- [ ] CI build/lint/type checks
- [ ] Production observability

## 👨‍💻 Builder

**Vince Odhiambo** — full-stack developer and technology builder.
