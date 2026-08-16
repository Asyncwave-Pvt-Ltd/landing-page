"use client";

import "react-phone-number-input/style.css";

import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

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

// ids double as the i18n keys under `form.serviceOptions` / `form.budgetOptions`
// / `form.timelineOptions`, and are what gets submitted.
const servicesCol1 = [
  "ai-chatbot",
  "custom-ai-agents",
  "ai-workflow-automation",
  "whatsapp-ai-automation",
  "gen-ai-solutions",
  "customer-support-automation",
  "sales-lead-automation",
  "data-analysis-reporting",
  "ai-integration",
];

const servicesCol2 = [
  "ai-voice-agent",
  "app-dev",
  "web-dev",
  "web-design",
  "ui-ux-support",
];

const budgetOptions = [
  "<1000",
  "1000-5000",
  "5000-10000",
  ">10000",
  "not-decided",
] as const;

const timelineOptions = [
  "asap",
  "1-month",
  "1-3months",
  "3-6months",
  ">6months",
] as const;

const policyLink = (href: string) => (chunks: React.ReactNode) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="underline hover:text-gray-300 transition-colors"
  >
    {chunks}
  </a>
);

function ServicesField({
  value,
  onChange,
}: {
  value: string[];
  onChange: (value: string[]) => void;
}) {
  const t = useTranslations("form.serviceOptions");

  return (
    <div className="grid grid-cols-2">
      {[servicesCol1, servicesCol2].map((col, i) => (
        <div key={i} className="flex flex-col gap-2">
          {col.map((id) => (
            <div key={id} className="flex gap-2 items-center">
              <Checkbox
                id={id}
                value={id}
                checked={value.includes(id)}
                onCheckedChange={(checked) =>
                  onChange(
                    checked ? [...value, id] : value.filter((v) => v !== id),
                  )
                }
              />
              <Label htmlFor={id}>{t(id)}</Label>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function ContactForm() {
  const t = useTranslations("form");
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
        throw new Error(await res.text().catch(() => ""));
      }
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: t("toast.successTitle"),
        description: t("toast.successBody"),
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: t("toast.errorTitle"),
        description: t("toast.errorBody"),
        variant: "destructive",
      });
    },
  });

  async function onSubmit(data: ContactFormValues) {
    const token = await handleReCaptchaVerify();
    if (!token) {
      toast({
        title: t("toast.recaptchaTitle"),
        description: t("toast.recaptchaBody"),
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
                  {t("fullName")} <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("fullNamePlaceholder")}
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
                  {t("email")} <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={t("emailPlaceholder")}
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
                  {t("phone")}
                </FormLabel>
                <FormControl>
                  <PhoneInput
                    placeholder={t("phonePlaceholder")}
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
                  {t("services")} <span className="text-red-500">*</span>
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
                  {t("budget")} <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    className="grid grid-cols-2"
                    value={value}
                    onValueChange={onChange}
                  >
                    {budgetOptions.map((id) => (
                      <div key={id} className="flex gap-2 items-center">
                        <RadioGroupItem id={id} value={id} />
                        <Label htmlFor={id}>{t(`budgetOptions.${id}`)}</Label>
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
                  {t("timeline")} <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    className="grid grid-cols-2"
                    value={value}
                    onValueChange={onChange}
                  >
                    {timelineOptions.map((id) => (
                      <div key={id} className="flex gap-2 items-center">
                        <RadioGroupItem id={id} value={id} />
                        <Label htmlFor={id}>{t(`timelineOptions.${id}`)}</Label>
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
                  {t("message")}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t("messagePlaceholder")}
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
            {submitMutation.isPending ? t("submitting") : t("submit")}
            {!submitMutation.isPending && <ArrowRight className="w-4 h-4" />}
          </Button>

          <p className="text-xs text-gray-400 text-center">
            {t.rich("recaptchaNotice", {
              privacy: policyLink("https://policies.google.com/privacy"),
              terms: policyLink("https://policies.google.com/terms"),
            })}
          </p>
        </form>
      </Form>
    </div>
  );
}
