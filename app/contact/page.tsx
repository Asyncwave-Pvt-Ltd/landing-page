import { ContactForm } from "@/components/sections/contact-form";

// reCAPTCHA provider now lives in the root layout — shared with the chatbot.
export default function ContactPage() {
  return (
    <div className="bg-card rounded-2xl border p-4 m-4 md:m-6 lg:m-8 mt-20 md:mt-20 lg:mt-20">
      <div className="text-center mb-4">
        <h1 className="text-xl font-semibold">Get Instant Quote</h1>
        <p className="text-sm text-gray-600">
          Fill in the form and we&apos;ll be in touch within 24 hours.
        </p>
      </div>
      <ContactForm />
    </div>
  );
}
