# Project instructions — Central de Orçamentos

## Product

Build a production-minded SaaS for Brazilian air-conditioning installation and maintenance businesses. Follow the two-part Prompt Mestre and preserve the three integrated environments: empresário, técnico and cliente.

## Mandatory workflow

1. ChatGPT: analyze, plan and prepare the change.
2. GitHub: implement on a feature branch, review, run lint/tests/build and open a pull request. Never push directly to main.
3. Lovable: synchronize and visually verify the approved code after it reaches the connected branch. Lovable is the code editor/synchronization surface only for this project; do not enable its managed backend.

## Architecture — no Supabase

- Frontend/full-stack framework: React + TypeScript + Vite + TanStack Start/Router.
- Managed backend: Appwrite Cloud.
- Authentication and sessions: Appwrite Auth.
- Data: Appwrite TablesDB with typed columns, relationships, indexes and transactions.
- File storage: Appwrite Storage.
- Server-side business operations: TanStack Start server functions and/or Appwrite Functions, using server-only credentials.
- Existing app runtime/deployment: Cloudflare Workers, unless a documented decision changes it.
- Lovable is not the database, authentication provider, storage provider or production runtime.

Do not add Supabase SDKs, Supabase Auth, Supabase Storage, Supabase Edge Functions, Supabase CLI, Supabase migrations, or Lovable Cloud backend configuration. Do not add Neon, Drizzle, Better Auth, Hyperdrive or a second database layer unless a reviewed architecture decision explicitly requires it. Keep Appwrite configuration and schema changes documented and versioned in the repository.

## Security and business rules

- Every tenant-owned record must be scoped to a company/team.
- Enforce authorization in every server function and endpoint; route guards alone are not security.
- Use Appwrite team membership and resource permissions, with server-side membership checks for every tenant operation.
- Never trust a company/team ID supplied by the browser without checking membership on the server.
- Keep API keys and administrative credentials in server-side environment secrets. Never use VITE_ for private secrets.
- Public customer access must use high-entropy random tokens; store only token hashes and scope access to one appointment.
- Booking confirmation must be atomic and must prevent overlapping reservations, including concurrent requests. Validate the chosen Appwrite transaction/locking strategy with concurrency tests before claiming this requirement is met.
- A quote approval, scheduled service or completed service is not a received payment.
- Do not show simulated records or metrics as real company data.

## Code quality

- Preserve the existing TanStack Start foundation unless a documented decision justifies a change.
- Do not edit generated files whose headers identify them as generated.
- Add tests for business rules, permissions, tenant isolation and concurrency-sensitive flows.
- Before a pull request, run npm run lint, npm test and npm run build.
- Do not rewrite published Git history or force-push.
- Do not commit secrets, credentials, local environment files or real customer data.
