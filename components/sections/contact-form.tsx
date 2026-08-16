"use client";

import "react-phone-number-input/style.css";

import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
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
import PhoneInput from "react-phone-number-input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

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

const servicesCol1 = [
  {
    label: "AI Chatbot",
    id: "ai-chatbot",
  },
  {
    label: "Custom AI Agents",
    id: "custom-ai-agents",
  },
  {
    label: "AI Workflow Automation",
    id: "ai-workflow-automation",
  },
  {
    label: "Whatsapp AI automation",
    id: "whatsapp-ai-automation",
  },
  {
    label: "Generative AI solutions",
    id: "gen-ai-solutions",
  },
  {
    label: "Customer Support Automation",
    id: "customer-support-automation",
  },
  {
    label: "Sales & Lead Generation Automation",
    id: "sales-lead-automation",
  },
  {
    label: "AI Data Analysis & Reporting",
    id: "data-analysis-reporting",
  },
  {
    label: "AI Integration with existing software",
    id: "ai-integration",
  },
];

const servicesCol2 = [
  {
    label: "AI Voice Agent",
    id: "ai-voice-agent",
  },
  {
    label: "App Development",
    id: "app-dev",
  },
  {
    label: "Web Development",
    id: "web-dev",
  },
  {
    label: "Web Design",
    id: "web-design",
  },
  {
    label: "UI UX Support",
    id: "ui-ux-support",
  },
];

function ServicesField({
  value,
  onChange,
}: {
  value: string[];
  onChange: (value: string[]) => void;
}) {
  return (
    <div className="grid grid-cols-2">
      {[servicesCol1, servicesCol2].map((col, i) => (
        <div key={i} className="flex flex-col gap-2">
          {col.map((item) => (
            <div key={item.id} className="flex gap-2 items-center">
              <Checkbox
                id={item.id}
                value={item.id}
                checked={value.includes(item.id)}
                onCheckedChange={(checked) =>
                  onChange(
                    checked
                      ? [...value, item.id]
                      : value.filter((v) => v !== item.id),
                  )
                }
              />
              <Label htmlFor={item.id}>{item.label}</Label>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

const budgetOptions = [
  {
    id: "<1000",
    label: "Below $1000",
  },
  {
    id: "1000-5000",
    label: "$1,000-$5,000",
  },
  {
    id: "5000-10000",
    label: "$5,000-$10,000",
  },
  {
    id: ">10000",
    label: "Above $10,000",
  },
  {
    id: "not-decided",
    label: "Not Decided",
  },
];

const projectTimeline = [
  {
    id: "asap",
    label: "Immediately / ASAP",
  },
  {
    id: "1-month",
    label: "Within 1 Month",
  },
  {
    id: "1-3months",
    label: "1 - 3 Months",
  },
  {
    id: "3-6months",
    label: "3 - 6 Months",
  },
  {
    id: ">6months",
    label: "More than 6 Months",
  },
];

export function ContactForm() {
  const { toast } = useToast();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      message: "",
      phone: "",
      services: [],
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
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#0D1B2A] font-semibold text-sm">
                  Full Name <span className="text-red-500">*</span>
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
                  Email <span className="text-red-500">*</span>
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#0D1B2A] font-semibold text-sm">
                  Phone Number
                </FormLabel>
                <FormControl>
                  <PhoneInput
                    placeholder="preferably whatsapp number"
                    defaultCountry="US"
                    inputComponent={Input}
                    numberInputProps={{
                      className:
                        "border-gray-200 focus:border-[#FF5722] focus:ring-[#FF5722]",
                    }}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="services"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#0D1B2A] font-semibold text-sm">
                  Services Interested <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <ServicesField
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="budget"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel className="text-[#0D1B2A] font-semibold text-sm">
                  Approx Project Budget <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    className="grid grid-cols-2"
                    value={value}
                    onValueChange={onChange}
                  >
                    {budgetOptions.map((item, i) => (
                      <div key={item.id} className="flex gap-2 items-center">
                        <RadioGroupItem id={item.id} value={item.id} />
                        <Label htmlFor={item.id}>{item.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="timeline"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel className="text-[#0D1B2A] font-semibold text-sm">
                  Project Timeline <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    className="grid grid-cols-2"
                    value={value}
                    onValueChange={onChange}
                  >
                    {projectTimeline.map((item, i) => (
                      <div key={item.id} className="flex gap-2 items-center">
                        <RadioGroupItem id={item.id} value={item.id} />
                        <Label htmlFor={item.id}>{item.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
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
                  Project Detail/Requirement
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

          <Button
            type="submit"
            disabled={submitMutation.isPending}
            className="w-full md:w-48 md:mx-auto flex items-center justify-center gap-2 bg-[#FF5722] hover:bg-[#E64A19] disabled:opacity-60 text-white font-bold py-4 rounded transition-colors text-sm uppercase tracking-wide"
          >
            {submitMutation.isPending ? "Submitting..." : "Submit"}
            {!submitMutation.isPending && <ArrowRight className="w-4 h-4" />}
          </Button>

          <p className="text-xs text-gray-400 text-center">
            Protected by reCAPTCHA and the Google{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-300 transition-colors"
            >
              Privacy Policy
            </a>{" "}
            and{" "}
            <a
              href="https://policies.google.com/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-300 transition-colors"
            >
              Terms of Service
            </a>
            . We respect your privacy.
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
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
