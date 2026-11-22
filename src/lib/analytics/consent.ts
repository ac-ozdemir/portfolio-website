// Visitor's analytics-cookie choice, kept in localStorage so the banner
// shows only once. Google Analytics loads only after an explicit "granted".

export type Consent = "granted" | "denied";

const STORAGE_KEY = "analytics-consent";
const CHANGE_EVENT = "analytics-consent-change";
export const OPEN_SETTINGS_EVENT = "open-cookie-settings";

// Fallback when localStorage is blocked (private mode, strict settings), so
// the choice still holds for the current page visit.
let inMemoryConsent: Consent | null = null;

export function parseConsent(value: string | null): Consent | null {
  return value === "granted" || value === "denied" ? value : null;
}

export function readConsent(): Consent | null {
  try {
    return parseConsent(window.localStorage.getItem(STORAGE_KEY)) ?? inMemoryConsent;
  } catch {
    return inMemoryConsent;
  }
}

export function writeConsent(consent: Consent): void {
  inMemoryConsent = consent;
  try {
    window.localStorage.setItem(STORAGE_KEY, consent);
  } catch (error) {
    console.warn("Could not persist analytics consent", error);
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function subscribeConsent(onChange: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function openCookieSettings(): void {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}

/** Names of Google Analytics cookies (_ga, _ga_<id>) in a document.cookie string. */
export function gaCookieNames(cookieString: string): string[] {
  return cookieString
    .split(";")
    .map((pair) => pair.split("=")[0].trim())
    .filter((name) => name === "_ga" || name.startsWith("_ga_"));
}
