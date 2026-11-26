# Instruções do projeto — Assistente de Conteúdo e Vendas com IA

## Produto
Construir uma plataforma simples, acessível e responsiva para pequenos negócios brasileiros criarem conteúdo e melhorarem o atendimento comercial com apoio de IA.

## Objetivo do produto
Ajudar o empreendedor a transformar informações do próprio negócio em materiais prontos para uso:
- Legendas comerciais para redes sociais.
- Calendário de publicações.
- Respostas para clientes.
- Roteiros de vídeos curtos.
- Ideias de campanhas, ofertas e ações de venda.
- Prompts e orientações práticos, sem exigir que o usuário saiba escrever prompts.

A experiência deve ser guiada: o usuário cadastra ou informa seu segmento, produtos/serviços, público e tom de comunicação; as ferramentas usam esse contexto para gerar resultados relevantes.

## Princípios
- Priorizar facilidade de uso no celular e português do Brasil.
- Resolver tarefas reais; não criar botões sem ação nem telas que finjam funcionalidades.
- Não apresentar conteúdo demonstrativo como resultado real.
- Explicar limites da IA e permitir revisão do conteúdo antes de copiar ou publicar.
- Proteger dados dos negócios e dos clientes, seguindo princípios da LGPD.
- Evitar integrações, dependências e serviços desnecessários.

## Arquitetura
- Preservar React, TypeScript, TanStack Start, Vite e a compatibilidade existente com Lovable.
- Não presumir que backend, autenticação, banco ou provedor de IA estejam configurados. Verificar a integração real antes de implementar.
- Não inventar SDKs, credenciais ou variáveis de ambiente. Nunca versionar segredos.
- Não adicionar outro backend ou banco sem decisão explícita e análise de compatibilidade.
- Manter componentes acessíveis, reutilizáveis e responsivos.

## Fluxo obrigatório de trabalho
1. **ChatGPT:** analisar o objetivo, planejar a alteração, definir arquivos e preparar a implementação.
2. **GitHub:** executar em branch de trabalho, revisar o diff, rodar lint/testes/build quando disponíveis e abrir Pull Request. Nunca alterar `main` diretamente.
3. **Lovable:** somente depois da revisão/aprovação e integração do PR, sincronizar a branch `main`, conferir o commit recebido e verificar visualmente a aplicação.
4. Ao orientar a etapa Lovable, sempre fornecer os comandos Git exatos e explicar em que terminal/local devem ser executados. Não pedir à IA do Lovable para reescrever código que já foi implementado e validado no GitHub.
5. Não mesclar PR sem aprovação explícita do usuário.

## Critério de conclusão
Uma funcionalidade só está pronta quando funciona de ponta a ponta, trata estados de carregamento/vazio/erro, protege os dados e possui testes adequados. Se uma integração ainda não estiver disponível, registrar o bloqueio em vez de simular funcionamento.
