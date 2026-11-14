# Fase 1 — Fundação multiempresa

## Objetivo

Implementar a fundação de identidade, autenticação e isolamento entre empresas sem depender de um backend gerenciado pelo editor.

## Arquitetura definida

- **Banco:** PostgreSQL gerenciado no Neon.
- **ORM e migrations:** Drizzle ORM e Drizzle Kit.
- **Autenticação:** Better Auth, com email/senha, sessão persistida, recuperação e redefinição de senha.
- **Servidor:** TanStack Start executado em Cloudflare Workers.
- **Conexão ao banco:** Cloudflare Hyperdrive, mantendo a URL e credenciais do banco somente no ambiente servidor.
- **Arquivos:** Cloudflare R2 nas fases que exigirem fotos, logotipos e anexos.

## Modelo inicial

- `user`: identidade e credenciais gerenciadas pelo Better Auth.
- `profiles`: dados de perfil da aplicação vinculados ao usuário autenticado.
- `companies`: dados essenciais da empresa e titular responsável.
- `company_members`: associação de usuários à empresa, papel e permissões.
- `audit_logs`: ações administrativas e alterações relevantes.

O schema do Better Auth será integrado ao schema Drizzle da aplicação. As tabelas empresariais terão identificador de empresa e chaves estrangeiras que impeçam relacionamentos entre empresas diferentes.

## Isolamento multiempresa

A segurança será aplicada em duas camadas:

1. Autorização obrigatória no servidor para cada server function, endpoint e operação de leitura ou escrita.
2. Row Level Security nativa do PostgreSQL em todas as tabelas que armazenem dados de empresas.

A camada de acesso ao banco deverá estabelecer o contexto da empresa dentro da transação atual, usando configuração local da transação. As políticas deverão usar esse contexto, e as tabelas deverão aplicar FORCE ROW LEVEL SECURITY quando apropriado. A role de aplicação não poderá possuir privilégios de bypass de RLS.

Não confiar em identificadores de empresa enviados pelo navegador. O servidor deve derivar e validar a associação a partir da sessão autenticada.

## Migrations

- Manter schema TypeScript em `src/db/schema`.
- Gerar migrations versionadas com Drizzle Kit.
- Revisar cada migration antes de aplicá-la.
- Usar migrations incrementais em desenvolvimento e produção.
- Não executar alterações de schema diretamente pela interface do cliente.
- Não armazenar credenciais, URLs privadas ou segredos no repositório.
- Variáveis privadas não podem usar prefixo `VITE_`.

## Etapas de implementação

1. Criar projeto PostgreSQL no Neon e configurar Cloudflare Hyperdrive.
2. Instalar e configurar Drizzle ORM/Drizzle Kit e o driver PostgreSQL compatível com o ambiente Worker.
3. Definir schema do Better Auth e tabelas multiempresa.
4. Gerar e revisar a primeira migration.
5. Configurar Better Auth e endpoints de autenticação no servidor TanStack Start.
6. Implementar criação de perfil e associação inicial do proprietário à empresa.
7. Implementar resolução segura da empresa ativa e autorização por papel.
8. Criar políticas RLS e testes com usuários de empresas distintas.
9. Validar cadastro, login, logout, sessão, recuperação de senha e isolamento.

## Critérios de aceite

- Cadastro e login persistem no PostgreSQL.
- Sessões são validadas no servidor e não dependem de estado confiado ao navegador.
- Proprietário e membros são associados à empresa correta.
- Nenhuma consulta de uma empresa retorna dados de outra.
- Tentativas de leitura e escrita cruzadas são negadas pelo PostgreSQL.
- Testes cobrem usuário sem empresa, membro, proprietário e acesso não autorizado.
- Nenhum segredo ou credencial do banco aparece no bundle do navegador.

## Situação

Arquitetura escolhida; integração e implementação ainda pendentes. A interface inicial não comprova autenticação, banco conectado ou isolamento funcionando.
