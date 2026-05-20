import { z } from "zod";

// Client-side schema (no recaptchaToken — used for form validation)
export const contactFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  message: z.string().min(1, "Message is required"),
});

// Server-side schema (includes recaptchaToken — used in API route)
export const contactFormRequestSchema = contactFormSchema.extend({
  recaptchaToken: z.string().min(1, "reCAPTCHA token is required"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type ContactFormRequest = z.infer<typeof contactFormRequestSchema>;
