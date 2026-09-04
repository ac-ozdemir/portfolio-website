import Reveal from "@/components/Reveal";

const timeline = [
  {
    period: "20XX — Present",
    title: "Senior Data Analyst, TUSAŞ",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
  },
  {
    period: "20XX — 20XX",
    title: "Data Analyst, TUSAŞ",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
  },
  {
    period: "20XX",
    title: "Erasmus Exchange, University of Duisburg-Essen",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.",
  },
  {
    period: "20XX",
    title: "Industrial Engineering Degree",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-5xl px-6 py-24">
      <Reveal>
        <h2 className="text-sm font-medium tracking-wide text-accent uppercase">
          Experience
        </h2>

        <ol className="mt-8 space-y-10 border-l border-border pl-8">
          {timeline.map((item) => (
            <li key={item.title} className="relative">
              <span className="absolute top-1.5 -left-[calc(2rem+5px)] h-2.5 w-2.5 rounded-full bg-accent" />
              <p className="text-sm font-medium text-muted">{item.period}</p>
              <h3 className="mt-1 font-semibold">{item.title}</h3>
              <p className="mt-2 max-w-2xl text-sm text-foreground/80">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
