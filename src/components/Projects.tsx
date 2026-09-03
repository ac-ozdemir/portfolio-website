const projects = [
  {
    title: "Project One",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    tags: ["Power BI", "SQL"],
  },
  {
    title: "Project Two",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.",
    tags: ["Python", "ETL"],
  },
  {
    title: "This Portfolio",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
    tags: ["Next.js", "TypeScript"],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-24">
      <h2 className="text-sm font-medium tracking-wide text-accent uppercase">
        Projects
      </h2>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {projects.map((project) => (
          <article
            key={project.title}
            className="rounded-lg border border-border p-6 transition-colors hover:border-accent"
          >
            <h3 className="font-semibold">{project.title}</h3>
            <p className="mt-2 text-sm text-muted">{project.description}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
