# Instruções do projeto — Assistente de Conteúdo e Vendas com IA

## Produto

Construir um assistente digital para pequenos negócios que ajude a planejar conteúdo, criar legendas comerciais, sugerir respostas para clientes, elaborar roteiros de vídeos curtos e organizar ideias de campanhas.

O produto deve resolver tarefas reais com fluxos simples. Não deve ser apenas uma coleção de prompts, uma landing page estática ou uma demonstração que simula funcionalidades.

## Escopo inicial

- Perfil do negócio com segmento, produtos/serviços, público e tom de comunicação.
- Planejador de conteúdo e calendário de publicações.
- Geração de legendas comerciais.
- Sugestões de respostas para dúvidas e conversas com clientes.
- Roteiros de vídeos curtos.
- Ideias de campanhas e chamadas para ação.

O público inicial, a identidade da marca, o modelo de cobrança e os limites de uso ainda não foram definidos. Não assumir essas decisões.

## Arquitetura

- Preservar React, TypeScript, Vite, TanStack Start, Tailwind e a compatibilidade com Lovable.
- Não presumir que um backend ou projeto Lovable Cloud esteja conectado apenas porque o repositório está vinculado ao Lovable.
- Não escolher ou instalar provedor de IA, banco de dados, autenticação, pagamentos ou armazenamento sem avaliar os requisitos e registrar a decisão.
- Não inventar SDKs, credenciais, endpoints ou variáveis de ambiente.
- Nunca expor chaves privadas em código do navegador nem fazer commit de segredos.
- Reutilizar componentes de interface existentes quando forem adequados; remover dependências apenas após confirmar que não são usadas e que não serão necessárias no escopo aprovado.

## Segurança e qualidade

- Validar entradas e tratar erros do provedor de IA.
- Evitar expor dados de clientes ou informações comerciais além do necessário.
- Não usar dados fictícios como se fossem reais.
- Não exibir sucesso se uma operação não foi concluída.
- Deixar claros os limites de conteúdo gerado por IA e permitir revisão antes de reutilização.
- Planejar privacidade, retenção e exclusão de dados antes de armazenar informações pessoais.

## Fluxo obrigatório de trabalho

1. Analisar o repositório, a documentação e as integrações realmente disponíveis.
2. Registrar decisões de produto e arquitetura antes de implementar integrações.
3. Implementar em branch de funcionalidade; nunca enviar diretamente para `main`.
4. Rodar lint, testes e build; adicionar testes para novos fluxos.
5. Abrir Pull Request com escopo, validação e pendências.
6. Não mesclar sem aprovação explícita da pessoa responsável.
7. Não afirmar validação visual no Lovable sem tê-la realizado.

## Experiência

- Interface em português do Brasil.
- Mobile-first e responsiva.
- Linguagem simples, sem exigir que a pessoa saiba escrever prompts.
- Priorizar resultados práticos, editáveis, copiáveis e personalizados.
- Todos os botões e formulários devem executar ações reais ou estar claramente identificados como indisponíveis/em construção.

## Comunicação

Explicar decisões, riscos e bloqueios com clareza. Não pedir que a pessoa use créditos do Lovable para tarefas que podem ser feitas diretamente no GitHub.
