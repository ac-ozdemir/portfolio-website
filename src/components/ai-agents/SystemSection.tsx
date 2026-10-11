import type { ReactNode } from "react";

import type { AiSystem } from "./systems";

const prose = "max-w-[62ch] leading-7 text-foreground/90";

// Label beside the text on wide screens, so the four parts line up across
// both systems and read like a spec; stacked on phones.
function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-x-10 gap-y-2 md:grid-cols-[11rem_1fr]">
      <h3 className="font-semibold md:pt-px">{label}</h3>
      <div>{children}</div>
    </div>
  );
}

export default function SystemSection({ system }: { system: AiSystem }) {
  const { id, name, purpose, setup, examples, lessonTitle, lesson } = system;

  return (
    <section
      aria-labelledby={id}
      className="border-t border-border pt-10 md:pt-12"
    >
      <h2
        id={id}
        className="text-2xl font-semibold tracking-tight text-balance md:text-3xl"
      >
        {name}
      </h2>

      <div className="mt-8 space-y-8">
        <Row label="Purpose">
          <p className={prose}>{purpose}</p>
        </Row>
        <Row label="How it’s set up">
          <p className={prose}>{setup}</p>
        </Row>
        <Row label="What it does">
          <ul className={`${prose} list-disc space-y-1.5 pl-5 marker:text-muted`}>
            {examples.map((example) => (
              <li key={example}>{example}</li>
            ))}
          </ul>
        </Row>
        <Row label={lessonTitle}>
          <p className={prose}>{lesson}</p>
        </Row>
      </div>
    </section>
  );
}
