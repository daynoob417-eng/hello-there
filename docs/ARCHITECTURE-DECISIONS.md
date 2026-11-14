# Decisões de arquitetura — Central de Orçamentos

**Status:** Lovable Cloud ativado no projeto (confirmação da usuária em 14/11/2026); primeira migração versionada no Git; aplicação no banco remoto e integração do app ainda pendentes.  
**Escopo:** backend, autenticação, banco, armazenamento e funções de servidor.

## Decisão

Utilizar **Lovable Cloud** como backend gerenciado do projeto. Não criar nem administrar uma instância Supabase separada e não adicionar outro provedor de backend.

**Transparência técnica:** Lovable Cloud utiliza tecnologia Supabase por trás da experiência gerenciada do Lovable. Portanto, a infraestrutura subjacente é baseada em Supabase, mas o usuário administra os recursos pelo Lovable Cloud, sem precisar criar uma conta/projeto Supabase separado. Não é correto prometer que não existe nenhuma tecnologia Supabase nos bastidores.

## Responsabilidades

| Responsabilidade | Solução |
|---|---|
| Interface e aplicação existente | React + TypeScript + Vite + TanStack |
| Backend gerenciado | Lovable Cloud |
| Banco de dados | Banco gerenciado pelo Lovable Cloud |
| Autenticação e sessões | Autenticação gerenciada pelo Lovable Cloud |
| Isolamento multiempresa | Políticas de Row Level Security (RLS), mais validações server-side |
| Fotos, logotipos e anexos | Armazenamento gerenciado pelo Lovable Cloud |
| Operações privilegiadas | Funções server-side/edge quando necessárias |
| Testes | Vitest e testes de integração/concorrência |

## Limites de configuração

- Ativar e configurar o backend a partir do projeto Lovable conectado.
- Usar somente as configurações e integrações geradas/indicadas pelo Lovable para este projeto.
- Não inventar endpoint, project ID, chaves, variáveis ou nomes de secrets.
- Nunca expor chaves administrativas/service-role ao navegador, em variáveis VITE_ ou no Git.
- Não adicionar Neon, Appwrite, Drizzle, Better Auth ou outro backend paralelo.
- Não migrar a hospedagem do frontend sem analisar a compatibilidade da base TanStack existente.

## Segurança multiempresa

- Cada registro empresarial deve possuir vínculo inequívoco com a empresa.
- Criar políticas RLS para leitura, inserção, atualização e exclusão, limitando os registros à empresa do usuário autenticado.
- Validar no servidor o usuário, a associação à empresa e o papel em operações privilegiadas.
- Não confiar em company_id enviado pelo navegador sem validar a associação.
- Cobrir com testes tentativas de acesso cruzado entre empresas.
- Tokens públicos de acompanhamento devem ser aleatórios, não previsíveis, limitados a um atendimento e armazenados como hash sempre que viável.
- Uploads devem validar tipo, tamanho, autorização e vínculo empresarial.

## Agendamento concorrente

A disponibilidade mostrada no navegador não garante uma reserva. A confirmação deve ocorrer no backend com proteção transacional e uma restrição/estratégia no banco que impeça intervalos sobrepostos para o mesmo técnico. Não considerar o requisito atendido até que testes concorrentes reproduzíveis comprovem que duas solicitações simultâneas não conseguem reservar o mesmo horário.

## Sequência de implantação

1. Confirmar que Lovable Cloud está ativado no projeto conectado.
2. Verificar quais recursos e configurações o Lovable criou, sem duplicá-los manualmente.
3. Modelar empresas, perfis, membros e papéis.
4. Criar tabelas, relacionamentos, índices e políticas RLS.
5. Implementar autenticação e validações server-side.
6. Testar isolamento entre empresas e permissões de arquivos.
7. Validar a estratégia de agendamento concorrente.
8. Só então conectar os módulos comerciais aos dados reais.

## Referências

- [Lovable — documentação](https://docs.lovable.dev/)
- [Lovable Cloud](https://docs.lovable.dev/features/cloud)
