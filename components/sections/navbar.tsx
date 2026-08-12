"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useBreakpoint } from "@/hooks/use-breakpoint";

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Company",
    href: "/",
    subMenu: [
      { label: "About Us", href: "/#why-us" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    label: "Services",
    href: "/#services",
    // subMenu: [
    //   {
    //     label: "AI powered Chatbot Development",
    //     href: "/services/ai-chatbot",
    //   },
    //   {
    //     label: "Productive Analysis and Forecasting",
    //     href: "/#services",
    //   },
    //   {
    //     label: "Custom machine learning solutions",
    //     href: "/#services",
    //   },
    //   {
    //     label: "NLP and Text intelligence",
    //     href: "/#services",
    //   },
    //   {
    //     label: "AI in healthcare",
    //     href: "/#services",
    //   },
    //   {
    //     label: "AI for ecommerce and marketing",
    //     href: "/#services",
    //   },
    //   {
    //     label: "AI document processing",
    //     href: "/#services",
    //   },
    //   {
    //     label: "AI for ed-tech",
    //     href: "/#services",
    //   },
    //   {
    //     label: "AI for finance and fintech",
    //     href: "/#services",
    //   },
    // ],
  },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const NavLinks = ({
  className,
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) => {
  return (
    <nav
      className={cn("flex flex-col md:flex-row items-center gap-8", className)}
    >
      {navLinks.map((link) =>
        link.subMenu ? (
          <DropdownMenu key={link.label}>
            <DropdownMenuTrigger asChild>
              <Link
                href={link.href}
                className="text-white md:text-gray-900 outline-none min-w-max"
              >
                {link.label}
                <ChevronDown className="w-4 h-4 inline-block ml-1" />
              </Link>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-0 rounded-none border-y-2 border-y-[#FF5722] ring-0">
              {link.subMenu.map((subLink) => (
                <DropdownMenuItem
                  key={subLink.label}
                  asChild
                  className="w-full rounded-none px-4 py-2 outline-none"
                >
                  <Link href={subLink.href} onClick={onNavigate}>
                    {subLink.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            href={link.href}
            key={link.href}
            onClick={onNavigate}
            className="text-white md:text-gray-900"
          >
            {link.label}
          </Link>
        ),
      )}
    </nav>
  );
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  const isMobile = useBreakpoint({
    sm: true,
    md: true,
  });

  useEffect(() => {
    if (!isMobile) {
      setOpen(false);
    }
  }, [isMobile]);

  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // restart the 2s idle countdown; never hides while at the top of the page
  const scheduleHide = useCallback(() => {
    clearTimeout(timer.current);
    if (window.scrollY > 20)
      timer.current = setTimeout(() => setHidden(true), 2000);
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;

    const fn = () => {
      const y = window.scrollY;
      const atTop = y <= 20;

      setScrolled(!atTop);
      setHidden(!atTop && y > lastY);
      lastY = y;

      scheduleHide();
    };

    window.addEventListener("scroll", fn, { passive: true });
    return () => {
      window.removeEventListener("scroll", fn);
      clearTimeout(timer.current);
    };
  }, [scheduleHide]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full transition-all bg-gray-100 z-50 py-4",
        scrolled && "shadow-xl",
        hidden && !open && "-translate-y-full",
        open && "bg-primary h-full",
      )}
      onPointerEnter={() => clearTimeout(timer.current)}
      onPointerLeave={scheduleHide}
      onFocus={() => clearTimeout(timer.current)}
      onBlur={scheduleHide}
    >
      <div className="relative flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "w-full flex gap-4 items-center justify-between mr-12 md:mr-0",
            open && "flex-col",
          )}
        >
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5"
          >
            <Image
              src={`/logo_${open ? "dark" : "color"}.png`}
              alt="Asyncwave"
              width={100}
              height={100}
              className="rounded-md w-16 md:w-20"
            />
          </Link>
          <NavLinks
            className={cn("hidden md:flex", open && "flex gap-4")}
            onNavigate={() => setOpen(false)}
          />
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className={cn(
              "bg-[#FF5722] hover:bg-[#E64A19] font-bold px-8 py-1 text-white rounded-full uppercase",
              open && "bg-white text-[#FF5722]",
            )}
          >
            Contact
          </Link>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute right-4 top-0 md:hidden text-[#FF5722]",
            open && "text-white",
          )}
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>
    </header>
  );
}
