"use client";

import Image from "next/image";
import { Linkedin, Github, Mail, Instagram } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const WHATSAPP_URL =
  "https://wa.me/917340417987?text=Hello%20Asyncwave!%20I%20would%20like%20to%20inquire%20about%20your%20AI%20development%20services";

const socialLinks = [
  {
    icon: Instagram,
    href: "https://www.instagram.com/asyncwave_pvt_ltd",
    label: "Instagram",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com/company/asyncwave-pvt-ltd",
    label: "LinkedIn",
  },
  {
    icon: Github,
    href: "https://github.com/asyncwave-pvt-ltd",
    label: "GitHub",
  },
  { icon: Mail, href: "mailto:contact@asyncwave.in", label: "Email" },
];

const policyLink = (href: string) => (chunks: React.ReactNode) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="underline hover:text-white/60 transition-colors"
  >
    {chunks}
  </a>
);

export default function Footer() {
  const t = useTranslations("footer");
  const serviceLinks = t.raw("serviceLinks") as string[];

  const companyLinks = [
    { label: t("companyLinks.about"), href: "/#why-us" },
    { label: t("companyLinks.blog"), href: "/blog" },
    { label: t("companyLinks.faq"), href: "/#faq" },
    { label: t("companyLinks.contact"), href: "/contact" },
  ];

  return (
    <footer className="bg-[#0D1B2A] text-white border-t border-white/10">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/#hero" className="flex items-center gap-2.5 mb-5">
              <Image
                src="/logo_color.png"
                alt={t("logoAlt")}
                width={36}
                height={36}
                className="rounded-md"
              />
              <span className="text-xl font-bold tracking-wide">Asyncwave</span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              {t("tagline")}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#FF5722] flex items-center justify-center transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#FF5722] mb-5">
              {t("servicesHeading")}
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((label) => (
                <li key={label}>
                  <Link
                    href="/#services"
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#FF5722] mb-5">
              {t("companyHeading")}
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#FF5722] mb-5">
              {t("contactHeading")}
            </h4>
            <div className="space-y-4 text-sm mb-6">
              <div>
                <p className="text-white/40 text-xs mb-1">{t("emailLabel")}</p>
                <a
                  href="mailto:contact@asyncwave.in"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  contact@asyncwave.in
                </a>
              </div>
              <div>
                <p className="text-white/40 text-xs mb-1">
                  {t("whatsappLabel")}
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  +91 7340417987
                </a>
              </div>
              <div>
                <p className="text-white/40 text-xs mb-1">{t("hoursLabel")}</p>
                <p className="text-white/70">{t("hoursValue")}</p>
              </div>
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#FF5722] hover:bg-[#E64A19] text-white text-sm font-bold px-5 py-3 rounded transition-colors"
            >
              {t("sendMessage")}
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
          <p className="text-white/40 text-xs uppercase tracking-widest">
            {t("motto")}
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 -mt-2">
          <p className="text-white/30 text-xs text-center md:text-left">
            {t.rich("recaptchaNotice", {
              privacy: policyLink("https://policies.google.com/privacy"),
              terms: policyLink("https://policies.google.com/terms"),
            })}
          </p>
        </div>
      </div>
    </footer>
  );
}
