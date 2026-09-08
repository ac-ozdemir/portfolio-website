type TimelineEntry = {
  period: string;
  title: string;
  description: string;
  subDescription?: string;
};

const timeline: TimelineEntry[] = [
  {
    period: "Jul 2024 — Present",
    title: "Senior Data Analyst, Turkish Aerospace",
    description:
      "I work with stakeholders across the business to turn their needs into data models and KPIs they can act on. One performance-tracking dashboard I built in Power BI was independently recognized as a “world-class” best-practice example. I've also automated resource-planning pipelines, run root-cause analysis on rising cost trends, and built inventory reports that help teams catch fulfillment delays early.",
  },
  {
    period: "Nov 2022 — Jul 2024",
    title: "Data Analyst, Digital Transformation, Turkish Aerospace",
    description:
      "I led the design of a real-time data architecture connecting our operational touchpoints, then built the monitoring dashboards (Grafana, SQL, ETL) on top of it. I also designed an RFID-based asset-tracking system to cut down on lost material.",
  },
  {
    period: "Education",
    title: "B.Sc. Industrial Engineering, Hacettepe University",
    description: "GPA 3.54/4.0 (High Honour)",
    subDescription:
      "Erasmus+ exchange in Logistics & Supply Chain Management, University of Duisburg-Essen (Germany)",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-5xl px-6 py-24">
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
            {item.subDescription && (
              <p className="mt-1 max-w-2xl text-sm text-muted">
                {item.subDescription}
              </p>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
