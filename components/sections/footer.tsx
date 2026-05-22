"use client";

import Image from "next/image";
import { Linkedin, Github, Mail } from "lucide-react";
import { useContactDialog } from "@/components/contact-dialog";

const serviceLinks = [
  { label: "AI Product Development", href: "#services" },
  { label: "AI Chatbot Development", href: "#services" },
  { label: "Specialized AI Solutions", href: "#services" },
  { label: "Agentic Workflows", href: "#services" },
  { label: "Web & Mobile Apps", href: "#services" },
];

const companyLinks = [
  { label: "About Us", href: "#why-us" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Blogs", href: "/blog" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: Linkedin, href: "https://linkedin.com/company/asyncwave-pvt-ltd", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/asyncwave-pvt-ltd", label: "GitHub" },
  { icon: Mail, href: "mailto:contact@asyncwave.in", label: "Email" },
];

export default function Footer() {
  const contactDialog = useContactDialog();
  return (
    <footer className="bg-[#0D1B2A] text-white border-t border-white/10">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <a
              href="#hero"
              className="flex items-center gap-2.5 mb-5"
            >
              <Image
                src="/logo_color.png"
                alt="Asyncwave — AI Development Company India"
                width={36}
                height={36}
                className="rounded-md"
              />
              <span className="text-xl font-bold tracking-wide">Asyncwave</span>
            </a>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Assisting Human Intelligence. We build AI-powered products,
              chatbots, and automated workflows that amplify what your team can
              do.
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
              Services
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#FF5722] mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#FF5722] mb-5">
              Get in Touch
            </h4>
            <div className="space-y-4 text-sm mb-6">
              <div>
                <p className="text-white/40 text-xs mb-1">Email</p>
                <a
                  href="mailto:contact@asyncwave.in"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  contact@asyncwave.in
                </a>
              </div>
              <div>
                <p className="text-white/40 text-xs mb-1">Whatsapp</p>
                <a
                  href="https://wa.me/917340417987?text=Hello%20Asyncwave!%20I%20would%20like%20to%20inquire%20about%20your%20AI%20development%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  +91 7340417987
                </a>
              </div>
              <div>
                <p className="text-white/40 text-xs mb-1">Working Hours</p>
                <p className="text-white/70">Mon – Fri, 9am – 6pm IST</p>
              </div>
            </div>
            <button
              onClick={() => contactDialog?.openDialog()}
              className="inline-flex items-center gap-2 bg-[#FF5722] hover:bg-[#E64A19] text-white text-sm font-bold px-5 py-3 rounded transition-colors"
            >
              Send a Message
            </button>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © 2025 Asyncwave. All rights reserved.
          </p>
          <p className="text-white/40 text-xs uppercase tracking-widest">
            Assisting Human Intelligence
          </p>
        </div>
      </div>
    </footer>
  );
}
