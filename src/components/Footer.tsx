import CookieSettingsButton from "@/components/analytics/CookieSettingsButton";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-muted">
        <p>© {new Date().getFullYear()} Ahmet Can Özdemir</p>
        <CookieSettingsButton />
      </div>
    </footer>
  );
}
