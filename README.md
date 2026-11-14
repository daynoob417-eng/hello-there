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
- Appwrite Cloud para autenticação, banco de dados, permissões, arquivos e funções de backend
- Cloudflare Workers para execução/hospedagem da aplicação existente
- Vitest para testes

O Appwrite será o backend gerenciado único do produto. A base TanStack Start existente será preservada. O Lovable continuará sendo usado como editor e sincronizador de código com GitHub, não como provedor de backend.

Consulte [Decisões de arquitetura](docs/ARCHITECTURE-DECISIONS.md).

## Estado do desenvolvimento

O projeto está no início da Fase 1 (Fundação), conforme o Prompt Mestre.

- [x] Substituir a página inicial em branco por uma primeira estrutura visual do produto.
- [x] Aplicar nome, idioma e metadados da Central de Orçamentos.
- [x] Criar navegação inicial responsiva para os módulos previstos.
- [x] Remover os artefatos legados de Supabase.
- [x] Definir Appwrite Cloud como backend gerenciado.
- [ ] Criar projeto Appwrite e configurar ambientes e chaves privadas.
- [ ] Implementar autenticação, perfis, empresas, equipes e permissões.
- [ ] Criar tabelas e relacionamentos para os dados comerciais.
- [ ] Implementar isolamento entre empresas e testes de autorização.
- [ ] Implementar operações de agendamento transacionais e testes de concorrência.
- [ ] Conectar os módulos a dados persistidos e validar os fluxos.

## Importante

A interface inicial não representa uma aplicação pronta. Indicadores e listas permanecem sem dados até a integração com o backend. Não há dados comerciais fictícios apresentados como reais. Recursos ainda não implementados são identificados como pendentes.

Não utilizar Supabase nem Lovable Cloud neste projeto. Segredos e chaves administrativas do Appwrite devem permanecer exclusivamente no servidor e nunca receber prefixo VITE_.

## Executar localmente

```bash
npm install
npm run dev
```

## Qualidade

Antes de considerar qualquer módulo concluído, validar persistência, autorização em cada endpoint/server function, permissões por empresa, estados de carregamento e erro, responsividade e testes funcionais.
