"use client";

import { useState, useEffect } from "react";
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
import { useContactDialog } from "@/components/contact-dialog";

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Company",
    href: "/",
    subMenu: [
      { label: "About Us", href: "/#why-us" },
      { label: "Testimonials", href: "/#testimonials" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  { label: "Services", href: "/#services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

const NavLinks = ({ className }: { className?: string }) => {
  return (
    <nav
      className={cn("flex flex-col md:flex-row items-center gap-8", className)}
    >
      {navLinks.map((link) =>
        link.subMenu ? (
          <DropdownMenu key={link.href}>
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
                  key={subLink.href}
                  className="w-full rounded-none px-4 py-2 outline-none"
                >
                  <Link href={`${link.href}${subLink.href}`} className="w-full">
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
  const [open, setOpen] = useState(false);
  const contactDialog = useContactDialog();

  const isMobile = useBreakpoint({
    sm: true,
    md: true,
  });

  useEffect(() => {
    if (!isMobile) {
      setOpen(false);
    }
  }, [isMobile]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full transition-all bg-gray-100 z-50 py-4",
        scrolled && "p-4 shadow-xl",
        open && "bg-primary h-full",
      )}
    >
      <div className="relative flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "w-full flex gap-4 items-center justify-between mr-12 md:mr-0",
            open && "flex-col",
          )}
        >
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src={`/logo_${open ? "dark" : "color"}.png`}
              alt="Asyncwave"
              width={100}
              height={100}
              className="rounded-md"
            />
          </Link>
          <NavLinks className={cn("hidden md:flex", open && "flex gap-4")} />
          <Button
            onClick={() => contactDialog?.openDialog()}
            className={cn(
              "bg-[#FF5722] hover:bg-[#E64A19] font-bold px-8 py-3 text-white rounded-full",
              open && "bg-white text-[#FF5722]",
            )}
          >
            GET A QUOTE
          </Button>
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
