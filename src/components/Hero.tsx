import Image from "next/image";

const profileImageSrc = "/profile.jpg";
const profileImageAlt = "Ahmet Can Özdemir";

function StoryCard({
  href,
  title,
  hint,
  imageSrc,
  imageAlt,
}: {
  href: string;
  title: string;
  hint: string;
  imageSrc: string;
  imageAlt: string;
}) {
  return (
    <a
      href={href}
      className="group relative block aspect-square overflow-hidden rounded-lg border border-border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="(min-width: 768px) 140px, 45vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-3">
        <span className="block text-sm font-semibold text-white">
          {title}
        </span>
        <span className="block text-xs text-white/80">{hint}</span>
      </div>
    </a>
  );
}

export default function Hero() {
  return (
    <section id="top" className="mx-auto max-w-5xl px-6 py-24 md:py-32">
      <div className="grid gap-10 md:grid-cols-[1fr_260px] md:items-start">
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
                imageSrc="/diving-card.jpg"
                imageAlt="Ahmet Can Özdemir scuba diving"
              />
              <StoryCard
                href="#marathon"
                title="Marathon"
                hint="3:30, Istanbul"
                imageSrc="/marathon-card.jpg"
                imageAlt="Ahmet Can Özdemir after finishing the Istanbul Marathon"
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
