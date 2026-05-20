"use client";

import Image from "next/image";
import { Linkedin, Twitter, Github, Mail } from "lucide-react";

const serviceLinks = [
  { label: "AI Product Development", id: "services" },
  { label: "AI Chatbot Development", id: "services" },
  { label: "Specialized AI Solutions", id: "services" },
  { label: "Agentic Workflows", id: "services" },
  { label: "Web & Mobile Apps", id: "services" },
];

const companyLinks = [
  { label: "About Us", id: "why-us" },
  { label: "How We Work", id: "how-we-work" },
  { label: "Case Studies", id: "case-studies" },
  { label: "FAQ", id: "faq" },
  { label: "Contact", id: "contact" },
];

const socialLinks = [
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Mail, href: "mailto:hello@asyncwave.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0D1B2A] text-white border-t border-white/10">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2.5 mb-5"
            >
              <Image
                src="/logo_color.png"
                alt="Asyncwave"
                width={36}
                height={36}
                className="rounded-md"
              />
              <span className="text-xl font-bold tracking-wide">Asyncwave</span>
            </button>
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
                  <button className="text-white/60 hover:text-white text-sm transition-colors text-left">
                    {link.label}
                  </button>
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
                  <button className="text-white/60 hover:text-white text-sm transition-colors text-left">
                    {link.label}
                  </button>
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
                  href="mailto:hello@asyncwave.com"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  hello@asyncwave.com
                </a>
              </div>
              <div>
                <p className="text-white/40 text-xs mb-1">Working Hours</p>
                <p className="text-white/70">Mon – Fri, 9am – 6pm IST</p>
              </div>
            </div>
            <button className="inline-flex items-center gap-2 bg-[#FF5722] hover:bg-[#E64A19] text-white text-sm font-bold px-5 py-3 rounded transition-colors">
              Send a Message
            </button>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Asyncwave. All rights reserved.
          </p>
          <p className="text-white/40 text-xs uppercase tracking-widest">
            Assisting Human Intelligence
          </p>
        </div>
      </div>
    </footer>
  );
}
