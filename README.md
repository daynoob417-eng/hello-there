# Central de Orçamentos

SaaS para técnicos autônomos, instaladores e pequenas empresas brasileiras de instalação e manutenção de ar-condicionado.

## Objetivo

Centralizar o ciclo comercial e operacional do negócio: clientes, leads, catálogo, orçamentos, agendamentos, equipe técnica, execução dos serviços, acompanhamento do cliente, pagamentos, despesas, estoque e relatórios.

O produto terá três ambientes integrados:
- **Empresário:** gestão completa da empresa e visão dos indicadores reais.
- **Técnico:** agenda e serviços atribuídos, com registro da execução.
- **Cliente:** solicitação e acompanhamento por link individual seguro, sem conta obrigatória.

## Estado atual

A página de vendas criada anteriormente não é o produto solicitado e não deve ser tratada como versão funcional. A implementação atual ainda não possui os módulos operacionais, autenticação integrada, persistência de dados ou regras de negócio da Central de Orçamentos.

A reconstrução foi retomada em uma branch separada. A especificação funcional completa está em [docs/central-de-orcamentos-especificacao.md](docs/central-de-orcamentos-especificacao.md).

## Arquitetura aprovada

- React + TypeScript + Vite + TanStack.
- **Lovable Cloud** como backend único gerenciado: banco de dados, autenticação, sessões, armazenamento e lógica server-side.
- Não criar nem administrar um projeto Supabase separado.
- Não adicionar Neon, Drizzle, Better Auth, Appwrite ou outro provedor de backend.
- Isolamento obrigatório dos dados por empresa, autorização no backend e políticas de segurança restritivas.
- Desenvolvimento via GitHub em branches e Pull Requests, com validação antes da integração e sincronização com Lovable.

## Critério de qualidade

Não considerar pronto um módulo que seja apenas visual. Toda funcionalidade deve operar com dados reais, persistir no backend, respeitar permissões e isolamento por empresa, tratar erros e possuir testes relevantes. Não usar dados fictícios como se fossem reais nem botões sem ação.

## Executar localmente

```bash
npm install
npm run dev
```

## Validação

```bash
npm run lint
npm test
npm run build
```
