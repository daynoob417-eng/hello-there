# Assistente de Conteúdo e Vendas com IA — visão inicial

**Status:** conceito em validação; implementação funcional ainda não iniciada.

## Problema a resolver

Pequenos empreendedores frequentemente precisam divulgar produtos e serviços, manter uma presença regular nas redes sociais e responder clientes, mas não sabem o que publicar, como escrever uma mensagem comercial ou como transformar interesse em uma conversa de venda.

A proposta é reduzir esse esforço com uma ferramenta guiada, simples e adaptada ao contexto de cada negócio.

## Público e posicionamento

- Público pretendido: pequenos negócios e empreendedores.
- Segmento inicial: **a definir por validação**.
- Marca/nome comercial: **a definir**.
- Modelo de cobrança: **a definir** (pagamento único ou assinatura).
- Faixa experimental discutida: R$ 17,90 a R$ 27,90; ainda não validada.
- Não construir checkout nem prometer resultados comerciais antes de validar preço, custos e disposição de pagamento.

## Funcionalidades consideradas para o MVP

### 1. Perfil do negócio
Guardar contexto que evite pedir as mesmas informações repetidamente: segmento, produtos/serviços, público, diferenciais, localização quando relevante e tom de comunicação. Definir quais dados são realmente necessários antes de armazenar informações pessoais.

### 2. Planejador de conteúdo
Sugerir temas e organizar um calendário de publicações por semana ou mês, com objetivo e formato sugerido.

### 3. Criador de legendas
Gerar textos comerciais adaptados ao produto/serviço, público e tom do negócio, com chamadas para ação revisáveis.

### 4. Respostas para clientes
Sugerir respostas para dúvidas, disponibilidade, preço, entrega, agendamento e acompanhamento. O usuário deve revisar antes de enviar; a primeira versão não enviará mensagens automaticamente.

### 5. Roteiros de vídeos curtos
Criar ideias e roteiros curtos com abertura, sequência de cenas, fala/texto sugerido e chamada para ação.

### 6. Ideias de campanhas
Sugerir campanhas e formas de apresentar produtos/serviços sem inventar descontos, estoque, garantias ou características não fornecidas pelo empreendedor.

## Princípio de diferenciação

Não vender apenas uma lista de prompts. O valor deve estar em:
- configuração inicial simples do negócio;
- contexto salvo para personalizar os resultados;
- fluxos guiados, sem exigir conhecimento de engenharia de prompts;
- resultados prontos para revisar, copiar e adaptar;
- organização do calendário e do histórico de materiais.

## Limites da primeira versão

- Não integrar publicação automática em redes sociais.
- Não enviar mensagens automaticamente a clientes.
- Não processar pagamentos até escolher e configurar um provedor.
- Não afirmar que a IA garante vendas ou crescimento.
- Não mostrar resultados simulados como se fossem respostas reais do modelo.
- Definir limites de uso e custo antes de liberar geração ilimitada.

## Arquitetura e dependências

A base atual usa React, TypeScript, Vite, TanStack Start, Tailwind CSS e componentes reutilizáveis compatíveis com Lovable.

O provedor de IA, backend, autenticação, armazenamento e cobrança ainda não foram selecionados. Verificar as integrações disponíveis e comparar custo, segurança, privacidade e facilidade operacional antes de escolher. Segredos devem ficar exclusivamente no ambiente seguro do servidor.

## Critérios de qualidade

- Interface em português do Brasil e prioritariamente móvel.
- Campos e instruções compreensíveis para quem não domina marketing.
- Resultados editáveis e copiáveis.
- Estados de carregamento, vazio e erro.
- Tratamento de falhas e limites do provedor de IA.
- Proteção dos dados do negócio e de clientes.
- Testes para validação dos principais fluxos.

## Próximas decisões

1. Escolher um segmento inicial para validar a dor.
2. Entrevistar/testar a proposta com empreendedores reais.
3. Definir a primeira jornada e os campos mínimos do perfil.
4. Escolher provedor de IA e arquitetura de backend com base em custo e segurança.
5. Construir e testar o primeiro fluxo completo: perfil do negócio → geração de legenda → revisão → copiar/salvar.
6. Validar preço e modelo de cobrança antes de implementar pagamentos.
