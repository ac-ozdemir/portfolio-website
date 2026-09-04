export default function Hero() {
  return (
    <section id="top" className="mx-auto max-w-5xl px-6 py-24 md:py-32">
      <p className="text-sm font-medium tracking-wide text-accent uppercase">
        Senior Data Analyst
      </p>
      <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
        Ahmet Can Özdemir
      </h1>
      <p className="mt-6 max-w-xl text-lg text-muted">
        Turning production data into decisions — 3.5+ years designing
        dashboards, KPI frameworks, and automated reporting systems at
        Turkish Aerospace.
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
    </section>
  );
}
