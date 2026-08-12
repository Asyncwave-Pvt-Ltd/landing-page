/**
 * The chatbot's single source of truth. It answers from this and nothing else.
 * Edit this file to change what the bot knows — no redeploy of anything else needed.
 *
 * ponytail: plain string stuffed into the system prompt, no embeddings/vector DB.
 * At this size (~1k tokens) retrieval would cost more than it saves. Revisit if
 * this file grows past ~50k tokens.
 */
export const KNOWLEDGE_BASE = `
# Asyncwave

An AI development company based in India. We build AI products end-to-end, from
concept to production.

Contact: contact@asyncwave.in — or the contact form at /contact, which asks for
budget, timeline, and which services you need. We reply within 24 hours.

## Services

1. AI Product Development — architect and build AI-powered products end-to-end,
   from model integration to deployment.
2. AI Chatbot Development — chatbots that understand context, resolve queries
   instantly, and provide 24/7 support across every channel customers use.
3. Custom AI Solutions & LLM Integration — personal tutors, assistants,
   recommendation engines, tailored to a specific domain.
4. Agentic Workflow Automation — multi-step processes such as report generation,
   customer management, and sales pipelines, run by agents.
5. Web & Mobile Development — high-performance web and mobile apps with cloud
   deployment, scalability, and ongoing support.

## Case studies

- E-Commerce Support Bot — context-aware AI assistant handling 80% of customer
  queries. Stack: OpenAI GPT-4, Next.js, AWS.
- Automated Sales Pipeline — multi-agent workflow that qualifies leads, drafts
  outreach, and schedules follow-ups with no human intervention. Stack:
  LangChain, Claude, CRM integration.
- AI-Powered Learning Platform — personalized tutor that adapts to each
  student's pace, identifies knowledge gaps, and delivers targeted content.
  Stack: Anthropic Claude, React Native, GCP.
- Real-Time Analytics Dashboard — full-stack SaaS with AI-driven insights,
  real-time visualization, and predictive analytics. Stack: Next.js,
  TypeScript, D3.js.

## Not yet documented

Pricing, engagement models, team size, and delivery timelines are not recorded
here. If asked, say so and point the user to the contact form.
`.trim();
