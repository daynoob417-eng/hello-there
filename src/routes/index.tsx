import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, MessageCircle, PenLine, Sparkles, Video } from "lucide-react";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Assistente de Conteúdo e Vendas com IA" },
      {
        name: "description",
        content:
          "Ferramentas inteligentes para ajudar pequenos negócios a criar conteúdo e atender clientes.",
      },
    ],
  }),
});

const plannedTools = [
  {
    icon: PenLine,
    title: "Legendas comerciais",
    description: "Crie textos para apresentar produtos, serviços e ofertas.",
  },
  {
    icon: CalendarDays,
    title: "Calendário de publicações",
    description: "Organize ideias e planeje o conteúdo da semana.",
  },
  {
    icon: MessageCircle,
    title: "Respostas para clientes",
    description: "Prepare respostas claras para dúvidas e conversas de venda.",
  },
  {
    icon: Video,
    title: "Roteiros de vídeos curtos",
    description: "Transforme produtos e serviços em ideias para vídeos.",
  },
];

function HomePage() {
  return (
    <main className="min-h-screen bg-background px-5 py-12 text-foreground sm:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="size-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-semibold">Novo projeto</p>
            <p className="text-xs text-muted-foreground">Pequenos negócios, grandes ideias.</p>
          </div>
        </header>

        <section className="py-16 sm:py-24">
          <p className="mb-4 text-sm font-semibold text-primary">ASSISTENTE DE CONTEÚDO E VENDAS COM IA</p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
            Mais facilidade para criar conteúdo e conversar com seus clientes.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Estamos preparando ferramentas práticas para ajudar pequenos negócios a planejar
            publicações, apresentar seus produtos e melhorar o atendimento.
          </p>
        </section>

        <section aria-labelledby="tools-heading">
          <div className="mb-6">
            <h2 id="tools-heading" className="text-2xl font-semibold">
              O que estamos construindo
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Estas são as áreas previstas para a primeira versão. Ainda não estão disponíveis.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {plannedTools.map(({ icon: Icon, title, description }) => (
              <article key={title} className="rounded-xl border bg-card p-5">
                <Icon className="mb-4 size-5 text-primary" aria-hidden="true" />
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
                <span className="mt-4 inline-flex rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                  Em planejamento
                </span>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
