import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const cases = [
  {
    category: "AI Chatbot",
    title: "E-Commerce Support Bot",
    description:
      "Built a context-aware AI assistant that handles 80% of customer queries autonomously, reducing support costs significantly.",
    tags: ["OpenAI GPT-4", "Next.js", "AWS"],
  },
  {
    category: "Agentic Workflow",
    title: "Automated Sales Pipeline",
    description:
      "Deployed multi-agent workflow that qualifies leads, drafts outreach, and schedules follow-ups — all without human intervention.",
    tags: ["LangChain", "Claude", "CRM Integration"],
  },
  {
    category: "AI Product",
    title: "AI-Powered Learning Platform",
    description:
      "Personalized tutor that adapts to each student's learning pace, identifying knowledge gaps and delivering targeted content.",
    tags: ["Anthropic Claude", "React Native", "GCP"],
  },
  {
    category: "Web & Mobile",
    title: "Real-Time Analytics Dashboard",
    description:
      "Full-stack SaaS with AI-driven insights, real-time data visualization, and predictive analytics for business intelligence.",
    tags: ["Next.js", "TypeScript", "D3.js"],
  },
];

export default function CaseStudies() {
  return (
    <section id="case-studies" className="py-24 bg-[#0D1B2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="inline-flex items-center gap-2 text-[#FF5722] text-xs font-bold uppercase tracking-widest mb-4">
              <span className="w-6 h-[2px] bg-[#FF5722]" />
              Our Work
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
              Case Studies
            </h2>
          </div>
          <p className="text-white/50 max-w-xs text-sm">
            A selection of recent projects that showcase what we build.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {cases.map((c) => (
            <Card
              key={c.title}
              className="group bg-[#0F2231] border border-white/10 rounded-lg p-8 hover:border-[#FF5722] transition-colors cursor-pointer"
            >
              <span className="inline-block text-[#FF5722] text-xs font-bold uppercase tracking-widest mb-4">
                {c.category}
              </span>
              <h3 className="text-xl font-bold text-white mb-3">{c.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                {c.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {c.tags.map((tag) => (
                  <Badge
                    key={tag}
                    className="text-xs bg-white/10 text-white/70 px-3 py-1 rounded-full border-transparent"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <span className="inline-flex items-center gap-1 text-[#FF5722] text-sm font-semibold group-hover:gap-2 transition-all">
                View Case Study <ArrowRight className="w-4 h-4" />
              </span>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
