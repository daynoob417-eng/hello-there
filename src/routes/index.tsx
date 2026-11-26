import {
  CalendarDays,
  Lightbulb,
  MessageCircle,
  PenLine,
  Sparkles,
  Video,
} from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Assistente de Conteúdo e Vendas com IA" },
      {
        name: "description",
        content:
          "Uma ferramenta para ajudar pequenos negócios a planejar conteúdo, divulgar seus produtos e atender clientes.",
      },
    ],
  }),
});

const capabilities = [
  {
    icon: CalendarDays,
    title: "Planejamento de conteúdo",
    description:
      "Organize ideias e publicações para manter a comunicação do negócio ativa.",
  },
  {
    icon: PenLine,
    title: "Legendas comerciais",
    description:
      "Prepare textos para apresentar produtos, serviços e ofertas com clareza.",
  },
  {
    icon: MessageCircle,
    title: "Respostas para clientes",
    description:
      "Tenha apoio para responder dúvidas e conduzir conversas de atendimento.",
  },
  {
    icon: Video,
    title: "Roteiros de vídeos curtos",
    description:
      "Transforme produtos e serviços em ideias de vídeos simples de produzir.",
  },
  {
    icon: Lightbulb,
    title: "Ideias para vender",
    description:
      "Explore campanhas, chamadas para ação e formas de divulgar seu negócio.",
  },
];

function HomePage() {
  return (
    <main className="min-h-screen bg-background px-5 py-16 text-foreground sm:px-8 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm text-muted-foreground">
          <Sparkles className="h-4 w-4 text-primary" />
          Projeto em preparação
        </div>

        <section className="mt-8 max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Assistente de Conteúdo e Vendas com IA
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
            Uma ferramenta prática para ajudar pequenos negócios a saber o que
            publicar, como apresentar seus produtos e como conversar com seus
            clientes.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-xl font-semibold">O que estamos preparando</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="rounded-2xl border bg-card p-6 shadow-sm"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted text-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <p className="mt-12 border-t pt-6 text-sm text-muted-foreground">
          Esta é apenas a estrutura inicial do projeto. As ferramentas serão
          implementadas e conectadas a serviços reais nas próximas etapas.
        </p>
      </div>
    </main>
  );
}
