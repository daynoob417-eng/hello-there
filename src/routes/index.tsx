import { useState, type FormEvent } from "react";
import {
  ArrowDown,
  ArrowRight,
  Check,
  CheckCircle2,
  ClipboardCheck,
  HeartHandshake,
  Leaf,
  Menu,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => ({
    meta: [
      { title: "Negócio em Ordem | Mais organização para o seu negócio" },
      {
        name: "description",
        content:
          "Organize clientes, vendas, tarefas e dinheiro em um só lugar. Conheça o Negócio em Ordem.",
      },
    ],
  }),
});

const features = [
  {
    icon: Users,
    number: "01",
    title: "Clientes por perto",
    description:
      "Guarde contatos, registre conversas e acompanhe quem precisa de um retorno. Nenhuma oportunidade fica esquecida.",
    tone: "mint",
  },
  {
    icon: TrendingUp,
    number: "02",
    title: "Vendas acompanhadas",
    description:
      "Visualize suas oportunidades, saiba em que etapa cada negociação está e organize seus próximos passos.",
    tone: "blue",
  },
  {
    icon: ClipboardCheck,
    number: "03",
    title: "Tarefas em dia",
    description:
      "Monte sua lista de atividades, defina prioridades e tenha clareza sobre o que precisa acontecer hoje.",
    tone: "yellow",
  },
  {
    icon: Wallet,
    number: "04",
    title: "Dinheiro sob controle",
    description:
      "Registre entradas e despesas para enxergar melhor o movimento do negócio e tomar decisões com mais segurança.",
    tone: "purple",
  },
];

const steps = [
  ["Organize", "Cadastre clientes, tarefas e informações importantes."],
  ["Acompanhe", "Veja o que está pendente e quais oportunidades precisam de atenção."],
  ["Evolua", "Use uma visão mais clara da rotina para planejar os próximos passos."],
];

function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[#F8FAF7] text-[#18352B]">
      <header className="relative z-30 border-b border-[#E6EDE7] bg-[#F8FAF7]/95 backdrop-blur">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8">
          <a
            href="#inicio"
            className="flex items-center gap-3"
            aria-label="Negócio em Ordem, início"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#176B4B] text-white shadow-lg shadow-[#176B4B]/15">
              <Leaf className="h-5 w-5" />
            </span>
            <span className="text-[17px] font-extrabold tracking-tight text-[#18352B]">
              Negócio <span className="text-[#23845C]">em Ordem</span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-[#587066] md:flex">
            <a className="transition hover:text-[#176B4B]" href="#beneficios">
              Benefícios
            </a>
            <a className="transition hover:text-[#176B4B]" href="#funcionalidades">
              Funcionalidades
            </a>
            <a className="transition hover:text-[#176B4B]" href="#como-funciona">
              Como funciona
            </a>
            <a className="transition hover:text-[#176B4B]" href="#planos">
              Plano exemplo
            </a>
          </nav>

          <a
            href="#interesse"
            className="hidden items-center gap-2 rounded-full bg-[#176B4B] px-5 py-3 text-sm font-bold text-white shadow-md shadow-[#176B4B]/15 transition hover:-translate-y-0.5 hover:bg-[#12583D] md:inline-flex"
          >
            Quero conhecer <ArrowRight className="h-4 w-4" />
          </a>

          <button
            type="button"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            className="rounded-xl border border-[#DCE7DE] p-2.5 text-[#176B4B] md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <nav className="absolute left-0 right-0 top-full border-b border-[#E6EDE7] bg-[#F8FAF7] px-5 py-5 shadow-lg md:hidden">
            {[
              ["Benefícios", "#beneficios"],
              ["Funcionalidades", "#funcionalidades"],
              ["Como funciona", "#como-funciona"],
              ["Plano exemplo", "#planos"],
              ["Quero conhecer", "#interesse"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={closeMenu}
                className="block border-b border-[#E6EDE7] py-3 text-sm font-semibold text-[#35594A] last:border-0"
              >
                {label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main>
        <section id="inicio" className="relative">
          <div className="pointer-events-none absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-[#DDF1E3] blur-3xl opacity-70" />
          <div className="pointer-events-none absolute -left-48 bottom-0 h-[360px] w-[360px] rounded-full bg-[#E7F1E9] blur-3xl" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-16 sm:px-8 sm:pt-24 lg:grid-cols-[1fr_0.95fr] lg:gap-16 lg:pb-28 lg:pt-24">
            <div className="max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D5E9D9] bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#28734F] shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Organização simples para o dia a dia
              </div>
              <h1 className="text-[42px] font-extrabold leading-[1.08] tracking-[-0.045em] text-[#18352B] sm:text-5xl lg:text-[62px]">
                Seu negócio merece funcionar com{" "}
                <span className="text-[#23845C]">mais organização.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#60766B] sm:text-xl">
                Organize clientes, vendas, tarefas e dinheiro em um só lugar. Tenha mais clareza
                para cuidar do que faz seu negócio crescer.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#funcionalidades"
                  className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#176B4B] px-7 text-sm font-bold text-white shadow-xl shadow-[#176B4B]/20 transition hover:-translate-y-1 hover:bg-[#12583D]"
                >
                  Conheça a ferramenta <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#como-funciona"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-[#D6E3D9] bg-white/80 px-7 text-sm font-bold text-[#315C47] transition hover:bg-white"
                >
                  Como funciona <ArrowDown className="h-4 w-4" />
                </a>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-semibold text-[#6B8075]">
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#23845C]" /> Fácil de entender
                </span>
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#23845C]" /> Feito para pequenos negócios
                </span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[570px]">
              <div className="absolute -inset-5 rounded-[36px] bg-gradient-to-br from-[#D9EFDF] via-[#EAF4E9] to-[#DDEBE4] blur-xl" />
              <div className="relative rounded-[28px] border border-white bg-white p-4 shadow-[0_30px_90px_-35px_rgba(24,75,49,0.35)] sm:p-6">
                <div className="flex items-center justify-between border-b border-[#EDF1ED] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E7F4EA] text-[#23845C]">
                      <Leaf className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-extrabold text-[#18352B]">Visão do negócio</p>
                      <p className="text-[11px] text-[#91A198]">Um exemplo de organização</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-[#FFF4D9] px-3 py-1.5 text-[9px] font-extrabold tracking-wider text-[#9A6A13]">
                    DEMONSTRAÇÃO
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 py-5">
                  <div className="rounded-2xl bg-[#F4F8F4] p-4">
                    <div className="flex items-center justify-between text-[#6F8577]">
                      <span className="text-[11px] font-semibold">Clientes</span>
                      <Users className="h-4 w-4" />
                    </div>
                    <p className="mt-3 text-3xl font-extrabold tracking-tight text-[#18352B]">28</p>
                    <p className="mt-1 text-[10px] text-[#91A198]">cadastros de exemplo</p>
                  </div>
                  <div className="rounded-2xl bg-[#F1F7F9] p-4">
                    <div className="flex items-center justify-between text-[#6C8790]">
                      <span className="text-[11px] font-semibold">Vendas</span>
                      <TrendingUp className="h-4 w-4" />
                    </div>
                    <p className="mt-3 text-3xl font-extrabold tracking-tight text-[#18352B]">12</p>
                    <p className="mt-1 text-[10px] text-[#91A198]">oportunidades fictícias</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-[#EAF0EA] p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-extrabold text-[#294A38]">Tarefas da semana</p>
                      <p className="mt-1 text-[10px] text-[#91A198]">Exemplo de acompanhamento</p>
                    </div>
                    <span className="rounded-lg bg-[#EAF5EC] px-2.5 py-1.5 text-[10px] font-bold text-[#28734F]">
                      3 de 5
                    </span>
                  </div>
                  <div className="space-y-3">
                    {[
                      ["Retornar para novos clientes", true],
                      ["Enviar proposta comercial", true],
                      ["Conferir despesas da semana", true],
                      ["Atualizar lista de contatos", false],
                      ["Planejar próximas entregas", false],
                    ].map(([label, done]) => (
                      <div key={String(label)} className="flex items-center gap-3">
                        <span
                          className={`flex h-5 w-5 items-center justify-center rounded-md ${done ? "bg-[#23845C] text-white" : "border border-[#D7E3D9] bg-white"}`}
                        >
                          {done ? <Check className="h-3 w-3" /> : null}
                        </span>
                        <span
                          className={`text-[11px] ${done ? "text-[#91A198] line-through" : "font-semibold text-[#526B5C]"}`}
                        >
                          {String(label)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between rounded-2xl bg-[#176B4B] px-4 py-3.5 text-white">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
                      <Wallet className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-medium text-white/70">
                        Movimento financeiro ilustrativo
                      </p>
                      <p className="text-sm font-extrabold">R$ 4.850,00</p>
                    </div>
                  </div>
                  <TrendingUp className="h-5 w-5 text-[#BDE8C8]" />
                </div>
                <p className="mt-3 text-center text-[9px] leading-relaxed text-[#9AA9A0]">
                  Tela ilustrativa. Os números acima são fictícios e não representam dados reais.
                </p>
              </div>
              <div className="absolute -bottom-6 -left-5 hidden items-center gap-3 rounded-2xl border border-[#E6EFE7] bg-white p-4 shadow-xl sm:flex">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F5EA] text-[#23845C]">
                  <CheckCircle2 className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-extrabold text-[#294A38]">Tudo mais claro</p>
                  <p className="mt-0.5 text-[10px] text-[#91A198]">Sua rotina em um só lugar</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="beneficios" className="border-y border-[#E8EFE8] bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#23845C]">
                Menos correria, mais clareza
              </p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#18352B] sm:text-4xl">
                Chega de tentar lembrar de tudo.
              </h2>
              <p className="mt-4 text-base leading-7 text-[#6B8075]">
                Quando as informações ficam espalhadas, tarefas se perdem e oportunidades passam.
                Uma rotina organizada ajuda você a enxergar o que merece atenção.
              </p>
            </div>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {[
                [
                  "Menos esquecimentos",
                  "Tenha uma lista clara do que precisa ser feito e de quem está esperando uma resposta.",
                  "01",
                ],
                [
                  "Mais controle",
                  "Acompanhe clientes, atividades e movimentações sem depender apenas da memória.",
                  "02",
                ],
                [
                  "Mais oportunidades",
                  "Dê atenção aos contatos e negociações que podem avançar.",
                  "03",
                ],
              ].map(([title, description, number]) => (
                <article
                  key={number}
                  className="rounded-3xl border border-[#E7EEE7] bg-[#FBFDFB] p-7 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-[#315C47]/5"
                >
                  <span className="text-xs font-extrabold tracking-widest text-[#8BB69A]">
                    {number}
                  </span>
                  <h3 className="mt-5 text-xl font-extrabold text-[#294A38]">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#718479]">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="funcionalidades" className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#23845C]">
                  Tudo conectado à sua rotina
                </p>
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#18352B] sm:text-4xl">
                  O essencial para colocar seu negócio em ordem.
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-7 text-[#718479]">
                Uma proposta simples, pensada para quem precisa cuidar de muitas coisas ao mesmo
                tempo.
              </p>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {features.map((feature) => {
                const Icon = feature.icon;
                const backgrounds: Record<string, string> = {
                  mint: "bg-[#E8F5EA] text-[#23845C]",
                  blue: "bg-[#EAF2F8] text-[#477D9B]",
                  yellow: "bg-[#FBF2D9] text-[#A77A25]",
                  purple: "bg-[#F0EBF8] text-[#8064A6]",
                };
                return (
                  <article
                    key={feature.number}
                    className="group rounded-3xl border border-[#E4ECE5] bg-white p-7 shadow-[0_10px_35px_-28px_rgba(24,75,49,0.25)] transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#315C47]/5 sm:p-8"
                  >
                    <div className="flex items-start justify-between">
                      <span
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${backgrounds[feature.tone]}`}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="text-xs font-extrabold tracking-widest text-[#B4C4B8]">
                        {feature.number}
                      </span>
                    </div>
                    <h3 className="mt-7 text-xl font-extrabold text-[#294A38]">{feature.title}</h3>
                    <p className="mt-3 max-w-md text-sm leading-7 text-[#718479]">
                      {feature.description}
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-[#23845C]">
                      Feito para facilitar{" "}
                      <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="como-funciona" className="bg-[#173F30] py-16 text-white sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#A9D9B5]">
                Simples desde o começo
              </p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Uma rotina mais leve começa com pequenos passos.
              </h2>
              <p className="mt-5 text-sm leading-7 text-[#C1D8C8]">
                A ideia é reunir o que importa e deixar mais fácil entender o que está acontecendo
                no seu negócio.
              </p>
              <a
                href="#interesse"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#C6E8CC] px-6 py-3.5 text-sm font-extrabold text-[#17452F] transition hover:bg-white"
              >
                Quero conhecer <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="space-y-4">
              {steps.map(([title, description], index) => (
                <div
                  key={title}
                  className="flex gap-5 rounded-2xl border border-white/10 bg-white/[0.06] p-5 sm:p-6"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#C6E8CC] text-sm font-extrabold text-[#17452F]">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-extrabold">{title}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-[#C1D8C8]">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="planos" className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mx-auto max-w-xl text-center">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#23845C]">
                Um exemplo de plano
              </p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#18352B] sm:text-4xl">
                Organização que cabe na rotina.
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#718479]">
                Veja como uma oferta simples poderia ser apresentada. O preço abaixo é apenas
                ilustrativo.
              </p>
            </div>
            <div className="mx-auto mt-10 max-w-md rounded-[28px] border border-[#D9E8DC] bg-white p-8 shadow-[0_25px_70px_-35px_rgba(24,75,49,0.3)]">
              <div className="flex items-center justify-between">
                <span className="text-sm font-extrabold text-[#294A38]">Plano Essencial</span>
                <span className="rounded-full bg-[#FFF3D7] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#91671C]">
                  Preço exemplo
                </span>
              </div>
              <div className="mt-6 flex items-end gap-2">
                <span className="text-sm font-bold text-[#6F8577]">R$</span>
                <span className="text-5xl font-extrabold tracking-tight text-[#18352B]">29,90</span>
                <span className="pb-1 text-sm text-[#91A198]">/ mês</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-[#718479]">
                Uma proposta inicial para organizar as principais áreas do pequeno negócio.
              </p>
              <div className="my-7 h-px bg-[#EAF0EA]" />
              <ul className="space-y-4">
                {[
                  "Organização de clientes",
                  "Acompanhamento de vendas",
                  "Lista de tarefas",
                  "Controle básico de entradas e despesas",
                  "Visão geral da rotina",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm font-medium text-[#526B5C]"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#23845C]" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#interesse"
                className="mt-8 flex min-h-13 items-center justify-center gap-2 rounded-full bg-[#176B4B] px-6 py-3.5 text-sm font-extrabold text-white transition hover:bg-[#12583D]"
              >
                Tenho interesse <ArrowRight className="h-4 w-4" />
              </a>
              <p className="mt-4 text-center text-[10px] leading-5 text-[#9AA9A0]">
                Plano e valor fictícios, apresentados somente para demonstrar a página de vendas.
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-[#E6EEE7] bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <div className="text-center">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#23845C]">
                Dúvidas comuns
              </p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#18352B]">
                Antes de começar
              </h2>
            </div>
            <div className="mt-9 space-y-3">
              {[
                [
                  "Para quem é o Negócio em Ordem?",
                  "Para quem trabalha por conta própria ou administra um pequeno negócio e quer organizar melhor clientes, vendas, tarefas e dinheiro.",
                ],
                [
                  "Preciso entender de tecnologia?",
                  "A proposta é ter uma experiência simples, com informações fáceis de encontrar e ações diretas.",
                ],
                [
                  "O sistema já está funcionando?",
                  "Esta página é uma demonstração visual do produto. Ela não possui cadastro, banco de dados ou processamento real.",
                ],
                [
                  "O preço apresentado é definitivo?",
                  "Não. O valor e o plano são fictícios e servem apenas como exemplo de apresentação comercial.",
                ],
              ].map(([question, answer]) => (
                <details
                  key={question}
                  className="group rounded-2xl border border-[#E5EDE6] bg-[#FBFDFB] px-5 py-4"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-[#355944] [&::-webkit-details-marker]:hidden">
                    {question}
                    <span className="text-xl font-normal text-[#23845C] transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="max-w-3xl pb-1 pt-3 text-sm leading-7 text-[#718479]">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="interesse" className="relative overflow-hidden bg-[#EAF4EB] py-16 sm:py-24">
          <div className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full border-[45px] border-[#D4E9D8]" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#23845C] shadow-sm">
                <HeartHandshake className="h-6 w-6" />
              </span>
              <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.18em] text-[#23845C]">
                Dê o próximo passo
              </p>
              <h2 className="mt-3 max-w-xl text-3xl font-extrabold tracking-tight text-[#18352B] sm:text-4xl">
                Mais organização para cuidar melhor do seu negócio.
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-7 text-[#647B6C]">
                Conheça a proposta do Negócio em Ordem e imagine uma rotina com tudo o que importa
                no lugar certo.
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-[#557361]">
                <ShieldCheck className="h-4 w-4 text-[#23845C]" /> Demonstração sem envio ou
                armazenamento de dados
              </div>
            </div>
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-white bg-white p-6 shadow-xl shadow-[#315C47]/10 sm:p-8"
            >
              <h3 className="text-lg font-extrabold text-[#294A38]">Quero conhecer</h3>
              <p className="mt-1 text-xs leading-5 text-[#91A198]">
                Formulário ilustrativo para demonstrar a experiência da página.
              </p>
              <label className="mt-6 block text-xs font-bold text-[#526B5C]" htmlFor="demo-name">
                Seu nome
              </label>
              <input
                id="demo-name"
                name="name"
                required
                placeholder="Como podemos chamar você?"
                className="mt-2 h-12 w-full rounded-xl border border-[#DCE7DE] bg-[#FBFDFB] px-4 text-sm text-[#294A38] outline-none transition placeholder:text-[#A2B0A6] focus:border-[#23845C] focus:ring-2 focus:ring-[#23845C]/10"
              />
              <label className="mt-4 block text-xs font-bold text-[#526B5C]" htmlFor="demo-email">
                Seu e-mail
              </label>
              <input
                id="demo-email"
                name="email"
                type="email"
                required
                placeholder="voce@email.com"
                className="mt-2 h-12 w-full rounded-xl border border-[#DCE7DE] bg-[#FBFDFB] px-4 text-sm text-[#294A38] outline-none transition placeholder:text-[#A2B0A6] focus:border-[#23845C] focus:ring-2 focus:ring-[#23845C]/10"
              />
              <button
                type="submit"
                className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#176B4B] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#12583D]"
              >
                Enviar interesse <ArrowRight className="h-4 w-4" />
              </button>
              {submitted && (
                <p
                  role="status"
                  className="mt-4 rounded-xl bg-[#FFF4D9] p-3 text-xs leading-5 text-[#805D1C]"
                >
                  Demonstração: formulário testado. Nenhum dado foi enviado ou armazenado.
                </p>
              )}
              <p className="mt-4 text-center text-[10px] leading-5 text-[#A0ADA3]">
                Não informe dados pessoais reais. Este formulário não está conectado a um serviço.
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-[#123A2B] py-9 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 sm:px-8 md:flex-row md:items-center md:justify-between">
          <a href="#inicio" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
              <Leaf className="h-4 w-4" />
            </span>
            <span className="text-sm font-extrabold">Negócio em Ordem</span>
          </a>
          <p className="text-xs text-[#B7D0BE]">
            Menos tarefas perdidas. Mais controle. Mais oportunidades de venda.
          </p>
          <p className="text-[10px] text-[#91B39B]">Página demonstrativa · 2026</p>
        </div>
      </footer>
    </div>
  );
}
