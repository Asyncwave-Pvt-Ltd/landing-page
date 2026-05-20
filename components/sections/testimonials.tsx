import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";

const reviews = [
  {
    name: "Sarah Mitchell",
    role: "CEO, RetailTech Inc.",
    review:
      "Asyncwave delivered our AI chatbot ahead of schedule. The bot handles 80% of customer queries without human intervention. Absolutely outstanding work.",
    rating: 5,
  },
  {
    name: "James Okafor",
    role: "Head of Ops, FinEdge",
    review:
      "The agentic workflow they built for our sales team saves us 20+ hours every week. The quality of work and communication throughout was exceptional.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Founder, EduSpark",
    review:
      "Our AI tutoring platform has transformed how students learn. Asyncwave truly understood our vision and executed it flawlessly. Highly recommend.",
    rating: 5,
  },
  {
    name: "David Chen",
    role: "CTO, LogisticsPro",
    review:
      "From concept to launch in 8 weeks. The team's AI expertise is world-class, and they stayed within budget. We're already planning our next project with them.",
    rating: 5,
  },
  {
    name: "Emily Watson",
    role: "Product Manager, HealthAI",
    review:
      "Transparent, fast, and deeply skilled in AI. They helped us build something we couldn't have done in-house. The ongoing support has been excellent.",
    rating: 5,
  },
  {
    name: "Carlos Rivera",
    role: "Director, MediaGroup",
    review:
      "We needed a specialized AI solution and Asyncwave nailed it. They asked the right questions, moved quickly, and the end result exceeded our expectations.",
    rating: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-[#FF5722] text-[#FF5722]" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-[#FF5722] text-xs font-bold uppercase tracking-widest mb-4">
            <span className="w-6 h-[2px] bg-[#FF5722]" />
            Client Reviews
            <span className="w-6 h-[2px] bg-[#FF5722]" />
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0D1B2A] mb-4">
            What Our Clients Say
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            We let our work speak for itself — but our clients' words mean even more.
          </p>
        </div>

        {/* Reviews grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <Card
              key={r.name}
              className="bg-[#F8F9FA] border border-gray-100 rounded-lg p-7 hover:shadow-md transition-shadow"
            >
              <Stars count={r.rating} />
              <p className="text-gray-600 text-sm leading-relaxed my-5">
                &ldquo;{r.review}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <div className="w-10 h-10 rounded-full bg-[#FF5722] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-[#0D1B2A] text-sm">{r.name}</div>
                  <div className="text-gray-400 text-xs">{r.role}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
