"use client";

import Script from "next/script";
import { useEffect, useState, useSyncExternalStore } from "react";
import {
  OPEN_SETTINGS_EVENT,
  gaCookieNames,
  readConsent,
  subscribeConsent,
  writeConsent,
  type Consent,
} from "@/lib/analytics/consent";

// Set only in Vercel's Production environment, so local dev and previews
// never send hits. The format check keeps the value safe to inline below.
const rawGaId = process.env.NEXT_PUBLIC_GA_ID;
const GA_ID = rawGaId && /^G-[A-Z0-9]+$/.test(rawGaId) ? rawGaId : undefined;

// undefined on the server: the choice lives in the browser, so render no
// banner until hydration instead of flashing one at visitors who decided.
const getServerSnapshot = (): Consent | null | undefined => undefined;

function setGaDisabled(isDisabled: boolean) {
  if (!GA_ID) return;
  (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = isDisabled;
}

function deleteGaCookies() {
  const domains = ["", `; domain=.${window.location.hostname}`];
  for (const name of gaCookieNames(document.cookie)) {
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`;
    }
  }
}

export default function ConsentManager() {
  const consent = useSyncExternalStore(subscribeConsent, readConsent, getServerSnapshot);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const open = () => setIsSettingsOpen(true);
    window.addEventListener(OPEN_SETTINGS_EVENT, open);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, open);
  }, []);

  function choose(choice: Consent) {
    setGaDisabled(choice === "denied");
    if (choice === "denied") deleteGaCookies();
    writeConsent(choice);
    setIsSettingsOpen(false);
  }

  const isBannerVisible = consent === null || (consent !== undefined && isSettingsOpen);

  return (
    <>
      {consent === "granted" && GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
          </Script>
        </>
      )}

      {isBannerVisible && (
        <section
          aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background"
        >
          <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted">
              This site uses Google Analytics cookies to see which pages are read. Nothing is
              loaded unless you accept.
            </p>
            <div className="flex flex-none gap-3">
              <button
                type="button"
                onClick={() => choose("denied")}
                className="rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => choose("granted")}
                className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Accept
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
