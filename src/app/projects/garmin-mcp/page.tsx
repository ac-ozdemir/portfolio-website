import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArchitectureDiagram from "@/components/garmin-mcp/ArchitectureDiagram";
import {
  AI_SKILLS,
  ARCHITECTURE,
  DATA_FLOW,
  DATA_MODEL_NOTES,
  DECISIONS,
  INTRO,
  MCP_TOOLS,
  PROBLEM,
  RESULT,
  RESULT_STATS,
  SQL_TECHNIQUES,
  TABLES,
} from "@/components/garmin-mcp/content";
import { ArrowLeftIcon } from "@/components/training/icons";

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
const subheading = "text-lg font-semibold tracking-tight";
const titledList = "max-w-[62ch] space-y-4 leading-7 text-foreground/90";
const itemTitle = "font-semibold text-foreground";

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

function TitledList({ items }: { items: { title: string; text: string }[] }) {
  return (
    <ul className={titledList}>
      {items.map(({ title, text }) => (
        <li key={title}>
          <span className={itemTitle}>{title}</span> {text}
        </li>
      ))}
    </ul>
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
            Personal project · Self-built MCP server · Code available on request
          </p>
          <p className="mt-6 max-w-2xl text-base text-foreground/90 md:text-lg">
            {INTRO}
          </p>

          <div className="mt-16 space-y-16 md:mt-20">
            <Section title="The problem">
              <Paragraphs items={PROBLEM} />
            </Section>

            <Section title="Architecture">
              <p className={prose}>{ARCHITECTURE}</p>
              <div className="mt-8">
                <ArchitectureDiagram />
              </div>
              <h3 className={`${subheading} mt-10`}>MCP tools</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {MCP_TOOLS.map((tool) => (
                  <li
                    key={tool}
                    className="rounded-full bg-accent/10 px-3 py-1 font-mono text-xs text-accent"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Data model and data flow">
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

              <h3 className={`${subheading} mt-10`}>How data moves</h3>
              <div className="mt-3">
                <TitledList items={DATA_FLOW} />
              </div>

              <h3 className={`${subheading} mt-10`}>SQL in use</h3>
              <p className={`${prose} mt-3`}>
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

            <Section title="Challenges and decisions">
              <TitledList items={DECISIONS} />

              <h3 className={`${subheading} mt-10`}>AI integration</h3>
              <ul className={`${titledList} mt-3`}>
                {AI_SKILLS.map(({ id, label, text }) => (
                  <li key={id} id={id} className="scroll-mt-20">
                    <span className={itemTitle}>{label}.</span> {text}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="The result">
              <Paragraphs items={RESULT} />
              <dl className="mt-8 grid max-w-3xl grid-cols-2 gap-6 md:grid-cols-4">
                {RESULT_STATS.map(({ value, label }) => (
                  <div key={label} className="flex flex-col">
                    <dt className="text-sm text-muted">{label}</dt>
                    <dd className="order-first text-3xl font-semibold text-accent">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
              <figure className="mt-10 max-w-3xl">
                <Image
                  src="/garmin-mcp-sleep-answer.png"
                  alt="A chat where the question “How did I sleep last night?” triggers the get_sleep tool. The answer lists sleep score, total sleep, overnight HRV, deep and REM sleep and resting heart rate, with every value blurred."
                  width={1920}
                  height={900}
                  sizes="(min-width: 768px) 768px, 100vw"
                  className="rounded-lg border border-border"
                />
                <figcaption className="mt-3 text-sm text-muted">
                  Representative recreation of Claude’s answer. Values are
                  blurred placeholders, not my health data.
                </figcaption>
              </figure>
            </Section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
