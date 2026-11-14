# Fase 2 — Estrutura comercial inicial

Esta fase implementará os primeiros módulos persistentes da Central de Orçamentos após a conclusão e validação da fundação multiempresa.

## Entidades

- **Clientes:** dados de contato e endereço, observações e arquivamento lógico.
- **Leads:** origem, interesse, etapa comercial, responsável e data de retorno.
- **Serviços:** catálogo, preço fixo ou sob consulta, duração e elegibilidade para agendamento.

## Regras de negócio

- Todos os registros pertencem a uma empresa.
- Chaves estrangeiras compostas impedem relacionar lead, cliente ou serviço de empresas diferentes.
- RLS do PostgreSQL permanece habilitada e forçada nas tabelas empresariais.
- Clientes e leads ficam restritos a proprietário/administrador até que o vínculo com atendimentos atribuídos defina o acesso do técnico.
- O catálogo pode ser consultado por membros autorizados da própria empresa; somente proprietário/administrador pode alterá-lo, salvo permissão explícita.
- Serviços que exigem avaliação não podem ser reservados como execução confirmada diretamente.
- Preço fixo exige valor cadastrado; preço sob consulta não inventa preço.
- Datas de atualização e responsáveis por alterações relevantes devem ser registrados.

## Implementação

- Modelar tabelas e relações em `src/db/schema` com Drizzle.
- Gerar migrations com Drizzle Kit e revisar SQL antes da aplicação.
- Implementar serviços de domínio e server functions com validação de entrada.
- Aplicar autorização no servidor e RLS no PostgreSQL.
- Implementar CRUD real, busca, filtros, paginação e estados de interface.
- Criar testes de persistência, integridade referencial e isolamento entre empresas.

## Dependências e limites

- Depende da Fase 1 concluída: PostgreSQL conectado, Better Auth funcional, sessão validada e RLS testada.
- Esta fase ainda não está implementada.
- A criação de clientes a partir de leads, orçamentos e agenda será implementada com validações transacionais.
- Nenhum dado de demonstração poderá ser apresentado como dado real de uma empresa.
