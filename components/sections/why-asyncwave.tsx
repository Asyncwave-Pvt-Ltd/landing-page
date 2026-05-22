"use client";

import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useContactDialog } from "../contact-dialog";

const reasons = [
  "Deep specialization in AI & LLM technologies",
  "End-to-end delivery from concept to production",
  "Rapid prototyping with no compromise on quality",
  "Transparent communication throughout the project",
  "Ongoing support and continuous optimization",
  "Proven results across diverse industries",
];

export default function WhyAsyncwave() {
  const contactDialog = useContactDialog();
  return (
    <section id="why-us" className="py-24 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image placeholder grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square rounded-lg overflow-clip">
                <Image
                  src="/why-asyncwave-1.jpg"
                  alt="Hero Image"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-clip mt-8">
                <Image
                  src="/why-asyncwave-2.webp"
                  alt="Hero Image"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-clip -mt-8">
                <Image
                  src="/why-asyncwave-3.webp"
                  alt="Hero Image"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-clip">
                <Image
                  src="/why-asyncwave-4.jpeg"
                  alt="Hero Image"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            {/* Experience badge */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#FF5722] text-white rounded-lg px-6 py-4 text-center shadow-xl">
              <div className="text-3xl font-extrabold">2+</div>
              <div className="text-sm font-medium">Years in AI</div>
            </div>
          </div>

          {/* Right: Text + checklist */}
          <div>
            <span className="inline-flex items-center gap-2 text-[#FF5722] text-xs font-bold uppercase tracking-widest mb-4">
              <span className="w-6 h-[2px] bg-[#FF5722]" />
              Why Choose Us
            </span>

            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0D1B2A] mb-6 leading-tight">
              What Makes Asyncwave
              <br />
              <span className="text-[#FF5722]">Different</span>
            </h2>

            <p className="text-gray-500 mb-8 leading-relaxed">
              We're a focused AI studio that takes your project seriously. Small
              enough to care deeply, experienced enough to deliver reliably.
            </p>

            <ul className="space-y-4 mb-10">
              {reasons.map((reason) => (
                <li key={reason} className="flex items-start gap-3">
                  <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-[#FF5722] flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </span>
                  <span className="text-gray-600 text-sm">{reason}</span>
                </li>
              ))}
            </ul>

            <Button
              className="inline-flex items-center gap-2 bg-[#FF5722] hover:bg-[#E64A19] text-white font-bold px-8 py-4 rounded transition-colors text-sm uppercase tracking-wide"
              onClick={() => contactDialog?.openDialog()}
            >
              Start a Project <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
