# Fase 2 — estrutura comercial inicial

Esta migration adiciona a primeira camada persistente dos módulos comerciais:

- **Clientes:** dados de contato e endereço, observações e arquivamento lógico.
- **Leads:** origem, interesse, etapa comercial, responsável e data de retorno.
- **Serviços:** catálogo, preço fixo ou sob consulta, duração e elegibilidade para agendamento.

## Regras aplicadas

- Todos os registros pertencem a uma empresa.
- Chaves estrangeiras compostas impedem relacionar um lead a um cliente de outra empresa.
- RLS fica habilitada nas três tabelas.
- Clientes e leads ficam restritos a proprietário/administrador nesta etapa. O acesso do técnico será aberto somente após a criação dos vínculos com atendimentos atribuídos.
- O catálogo de serviços pode ser consultado por membros da própria empresa; somente proprietário/administrador pode alterá-lo.
- Serviços que exigem avaliação não podem ser marcados como agendáveis diretamente.
- Preço fixo exige valor cadastrado; preço sob consulta não inventa preço.
- Datas de atualização são mantidas pelo trigger compartilhado da fundação.

## Dependências e limites

- A migration depende de 20261114120000_initial_tenant_foundation.sql.
- A migration ainda não foi aplicada a um projeto Supabase.
- Não existe ainda interface CRUD, autenticação conectada ou integração com dados reais.
- A criação de clientes a partir de leads, orçamentos e agenda será implementada nas próximas etapas, com validações transacionais.

## Aplicação

Aplicar as migrations em ordem usando o Supabase CLI ou o SQL Editor do projeto Supabase. Antes de produção, testar as políticas com usuários de empresas distintas e com os papéis owner, admin e technician.
