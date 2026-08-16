"use client";

import { useTransition } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "@/i18n/navigation";
import { localeNames, routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={t("language")}
          disabled={pending}
          className={cn(
            "flex items-center gap-1 text-white md:text-gray-900 outline-none min-w-max disabled:opacity-60",
            className,
          )}
        >
          <Globe className="w-4 h-4" />
          {localeNames[locale as keyof typeof localeNames]}
          <ChevronDown className="w-4 h-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={0}
        className="p-0 rounded-none border-y-2 border-y-[#FF5722] ring-0"
      >
        {routing.locales.map((l) => (
          <DropdownMenuItem
            key={l}
            className={cn(
              "w-full rounded-none px-4 py-2 outline-none cursor-pointer",
              l === locale && "font-semibold text-[#FF5722]",
            )}
            onSelect={() =>
              startTransition(() => router.replace(pathname, { locale: l }))
            }
          >
            {localeNames[l]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
