import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { fromZodError } from "zod-validation-error";
import { ZodError } from "zod";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { KNOWLEDGE_BASE } from "@/lib/knowledge";
import { chatRequestSchema } from "@/lib/schema";

const SYSTEM_PROMPT = `You are the assistant on Asyncwave's website.

Answer only using the facts inside <knowledge_base>. It is your single source of
truth. If the answer is not in there, say you don't have that detail and point
the person to the contact form at /contact. Never guess, never fill gaps from
general knowledge, and never discuss anything unrelated to Asyncwave — for
off-topic questions, say that's outside what you can help with and steer back.

Keep replies under 60 words. Plain text, no markdown.

<knowledge_base>
${KNOWLEDGE_BASE}
</knowledge_base>`;

// DeepSeek speaks the OpenAI chat-completions protocol, so the openai SDK
// works as-is — only the base URL and key change.
const client = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.DEEPSEEK_API_KEY,
});

// Swap via env — no code change needed.
const MODEL = process.env.DEEPSEEK_MODEL ?? "deepseek-chat";

export async function POST(request: NextRequest) {
  try {
    const { recaptchaToken, messages } = chatRequestSchema.parse(
      await request.json(),
    );

    const recaptchaOk = await verifyRecaptcha(recaptchaToken);
    if (!recaptchaOk) {
      return NextResponse.json(
        { message: "reCAPTCHA verification failed" },
        { status: 400 },
      );
    }

    // System prompt stays first and byte-identical so DeepSeek's automatic
    // context caching keeps hitting on the knowledge base.
    const response = await client.chat.completions.create({
      model: MODEL,
      max_tokens: 1024,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
    });

    const reply = response.choices[0]?.message.content?.trim() ?? "";

    return NextResponse.json({
      reply:
        reply ||
        "Sorry — I couldn't answer that one. Try the contact form at /contact.",
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const validationError = fromZodError(error);
      return NextResponse.json(
        { message: "Validation error", errors: validationError.details },
        { status: 400 },
      );
    }
    console.error("Chat error:", error);
    return NextResponse.json(
      { message: "An error occurred while processing your message" },
      { status: 500 },
    );
  }
}
