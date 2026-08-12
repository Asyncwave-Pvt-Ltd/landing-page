"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

/** Mounted once in the root layout — the contact form and the chatbot share it. */
export function RecaptchaProvider({ children }: { children: React.ReactNode }) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
      scriptProps={{ async: true, defer: true, appendTo: "head" }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}
