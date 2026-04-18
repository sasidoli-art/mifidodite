// Consent management — GDPR + ePrivacy compliant
// Tecnici: sempre attivi (necessari al funzionamento)
// Analitici: opt-in esplicito (GA4)

export const CONSENT_KEY = "mifidodite-consent-v2";
export const CONSENT_EVENT = "mifidodite-consent-change";

export type ConsentState = {
  technical: true;
  analytics: boolean;
  ts: number;
};

export function readConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    if (typeof parsed.analytics !== "boolean") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeConsent(analytics: boolean): void {
  if (typeof window === "undefined") return;
  const state: ConsentState = { technical: true, analytics, ts: Date.now() };
  window.localStorage.setItem(CONSENT_KEY, JSON.stringify(state));
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: state }));
}

export function clearConsent(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(CONSENT_KEY);
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: null }));
}

export function openConsentBanner(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("mifidodite-consent-open"));
}
