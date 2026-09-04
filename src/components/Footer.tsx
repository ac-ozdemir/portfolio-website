export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-5xl px-6 py-8 text-sm text-muted">
        <p>© {new Date().getFullYear()} Ahmet Can Özdemir</p>
      </div>
    </footer>
  );
}
