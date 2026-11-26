# Assistente de Conteúdo e Vendas com IA

Plataforma em desenvolvimento para ajudar pequenos negócios brasileiros a planejar publicações, criar legendas comerciais, responder clientes e produzir roteiros de vídeos curtos.

## Proposta
O produto deve simplificar tarefas de conteúdo e vendas. A pessoa informa o contexto do negócio uma vez e recebe sugestões adaptadas ao segmento, aos produtos ou serviços, ao público e ao tom de comunicação.

## Funcionalidades planejadas
- Perfil e contexto do negócio.
- Gerador de legendas comerciais.
- Calendário de conteúdo.
- Assistente de respostas para clientes.
- Roteiros para vídeos curtos.
- Ideias de campanhas e ações de venda.
- Histórico e organização dos materiais gerados.

## Estado atual
Esta é a base técnica limpa para iniciar o novo produto. As funcionalidades de IA, persistência, autenticação e integrações ainda precisam ser planejadas e implementadas. Não considerar telas demonstrativas como funcionalidades prontas.

## Stack preservada
- React + TypeScript
- TanStack Start
- Vite
- Tailwind CSS
- Componentes Radix/Shadcn existentes
- Vitest
- Integração compatível com Lovable

## Fluxo de desenvolvimento
O fluxo obrigatório é **ChatGPT → GitHub → Lovable**:
1. Planejamento e especificação no ChatGPT.
2. Implementação em branch, revisão, testes e Pull Request no GitHub.
3. Após aprovação e merge, sincronização e verificação visual no Lovable.

Nunca fazer alterações diretamente na branch `main`. Nunca mesclar um Pull Request sem aprovação explícita.

## Desenvolvimento local
```bash
npm install
npm run dev
```

## Validação
```bash
npm run lint
npm test
npm run build
```
