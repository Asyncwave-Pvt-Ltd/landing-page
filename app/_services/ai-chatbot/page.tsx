import CaseStudies from "@/components/services/ai-chatbot/case-studies";
import Hero from "@/components/services/ai-chatbot/hero";

export default function AIChatbotServicePage() {
  return (
    <div className="max-w-7xl mx-auto mb-8 space-y-4">
      <Hero />
      <CaseStudies />
    </div>
  );
}
