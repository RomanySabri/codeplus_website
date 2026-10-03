"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter, usePathname as useIntlPathname } from "@/i18n/routing";
import { Globe } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

import { site } from "@/data";

const navLinks = site.nav;

const languages = [
  { code: "en", label: "EN" },
  { code: "th", label: "TH" },
] as const;

function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = useIntlPathname();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative flex-shrink-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Select Language"
        className="flex items-center gap-2 flex-shrink-0 whitespace-nowrap
          text-[10px] tracking-[0.2em] text-[var(--text-secondary)] uppercase
          bg-transparent border border-[var(--border-default)] rounded-md h-9 px-3
          hover:border-[var(--border-brand)] hover:text-[var(--text-brand)] hover:bg-[var(--bg-brand)]
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text-brand)]
          transition-all duration-200 cursor-pointer"
      >
        <Globe className="w-3.5 h-3.5" />
        <span className="font-semibold">{languages.find((l) => l.code === locale)?.label}</span>
        <svg
          width="8"
          height="8"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className={cn("transition-transform duration-200", isOpen && "rotate-180")}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <div
        className={cn(
          "absolute right-0 top-full mt-2 bg-[var(--bg-card)] border border-[var(--border-default)] rounded-md overflow-hidden min-w-[120px] transition-all duration-200 origin-top-right z-50 shadow-[var(--card-shadow)]",
          isOpen
            ? "opacity-100 visible scale-100"
            : "opacity-0 invisible scale-95"
        )}
      >
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => {
              router.replace(pathname, { locale: lang.code });
              setIsOpen(false);
            }}
            className={`
              w-full flex items-center gap-3
              px-4 py-2.5 text-[11px] tracking-wide
              transition-colors duration-150
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text-brand)]
              ${locale === lang.code
                ? "text-[var(--text-brand)] bg-[var(--bg-brand)]"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)]"
              }
            `}
          >
            <span>{lang.code === "en" ? "English" : "ไทย"}</span>
            {locale === lang.code && (
              <span className="ml-auto text-[9px] text-[var(--text-brand)]">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("nav");
  const locale = useLocale();

  const checkActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" || pathname === `/${locale}` || pathname === `/${locale}/`;
    }
    return pathname === href || pathname?.endsWith(href);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer if screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300 px-4 lg:px-8 xl:px-12",
          isScrolled || isOpen
            ? "bg-[var(--navbar-bg)] backdrop-blur-md border-b border-[var(--navbar-border)]"
            : "bg-transparent border-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto h-16 flex items-center justify-between">
          {/* LEFT: Logo */}
          <div className="flex-1 flex justify-start z-50">
            <Link
              href="/"
              className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text-brand)] rounded"
              onClick={() => setIsOpen(false)}
              aria-label="CodePlus — Home"
            >
              <Image
                src="/code plus logo white RGB.png"
                alt="Code Plus Software House"
                width={160}
                height={40}
                className="object-contain w-auto h-8 opacity-90 hover:opacity-100 transition-opacity duration-200 hidden dark:block"
                priority
              />
              <Image
                src="/code plus logo black color RGP.png"
                alt="Code Plus Software House"
                width={160}
                height={40}
                className="object-contain w-auto h-8 opacity-90 hover:opacity-100 transition-opacity duration-200 block dark:hidden"
                priority
              />
            </Link>
          </div>

          {/* CENTER: Nav links (Desktop) */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-[11px] tracking-[0.15em] uppercase transition-colors duration-200 font-medium whitespace-nowrap",
                  checkActive(link.href)
                    ? "text-[var(--text-primary)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* RIGHT: ThemeToggle + Language Switcher + CTA + Mobile Toggle */}
          <div className="flex-1 flex items-center justify-end gap-3 z-50 ml-6">
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center justify-center h-9 rounded-md border border-[var(--border-default)] bg-transparent px-4 text-[10px] tracking-[0.2em] text-[var(--text-secondary)] uppercase hover:border-[var(--border-brand)] hover:bg-[var(--bg-brand)] hover:text-[var(--text-brand)] transition-all duration-200 whitespace-nowrap"
            >
              {t("startProject")}
            </Link>

            {/* Hamburger Button */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-11 h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text-brand)] rounded"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
              aria-expanded={isOpen}
            >
              <span
                className={cn(
                  "w-5 h-[1.5px] bg-[var(--text-primary)] transition-all duration-300",
                  isOpen ? "rotate-45 translate-y-[4px]" : "-translate-y-1"
                )}
              />
              <span
                className={cn(
                  "w-5 h-[1.5px] bg-[var(--text-primary)] transition-all duration-300",
                  isOpen
                    ? "-rotate-45 -translate-y-[1.5px]"
                    : "translate-y-1"
                )}
              />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed top-16 inset-x-0 z-40 bg-[var(--bg-primary)] border-b border-[var(--border-default)] md:hidden overflow-hidden shadow-2xl"
          >
            <nav className="flex flex-col px-6 py-6 gap-5 items-center text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-[13px] tracking-[0.15em] uppercase transition-colors py-1",
                    checkActive(link.href)
                      ? "text-[var(--text-primary)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  )}
                >
                  {link.label}
                </Link>
              ))}

              <div className="mt-2 w-full flex justify-center">
                <LanguageSwitcher />
              </div>

              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="mt-4 w-full max-w-[240px] text-center rounded-md bg-[var(--btn-primary)] hover:bg-[var(--btn-primary-hover)] py-3 text-[11px] font-bold tracking-[0.2em] uppercase text-[var(--btn-primary-text)] transition-colors shadow-[0_0_20px_var(--shadow-brand)]"
              >
                {t("startProjectMobile")}
              </Link>

              {/* Theme toggle in mobile menu */}
              <div className="w-full flex items-center justify-between pt-4 mt-2 border-t border-[var(--border-default)]">
                <span className="text-[10px] tracking-[0.2em] text-[var(--text-ghost)] uppercase">
                  Appearance
                </span>
                <ThemeToggle />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
