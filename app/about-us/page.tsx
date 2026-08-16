import type { Metadata } from "next";
import {
  Bot,
  Workflow,
  Code2,
  Globe,
  Brain,
  ArrowRight,
  ArrowLeft,
  ArrowDown,
  MessagesSquare,
  BadgeCheck,
  Eye,
  TrendingUp,
} from "lucide-react";
import CTABanner from "@/components/sections/cta-banner";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Asyncwave — AI & Software Development Company",
  description:
    "Asyncwave is an AI and software development company helping startups, SMEs, and growing businesses turn complex ideas into practical digital solutions.",
  keywords: [
    "about Asyncwave",
    "AI development company India",
    "AI automation company",
    "custom software development India",
    "AI agents development",
  ],
  alternates: {
    canonical: "https://asyncwave.in/about-us",
  },
  openGraph: {
    title: "About Asyncwave — AI & Software Development Company",
    description:
      "We combine AI, automation, software engineering, and product thinking to help businesses move from an idea or manual process to a reliable, scalable solution.",
    url: "https://asyncwave.in/about-us",
    siteName: "Asyncwave",
    type: "website",
  },
};

const buildings = [
  {
    icon: Bot,
    title: "AI Agents",
    description:
      "Agents that handle real workflows end to end — not demos that break on the second question.",
  },
  {
    icon: Workflow,
    title: "AI Automation Systems",
    description:
      "Automate the repetitive, manual work that quietly eats hours out of every week.",
  },
  {
    icon: Code2,
    title: "Custom Software",
    description:
      "Software built around how your business actually runs, instead of the other way around.",
  },
  {
    icon: Globe,
    title: "Web Applications",
    description:
      "Fast, reliable, production-grade web apps — designed, built, shipped, and supported.",
  },
  {
    icon: Brain,
    title: "Intelligent Business Solutions",
    description:
      "Systems that use your data to make better decisions and surface what matters.",
  },
];

const beliefs = [
  {
    icon: MessagesSquare,
    title: "Honest Communication",
    description:
      "Straight answers about scope, timelines, and limitations, including when the answer is no.",
  },
  {
    icon: BadgeCheck,
    title: "Quality Work",
    description:
      "Built to run in production, not to pass a demo. Tested, documented, maintainable.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description:
      "You always know what we're working on, where things stand, and what comes next.",
  },
  {
    icon: TrendingUp,
    title: "Continuous Improvement",
    description:
      "We stay engaged after launch and keep refining as your business changes.",
  },
];

const steps = [
  {
    title: "Understand the scope",
    description:
      "We start by understanding the project scope and clarifying requirements — what the problem actually is, before anyone writes code.",
  },
  {
    title: "Free planning session",
    description:
      "We hold a free meeting session where we present the plan layout and the budget details, so you know the shape and the cost up front.",
  },
  {
    title: "Build a POC",
    description:
      "We move to a proof of concept first. This lets you see your idea in action, on a smaller scale, before committing to the full build.",
  },
  {
    title: "Full-scale build",
    description:
      "Only after the POC succeeds in initial trials and shows potential in testing do we start building the full-fledged, scalable solution.",
  },
  {
    title: "Monitored testing",
    description:
      "We hand over the built solution and run it under monitored conditions for final testing before release.",
  },
  {
    title: "Release and improve",
    description:
      "We release the product to real users and keep improving it continuously as your business changes.",
  },
];

// Steps 1-3 fill row one left to right; steps 4-6 are pinned right to left on row two.
const stepPlacement = [
  "",
  "",
  "",
  "sm:col-start-3 sm:row-start-2",
  "sm:col-start-2 sm:row-start-2",
  "sm:col-start-1 sm:row-start-2",
];
// Arrow from each step to the next one, following the snake direction.
const stepArrows = [
  { icon: ArrowRight, className: "top-1/2 -right-10 -translate-y-1/2" },
  { icon: ArrowRight, className: "top-1/2 -right-10 -translate-y-1/2" },
  { icon: ArrowDown, className: "-bottom-16 left-1/2 -translate-x-1/2" },
  { icon: ArrowLeft, className: "top-1/2 -left-10 -translate-y-1/2" },
  { icon: ArrowLeft, className: "top-1/2 -left-10 -translate-y-1/2" },
  null,
];

export default function AboutUsPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-[#0D1B2A] pt-36 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 text-[#FF5722] text-xs font-bold uppercase tracking-widest mb-4">
            <span className="w-6 h-[2px] bg-[#FF5722]" />
            About Asyncwave
            <span className="w-6 h-[2px] bg-[#FF5722]" />
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            We build technology that actually{" "}
            <span className="text-[#FF5722]">works for your business</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
            Asyncwave is an AI development company. We help startups, SMEs, and
            growing businesses build AI agents, automation systems, and software
            solutions that solve real operational problems.
          </p>
        </div>
      </section>

      {/* Who we work with + what we build */}
      {/* <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-[#FF5722] text-xs font-bold uppercase tracking-widest mb-4">
              <span className="w-6 h-[2px] bg-[#FF5722]" />
              What We Build
              <span className="w-6 h-[2px] bg-[#FF5722]" />
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0D1B2A] mb-4">
              Built for startups, SMEs, and growing businesses
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
              We work with teams that have a real problem to solve — an idea
              waiting to ship, or a manual process that has outgrown
              spreadsheets.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {buildings.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group rounded-lg border border-gray-200 bg-white p-8 transition-colors hover:border-[#FF5722]"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#FFF3F0] flex items-center justify-center mb-5 transition-colors group-hover:bg-[#FF5722]">
                    <Icon className="w-6 h-6 text-[#FF5722] transition-colors group-hover:text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0D1B2A] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section> */}

      {/* How we work */}
      <section className="pt-24 pb-12 bg-[#F8F9FA] px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 text-[#FF5722] text-xs font-bold uppercase tracking-widest mb-4">
              <span className="w-6 h-[2px] bg-[#FF5722]" />
              How We Work
              <span className="w-6 h-[2px] bg-[#FF5722]" />
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0D1B2A] mb-4 leading-tight">
              Understand the problem first,{" "}
              <span className="text-[#FF5722]">then build the technology</span>
            </h2>
            <p className="text-gray-500 leading-relaxed">
              Six steps from an idea or manual process to a reliable, scalable
              solution running in production.
            </p>
          </div>

          {/* Snake flow: steps 1-3 left to right, steps 4-6 right to left */}
          <ol className="grid gap-y-14 sm:grid-cols-3 sm:gap-x-14 sm:gap-y-24">
            {steps.map((step, i) => {
              const Arrow = stepArrows[i];
              return (
                <li
                  key={step.title}
                  className={`group relative ${stepPlacement[i]}`}
                >
                  <div className="relative h-full rounded-xl border border-gray-200 bg-white px-6 pt-8 pb-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FF5722]/40 hover:shadow-xl">
                    <span className="absolute -top-5 left-6 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF5722] to-[#FF8A50] text-sm font-bold text-white shadow-lg ring-4 ring-[#F8F9FA]">
                      {i + 1}
                    </span>
                    <span className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-[#FF5722]/70">
                      Step {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mb-2 text-base font-bold text-[#0D1B2A]">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-500">
                      {step.description}
                    </p>
                  </div>

                  {Arrow && (
                    <Arrow.icon
                      aria-hidden
                      strokeWidth={2.5}
                      className={`hidden sm:block absolute w-6 h-6 text-[#FF5722]/50 ${Arrow.className}`}
                    />
                  )}
                </li>
              );
            })}
          </ol>
        </div>
        <Link
          href={`/contact`}
          className="mx-auto flex-shrink-0 inline-flex items-center gap-2 bg-[#FF5722] hover:bg-[#df542a] text-white font-bold px-8 py-4 rounded transition-colors text-sm uppercase tracking-wide"
        >
        Lets get started <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* What we believe */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-[#FF5722] text-xs font-bold uppercase tracking-widest mb-4">
              <span className="w-6 h-[2px] bg-[#FF5722]" />
              Our Mission
              <span className="w-6 h-[2px] bg-[#FF5722]" />
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0D1B2A] mb-4">
              Real value addition, No bluff
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Our mission is to add real value to your business. We do quality
              work, and with quality idea.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {beliefs.map((belief) => {
              const Icon = belief.icon;
              return (
                <div key={belief.title} className="text-center">
                  <div className="inline-flex w-16 h-16 rounded-full bg-[#FF5722] items-center justify-center shadow-lg mb-5">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0D1B2A] mb-2">
                    {belief.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
                    {belief.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing statement */}
      <section className="bg-[#0D1B2A] py-20 px-4">
        <p className="max-w-3xl mx-auto text-center text-2xl md:text-3xl font-extrabold text-white leading-snug">
          Our goal is not just to build software. It&apos;s to build technology
          that <span className="text-[#FF5722]">actually works</span> for your
          business.
        </p>
      </section>

      <CTABanner />
    </main>
  );
}
