# Central de Orçamentos

Plataforma SaaS de gestão comercial, agendamento e operação para técnicos e pequenas empresas brasileiras de instalação e manutenção de ar-condicionado.

## Objetivo

Centralizar clientes, leads, catálogo de serviços, orçamentos, agenda, equipe técnica, execução de atendimentos, pagamentos e relatórios em três ambientes integrados: empresário, técnico e cliente.

## Stack do produto

- React 19 + TypeScript
- Vite 8 + TanStack Start / TanStack Router
- Tailwind CSS 4
- shadcn/ui + Radix UI
- TanStack React Query
- PostgreSQL gerenciado no Neon
- Drizzle ORM + Drizzle Kit
- Better Auth para autenticação e sessões
- Cloudflare Workers + Hyperdrive para execução e conexão com PostgreSQL
- Cloudflare R2 para arquivos e fotos (fase de operação)
- Vitest para testes

A arquitetura preserva a base TanStack Start existente. O Lovable será utilizado como editor e sincronizador de código com GitHub; o backend e a hospedagem da aplicação serão executados fora do backend gerenciado do Lovable.

Consulte [Decisões de arquitetura](docs/ARCHITECTURE-DECISIONS.md).

## Estado do desenvolvimento

O projeto está no início da Fase 1 (Fundação), conforme o Prompt Mestre.

- [x] Substituir a página inicial em branco por uma primeira estrutura visual do produto.
- [x] Aplicar nome, idioma e metadados da Central de Orçamentos.
- [x] Criar navegação inicial responsiva para os módulos previstos.
- [x] Definir arquitetura sem Supabase: Neon PostgreSQL, Drizzle, Better Auth e Cloudflare Workers.
- [ ] Configurar projeto PostgreSQL e conexão segura via Cloudflare Hyperdrive.
- [ ] Implementar schema e migrations com Drizzle Kit.
- [ ] Implementar Better Auth, sessão e recuperação de senha.
- [ ] Implementar empresas, membros, perfis, permissões e políticas PostgreSQL de isolamento multiempresa.
- [ ] Implementar testes de isolamento entre empresas.
- [ ] Conectar os módulos a dados persistidos e testar os fluxos.

## Importante

A interface inicial não representa uma aplicação pronta. Indicadores e listas permanecem sem dados até a integração com o backend. Não há dados comerciais fictícios apresentados como reais. Recursos ainda não implementados são identificados como pendentes.

O projeto não utiliza Supabase nem o backend gerenciado do Lovable. Não habilitar Lovable Cloud para este projeto. A conexão com o banco será feita exclusivamente pelo servidor, usando credenciais privadas e Cloudflare Hyperdrive.

## Executar localmente

```bash
npm install
npm run dev
```

## Qualidade

Antes de considerar qualquer módulo concluído, validar persistência, autorização em cada endpoint/server function, políticas PostgreSQL, estados de carregamento e erro, responsividade e testes funcionais.
