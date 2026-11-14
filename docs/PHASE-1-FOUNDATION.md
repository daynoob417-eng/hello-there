# Fase 1 — Fundação multiempresa

## Objetivo

Implementar identidade, autenticação, empresas e isolamento de dados usando Lovable Cloud como backend gerenciado do projeto.

## Arquitetura definida

- **Backend gerenciado:** Lovable Cloud.
- **Autenticação:** serviço de autenticação gerenciado pelo Lovable Cloud.
- **Banco:** banco gerenciado pelo Lovable Cloud.
- **Isolamento:** políticas Row Level Security (RLS), complementadas por verificações obrigatórias no servidor.
- **Arquivos:** armazenamento gerenciado pelo Lovable Cloud.
- **Lógica de negócio privilegiada:** funções server-side/edge quando necessário.
- **Aplicação:** preservar a base React + TypeScript + Vite + TanStack até validar compatibilidade com o fluxo Lovable.

**Nota técnica:** Lovable Cloud utiliza tecnologia Supabase nos bastidores. A configuração e operação do backend serão feitas pelo Lovable; não criar um projeto Supabase separado.

## Modelo inicial

- Usuários gerenciados pelo serviço de autenticação.
- Perfis da aplicação vinculados ao usuário autenticado.
- Empresas com dados essenciais e titular responsável.
- Associação de usuários às empresas com papéis explícitos.
- Registros de auditoria para ações administrativas e alterações relevantes.
- Demais tabelas empresariais com identificador de empresa obrigatório e índices adequados.

O identificador da empresa deve ser validado pelo backend a partir da sessão autenticada e da associação do usuário. Não aceitar como confiável um identificador enviado pelo navegador.

## Isolamento multiempresa

A segurança será aplicada em duas camadas:

1. Políticas RLS no banco para limitar cada operação aos registros da empresa autorizada.
2. Autorização obrigatória no servidor para operações privilegiadas e regras de negócio sensíveis.

Toda consulta deve limitar os registros à empresa autorizada. Criar testes que tentem ler, alterar e excluir dados de outra empresa.

## Configuração e versionamento

- Confirmar a ativação do Lovable Cloud no projeto conectado antes de escrever integração.
- Usar a configuração gerada pelo Lovable, sem adivinhar endpoint, IDs ou variáveis.
- Planejar ambientes de desenvolvimento e produção e documentar como são separados.
- Guardar segredos administrativos somente em configuração segura do backend.
- Nunca armazenar credenciais, URLs privadas ou segredos no repositório.
- Variáveis privadas não podem usar prefixo VITE_.
- Versionar documentação do modelo de dados, políticas RLS e funções.

## Etapas de implementação

1. Confirmar que Lovable Cloud está habilitado.
2. Inspecionar a configuração e os recursos existentes do projeto.
3. Configurar autenticação e provedores necessários.
4. Definir empresas, perfis, membros e papéis.
5. Criar tabelas, relações, índices e políticas RLS.
6. Implementar validação de sessão e associação à empresa no backend.
7. Implementar criação do perfil e associação inicial do proprietário à empresa.
8. Criar testes com usuários de empresas distintas e tentativas de acesso cruzado.
9. Validar cadastro, login, logout, sessão e recuperação de acesso.

## Critérios de aceite

- Cadastro e login persistem no backend gerenciado.
- Sessões são validadas no servidor e não dependem de estado confiado ao navegador.
- Proprietário e membros são associados à empresa correta.
- Nenhuma consulta de uma empresa retorna dados de outra.
- Tentativas de leitura e escrita cruzadas são negadas.
- Testes cobrem usuário sem empresa, membro, proprietário e acesso não autorizado.
- Nenhuma chave administrativa aparece no bundle do navegador.
- A estratégia de transações e concorrência do agendamento é validada antes de liberar reservas reais.

## Situação

Lovable Cloud ativado (confirmação da usuária em 14/11/2026). A migração inicial da fundação e do núcleo comercial foi versionada em `supabase/migrations/20261114140000_foundation_and_commercial_core.sql`. A aplicação no banco remoto, a integração do frontend e os testes reais de isolamento ainda estão pendentes. Consulte `docs/DATABASE-IMPLEMENTATION.md`.
