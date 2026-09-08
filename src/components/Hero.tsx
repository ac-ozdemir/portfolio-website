import Image from "next/image";
import type { SVGProps } from "react";

const profileImageSrc = "/headshot.jpg";
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
      <path d="M3.5 16.5c1.4-1.4 2.8-1.4 4.2 0s2.8 1.4 4.2 0 2.8-1.4 4.2 0 2.8 1.4 4.2 0" />
      <circle cx="10" cy="10.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="13.2" cy="7" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="4" r="1.6" fill="currentColor" stroke="none" />
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
      className="mx-auto max-w-5xl px-6 py-24 md:py-32"
    >
      <div className="grid gap-10 md:grid-cols-[1fr_260px] md:items-start">
        <div className="order-2 md:order-1">
          <p className="text-sm font-medium tracking-wide text-accent uppercase">
            Senior Data Analyst
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
            Ahmet Can Özdemir
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">
            Turning data into decisions — 3.5+ years in data analysis,
            dashboard design, and KPI frameworks.
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
                href="#running"
                title="Running"
                hint="Sub 3:30"
                Icon={RunningIcon}
              />
            </div>
          </div>
        </div>

        <div className="order-1 relative mx-auto aspect-square w-full max-w-[260px] overflow-hidden rounded-full border border-border md:order-2 md:mx-0">
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
