# Project instructions — Central de Orçamentos

## Product

Build a production-minded SaaS for Brazilian air-conditioning installation and maintenance businesses. Follow the two-part Prompt Mestre and preserve the three integrated environments: empresário, técnico and cliente.

## Mandatory workflow

1. ChatGPT: analyze, plan and prepare the change.
2. GitHub: implement on a feature branch, review, run lint/tests/build and open a pull request. Never push directly to `main`.
3. Lovable: synchronize and visually verify the approved code after it reaches the connected branch. Lovable is the code editor/synchronization surface only for this project; do not enable its managed backend.

## Architecture — no Supabase

- Frontend/full-stack framework: React + TypeScript + Vite + TanStack Start/Router.
- Database: managed PostgreSQL on Neon.
- ORM/schema/migrations: Drizzle ORM + Drizzle Kit.
- Authentication/session: Better Auth.
- Runtime/deployment: Cloudflare Workers with Cloudflare Hyperdrive for PostgreSQL connectivity.
- File storage: Cloudflare R2 when file uploads are implemented.
- Lovable is not the database, authentication provider, storage provider or production runtime.

Do not add Supabase SDKs, Supabase Auth, Supabase Storage, Supabase Edge Functions, Supabase CLI, Supabase migrations, or Lovable Cloud backend configuration. Do not create a parallel database layer. All schema changes must be represented by reviewed Drizzle migrations.

## Security and business rules

- Every tenant-owned row must be scoped to a company.
- Enforce authorization in every server function and endpoint; route guards alone are not security.
- Enforce tenant isolation in PostgreSQL RLS as well as in server-side authorization.
- Use a database role that cannot bypass RLS; set tenant context transaction-locally.
- Never trust a company ID supplied by the browser without checking membership on the server.
- Keep database URLs, auth secrets and API keys in server-side environment secrets. Never use `VITE_` for private secrets.
- Public customer access must use high-entropy random tokens; store only token hashes and scope access to one appointment.
- Booking confirmation must be atomic and must prevent overlapping reservations at the database level.
- A quote approval, scheduled service or completed service is not a received payment.
- Do not show simulated records or metrics as real company data.

## Code quality

- Preserve the existing TanStack Start foundation unless a documented decision justifies a change.
- Do not edit generated files whose headers identify them as generated.
- Add tests for business rules, permissions, tenant isolation and concurrency-sensitive flows.
- Before a pull request, run `npm run lint`, `npm test` and `npm run build`.
- Do not rewrite published Git history or force-push.
- Do not commit secrets, credentials, local environment files or real customer data.
