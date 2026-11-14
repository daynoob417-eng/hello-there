# Central de Orçamentos

Plataforma SaaS de gestão comercial, agendamento e operação para técnicos e pequenas empresas brasileiras de instalação e manutenção de ar-condicionado.

## Objetivo

Centralizar clientes, leads, catálogo de serviços, orçamentos, agenda, equipe técnica, execução de atendimentos, pagamentos e relatórios em três ambientes integrados: empresário, técnico e cliente.

## Stack do produto

- React + TypeScript + Vite
- TanStack Start / TanStack Router (base existente; compatibilidade com o fluxo de build e sincronização do Lovable deve ser validada)
- Tailwind CSS + shadcn/ui
- **Lovable Cloud** para backend gerenciado: banco de dados, autenticação, armazenamento e funções de servidor quando necessárias
- Vitest para testes

O backend será gerenciado pelo Lovable Cloud dentro do projeto conectado. **Nota transparente:** Lovable Cloud utiliza tecnologia Supabase nos bastidores, mas não exige que o usuário configure ou administre um projeto Supabase separado. Não criar um segundo backend nem configurar Neon ou Appwrite.

A hospedagem do frontend permanece uma decisão separada e não será alterada sem validação de compatibilidade.

## Estado do desenvolvimento

O projeto está no início da Fase 1 (Fundação), conforme o Prompt Mestre.

- [x] Criar a primeira estrutura visual do produto.
- [x] Aplicar nome, idioma e metadados da Central de Orçamentos.
- [x] Criar navegação inicial responsiva para os módulos previstos.
- [x] Remover os arquivos de migração legados da pasta Supabase.
- [x] Definir Lovable Cloud como backend gerenciado escolhido.
- [ ] Verificar a ativação e os recursos do Lovable Cloud no projeto conectado.
- [x] Versionar a migração inicial para perfis, empresas, membros e núcleo comercial.
- [ ] Aplicar a migração ao banco Lovable Cloud por mecanismo autorizado, após inspeção dos recursos existentes.
- [ ] Integrar o frontend à autenticação e aos dados persistidos.
- [ ] Testar isolamento entre empresas com usuários reais.
- [ ] Validar operações transacionais e concorrência do agendamento.
- [ ] Conectar os módulos a dados persistidos e validar os fluxos.

## Importante

A interface inicial não representa uma aplicação pronta. Indicadores e listas não devem apresentar dados fictícios como dados reais. Recursos ainda não implementados devem permanecer identificados como pendentes.

A migração versionada e os testes PostgreSQL executados no CI validam o código e o comportamento básico de RLS em um banco descartável. Eles **não comprovam** que a migração foi aplicada ao Lovable Cloud real nem substituem testes com sessões e usuários reais no projeto conectado.

Nenhuma credencial ou chave administrativa pode ser versionada ou exposta ao navegador.

## Executar localmente

```bash
npm install
npm run dev
```

## Qualidade

Antes de considerar qualquer módulo concluído, validar persistência, autorização em cada endpoint/server function, permissões por empresa, estados de carregamento e erro, responsividade e testes funcionais.
