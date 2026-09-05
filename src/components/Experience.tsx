const timeline = [
  {
    period: "Jul 2024 — Present",
    title: "Senior Data Analyst, Turkish Aerospace",
    description:
      "Partnered with cross-functional stakeholders to translate business needs into scalable data models and KPIs. Designed an automated performance-tracking dashboard (Power BI) that improved stakeholder visibility by 25% and was independently recognized as a “world-class” best-practice example by external assessors. Built resource-planning dashboards via automated ETL pipelines (+15% efficiency), ran root-cause analysis that cut a rising cost metric by 10%, and built dynamic inventory reports that reduced fulfillment delays by 20%.",
  },
  {
    period: "Nov 2022 — Jul 2024",
    title: "Data Analyst, Digital Transformation, Turkish Aerospace",
    description:
      "Led the design of a real-time data-instrumentation architecture connecting 60% of operational touchpoints. Built real-time monitoring dashboards (Grafana, SQL, ETL), increasing operational efficiency by 30%. Designed an RFID-based asset-tracking system that reduced loss incidents by 20%.",
  },
  {
    period: "Education",
    title: "B.Sc. Industrial Engineering, Hacettepe University",
    description:
      "GPA 3.54/4.0, High Honor. Erasmus+ exchange in Logistics & Supply Chain Management, University of Duisburg-Essen (Germany).",
  },
  {
    period: "Certifications",
    title: "McKinsey Forward · SSI Dive Master · English C1 (iTEP)",
    description:
      "Continuous learning alongside full-time work, spanning business problem-solving, leadership under pressure, and language proficiency.",
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
          </li>
        ))}
      </ol>
    </section>
  );
}
