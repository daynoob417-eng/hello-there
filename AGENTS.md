# Project instructions — Central de Orçamentos

## Product

Build a production-minded SaaS for Brazilian air-conditioning installation and maintenance businesses. Preserve the three integrated environments: empresário, técnico and cliente, and follow the user's Prompt Mestre.

## Mandatory workflow

1. ChatGPT: analyze, plan and prepare the change.
2. GitHub: implement on a feature branch, review, run lint/tests/build and open/update a pull request. Never push directly to main.
3. Lovable: synchronize and visually verify the approved code after it reaches the connected branch. Do not claim visual verification unless it was actually performed.

## Architecture — Lovable Cloud

- Use **Lovable Cloud** as the managed backend selected by the user.
- Lovable Cloud manages the backend resources through the Lovable project: database, authentication, file storage and server/edge functions where required.
- Important clarification: Lovable Cloud is built on Supabase technology behind the scenes. The user does not need to create or manage a separate Supabase project or configure a separate Supabase account for this architecture.
- Do not provision Neon, Appwrite, a separate Supabase project, Drizzle, Better Auth, Hyperdrive or another parallel backend.
- Keep the existing React + TypeScript + Vite + TanStack foundation unless compatibility testing in Lovable proves a change is necessary.
- Keep the current frontend hosting/runtime decision separate from the backend decision. Do not silently migrate hosting or remove Cloudflare configuration without a reviewed plan.
- Use the official Lovable Cloud integration/configuration generated for this project. Do not hand-write or guess project IDs, endpoints, environment variables, SDK setup or secrets.
- Lovable remains the project's visual editor and Git synchronization surface. Lovable Cloud is the managed backend.

## Security and business rules

- Every tenant-owned record must be scoped to a company.
- Enforce tenant authorization with database row-level security policies and server-side checks for privileged operations. UI route guards alone are not security.
- Never trust a company ID supplied by the browser without validating the authenticated user's membership.
- Keep service-role/admin secrets server-side only. Never expose them through VITE_ variables or commit them.
- Public customer access must use high-entropy random tokens, store only token hashes where feasible, and scope access to one appointment.
- Booking confirmation must be atomic and prevent overlapping reservations, including concurrent requests. Prove the selected database constraint/transaction strategy with concurrency tests before enabling real bookings.
- A quote approval, scheduled service or completed service is not received payment.
- Do not present simulated records or metrics as real company data.
- Validate uploads by type, size, authorization and company ownership.

## Code quality

- Preserve the existing app foundation unless a documented decision justifies a change.
- Do not edit generated files whose headers identify them as generated.
- Add tests for business rules, permissions, tenant isolation and concurrency-sensitive flows.
- Before a pull request, run npm run lint, npm test and npm run build.
- Do not rewrite published Git history or force-push.
- Do not commit secrets, credentials, local environment files or real customer data.
