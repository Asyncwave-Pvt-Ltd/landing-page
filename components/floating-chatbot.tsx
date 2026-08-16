"use client";

import { usePathname } from "@/i18n/navigation";
import { Chatbot } from "@/components/services/ai-chatbot/chatbot";

/** Site-wide chat bubble. Hidden where the hero dock is already the entry point. */
export function FloatingChatbot() {
  const pathname = usePathname();
  if (pathname === "/services/ai-chatbot") return null;
  return <Chatbot floating />;
}
