import { Lightbulb, Hammer, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Lightbulb,
    title: "Discover",
    description:
      "We start with a deep dive into your goals, constraints, and users. We ask the right questions to understand what you really need — not just what was asked for.",
  },
  {
    number: "02",
    icon: Hammer,
    title: "Build",
    description:
      "We design, prototype, and iterate quickly. Short cycles, frequent check-ins — you always know where things stand and can provide feedback.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Launch",
    description:
      "We deploy to production with confidence. CI/CD pipelines, monitoring, and documentation included. After launch, we stay engaged to optimise and support growth.",
  },
];

export default function HowWeWork() {
  return (
    <section id="how-we-work" className="py-24 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-[#FF5722] text-xs font-bold uppercase tracking-widest mb-4">
            <span className="w-6 h-[2px] bg-[#FF5722]" />
            Our Process
            <span className="w-6 h-[2px] bg-[#FF5722]" />
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0D1B2A] mb-4">
            How We Work
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            A simple, transparent process designed to get you results fast.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting dashed line */}
          <div className="hidden md:block absolute top-12 left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-px border-t-2 border-dashed border-[#FF5722]/30" />

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="relative text-center">
                {/* Number circle */}
                <div className="relative inline-flex mb-6">
                  <div className="w-24 h-24 rounded-full bg-[#FF5722] flex items-center justify-center shadow-lg">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#0D1B2A] border-2 border-[#FF5722] text-white text-xs font-extrabold flex items-center justify-center">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#0D1B2A] mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
