import type { Metadata } from "next";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SystemSection from "@/components/ai-agents/SystemSection";
import { INTRO, SYSTEMS } from "@/components/ai-agents/systems";
import { ArrowLeftIcon } from "@/components/training/icons";

const title = "AI Agents & Workflows | Ahmet Can Özdemir";
const description =
  "Two personal AI systems I designed and use daily on Claude: a training coach and a task management assistant, each with its own skill, connected tools and rules.";
const path = "/projects/ai-agents-workflows";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: {
    title,
    description,
    url: path,
    siteName: "Ahmet Can Özdemir",
    locale: "en_US",
    type: "article",
  },
  twitter: { title, description },
};

export default function AiAgentsWorkflowsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <article className="mx-auto max-w-5xl px-6 pt-12 pb-24 md:pt-20">
          <Link
            href="/#projects"
            className="-my-3 inline-flex items-center gap-1.5 rounded-sm py-3 text-sm text-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            All projects
          </Link>

          <h1 className="mt-8 text-4xl font-semibold tracking-tight text-balance md:text-6xl">
            AI Agents &amp; Workflows
          </h1>
          <p className="mt-4 text-sm text-muted">Personal project</p>
          <p className="mt-6 max-w-2xl text-base text-foreground/90 md:text-lg">
            {INTRO}
          </p>

          <div className="mt-16 space-y-16 md:mt-20">
            {SYSTEMS.map((system) => (
              <SystemSection key={system.id} system={system} />
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
