const cases = [
  {
    category: "AI Chatbot",
    title: "E-Commerce Support Bot",
    description:
      "Built a context-aware AI assistant that handles 80% of customer queries ",
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

export function CaseStudyCard({}) {
  return (
    <div className="flex h-full gap-[13px] rounded-[16px] border border-[#e9edf0] bg-white p-[13px] text-left transition-shadow hover:shadow-[0_4px_14px_rgba(12,17,22,.08)]">
      <div className="h-[60px] w-[74px] flex-none rounded-[10px] bg-[repeating-linear-gradient(135deg,#eef1f4_0_8px,#f6f8f9_8px_16px)]" />
      <div className="flex-1">
        <div className="font-mono text-[10.5px] tracking-[0.06em] text-[#8b949c]">
          CASE STUDY · FINTECH
        </div>
        <div className="mt-[5px] text-[14.5px] font-bold tracking-[-0.01em]">
          Multilingual support bot, −62% tickets
        </div>
        <div className="mt-[6px] text-[13px] font-semibold text-[oklch(0.62_0.15_245)]">
          Read the breakdown →
        </div>
      </div>
    </div>
  );
}

export default function CaseStudies() {
  return (
    <section
      id="case-studies"
      className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth"
    >
      {/* Cards */}
      {cases.map((c) => (
        <div
          key={c.title}
          className="w-full flex-none snap-start md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] xl:w-[calc(25%-1.125rem)]"
        >
          <CaseStudyCard />
        </div>
      ))}
    </section>
  );
}
