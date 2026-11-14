# Central de Orçamentos

Plataforma SaaS de gestão comercial, agendamento e operação para técnicos e pequenas empresas brasileiras de instalação e manutenção de ar-condicionado.

## Objetivo

Centralizar clientes, leads, catálogo de serviços, orçamentos, agenda, equipe técnica, execução de atendimentos, pagamentos e relatórios em três ambientes integrados: empresário, técnico e cliente.

## Stack atual do repositório

- React 19 + TypeScript
- Vite 8 com TanStack Start / TanStack Router
- Tailwind CSS 4
- shadcn/ui e Radix UI
- TanStack React Query
- Lucide React
- Vitest

> A configuração atual do projeto foi gerada pelo Lovable e utiliza TanStack Start. A arquitetura será evoluída preservando essa base, em vez de trocar o framework sem necessidade.

## Estado do desenvolvimento

O projeto está no início da Fase 1 (Fundação), conforme o Prompt Mestre.

- [x] Substituir a página inicial em branco por uma primeira estrutura visual do produto.
- [x] Aplicar nome, idioma e metadados da Central de Orçamentos.
- [x] Criar navegação inicial responsiva para os módulos previstos.
- [ ] Configurar Supabase Authentication e sessão.
- [ ] Criar esquema PostgreSQL e migrations.
- [ ] Implementar RLS e validar isolamento entre empresas.
- [ ] Implementar perfis, empresas, membros e permissões.
- [ ] Conectar os módulos a dados persistidos e testar os fluxos.

## Importante

A interface inicial não representa uma aplicação pronta. Indicadores e listas permanecem sem dados até a integração com o backend. Não há dados comerciais fictícios apresentados como reais. Recursos ainda não implementados são identificados como pendentes.

## Executar localmente

```bash
npm install
npm run dev
```

## Qualidade

Antes de considerar qualquer módulo concluído, validar persistência, autorização no servidor/banco, estados de carregamento e erro, responsividade e testes funcionais.
