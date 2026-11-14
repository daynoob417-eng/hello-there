# Central de Orçamentos — especificação do produto

**Status:** reconstrução aprovada; implementação funcional ainda não concluída.  
**Objetivo:** transformar o projeto em um SaaS operacional para técnicos autônomos, instaladores e pequenas empresas brasileiras de instalação e manutenção de ar-condicionado.  
**Backend escolhido:** Lovable Cloud como único backend gerenciado. Não criar projeto Supabase separado, nem usar Neon, Appwrite, Firebase ou outro provedor.

## Problema que o produto resolve

O negócio não deve depender de conversas espalhadas, anotações, planilhas desconectadas e controles manuais. A plataforma deve conectar o ciclo comercial e operacional: primeiro contato → orçamento → aprovação → agendamento → execução → cobrança → histórico e relatórios.

Esta aplicação deve ser um sistema real. Não usar dados fictícios como se fossem reais, botões sem ação, formulários que apenas exibem sucesso, nem telas que simulem persistência.

## Ambientes e permissões

### 1. Empresário / administrador
- Acesso à visão geral e aos módulos da empresa.
- Gerenciar clientes, leads, catálogo, orçamentos, agenda, equipe, serviços, estoque, pagamentos, despesas, relatórios e configurações.
- Convidar e desativar membros da equipe e atribuir funções.
- Consultar histórico e indicadores calculados a partir dos registros reais da empresa.

### 2. Técnico
- Acesso apenas aos serviços atribuídos a ele e às informações necessárias para executá-los.
- Consultar agenda, endereço e contato do cliente, descrição do serviço e observações autorizadas.
- Atualizar etapas do atendimento conforme as regras da empresa.
- Registrar início e conclusão, diagnóstico, execução, materiais utilizados, observações e fotos.
- Não pode acessar dados financeiros gerais, configurações administrativas ou serviços de outros técnicos sem autorização explícita.

### 3. Cliente
- Acessar por link seguro e individual, sem obrigação de criar conta.
- Solicitar atendimento, informar endereço e dados de contato, selecionar serviço e consultar horários realmente disponíveis.
- Acompanhar o status do pedido/serviço, confirmar ou solicitar alteração quando permitido e consultar orçamento disponibilizado.
- O link deve usar token aleatório de alta entropia, armazenado de forma protegida, com possibilidade de expiração e revogação. Expor somente os dados necessários daquele atendimento.

## Módulos funcionais

### Painel inicial
- Indicadores reais: leads em aberto, orçamentos aguardando resposta, serviços agendados/em andamento, valores recebidos e pendências.
- Listas de próximos atendimentos e ações que exigem atenção.
- Filtros por período e, quando aplicável, por técnico.
- Não mostrar contagens ou valores inventados.

### Clientes e histórico
- Cadastro de pessoa/empresa, telefones, e-mail, endereços e observações.
- Histórico cronológico de solicitações, orçamentos, serviços, anexos e pagamentos.
- Busca, filtros, edição e arquivamento sem apagar indevidamente o histórico financeiro/operacional.

### Leads e oportunidades
- Captura manual e origem do contato.
- Pipeline configurável com etapas, responsável, prioridade, valor estimado, próxima ação e data de retorno.
- Converter lead em cliente e, quando aplicável, gerar orçamento sem duplicar cadastro.
- Registrar interações e motivos de perda.

### Catálogo de serviços e itens
- Serviços oferecidos, descrição, duração estimada e preço-base opcional.
- Produtos, peças e materiais com unidade, custo e preço de venda.
- Permitir personalização por empresa; não assumir uma tabela universal de preços.

### Orçamentos
- Criar orçamento vinculado a cliente e, opcionalmente, a lead/solicitação.
- Itens, quantidades, preços, descontos e total calculado no servidor.
- Observações, validade, condições e status.
- Gerar PDF com dados reais e compartilhar por link seguro ou WhatsApp.
- Registrar envio, aprovação, recusa e alterações, preservando versões/histórico.
- Aprovação do cliente deve estar vinculada a token seguro e registrar data/hora.

### Agendamento e agenda
- Agenda administrativa por dia/semana/mês, técnico e status.
- Portal público para solicitar horário com base em disponibilidade real, duração do serviço, horário de trabalho, bloqueios, região/área atendida e capacidade configurada.
- A confirmação deve ocorrer no backend, com operação atômica/transacional e proteção contra duas solicitações simultâneas para o mesmo técnico/horário.
- Nunca confirmar apenas porque o horário apareceu livre no navegador.
- Permitir reagendar/cancelar segundo regras configuradas e registrar o histórico.

### Equipe
- Cadastro e convite de técnicos, função, contato, situação e disponibilidade.
- Atribuição de serviços considerando habilitação, jornada e conflitos.
- Um técnico não pode receber atendimentos sobrepostos.

### Execução técnica
- Ordem de serviço vinculada a cliente, orçamento aprovado e agendamento quando aplicável.
- Checklist e etapas configuráveis, horários, diagnóstico, solução, materiais/peças, observações e fotos.
- Registrar quem fez cada alteração e quando.
- Conclusão pode exigir campos obrigatórios configurados pela empresa.

### Acompanhamento do cliente
- Linha do tempo com estados claros e atualizados a partir dos registros reais.
- Exibir somente informações autorizadas do pedido.
- Links públicos devem ser revogáveis, expiráveis e não enumeráveis.

### Financeiro
- Contas a receber e pagamentos vinculados a cliente, orçamento ou serviço.
- Registro de forma de pagamento, valor, data, situação e comprovante opcional.
- Despesas por categoria, data, valor, descrição e anexo opcional.
- Saldo e indicadores derivados de lançamentos reais; não confundir valor orçado com valor recebido.
- Não processar cartão ou movimentar dinheiro sem uma integração de pagamento contratada e configurada.

### Estoque
- Cadastro de materiais, unidades, custo, preço e quantidade.
- Entradas, saídas e ajustes com motivo e autor.
- Baixa de materiais vinculada à execução do serviço quando configurada.
- Histórico de movimentações e alerta de estoque baixo.

### Relatórios
- Vendas/orçamentos por período e status, conversão de leads, serviços realizados, produtividade, recebimentos, despesas e estoque.
- Filtros por período, técnico e categoria.
- Exportações somente a partir dos dados autorizados da empresa.

### Configurações e notificações
- Dados da empresa, horários de funcionamento, áreas atendidas, catálogo, regras de agenda, etapas e preferências.
- Notificações internas para novos pedidos, aprovação de orçamento, mudanças de agenda e pendências.
- WhatsApp pode ser usado para compartilhamento de links/mensagens; automação via API exige configuração própria e credenciais seguras.

## Regras transversais obrigatórias

1. **Isolamento por empresa:** todos os registros pertencem a uma empresa e uma empresa nunca pode ler ou alterar dados de outra.
2. **Autorização no backend:** esconder botão na interface não é controle de acesso. Validar usuário, empresa, papel e permissão em toda operação.
3. **Banco seguro:** políticas de linha (RLS) restritivas, índices, chaves estrangeiras, unicidade e validações no servidor.
4. **Integridade:** valores monetários em tipo decimal apropriado; totais recalculados no servidor; estados de orçamento, serviço e pagamento separados.
5. **Agendamento concorrente:** impedir sobreposição no banco/backend, inclusive sob requisições simultâneas.
6. **Histórico e auditoria:** registrar eventos importantes, autor e data; não apagar silenciosamente registros que sustentam histórico.
7. **Arquivos:** uploads privados por padrão, com autorização e URLs temporárias quando necessário.
8. **LGPD:** coletar apenas dados necessários, limitar acesso, permitir correção e exclusão/anonimização conforme obrigações legais e retenção aplicável.
9. **Experiência:** responsiva em celular e computador, acessível, com estados de carregamento, vazio, sucesso e erro reais.
10. **Testes:** cobrir permissões entre empresas, papéis, cálculos, transições de status, links públicos e conflitos de agenda.

## Arquitetura aprovada

- Frontend: React + TypeScript + Vite + TanStack.
- Backend único: Lovable Cloud para banco, autenticação, sessões, armazenamento e lógica server-side.
- Não administrar uma instância Supabase separada. O uso de componentes internos exigidos pela plataforma gerenciada não significa adotar outro provedor.
- Não adicionar Neon, Drizzle, Better Auth, Appwrite ou outro backend.
- Segredos somente no ambiente seguro do backend; nunca em código público ou variáveis VITE_.
- Mudanças no repositório via branch e Pull Request, com validação antes de integrar à branch principal e sincronizar no Lovable.

## Ordem de implementação

1. Auditar o repositório e confirmar a integração real com Lovable Cloud; registrar o estado atual sem presumir que o backend está conectado.
2. Fundamentos: esquema de dados, autenticação, empresas, membros, papéis, isolamento e testes de segurança.
3. Fluxo principal: clientes → leads → catálogo → orçamento → aprovação.
4. Agenda pública e administrativa, disponibilidade real e proteção contra conflitos.
5. Equipe, ordem de serviço e execução técnica.
6. Portal de acompanhamento do cliente por link seguro.
7. Financeiro, pagamentos registrados, despesas e estoque.
8. Relatórios, notificações, exportações e acabamento responsivo.
9. Revisão de segurança, testes integrados e validação ponta a ponta.

## Critério de conclusão

Um módulo só é considerado pronto quando grava e lê dados reais no backend, respeita permissões e isolamento por empresa, trata erros e estados vazios, tem testes relevantes e funciona no fluxo integrado. Uma tela visual isolada não conta como implementação concluída.
