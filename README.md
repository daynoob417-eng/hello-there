# Assistente de Conteúdo e Vendas com IA

Projeto em desenvolvimento para ajudar pequenos negócios a planejar conteúdo, divulgar produtos e serviços e responder clientes com mais praticidade.

## Objetivo do produto

Transformar tarefas comuns de divulgação e atendimento em fluxos simples, guiados e adaptados às informações de cada negócio. A proposta inicial inclui:

- **Perfil do negócio:** segmento, produtos/serviços, público, diferenciais e tom de comunicação.
- **Planejador de conteúdo:** ideias e calendário de publicações.
- **Criador de legendas:** textos comerciais com chamadas para ação.
- **Respostas para clientes:** sugestões para dúvidas, atendimento e acompanhamento de interessados.
- **Roteiros de vídeos curtos:** ideias e roteiros para Reels, TikTok e Stories.
- **Ideias de campanhas:** sugestões de divulgação e ações comerciais.

O público inicial, a marca, o modelo de cobrança e o provedor de IA ainda precisam ser validados. Não assumir decisões que ainda não foram aprovadas.

## Estado atual

A aplicação está em fase de preparação da base. A página demonstrativa e os documentos do projeto anterior foram retirados/substituídos. Ainda não existe integração de IA, autenticação, cobrança ou persistência de dados confirmada.

Não apresentar conteúdo de demonstração como resultado gerado por IA, nem simular salvamento, envio ou pagamento.

## Arquitetura atual

- React + TypeScript.
- Vite + TanStack Start.
- Tailwind CSS v4 e componentes de interface reutilizáveis.
- Configuração compatível com Lovable mantida.
- O backend, o armazenamento e o provedor de IA serão definidos após a validação dos requisitos e a verificação das integrações disponíveis.

Não adicionar serviços, SDKs, credenciais ou variáveis de ambiente por suposição. Nunca colocar chaves privadas no frontend ou no repositório.

## Experiência do produto

- Interface em português do Brasil.
- Prioridade para uso em celular.
- Fluxos guiados para pessoas sem conhecimento de marketing ou engenharia de prompts.
- Resultados fáceis de revisar, copiar e reutilizar.
- Personalização com base no perfil do negócio.
- Estados claros de carregamento, vazio, sucesso e erro.

## Desenvolvimento e validação

- Trabalhar em branches de funcionalidade; nunca fazer alterações diretamente em `main`.
- Analisar a arquitetura antes de introduzir dependências ou integrações.
- Validar com lint, testes e build sempre que houver mudanças.
- Abrir Pull Request com escopo, testes e pendências.
- Não mesclar Pull Requests sem aprovação explícita da pessoa responsável pelo projeto.
- Não afirmar que a interface foi testada no Lovable sem realizar essa verificação.

## Documentação

A visão inicial, os limites do MVP e as decisões ainda pendentes estão em [docs/assistente-conteudo-vendas.md](docs/assistente-conteudo-vendas.md).

## Comandos

```bash
npm install
npm run dev
npm run lint
npm test
npm run build
```
