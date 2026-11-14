# Fase 2 — Estrutura comercial inicial

Esta fase implementará os primeiros módulos persistentes da Central de Orçamentos após a conclusão e validação da fundação multiempresa com Lovable Cloud.

## Entidades

- **Clientes:** dados de contato e endereço, observações e arquivamento lógico.
- **Leads:** origem, interesse, etapa comercial, responsável e data de retorno.
- **Serviços:** catálogo, preço fixo ou sob consulta, duração e elegibilidade para agendamento.

## Regras de negócio

- Todos os registros pertencem a uma empresa.
- Relacionamentos devem impedir associar lead, cliente ou serviço de empresas diferentes.
- Políticas RLS e verificações server-side permanecem obrigatórias nas tabelas empresariais.
- Clientes e leads ficam restritos a proprietário/administrador até que o vínculo com atendimentos atribuídos defina o acesso do técnico.
- O catálogo pode ser consultado por membros autorizados da própria empresa; somente proprietário/administrador pode alterá-lo, salvo permissão explícita.
- Serviços que exigem avaliação não podem ser reservados como execução confirmada diretamente.
- Preço fixo exige valor cadastrado; preço sob consulta não inventa preço.
- Datas de atualização e responsáveis por alterações relevantes devem ser registrados.

## Implementação

- Modelar tabelas, colunas, relações e índices no backend gerenciado pelo Lovable Cloud.
- Manter o modelo de dados, políticas RLS e funções documentados e versionados no repositório.
- Implementar serviços de domínio e operações server-side com validação de entrada.
- Aplicar autorização no servidor e RLS no banco.
- Implementar CRUD real, busca, filtros, paginação e estados de interface.
- Criar testes de persistência, integridade referencial e isolamento entre empresas.

## Dependências e limites

- Depende da Fase 1 concluída: autenticação funcional, sessão validada e isolamento testado.
- Esta fase ainda não está implementada.
- A criação de clientes a partir de leads, orçamentos e agenda será implementada com validações transacionais.
- Nenhum dado de demonstração poderá ser apresentado como dado real de uma empresa.
