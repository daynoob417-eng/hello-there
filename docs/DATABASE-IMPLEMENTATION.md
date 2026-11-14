# Banco de dados — fundação e núcleo comercial

## Estado desta entrega

- Lovable Cloud: ativação confirmada pela usuária em 14/11/2026.
- Migração versionada no Git: criada em `supabase/migrations/20261114140000_foundation_and_commercial_core.sql`.
- Aplicação da migração no banco remoto: **pendente**.
- Integração das telas React com autenticação e consultas reais: **pendente**.
- Testes reais de RLS contra duas empresas: **pendentes até a migração ser aplicada**.

O diretório `supabase/migrations` é o formato convencional de versionamento de migrações usado pela infraestrutura PostgreSQL/Supabase que sustenta o Lovable Cloud. Isso **não** cria uma conta, projeto ou backend Supabase separado, nem adiciona um SDK Supabase ao frontend.

## Estrutura criada na migração

### Fundação multiempresa

- `profiles`: dados básicos vinculados a `auth.users`.
- `companies`: empresas e seus dados básicos.
- `company_members`: associação de usuários às empresas e papéis (`owner`, `admin`, `manager`, `technician`).

Funções:
- `create_company_for_current_user`: cria uma empresa e associa o usuário autenticado como proprietário numa única operação.
- `add_company_member`: permite que proprietário/administrador adicione usuário já cadastrado como gerente ou técnico; não permite atribuir papel de proprietário por esse caminho.

### Núcleo comercial

- `customers`: clientes e endereço.
- `leads`: oportunidades, origem, etapa, contato e responsável.
- `services`: catálogo, preço fixo ou sob consulta, duração e estado ativo.
- `quotes`: orçamento, cliente, validade, estado e totais.
- `quote_items`: itens e valores calculados.
- `audit_logs`: trilha de alterações de clientes, leads, serviços e orçamentos.

Os totais dos orçamentos são recalculados quando os itens mudam. Orçamento aprovado não é registrado como pagamento recebido.

## Segurança implementada na migração

- RLS habilitada em todas as tabelas criadas.
- Consultas e alterações empresariais limitadas a membros e papéis autorizados.
- Técnicos não recebem acesso geral à carteira de clientes, leads ou orçamentos nesta fase.
- Associação de membros só é feita pela função controlada, não por inserção direta no navegador.
- Chaves administrativas não são adicionadas ao frontend nem ao repositório.
- Chaves estrangeiras compostas impedem relacionar cliente, serviço, item ou orçamento de empresas diferentes.
- Funções de autorização usam `SECURITY DEFINER` com `search_path` fixo para evitar recursão de RLS e resolução insegura de objetos.

## Limites conhecidos / próximos passos

1. Aplicar a migração ao banco Lovable Cloud por um mecanismo autorizado.
2. Validar sintaxe e execução no PostgreSQL gerenciado.
3. Criar testes de integração com dois usuários em empresas diferentes e provar bloqueio de leitura/escrita cruzada.
4. Implementar a integração real do app com a autenticação Cloud, sem inventar URLs, IDs ou segredos.
5. Conectar telas de clientes, leads, serviços e orçamentos aos dados persistidos.
6. Depois disso, avançar para agenda e operações técnicas.

**Importante:** sincronizar arquivos Git com o projeto Lovable não é prova de que a migração foi executada no banco. Não marcar esta fase como concluída até verificar tabelas, políticas e operações reais no ambiente Cloud.
