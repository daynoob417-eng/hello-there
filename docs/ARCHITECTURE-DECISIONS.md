# Decisões de arquitetura — Central de Orçamentos

**Status:** adotada para orientar a implementação.  
**Escopo:** backend, autenticação, banco, armazenamento e execução da aplicação.

## Decisão

A aplicação não utilizará Supabase nem o backend gerenciado do Lovable. A base atual React + TanStack Start será preservada e executada como aplicação full-stack no servidor, com PostgreSQL externo.

| Responsabilidade | Tecnologia escolhida |
|---|---|
| Interface e servidor full-stack | React, TypeScript, TanStack Start |
| Banco relacional | Neon PostgreSQL |
| ORM e migrations | Drizzle ORM + Drizzle Kit |
| Autenticação e sessões | Better Auth |
| Runtime e hospedagem da aplicação | Cloudflare Workers |
| Conexão Worker–PostgreSQL | Cloudflare Hyperdrive |
| Arquivos, fotos e logotipos | Cloudflare R2 |
| Testes | Vitest |

## Por que esta combinação

1. O projeto já utiliza TanStack Start e sua configuração atual foi preparada para execução server-side. Preservar essa base evita uma migração desnecessária de framework.
2. PostgreSQL atende aos relacionamentos, transações, constraints e políticas de segurança exigidos por um SaaS multiempresa.
3. Drizzle fornece schema tipado e migrations versionadas, sem amarrar o banco a um provedor de autenticação.
4. Better Auth oferece autenticação própria com integração Drizzle/PostgreSQL.
5. Cloudflare documenta a execução de TanStack Start em Workers e recomenda Hyperdrive para conectar Workers a bancos PostgreSQL como Neon.
6. Cloudflare R2 poderá armazenar fotos de atendimentos, logotipos e anexos sem colocar arquivos binários no banco.

## Consequência para o Lovable

O Lovable continuará sendo utilizado para editar a interface e sincronizar o código com o GitHub. Não habilitar Lovable Cloud nem utilizar seu backend gerenciado neste projeto. A aplicação será implantada no Cloudflare Workers; o PostgreSQL ficará no Neon.

A configuração de hospedagem, variáveis secretas, banco e Hyperdrive será feita nos respectivos ambientes de infraestrutura, não no navegador e não por meio de um backend gerenciado pelo editor.

## Regras de segurança obrigatórias

- Better Auth gerencia credenciais e sessões; a autorização de negócio permanece no servidor.
- Cada operação privada valida a sessão e a associação do usuário à empresa.
- Toda tabela empresarial contém escopo de empresa e chaves estrangeiras coerentes.
- PostgreSQL RLS deve estar habilitada e forçada nas tabelas multiempresa.
- O contexto de empresa deve ser definido dentro da transação corrente; a role da aplicação não pode ignorar RLS.
- Segredos não podem ter prefixo `VITE_`, entrar no Git ou ser enviados ao cliente.
- Tokens de acompanhamento público devem ser imprevisíveis, armazenados como hash e limitados a um único atendimento.
- Reservas precisam de transação e restrição de não sobreposição no banco. A consulta de disponibilidade no navegador não garante a reserva.
- Uploads devem validar tipo, tamanho, autorização e vínculo empresarial.

## Agendamento concorrente

A implementação deverá reservar o intervalo de forma atômica no PostgreSQL. Para técnicos individuais, avaliar uma constraint de exclusão GiST sobre o intervalo de tempo, com `btree_gist` quando necessário, ou mecanismo transacional equivalente. Estados cancelados não devem bloquear a agenda. O algoritmo final será validado com testes concorrentes reais.

## Estratégia de migrations

- Schema de aplicação em `src/db/schema`.
- Configuração Drizzle Kit no repositório.
- Migrations SQL versionadas e revisadas.
- Aplicação controlada em desenvolvimento e produção.
- Nunca executar alterações de schema a partir do navegador.
- Não criar pasta ou dependência de migrations de outro provedor.

## Sequência de implantação

1. Criar banco PostgreSQL no Neon.
2. Configurar Cloudflare Worker e Hyperdrive sem expor credenciais.
3. Implementar schema Drizzle e migrations da fundação.
4. Configurar Better Auth e testar sessão.
5. Implementar empresas, membros, papéis e RLS.
6. Testar isolamento entre empresas.
7. Somente então iniciar CRUD comercial e módulos seguintes.

## Referências técnicas

- [Cloudflare Workers — Neon PostgreSQL e Hyperdrive](https://developers.cloudflare.com/workers/databases/third-party-integrations/neon/)
- [Cloudflare Workers — TanStack Start](https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/)
- [Drizzle ORM — Neon PostgreSQL](https://orm.drizzle.team/docs/connect-neon)
- [Better Auth — Instalação e adaptador Drizzle](https://better-auth.com/docs/installation)
- [Better Auth — integração TanStack Start](https://www.better-auth.com/docs/integrations/tanstack)
