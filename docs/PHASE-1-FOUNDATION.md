# Fase 1 — Fundação multiempresa

## O que esta etapa prepara

A migration inicial estabelece a base de identidade e isolamento entre empresas:

- `profiles`: perfil vinculado ao usuário do Supabase Auth.
- `companies`: dados essenciais da empresa e titular responsável.
- `company_members`: associação de usuários à empresa e papel de acesso.
- RLS nas três tabelas.
- Funções auxiliares de autorização usadas pelas políticas.
- Criação automática do perfil ao cadastrar usuário.
- Associação automática do titular quando uma empresa é criada.

## Aplicação

1. Criar ou selecionar o projeto Supabase destinado à aplicação.
2. Conferir a migration em `supabase/migrations/20261114120000_initial_tenant_foundation.sql`.
3. Aplicar pelo Supabase CLI ou pelo SQL Editor do projeto.
4. Configurar as variáveis de ambiente no ambiente de desenvolvimento/hosting:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Executar testes com dois usuários e duas empresas diferentes, verificando leitura, escrita e tentativas de acesso cruzado.

## Limites desta entrega

Esta migration é somente a fundação. Ainda não cria clientes, leads, serviços, orçamentos, agenda, técnicos, atendimentos, pagamentos ou notificações. Também não configura credenciais, autenticação visual, convites ou fluxos de recuperação de senha. Essas partes exigem migrations e testes próprios.

Não inserir chave `service_role` no navegador. A chave pública/anon deve respeitar RLS; operações privilegiadas devem ocorrer apenas em ambiente servidor confiável.
