import { z } from "zod";
// From libphonenumber-js, not react-phone-number-input: the latter re-exports
// this from a bundle that also pulls in React components, which blows up when
// an API route imports this file.
import { isPossiblePhoneNumber } from 'libphonenumber-js'

// Client-side schema (no recaptchaToken — used for form validation)
export const contactFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  message: z.string().min(1, "Message is required"),
  phone: z.string().optional().refine(data => data ? isPossiblePhoneNumber(data) : true),
  services: z.array(z.string()).min(1, "This field is mandatory"),
  budget: z.enum(["<1000", "1000-5000", "5000-10000", ">10000", "not-decided"]),
  timeline: z.enum(["asap", "1-month", "1-3months", "3-6months", ">6months"])
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
