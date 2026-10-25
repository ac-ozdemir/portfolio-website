import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArchitectureDiagram from "@/components/garmin-mcp/ArchitectureDiagram";
import {
  DATA_MODEL_NOTES,
  DECISIONS,
  HOW_IT_WORKS,
  INTRO,
  PROBLEM,
  REPO_URL,
  RESULT,
  SQL_TECHNIQUES,
  TABLES,
  TOOLS,
} from "@/components/garmin-mcp/content";
import { ArrowLeftIcon, GitHubIcon } from "@/components/training/icons";
import { outlineButtonClass } from "@/components/training/links";

const title = "Garmin → Claude Health Data Bridge | Ahmet Can Özdemir";
const description =
  "A self-built MCP server on Cloudflare that gives my Claude training coach secure access to my Garmin sleep, recovery and training data.";
const path = "/projects/garmin-mcp";

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

const prose = "max-w-[58ch] leading-7 text-foreground/90";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-border pt-10 md:pt-12">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="space-y-4">
      {items.map((text) => (
        <p key={text.slice(0, 32)} className={prose}>
          {text}
        </p>
      ))}
    </div>
  );
}

export default function GarminMcpPage() {
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
            Garmin → Claude Health Data Bridge
          </h1>
          <p className="mt-4 text-sm text-muted">
            Personal project · Self-built MCP server
          </p>
          <p className="mt-6 max-w-2xl text-base text-foreground/90 md:text-lg">
            {INTRO}
          </p>
          <div className="mt-8">
            <a href={REPO_URL} className={outlineButtonClass}>
              <GitHubIcon className="h-4 w-4" />
              View the code
            </a>
          </div>

          <div className="mt-16 space-y-16 md:mt-20">
            <Section title="The problem">
              <Paragraphs items={PROBLEM} />
            </Section>

            <Section title="How it works">
              <p className={prose}>{HOW_IT_WORKS}</p>
              <div className="mt-8">
                <ArchitectureDiagram />
              </div>
              <ul className="mt-8 flex flex-wrap gap-2" aria-label="Tools">
                {TOOLS.map((tool) => (
                  <li
                    key={tool}
                    className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Data model">
              <dl className="grid max-w-3xl gap-x-8 gap-y-3 md:grid-cols-[10rem_1fr]">
                {TABLES.map(({ name, description }) => (
                  <div key={name} className="contents">
                    <dt className="font-mono text-sm text-foreground md:pt-0.5">
                      {name}
                    </dt>
                    <dd className="mb-2 text-foreground/90 md:mb-0">
                      {description}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8">
                <Paragraphs items={DATA_MODEL_NOTES} />
              </div>
            </Section>

            <Section title="Design decisions">
              <ul className="max-w-[62ch] space-y-4 leading-7 text-foreground/90">
                {DECISIONS.map(({ title, text }) => (
                  <li key={title}>
                    <span className="font-semibold text-foreground">
                      {title}
                    </span>{" "}
                    {text}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="The result">
              <Paragraphs items={RESULT} />
            </Section>

            <Section title="SQL under the hood">
              <p className={prose}>
                D1 is SQLite, so the data layer is plain SQL:
              </p>
              <ul
                className={`${prose} mt-3 list-disc space-y-1.5 pl-5 marker:text-muted`}
              >
                {SQL_TECHNIQUES.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
