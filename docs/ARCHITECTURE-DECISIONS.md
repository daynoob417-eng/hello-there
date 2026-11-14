# Decisões de arquitetura — Central de Orçamentos

**Status:** adotada para orientar a implementação.  
**Escopo:** backend, autenticação, banco, armazenamento e execução da aplicação.

## Decisão

A aplicação não utilizará Supabase nem o backend gerenciado do Lovable. Para simplificar a configuração, o backend será centralizado no Appwrite Cloud. A base atual React + TanStack Start será preservada.

| Responsabilidade | Tecnologia escolhida |
|---|---|
| Interface e servidor full-stack | React, TypeScript, TanStack Start |
| Backend gerenciado | Appwrite Cloud |
| Autenticação e sessões | Appwrite Auth |
| Banco estruturado | Appwrite TablesDB |
| Permissões e multiempresa | Appwrite Teams + permissões por tabela/linha/arquivo |
| Arquivos, fotos e logotipos | Appwrite Storage |
| Funções de backend | TanStack Start server functions e Appwrite Functions quando necessário |
| Runtime atual da aplicação | Cloudflare Workers |
| Testes | Vitest |

## Por que esta combinação

1. Um único projeto Appwrite reúne autenticação, banco, permissões, arquivos e funções, reduzindo a quantidade de serviços e contas que precisam ser configurados.
2. TablesDB oferece tabelas estruturadas, relacionamentos, índices, consultas e transações para os dados comerciais.
3. Appwrite Auth integra usuários e sessões com Teams e permissões, facilitando a separação de empresas.
4. A base TanStack Start existente será preservada para evitar uma migração desnecessária de framework.
5. O Appwrite Cloud oferece um plano gratuito para iniciar; limites e condições devem ser conferidos antes de colocar o produto em produção.
6. O armazenamento de fotos, logotipos e anexos fica no Appwrite Storage, sem colocar arquivos binários nas tabelas.

## Consequência para o Lovable

O Lovable continuará sendo utilizado para editar a interface e sincronizar o código com o GitHub. Não habilitar Lovable Cloud nem utilizar seu backend gerenciado neste projeto. O backend será Appwrite Cloud.

A aplicação continuará no runtime Cloudflare Workers já presente no projeto, salvo decisão posterior documentada. Appwrite endpoint e project ID podem ser configuração do cliente; chaves administrativas e segredos ficam exclusivamente no servidor.

## Regras de segurança obrigatórias

- Appwrite Auth gerencia credenciais e sessões; autorização de negócio permanece no servidor.
- Cada operação privada valida a sessão e a associação do usuário à empresa/equipe.
- Toda tabela empresarial contém identificador de empresa e relacionamentos coerentes.
- Permissões de tabelas/linhas e arquivos devem restringir o acesso à equipe correta.
- Nunca confiar em company_id/team_id enviado pelo navegador sem validação da associação.
- Segredos e API keys administrativas não podem ter prefixo VITE_, entrar no Git ou ser enviados ao cliente.
- Tokens de acompanhamento público devem ser imprevisíveis, armazenados como hash e limitados a um único atendimento.
- Reservas precisam de operação transacional e proteção contra sobreposição, inclusive em requisições concorrentes. A estratégia concreta do Appwrite deverá ser comprovada por testes de concorrência antes de habilitar reservas reais.
- Uploads devem validar tipo, tamanho, autorização e vínculo empresarial.

## Agendamento concorrente

A disponibilidade mostrada no navegador não garante uma reserva. A confirmação deverá ocorrer exclusivamente no servidor, dentro de uma operação transacional, com uma estratégia de serialização/controle de conflito que impeça duas requisições simultâneas de confirmar intervalos sobrepostos para o mesmo técnico. Não considerar o requisito atendido até que testes concorrentes reproduzíveis comprovem o comportamento. Se TablesDB não oferecer garantia suficiente para o modelo necessário, reavaliar o uso de PostgreSQL gerenciado no próprio Appwrite antes de implementar reservas em produção.

## Estratégia de configuração

- Documentar a estrutura TablesDB, atributos, relações, índices e permissões.
- Versionar scripts/configuração de provisionamento no repositório.
- Aplicar mudanças de schema de forma revisável e repetível entre ambientes.
- Nunca executar alterações administrativas a partir do navegador.
- Não criar dependências de migrations de Supabase, Neon ou Drizzle.

## Sequência de implantação

1. Criar projeto Appwrite Cloud.
2. Configurar autenticação e sessões.
3. Criar tabelas, relações e permissões de empresa/equipe.
4. Implementar server functions e validação de associação à empresa.
5. Testar isolamento entre empresas e proteção de arquivos.
6. Validar estratégia transacional e concorrência do agendamento.
7. Somente então iniciar CRUD comercial e módulos seguintes.

## Referências técnicas

- [Appwrite — documentação geral](https://appwrite.io/docs)
- [Appwrite — autenticação](https://appwrite.io/docs/advanced/security/authentication)
- [Appwrite — TablesDB e bancos de dados](https://appwrite.io/docs/products/databases)
- [Appwrite — preços e plano gratuito](https://appwrite.io/pricing)
