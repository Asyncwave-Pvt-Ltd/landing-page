import { z } from "zod";
// From libphonenumber-js, not react-phone-number-input: the latter re-exports
// this from a bundle that also pulls in React components, which blows up when
// an API route imports this file.
import { isPossiblePhoneNumber } from 'libphonenumber-js'

// Client-side schema (no recaptchaToken — used for form validation).
// Messages are i18n keys under the `form` namespace — FormMessage resolves them.
export const contactFormSchema = z.object({
  fullName: z.string().min(1, "validation.fullNameRequired"),
  email: z
    .string()
    .min(1, "validation.emailRequired")
    .email("validation.emailInvalid"),
  message: z.string().min(1, "validation.messageRequired"),
  phone: z
    .string()
    .optional()
    .refine((data) => (data ? isPossiblePhoneNumber(data) : true), {
      message: "validation.phoneInvalid",
    }),
  services: z.array(z.string()).min(1, "validation.servicesRequired"),
  budget: z.enum(["<1000", "1000-5000", "5000-10000", ">10000", "not-decided"], {
    errorMap: () => ({ message: "validation.budgetRequired" }),
  }),
  timeline: z.enum(["asap", "1-month", "1-3months", "3-6months", ">6months"], {
    errorMap: () => ({ message: "validation.timelineRequired" }),
  }),
});

// Server-side schema (includes recaptchaToken — used in API route)
export const contactFormRequestSchema = contactFormSchema.extend({
  recaptchaToken: z.string().min(1, "reCAPTCHA token is required"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type ContactFormRequest = z.infer<typeof contactFormRequestSchema>;

// Chatbot request schema — the caps here are what stop one visitor
// from running up an API bill.
export const chatRequestSchema = z.object({
  recaptchaToken: z.string().min(1, "reCAPTCHA token is required"),
  // BCP-47 tag of the page the visitor is on; the bot answers in that language.
  locale: z.string().min(2).max(10).default("en"),
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(1000),
      }),
    )
    .min(1)
    .max(21),
});
