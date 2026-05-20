"use client";

import { ArrowRight } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="bg-[#FF5722] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
              Ready to Elevate Your Business
              <br className="hidden md:block" />
              with AI?
            </h2>
            <p className="text-white/80 mt-3 max-w-xl">
              Let&apos;s talk about your project. We respond within 24 hours.
            </p>
          </div>
          <button className="flex-shrink-0 inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-[#FF5722] font-bold px-8 py-4 rounded transition-colors text-sm uppercase tracking-wide">
            Get a Free Quote <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
