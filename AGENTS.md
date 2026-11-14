# Project instructions — Negócio em Ordem

## Product

Build a clear, polished, responsive sales-page demonstration for **Negócio em Ordem**, a proposed simple organization tool for self-employed people and small-business owners.

Core message:
- Brand: Negócio em Ordem
- Headline: Seu negócio merece funcionar com mais organização.
- Supporting message: Organize clientes, vendas, tarefas e dinheiro em um só lugar.
- Campaign line: Menos tarefas perdidas. Mais controle. Mais oportunidades de venda.

## Mandatory workflow

1. ChatGPT: analyze, plan and prepare the change.
2. GitHub: implement on a feature branch, review, run lint/tests/build and open/update a pull request. Never push directly to main.
3. Lovable: synchronize and visually verify the approved code after it reaches the connected branch. Do not claim visual verification unless it was actually performed.

## Scope and transparency

- The current product scope is a sales-page demonstration, not a production SaaS.
- Preserve the existing React + TypeScript + Vite + TanStack foundation and Lovable compatibility.
- Do not add authentication, databases, payment processing, analytics, email delivery or external services unless the user explicitly requests them.
- Demo metrics, sample records and prices must be clearly labeled as illustrative.
- Forms must clearly disclose when they do not submit or store information.
- Never invent customer testimonials, endorsements, business results or live integrations.
- Keep the page mobile-first, accessible and in Brazilian Portuguese.

## Code quality

- Preserve generated files and existing build configuration unless a reviewed compatibility change is necessary.
- Do not commit secrets, credentials, local environment files or real customer data.
- Before a pull request, run npm run lint, npm test and npm run build.
- Do not rewrite published Git history or force-push.
