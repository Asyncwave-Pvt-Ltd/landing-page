import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Chatbot } from "./chatbot";
import Link from "next/link";

const stats = [
  { value: "20+", label: "PROJECTS DELIVERED" },
  { value: "2–4 wk", label: "TYPICAL BUILD" },
  { value: "24/7", label: "COVERAGE" },
  { value: "100%", label: "CLIENT SATISFACTION" },
];

export default function Hero() {
  return (
    <section className="bg-[linear-gradient(180deg,#f7f9fb_0%,#fff_100%)] px-6 pb-[56px] pt-32 text-center md:px-16">
      <Badge
        variant="outline"
        className="gap-[9px] border-[#FF5722] bg-[#FF572222] px-[15px] py-[7px] font-mono text-[12px] font-medium tracking-[0.06em] text-[#FF5722]"
      >
        <span className="h-[6px] w-[6px] rounded-full bg-[#FF5722]" />
        AI CHATBOT DEVELOPMENT
      </Badge>

      <h1 className="mx-auto mt-[26px] max-w-[880px] text-balance text-[40px] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[62px]">
        Chatbots that understand context,{" "}
        <span className="text-[#FF5722]">not just keywords</span>
      </h1>

      <p className="mx-auto mt-[22px] mb-[22px] max-w-[620px] text-pretty text-[18px] leading-[1.6] text-[#5c6670]">
        Intelligent chatbots that resolve queries instantly and provide 24/7
        support across every channel your customers use — from concept to
        production.
      </p>

       <Chatbot />

        <Link href={"/contact"} className="w-full md:w-auto h-auto rounded-xl bg-[#FF5722] hover:bg-[#E64A19] px-7 py-[15px] text-[15px] font-semibold text-white">
          Get Started
        </Link>

      {/* <div className="mx-auto mt-[56px] flex max-w-[900px] flex-wrap justify-center gap-x-[64px] gap-y-8 border-t border-[#eceef0] pt-[34px]">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="text-[34px] font-extrabold tracking-[-0.03em]">
              {s.value}
            </div>
            <div className="mt-[6px] font-mono text-[12px] tracking-[0.05em] text-[#8b949c]">
              {s.label}
            </div>
          </div>
        ))}
      </div> */}
    </section>
  );
}
