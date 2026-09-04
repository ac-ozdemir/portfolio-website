import Reveal from "@/components/Reveal";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-24">
      <Reveal>
        <h2 className="text-sm font-medium tracking-wide text-accent uppercase">
          About
        </h2>
        <div className="mt-6 max-w-2xl space-y-4 text-lg text-foreground/90">
          <p>
            I&apos;m an Industrial Engineering graduate (Hacettepe
            University, High Honor) who found his footing in data. Before
            graduating, I did a Work & Travel program in the US, followed by
            an Erasmus exchange in Logistics & Supply Chain Management at
            the University of Duisburg-Essen. I then joined Turkish
            Aerospace as a Data Analyst on the Digital Transformation team,
            building real-time data infrastructure — and for the past
            3.5+ years since, I&apos;ve stayed on that Data Analyst track,
            now as a Senior Data Analyst, designing dashboards, KPI
            frameworks, and automated reporting systems used across teams
            and leadership levels.
          </p>
          <p>
            Outside of work, I spent three years in the leadership of my
            university&apos;s scuba diving club, serving as Co-Chairman of
            the Board, and I&apos;m a certified SSI Dive Master — an
            experience that shaped how I think about calm decision-making
            under constraints.
          </p>
          <p>
            I enjoy the moment where a messy dataset turns into a dashboard
            someone actually uses to make a decision — and I&apos;m always
            looking for the next problem like that to solve.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
