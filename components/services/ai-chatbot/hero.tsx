import { Badge } from "@/components/ui/badge";
import { Chatbot } from "./chatbot";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function Hero() {
  const t = await getTranslations("serviceChatbot");

  return (
    <section className="bg-[linear-gradient(180deg,#f7f9fb_0%,#fff_100%)] px-6 pb-[56px] pt-32 text-center md:px-16">
      <Badge
        variant="outline"
        className="gap-[9px] border-[#FF5722] bg-[#FF572222] px-[15px] py-[7px] font-mono text-[12px] font-medium tracking-[0.06em] text-[#FF5722]"
      >
        <span className="h-[6px] w-[6px] rounded-full bg-[#FF5722]" />
        {t("badge")}
      </Badge>

      <h1 className="mx-auto mt-[26px] max-w-[880px] text-balance text-[40px] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[62px]">
        {t("titlePrefix")}{" "}
        <span className="text-[#FF5722]">{t("titleHighlight")}</span>
      </h1>

      <p className="mx-auto mt-[22px] mb-[22px] max-w-[620px] text-pretty text-[18px] leading-[1.6] text-[#5c6670]">
        {t("subtitle")}
      </p>

      <Chatbot />

      <Link
        href="/contact"
        className="w-full md:w-auto h-auto rounded-xl bg-[#FF5722] hover:bg-[#E64A19] px-7 py-[15px] text-[15px] font-semibold text-white"
      >
        {t("cta")}
      </Link>
    </section>
  );
}
