import { useState } from "react";
import {
  Activity,
  AirVent,
  Bell,
  CalendarDays,
  ClipboardList,
  Clock3,
  FileText,
  LayoutDashboard,
  Menu,
  Plus,
  Settings2,
  ShieldCheck,
  Users,
  Wallet,
  Wrench,
  X,
} from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: DashboardPage,
  head: () => ({
    meta: [
      { title: "Visão geral | Central de Orçamentos" },
      {
        name: "description",
        content:
          "Central de Orçamentos: gestão comercial, agendamentos e operação para empresas de climatização.",
      },
    ],
  }),
});

const navigation = [
  {
    title: "PRINCIPAL",
    items: [{ label: "Visão geral", icon: LayoutDashboard }],
  },
  {
    title: "GESTÃO COMERCIAL",
    items: [
      { label: "Clientes", icon: Users },
      { label: "Leads", icon: Activity },
      { label: "Serviços", icon: Wrench },
      { label: "Orçamentos", icon: FileText },
    ],
  },
  {
    title: "OPERAÇÃO",
    items: [
      { label: "Agenda", icon: CalendarDays },
      { label: "Atendimentos", icon: ClipboardList },
      { label: "Técnicos", icon: AirVent },
    ],
  },
  {
    title: "CONTROLE",
    items: [
      { label: "Financeiro", icon: Wallet },
      { label: "Relatórios", icon: Activity },
      { label: "Configurações", icon: Settings2 },
    ],
  },
];

const indicators = [
  { label: "Clientes cadastrados", icon: Users, tone: "blue" },
  { label: "Orçamentos em aberto", icon: FileText, tone: "cyan" },
  { label: "Serviços agendados", icon: CalendarDays, tone: "amber" },
  { label: "Recebido no período", icon: Wallet, tone: "green" },
];

function DashboardPage() {
  const [activeSection, setActiveSection] = useState("Visão geral");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const selectSection = (label: string) => {
    setActiveSection(label);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F3F6FB] text-[#172033]">
      {mobileMenuOpen && (
        <button
          aria-label="Fechar menu"
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[264px] flex-col bg-[#10243A] text-white transition-transform duration-200 lg:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-[76px] items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563EB] shadow-lg shadow-blue-950/30">
              <AirVent className="h-5 w-5" strokeWidth={2.2} />
            </div>
            <div>
              <p className="text-[15px] font-bold tracking-tight">Central de</p>
              <p className="text-[15px] font-bold tracking-tight text-cyan-300">Orçamentos</p>
            </div>
          </div>
          <button
            aria-label="Fechar navegação"
            className="rounded-lg p-2 text-slate-300 hover:bg-white/10 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="border-b border-white/10 px-5 py-5">
          <div className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.06] p-3 text-left">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/15 text-cyan-300">
              <Wrench className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">Sua empresa</p>
              <p className="text-xs text-slate-400">Configuração inicial pendente</p>
            </div>
            <span className="text-[10px] font-medium text-slate-400">EM CONFIGURAÇÃO</span>
          </div>
        </div>

        <nav className="flex-1 space-y-6 overflow-y-auto px-4 py-6">
          {navigation.map((group) => (
            <div key={group.title}>
              <p className="mb-2 px-3 text-[10px] font-bold tracking-[0.16em] text-slate-500">
                {group.title}
              </p>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = activeSection === item.label;
                  return (
                    <button
                      key={item.label}
                      onClick={() => selectSection(item.label)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] font-medium transition ${
                        active
                          ? "bg-[#2563EB] text-white shadow-md shadow-blue-950/20"
                          : "text-slate-300 hover:bg-white/[0.07] hover:text-white"
                      }`}
                    >
                      <Icon className="h-[17px] w-[17px]" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="rounded-xl bg-white/[0.06] p-3">
            <div className="mb-2 flex items-center gap-2 text-cyan-300">
              <ShieldCheck className="h-4 w-4" />
              <span className="text-xs font-semibold">Ambiente protegido</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-400">
              Os dados da empresa serão isolados por permissões e políticas de segurança.
            </p>
          </div>
          <p className="mt-4 text-center text-[10px] text-slate-500">CENTRAL DE ORÇAMENTOS · V1</p>
        </div>
      </aside>

      <div className="min-h-screen lg:pl-[264px]">
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 backdrop-blur md:px-8">
          <div className="flex items-center gap-3">
            <button
              aria-label="Abrir menu"
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <p className="text-xs font-medium text-slate-400">CENTRAL DE ORÇAMENTOS</p>
              <h1 className="text-lg font-bold tracking-tight text-[#10243A]">{activeSection}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 sm:flex">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              <span className="text-xs font-semibold text-amber-800">Configuração inicial</span>
            </div>
            <div
              aria-label="Notificações ainda não disponíveis"
              className="relative rounded-xl border border-slate-200 p-2.5 text-slate-400"
              title="Notificações serão ativadas em uma próxima fase"
            >
              <Bell className="h-[18px] w-[18px]" />
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#10243A] text-xs font-bold text-white">
              CO
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1440px] p-4 md:p-8">
          {activeSection === "Visão geral" ? (
            <DashboardOverview onOpenSection={selectSection} />
          ) : (
            <ModulePlaceholder section={activeSection} />
          )}
        </main>
      </div>
    </div>
  );
}

function DashboardOverview({ onOpenSection }: { onOpenSection: (section: string) => void }) {
  return (
    <div className="space-y-7">
      <section className="relative overflow-hidden rounded-2xl bg-[#10243A] px-6 py-7 text-white shadow-lg shadow-slate-900/5 md:px-8 md:py-8">
        <div className="pointer-events-none absolute -right-12 -top-24 h-72 w-72 rounded-full border-[42px] border-white/[0.035]" />
        <div className="pointer-events-none absolute -bottom-32 right-44 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="relative max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[11px] font-semibold text-cyan-200">
            <Activity className="h-3.5 w-3.5" />
            PAINEL DE GESTÃO
          </div>
          <h2 className="text-2xl font-bold tracking-tight md:text-[28px]">
            Sua operação, em um só lugar.
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-300">
            Organize clientes, propostas e atendimentos de climatização com uma visão clara de cada
            etapa do negócio.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={() => onOpenSection("Clientes")}
              className="inline-flex items-center gap-2 rounded-lg bg-[#2563EB] px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-950/20 transition hover:bg-blue-500"
            >
              <Plus className="h-4 w-4" />
              Começar pelos clientes
            </button>
            <button
              onClick={() => onOpenSection("Configurações")}
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Configurar empresa
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-[#10243A]">Indicadores da operação</h3>
            <p className="mt-1 text-xs text-slate-500">
              Os números aparecerão após a conexão do banco de dados.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-amber-700">
            <Clock3 className="h-3.5 w-3.5" />
            Aguardando integração
          </span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {indicators.map((item) => {
            const Icon = item.icon;
            const tone = {
              blue: "bg-blue-50 text-blue-600",
              cyan: "bg-cyan-50 text-cyan-700",
              amber: "bg-amber-50 text-amber-700",
              green: "bg-green-50 text-green-700",
            }[item.tone];
            return (
              <div
                key={item.label}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/[0.02]"
              >
                <div className="flex items-center justify-between">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone}`}>
                    <Icon className="h-[18px] w-[18px]" />
                  </div>
                  <span className="rounded-md bg-slate-50 px-2 py-1 text-[10px] font-semibold text-slate-400">
                    SEM DADOS
                  </span>
                </div>
                <p className="mt-4 text-[13px] font-medium text-slate-500">{item.label}</p>
                <p className="mt-1 text-2xl font-bold tracking-tight text-[#10243A]">—</p>
                <p className="mt-1 text-[11px] text-slate-400">Será calculado com dados reais</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/[0.02] md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#10243A]">Próximos compromissos</h3>
              <p className="mt-1 text-xs text-slate-500">Agenda da empresa</p>
            </div>
            <button
              onClick={() => onOpenSection("Agenda")}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              Abrir agenda
            </button>
          </div>
          <div className="mt-6 flex min-h-[170px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/70 px-5 text-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm">
              <CalendarDays className="h-5 w-5" />
            </div>
            <p className="mt-3 text-sm font-semibold text-slate-700">
              Nenhum compromisso disponível
            </p>
            <p className="mt-1 max-w-sm text-xs leading-relaxed text-slate-500">
              Os agendamentos serão exibidos aqui assim que a agenda estiver conectada e
              configurada.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/[0.02] md:p-6">
          <h3 className="text-base font-bold text-[#10243A]">Etapas da implantação</h3>
          <p className="mt-1 text-xs text-slate-500">Fundação do sistema</p>
          <div className="mt-5 space-y-4">
            {[
              ["Estrutura do projeto", "Em preparação", "current"],
              ["Banco de dados e autenticação", "Pendente", "pending"],
              ["Clientes e gestão comercial", "Pendente", "pending"],
              ["Agenda e operação técnica", "Pendente", "pending"],
            ].map(([label, status, state]) => (
              <div key={label} className="flex items-center gap-3">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    state === "current"
                      ? "bg-blue-50 text-blue-600"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {state === "current" ? (
                    <Activity className="h-4 w-4" />
                  ) : (
                    <Clock3 className="h-4 w-4" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-slate-700">{label}</p>
                  <p className="text-[11px] text-slate-400">{status}</p>
                </div>
                <span
                  className={`h-2 w-2 rounded-full ${
                    state === "current" ? "bg-blue-500" : "bg-slate-300"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-3 rounded-xl border border-blue-100 bg-blue-50/70 p-4 sm:flex-row sm:items-center">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-[#10243A]">
            Seus dados ainda não estão conectados
          </p>
          <p className="mt-1 text-xs leading-relaxed text-slate-600">
            Este painel é a base visual inicial. Nenhum dado comercial ou financeiro está sendo
            inventado ou armazenado localmente. A próxima etapa é configurar autenticação,
            banco de dados e isolamento por empresa.
          </p>
        </div>
      </div>
    </div>
  );
}

function ModulePlaceholder({ section }: { section: string }) {
  const descriptions: Record<string, string> = {
    Clientes: "Cadastro, contatos e histórico de cada cliente.",
    Leads: "Acompanhe oportunidades desde o primeiro contato até o fechamento.",
    Serviços: "Configure o catálogo de instalação e manutenção.",
    Orçamentos: "Monte propostas comerciais, calcule valores e gere PDFs.",
    Agenda: "Visualize horários, disponibilidade e compromissos.",
    Atendimentos: "Acompanhe a execução dos serviços em campo.",
    Técnicos: "Gerencie profissionais, especialidades e atribuições.",
    Financeiro: "Registre pagamentos, despesas e valores pendentes.",
    Relatórios: "Analise resultados comerciais e operacionais.",
    Configurações: "Configure os dados, horários e regras da empresa.",
  };

  return (
    <section className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm md:p-10">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
        <Wrench className="h-6 w-6" />
      </div>
      <p className="mt-5 text-[11px] font-bold tracking-[0.16em] text-blue-600">MÓDULO PLANEJADO</p>
      <h2 className="mt-2 text-xl font-bold text-[#10243A]">{section}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-500">
        {descriptions[section] ?? "Este módulo faz parte da Central de Orçamentos."}
      </p>
      <div className="mt-6 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4">
        <p className="text-xs font-semibold text-slate-600">Implementação ainda não iniciada</p>
        <p className="mt-1 text-xs text-slate-400">
          Esta área será ativada quando suas regras, banco de dados e permissões estiverem
          implementados e testados.
        </p>
      </div>
    </section>
  );
}
