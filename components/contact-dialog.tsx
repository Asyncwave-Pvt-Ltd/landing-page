"use client";

import * as React from "react";
import {
  GoogleReCaptchaProvider,
} from "react-google-recaptcha-v3";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ContactFormContent } from "@/components/sections/contact-form";

interface ContactDialogContextValue {
  openDialog: () => void;
}

const ContactDialogContext = React.createContext<ContactDialogContextValue | null>(null);

export function useContactDialog() {
  return React.useContext(ContactDialogContext);
}

export function ContactDialogProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);

  return (
    <ContactDialogContext.Provider value={{ openDialog: () => setOpen(true) }}>
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
        scriptProps={{ async: true, defer: true, appendTo: "head" }}
      >
        {children}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-2xl font-extrabold text-[#0D1B2A]">
                Send a Message
              </DialogTitle>
              <DialogDescription className="text-gray-500 text-sm">
                Fill in the form and we&apos;ll be in touch within 24 hours.
              </DialogDescription>
            </DialogHeader>
            <ContactFormContent />
          </DialogContent>
        </Dialog>
      </GoogleReCaptchaProvider>
    </ContactDialogContext.Provider>
  );
}
