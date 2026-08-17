"use client";

import { Globe, ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  defaultLocale,
  localeNames,
  locales,
  LOCALE_PARAM,
  type Locale,
} from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Same page, same query, different ?lang= — default locale drops the param.
  function hrefFor(next: Locale) {
    const params = new URLSearchParams(searchParams);
    if (next === defaultLocale) params.delete(LOCALE_PARAM);
    else params.set(LOCALE_PARAM, next);
    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={t("language")}
          className={cn(
            "flex items-center gap-1 text-white md:text-gray-900 outline-none min-w-max",
            className,
          )}
        >
          <Globe className="w-4 h-4" />
          {localeNames[locale as Locale]}
          <ChevronDown className="w-4 h-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={0}
        className="p-0 rounded-none border-y-2 border-y-[#FF5722] ring-0"
      >
        {locales.map((l) => (
          <DropdownMenuItem
            key={l}
            className={cn(
              "w-full rounded-none px-4 py-2 outline-none cursor-pointer",
              l === locale && "font-semibold text-[#FF5722]",
            )}
            // replace() so language switches don't pile up in browser history
            onSelect={() => router.replace(hrefFor(l))}
          >
            {localeNames[l]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
