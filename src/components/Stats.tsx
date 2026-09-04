const stats = [
  { value: "3.5+", label: "Years in Data & Analytics" },
  { value: "75+", label: "Dashboards & Reports Shipped" },
  { value: "130+", label: "Machines Monitored in Real Time" },
  { value: "3", label: "Certifications" },
];

export default function Stats() {
  return (
    <section className="border-y border-border bg-background">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="text-3xl font-semibold text-accent">{stat.value}</p>
            <p className="mt-1 text-sm text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
