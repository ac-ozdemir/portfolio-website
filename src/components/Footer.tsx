export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-8 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Ahmet Can Özdemir</p>
        <p>Built with Next.js & Tailwind CSS</p>
      </div>
    </footer>
  );
}
