"use client";

import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { Mail, MessageSquare, MapPin, ArrowRight, Check } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { contactFormSchema, type ContactFormValues } from "@/lib/schema";

const contactInfo = [
  {
    icon: Mail,
    label: "Email Us",
    value: "hello@asyncwave.com",
    href: "mailto:hello@asyncwave.com",
  },
  {
    icon: MessageSquare,
    label: "Whatsapp",
    value: "Within 24 hours",
    href: "#",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Remote-first, worldwide",
    href: "#",
  },
];

const whyUs = [
  "Free discovery call, no commitment",
  "Clear pricing, no surprises",
  "Small team, direct communication",
  "Ongoing support after launch",
];

function ContactFormContent() {
  const { toast } = useToast();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      message: "",
    },
  });

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) return undefined;
    return await executeRecaptcha("contact_form");
  }, [executeRecaptcha]);

  const submitMutation = useMutation({
    mutationFn: async (
      data: ContactFormValues & { recaptchaToken: string },
    ) => {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Something went wrong");
      }
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description:
          "Thank you for reaching out. We'll get back to you within 24 hours.",
      });
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to send",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  async function onSubmit(data: ContactFormValues) {
    const token = await handleReCaptchaVerify();
    if (!token) {
      toast({
        title: "Verification failed",
        description: "reCAPTCHA verification failed. Please try again.",
        variant: "destructive",
      });
      return;
    }
    submitMutation.mutate({ ...data, recaptchaToken: token });
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-100">
      <h3 className="text-2xl font-extrabold text-[#0D1B2A] mb-1">
        Send a Message
      </h3>
      <p className="text-gray-500 text-sm mb-8">
        Fill in the form and we&apos;ll be in touch within 24 hours.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#0D1B2A] font-semibold text-sm">
                  Full Name *
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    className="border-gray-200 focus:border-[#FF5722] focus:ring-[#FF5722]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#0D1B2A] font-semibold text-sm">
                  Email *
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john@company.com"
                    className="border-gray-200 focus:border-[#FF5722] focus:ring-[#FF5722]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#0D1B2A] font-semibold text-sm">
                  Message *
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about your project, idea, or challenge..."
                    className="min-h-[120px] border-gray-200 focus:border-[#FF5722] focus:ring-[#FF5722]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <button
            type="submit"
            disabled={submitMutation.isPending}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#FF5722] hover:bg-[#E64A19] disabled:opacity-60 text-white font-bold py-4 rounded transition-colors text-sm uppercase tracking-wide"
          >
            {submitMutation.isPending ? "Sending..." : "Send Message"}
            {!submitMutation.isPending && <ArrowRight className="w-4 h-4" />}
          </button>

          <p className="text-xs text-gray-400 text-center">
            Protected by reCAPTCHA. We respect your privacy.
          </p>
        </form>
      </Form>
    </div>
  );
}

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-[#0D1B2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-[#FF5722] text-xs font-bold uppercase tracking-widest mb-4">
            <span className="w-6 h-[2px] bg-[#FF5722]" />
            Get in Touch
            <span className="w-6 h-[2px] bg-[#FF5722]" />
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Let&apos;s Build Something Great
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Have a project in mind or just want to explore what&apos;s possible?
            We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left Info Panel */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-[#FF5722] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white/50 text-xs font-medium mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-white font-semibold text-sm">
                        {item.value}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>

            <div className="bg-[#0F2231] rounded-lg p-6 border border-white/10">
              <h4 className="text-white font-bold mb-4">Why Asyncwave?</h4>
              <ul className="space-y-3">
                {whyUs.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#FF5722] flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </span>
                    <span className="text-white/70 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-3">
            <GoogleReCaptchaProvider
              reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
              scriptProps={{ async: false, defer: false, appendTo: "head" }}
            >
              <ContactFormContent />
            </GoogleReCaptchaProvider>
          </div>
        </div>
      </div>
    </section>
  );
}
