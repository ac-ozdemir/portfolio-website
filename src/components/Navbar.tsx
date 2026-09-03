"use client";

import { useState } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-semibold tracking-tight">
          Ahmet Can Özdemir
        </a>

        <ul className="hidden gap-8 text-sm md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-foreground/80 transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="h-0.5 w-6 bg-foreground" />
          <span className="h-0.5 w-6 bg-foreground" />
        </button>
      </nav>

      {open && (
        <ul className="flex flex-col gap-4 border-t border-border px-6 py-4 md:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-foreground/80 hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
