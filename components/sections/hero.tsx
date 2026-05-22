"use client";

import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useContactDialog } from "@/components/contact-dialog";
import Link from "next/link";

const stats = [
  { value: "20+", label: "Projects Delivered" },
  { value: "10+", label: "Happy Clients" },
  { value: "2+", label: "Years Experience" },
  { value: "100%", label: "Client Satisfaction" },
];

export default function Hero() {
  const contactDialog = useContactDialog();
  return (
    <section
      id="hero"
      className="relative bg-[#0D1B2A] overflow-hidden min-h-screen flex flex-col"
    >
      {/* Orange geometric accent — top right */}
      <div className="hidden sm:block absolute top-0 right-0 w-0 h-0 border-l-[320px] border-l-transparent border-t-[320px] border-t-[#FF5722] opacity-90 pointer-events-none" />
      <div className="hidden sm:block absolute top-0 right-0 w-0 h-0 border-l-[220px] border-l-transparent border-t-[220px] border-t-[#E64A19] opacity-60 pointer-events-none" />

      {/* Main content */}
      <div className="flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="w-8 h-[2px] bg-[#FF5722]" />
                <span className="text-[#FF5722] text-xs font-bold uppercase tracking-widest">
                  AI-First Software Studio
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-white leading-tight mb-6">
                Elevate Your Business
                <br />
                with <span className="text-[#FF5722]"> AI Excellence</span>
              </h1>

              <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-lg">
                We build AI-powered products, intelligent chatbots, and
                automated workflows that amplify what your team can do — from
                concept to production.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => contactDialog?.openDialog()}
                  className="bg-[#FF5722] hover:bg-[#E64A19] text-white font-bold px-8 py-6 rounded transition-colors text-sm uppercase tracking-wide"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Link
                  href="/#services"
                  className="bg-transparent hover:bg-transparent border-2 border-white/30 hover:border-[#FF5722] text-white hover:text-[#FF5722] font-bold px-8 py-3 rounded transition-colors text-sm uppercase tracking-wide"
                >
                  Explore Services
                  <ChevronRight className="w-4 h-4 inline-block mb-1 ml-2" />
                </Link>
              </div>
            </div>

            <div className="hidden lg:flex items-center justify-center">
              <div className="w-full max-w-md aspect-square rounded-2xl bg-white/5 border border-white/10 overflow-clip">
                <Image
                  src="/hero.jpeg"
                  alt="Hero Image"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="border-t border-white/10 bg-[#0F2231]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`py-7 px-6 text-center ${
                  i < stats.length - 1 ? "border-r border-white/10" : ""
                }`}
              >
                <div className="text-3xl font-extrabold text-[#FF5722] mb-1">
                  {stat.value}
                </div>
                <div className="text-white/60 text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
