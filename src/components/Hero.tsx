import Image from "next/image";
import type { SVGProps } from "react";

const profileImageSrc = "/profile.jpg";
const profileImageAlt = "Ahmet Can Özdemir";

function IconProps(props: SVGProps<SVGSVGElement>) {
  return {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-5 w-5",
    ...props,
  };
}

function DivingIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...IconProps(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 13c1 1.5 2.3 2 4 2s3-.5 4-2" />
      <circle cx="9" cy="10" r=".6" fill="currentColor" />
      <circle cx="15" cy="10" r=".6" fill="currentColor" />
    </svg>
  );
}

function RunningIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...IconProps(props)}>
      <path d="M3 12h4l2 5 4-14 2 9h6" />
    </svg>
  );
}

function StoryCard({
  href,
  title,
  hint,
  Icon,
}: {
  href: string;
  title: string;
  hint: string;
  Icon: (props: SVGProps<SVGSVGElement>) => React.JSX.Element;
}) {
  return (
    <a
      href={href}
      className="group flex items-center gap-3 rounded-lg border border-border bg-background p-3 transition-all hover:-translate-y-0.5 hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <span className="flex h-9 w-9 flex-none items-center justify-center rounded-md bg-accent/10 text-accent">
        <Icon />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold">{title}</span>
        <span className="block truncate text-xs text-muted">{hint}</span>
      </span>
      <span
        className="ml-auto text-muted transition-transform group-hover:translate-y-0.5"
        aria-hidden="true"
      >
        ↓
      </span>
    </a>
  );
}

export default function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto max-w-5xl overflow-hidden px-6 py-24 md:py-32"
    >
      <div
        className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(circle, rgba(44,110,142,0.14) 0%, rgba(44,110,142,0) 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 -left-24 h-80 w-80 rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(circle, rgba(44,110,142,0.08) 0%, rgba(44,110,142,0) 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative grid gap-10 md:grid-cols-[1fr_260px] md:items-start">
        <div className="order-2 md:order-1">
          <p className="text-sm font-medium tracking-wide text-accent uppercase">
            Senior Data Analyst
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
            Ahmet Can Özdemir
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">
            Turning data into decisions — 3.5+ years designing dashboards,
            KPI frameworks, and automated reporting systems at Turkish
            Aerospace.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-md bg-accent px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="rounded-md border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Get in Touch
            </a>
          </div>

          <div className="mt-12 max-w-sm">
            <p className="text-xs font-medium tracking-wide text-muted uppercase">
              Beyond the resume
            </p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <StoryCard
                href="#diving"
                title="Divemaster"
                hint="Club chairman"
                Icon={DivingIcon}
              />
              <StoryCard
                href="#marathon"
                title="Marathon"
                hint="3:30, Istanbul"
                Icon={RunningIcon}
              />
            </div>
          </div>
        </div>

        <div className="order-1 relative mx-auto aspect-square w-full max-w-[260px] overflow-hidden rounded-2xl border border-border md:order-2 md:mx-0">
          <Image
            src={profileImageSrc}
            alt={profileImageAlt}
            fill
            sizes="260px"
            className="object-cover object-center"
            priority
          />
        </div>
      </div>
    </section>
  );
}
