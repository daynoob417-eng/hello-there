# Project instructions — Central de Orçamentos

## Product

Build the actual working **Central de Orçamentos** product for independent HVAC installation and maintenance technicians and small service businesses in Brazil. This is a production-oriented business application, not a sales page, marketing site, or static demonstration.

The product must support the full operational cycle:

first contact → customer → quote → approval → scheduling → service execution → billing/payment tracking → history and reporting.

Core modules, delivered incrementally:
- Business dashboard with real data and useful operational indicators.
- Customers and lead pipeline.
- Service, product, and material catalog.
- Quotes with line items, server-calculated totals, validity, version history, PDF/share flow, and customer approval/decline.
- Scheduling with working hours, blocked periods, service duration, capacity, and backend conflict prevention.
- Team members, roles, and technician assignment.
- Work orders with checklist, diagnosis, materials, notes, photos, and status history.
- Secure customer portal links for requests, quote review, approval, and service tracking.
- Receivables, recorded payments, expenses, inventory movements, and real reports.
- Settings, audit history, and notifications.

## Architecture decisions

- Use **Lovable Cloud as the single managed backend** for database, authentication, storage, and server-side functionality.
- Do not create or administer a separate Supabase project or introduce another backend provider.
- Do not assume Lovable Cloud is active or wired merely because the repository is connected to Lovable. Verify the actual project integration before implementing backend clients or migrations.
- Do not invent SDKs, credentials, environment variables, or database connection details. Never commit secrets.
- Preserve the existing React, TypeScript, TanStack Start, Vite, and Lovable-compatible foundation unless a reviewed compatibility change is necessary.
- Any demo/sample data must be explicitly labeled. Do not present local-only state as persisted product functionality.

## Security and data integrity

- Enforce company/workspace data isolation on the server for every operation.
- Apply least-privilege roles for owner/admin, technician, and customer access.
- Validate inputs and calculate monetary totals on the server; use decimal-safe money handling.
- Prevent overlapping bookings under concurrent requests.
- Keep audit history for sensitive business operations and inventory movements.
- Protect customer portal tokens, uploads, and personal data; apply LGPD principles.
- Do not expose financial data to technicians or unrelated customers.

## Mandatory workflow

1. Analyze the existing repository and the product specification.
2. Implement on a feature branch; never push directly to `main`.
3. Run lint, tests, and build where available; add focused tests for new behavior.
4. Open a pull request describing scope, validation, and any unresolved integration dependency.
5. Do not merge a pull request without the user's explicit approval.
6. Lovable may synchronize and visually verify the approved code; do not claim visual verification unless actually performed.

## Definition of done

A module is not complete merely because its screen looks finished. It must perform its real workflow, persist and retrieve data through the approved backend, enforce authorization and company isolation, handle loading/empty/error states, and have appropriate tests. If backend integration cannot yet be verified, report the blocker clearly and do not fake persistence.

## Scope and communication

- Work toward the actual operational product, not a landing page or marketing demonstration.
- Do not replace the product with a generic sales page.
- Keep the interface responsive, accessible, and in Brazilian Portuguese.
- Explain blockers plainly and do not ask the user to spend Lovable AI credits for work that can be done through GitHub.
