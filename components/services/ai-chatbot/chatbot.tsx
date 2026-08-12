"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowUp, Bot, MessageCircle, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const chips = [
  "Customer support",
  "Sales / lead qual",
  "Internal ops",
];

type Message = { role: "user" | "assistant"; content: string };

/**
 * `floating` swaps the wide in-page dock for a corner bubble. The dock grows the
 * panel out of its own footprint; the bubble is too small for that, so it leaves
 * `box` null and the panel falls back to its default centred geometry.
 */
export function Chatbot({ floating = false }: { floating?: boolean }) {
  // Viewport box of the trigger, captured on click so the panel can grow out of it.
  // ponytail: not re-measured on resize — Radix locks scroll while open, and a
  // resize mid-conversation is rare enough to not warrant a listener.
  const [box, setBox] = useState<{
    left: number;
    width: number;
    bottom: number;
    height: number;
  } | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, pending]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || pending || !executeRecaptcha) return;

    // Keep the last 20 turns — the whole history is resent on every request.
    const next = [...messages, { role: "user" as const, content: trimmed }].slice(
      -20,
    );
    setMessages(next);
    setInput("");
    setPending(true);

    try {
      const recaptchaToken = await executeRecaptcha("chatbot");
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recaptchaToken, messages: next }),
      });
      const data = await res.json();
      setMessages([
        ...next,
        {
          role: "assistant",
          content: res.ok
            ? data.reply
            : "Something went wrong on our side. Please try again.",
        },
      ]);
    } catch {
      setMessages([
        ...next,
        {
          role: "assistant",
          content: "Something went wrong on our side. Please try again.",
        },
      ]);
    } finally {
      setPending(false);
    }
  }

  return (
    <Dialog>
      {floating ? (
        /* Corner bubble — site-wide entry point */
        <DialogTrigger asChild>
          <Button
            aria-label="Open chat"
            className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#FF5722] p-0 text-white shadow-[0_10px_30px_rgba(12,17,22,.28)] transition-[opacity,transform] duration-200 hover:scale-105 hover:bg-[#FF5722] data-[state=open]:pointer-events-none data-[state=open]:opacity-0"
          >
            <MessageCircle className="size-6" />
          </Button>
        </DialogTrigger>
      ) : (
        /* Dock — the "text box" that expands upward into the chat panel */
        <DialogTrigger asChild>
          <Button
            onClick={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              setBox({
                left: r.left,
                width: r.width,
                bottom: window.innerHeight - r.bottom,
                height: r.height,
              });
            }}
            className="mx-auto z-30 flex h-auto mb-8 w-[640px] max-w-[calc(100vw-32px)] items-center gap-[14px] rounded-full border border-[#e6e9ec] bg-white py-3 pl-[22px] pr-[14px] text-left shadow-[0_18px_44px_rgba(12,17,22,.16)] transition-[opacity,box-shadow] duration-200 hover:shadow-[0_22px_54px_rgba(12,17,22,.22)] data-[state=open]:pointer-events-none data-[state=open]:opacity-0"
          >
            <span className="p-2 shrink-0 rounded-lg bg-[#FF5722]">
              <Bot className="size-5" />
            </span>
            <span className="flex-1 truncate text-[15.5px] text-[#8b949c]">
              Ask our bot which of these fits your use case…
            </span>
            <span className="rounded-full bg-[#0c1116] px-[18px] py-[9px] text-[14px] font-semibold text-white">
              Ask
            </span>
          </Button>
        </DialogTrigger>
      )}

      <DialogContent
        showCloseButton={false}
        aria-describedby={undefined}
        overlayClassName="bg-[#0c1116]/[0.34] backdrop-blur-[6px] duration-200 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
        style={
          box
            ? {
                left: box.left,
                right: "auto",
                bottom: box.bottom,
                width: box.width,
                maxHeight: `calc(100vh - ${box.bottom + 24}px)`,
              }
            : undefined
        }
        className="inset-x-0 top-auto bottom-[34px] mx-auto flex h-[620px] max-h-[calc(100vh-68px)] w-[640px] max-w-[calc(100vw-32px)] translate-x-0 translate-y-0 flex-col gap-0 overflow-hidden rounded-[24px] bg-white p-0 text-base text-[#0c1116] shadow-[0_32px_80px_rgba(12,17,22,.34)] ring-0 origin-bottom duration-200 sm:max-w-[640px] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
      >
        {/* Header */}
        <div className="flex items-center gap-[13px] border-b border-[#eceef0] px-[22px] py-[18px]">
          <div className="flex h-[38px] w-[38px] items-center justify-center rounded-xl bg-[#FF5722]">
            <div className="h-[14px] w-[14px] rounded-[4px] bg-white" />
          </div>
          <div className="flex-1">
            <DialogTitle className="text-[16px] font-extrabold tracking-[-0.01em]">
              Asyncwave Assistant
            </DialogTitle>
            <div className="mt-[3px] flex items-center gap-[6px] font-mono text-[11.5px] text-[#8b949c]">
              <span className="h-[6px] w-[6px] rounded-full bg-[oklch(0.72_0.16_150)]" />
              Online · replies instantly
            </div>
          </div>
          <DialogClose className="flex h-8 w-8 items-center justify-center rounded-[10px] border border-[#e6e9ec] text-[#5c6670] transition-colors hover:bg-[#f8fafb]">
            <X className="h-[15px] w-[15px]" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </div>

        {/* Conversation */}
        <div className="flex flex-1 flex-col gap-[14px] overflow-y-auto bg-[#f8fafb] p-[22px]">
          <div className="self-center font-mono text-[11px] tracking-[0.06em] text-[#a3abb2]">
            TODAY 14:20
          </div>

          <div className="max-w-[78%] self-start rounded-[16px_16px_16px_5px] border border-[#e9edf0] bg-white px-[17px] py-[14px] text-[15px] leading-[1.55]">
            Hi — tell me what you want to automate and I&apos;ll point you to
            the closest project we&apos;ve shipped.
          </div>

          {messages.length === 0 && (
            <div className="flex flex-wrap gap-2 self-start">
              {chips.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => send(chip)}
                  className="rounded-full border border-[#e6e9ec] px-[15px] py-[9px] text-[13.5px] font-medium text-[#5c6670] transition-colors hover:border-[oklch(0.88_0.05_245)] hover:bg-[oklch(0.97_0.02_245)] hover:text-[oklch(0.5_0.14_245)]"
                >
                  {chip}
                </button>
              ))}
            </div>
          )}

          {messages.map((message, i) =>
            message.role === "user" ? (
              <div
                key={i}
                className="max-w-[74%] self-end whitespace-pre-wrap rounded-[16px_16px_5px_16px] bg-[#FF5722] px-[17px] py-[14px] text-[15px] leading-[1.55] text-white"
              >
                {message.content}
              </div>
            ) : (
              <div
                key={i}
                className="max-w-[80%] self-start whitespace-pre-wrap rounded-[16px_16px_16px_5px] border border-[#e9edf0] bg-white px-[17px] py-[14px] text-[15px] leading-[1.55]"
              >
                {message.content}
              </div>
            ),
          )}

          {/* Typing indicator */}
          {pending && (
            <div className="flex gap-[5px] self-start rounded-[16px_16px_16px_5px] border border-[#e9edf0] bg-white px-[16px] py-[14px]">
              <span className="h-[7px] w-[7px] animate-pulse rounded-full bg-[#c3cad0]" />
              <span className="h-[7px] w-[7px] animate-pulse rounded-full bg-[#dde2e6] [animation-delay:150ms]" />
              <span className="h-[7px] w-[7px] animate-pulse rounded-full bg-[#eef1f4] [animation-delay:300ms]" />
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Composer — sized to the trigger so it lands exactly where the dock was */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          style={box ? { height: box.height } : undefined}
          className="flex flex-none items-center gap-3 border-t border-[#eceef0] px-[18px] py-[16px]"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={1000}
            placeholder="Type your message…"
            className="flex-1 rounded-full border border-[#e6e9ec] bg-[#fbfcfd] px-[18px] py-[14px] text-[15px] outline-none placeholder:text-[#a3abb2] focus:border-[oklch(0.88_0.05_245)]"
          />
          <button
            type="submit"
            disabled={pending || !input.trim()}
            className="flex h-[46px] w-[46px] flex-none items-center justify-center rounded-full bg-[#FF5722] text-white transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            <ArrowUp className="h-[19px] w-[19px]" />
            <span className="sr-only">Send</span>
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
