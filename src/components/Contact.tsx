import Reveal from "@/components/Reveal";

const links = [
  { label: "Email", href: "mailto:ac.ozdmr@gmail.com" },
  { label: "LinkedIn", href: "https://linkedin.com/in/acozdemir" },
  { label: "GitHub", href: "https://github.com/ac-ozdemir" },
  { label: "Download CV", href: "/cv.pdf" },
];

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-24">
      <Reveal>
        <h2 className="text-sm font-medium tracking-wide text-accent uppercase">
          Contact
        </h2>
        <p className="mt-6 max-w-xl text-lg text-foreground/90">
          I&apos;d love to hear from you — reach out anytime.
        </p>

        <ul className="mt-8 flex flex-wrap gap-6">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="rounded-sm text-sm font-medium text-accent underline underline-offset-4 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
