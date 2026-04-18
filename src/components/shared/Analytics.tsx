"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { readConsent, CONSENT_EVENT, type ConsentState } from "@/lib/consent";

const GA_ID = "G-WTEF9GDNNN";

export function Analytics() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const current = readConsent();
    if (current?.analytics) setAllowed(true);

    function onChange(e: Event) {
      const state = (e as CustomEvent<ConsentState | null>).detail;
      setAllowed(state?.analytics === true);
    }
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  if (!allowed) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            anonymize_ip: true,
            cookie_flags: 'SameSite=None;Secure'
          });
        `}
      </Script>
    </>
  );
}
