# Fase 1 — Fundação multiempresa

## Objetivo

Implementar identidade, autenticação, empresas e isolamento de dados usando um único backend gerenciado, com configuração simples e sem depender de Supabase ou do backend do editor.

## Arquitetura definida

- **Backend gerenciado:** Appwrite Cloud.
- **Autenticação:** Appwrite Auth, com email/senha, sessão persistida e recuperação de acesso.
- **Banco:** Appwrite TablesDB, com tabelas, colunas tipadas, relacionamentos, índices e transações.
- **Permissões:** equipes (Teams) e permissões de recursos do Appwrite, complementadas por verificações obrigatórias no servidor.
- **Arquivos:** Appwrite Storage para fotos, logotipos e anexos.
- **Lógica de negócio:** server functions do TanStack Start e, quando fizer sentido, Appwrite Functions.
- **Aplicação:** preservar a base React + TanStack Start e o runtime Cloudflare Workers já existente.

## Modelo inicial

- Usuários e sessões gerenciados pelo Appwrite Auth.
- Perfis da aplicação vinculados ao usuário autenticado.
- Empresas com dados essenciais e titular responsável.
- Teams do Appwrite para associação de usuários à empresa e definição de papéis.
- Registros de auditoria para ações administrativas e alterações relevantes.
- Demais tabelas empresariais com identificador de empresa obrigatório e índices adequados.

O identificador de equipe/empresa deve ser validado pelo servidor a partir da sessão autenticada e da associação do usuário. Não aceitar como confiável um identificador enviado pelo navegador.

## Isolamento multiempresa

A segurança será aplicada em duas camadas:

1. Autorização obrigatória no servidor para cada server function, endpoint e operação de leitura ou escrita.
2. Permissões do Appwrite em tabelas/linhas, arquivos e funções, associadas às equipes e aos papéis apropriados.

Toda consulta deve limitar os registros à empresa autorizada. Operações administrativas devem usar credenciais exclusivamente no servidor. Nunca enviar API key administrativa ao navegador. Criar testes que tentem ler, alterar e excluir dados de outra empresa.

## Configuração e versionamento

- Criar um projeto Appwrite Cloud para desenvolvimento e planejar separação de produção.
- Configurar endpoint e project ID como configuração pública apenas quando forem identificadores não secretos.
- Guardar API keys e credenciais administrativas somente em secrets do servidor.
- Documentar tabelas, atributos, índices, permissões e funções no repositório.
- Automatizar a configuração do ambiente quando possível, evitando depender de alterações manuais não documentadas no Console.
- Não armazenar credenciais, URLs privadas ou segredos no repositório.
- Variáveis privadas não podem usar prefixo VITE_.

## Etapas de implementação

1. Criar projeto Appwrite Cloud.
2. Configurar Appwrite Auth e os provedores de login necessários.
3. Definir o modelo de empresas e Teams para membros e papéis.
4. Criar tabelas de perfil, empresa e auditoria no TablesDB.
5. Configurar permissões por equipe e por registro.
6. Implementar validação de sessão e associação à empresa no servidor.
7. Implementar criação do perfil e associação inicial do proprietário à empresa.
8. Criar testes com usuários de empresas distintas e tentativas de acesso cruzado.
9. Validar cadastro, login, logout, sessão e recuperação de acesso.

## Critérios de aceite

- Cadastro e login persistem no Appwrite Auth.
- Sessões são validadas no servidor e não dependem de estado confiado ao navegador.
- Proprietário e membros são associados à empresa/equipe correta.
- Nenhuma consulta de uma empresa retorna dados de outra.
- Tentativas de leitura e escrita cruzadas são negadas.
- Testes cobrem usuário sem empresa, membro, proprietário e acesso não autorizado.
- Nenhuma chave administrativa aparece no bundle do navegador.
- A estratégia de transações e concorrência do agendamento é validada antes de liberar reservas reais.

## Situação

Arquitetura escolhida; integração e implementação ainda pendentes. A interface inicial não comprova autenticação, banco conectado ou isolamento funcionando.
