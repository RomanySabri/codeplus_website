"use client";

import React, { useState, useRef, useCallback } from "react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useTranslations } from "next-intl";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

import { site } from "@/data";

const footerLinks = site.footer.links;

// ---------------------------------------------------------------------------
// Inline SVG icons
// ---------------------------------------------------------------------------

const FacebookIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const socialLinks = [
  { href: site.social.facebook, label: "Facebook", ariaLabel: "Follow CodePlus on Facebook", Icon: FacebookIcon },
  { href: site.social.linkedin, label: "LinkedIn", ariaLabel: "Follow CodePlus on LinkedIn", Icon: LinkedInIcon },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function Footer() {
  const t = useTranslations("footer");
  const giantTextRef = useRef<HTMLDivElement>(null);
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = giantTextRef.current?.getBoundingClientRect();
    if (!rect) return;
    setGlowPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  return (
    <footer className="relative w-full overflow-hidden bg-[var(--bg-primary)]">

      {/* ── 1. GIANT TEXT + SEPARATOR ── */}
      <div
        ref={giantTextRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative overflow-hidden w-full"
        style={{ paddingTop: "clamp(20px, 4vw, 60px)" }}
      >
        {/* Cursor-following Soft Glow */}
        <span
          className="pointer-events-none absolute -inset-10 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(
              circle 300px at ${glowPos.x}px ${glowPos.y}px,
              rgba(26, 122, 181, 0.12) 0%,
              rgba(26, 122, 181, 0.04) 40%,
              transparent 70%
            )`,
            filter: "blur(24px)",
            zIndex: 0,
          }}
        />

        {/* Cursor-following Sharp Inner Glow */}
        <span
          className="pointer-events-none absolute -inset-10 transition-opacity duration-200"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(
              circle 120px at ${glowPos.x}px ${glowPos.y}px,
              rgba(26, 122, 181, 0.20) 0%,
              transparent 70%
            )`,
            zIndex: 0,
          }}
        />

        {/* Clipped giant text */}
        <div
          aria-hidden="true"
          className="pointer-events-none select-none flex justify-center overflow-hidden relative z-10"
          style={{
            maxHeight: "clamp(55px, 13vw, 170px)",
            overflow: "hidden",
          }}
        >
          <span
            aria-hidden="true"
            className="whitespace-nowrap font-black uppercase tracking-tighter leading-none select-none"
            style={{
              fontSize: "clamp(80px, 18vw, 220px)",
              color: "var(--text-ghost)",
              opacity: 0.25,
              textShadow: "0 4px 12px var(--shadow-brand)",
              display: "block",
              lineHeight: 1,
            }}
          >
            CodePlus
          </span>
        </div>

        {/* Border line */}
        <div className="relative">
          {/* Main separator line */}
          <div
            className="h-px w-full opacity-40"
            style={{
              background: `linear-gradient(
                to right,
                transparent 0%,
                var(--border-default) 40%,
                var(--border-default) 60%,
                transparent 100%
              )`
            }}
          />

          {/* Dark gradient above the line */}
          <div
            className="absolute inset-x-0 -top-3 h-6 pointer-events-none"
            style={{
              background: `linear-gradient(
                to bottom,
                transparent 0%,
                rgba(0, 0, 0, 0.1) 60%,
                rgba(0, 0, 0, 0.25) 100%
              )`,
            }}
          />

          {/* Subtle teal glow on the line itself */}
          <div
            className="absolute inset-x-0 top-0 h-px pointer-events-none opacity-40"
            style={{
              background: `linear-gradient(
                to right,
                transparent 0%,
                var(--border-brand) 30%,
                var(--text-brand-bright) 50%,
                var(--border-brand) 70%,
                transparent 100%
              )`,
            }}
          />

          {/* Shadow bleeding downward from the line */}
          <div
            className="absolute inset-x-0 top-0 h-8 pointer-events-none"
            style={{
              background: `linear-gradient(
                to bottom,
                rgba(0, 0, 0, 0.08) 0%,
                transparent 100%
              )`,
            }}
          />
        </div>
      </div>

      {/* ── Content wrapper ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-8 xl:px-12">

        {/* ── 3. MAIN GRID ── */}
        <div className="grid grid-cols-2 lg:grid-cols-[220px_repeat(4,1fr)] gap-x-8 gap-y-12 py-16">

          {/* ── COL 1 — Brand ── */}
          <div className="col-span-2 lg:col-span-1 flex flex-col gap-0">

            {/* Logo */}
            <Link href="/" aria-label="CodePlus — Home" className="w-fit group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text-brand)] rounded">
              <Image
                src="/code plus logo white RGB.png"
                alt={site.company.name}
                width={110}
                height={28}
                priority
                className="object-contain w-auto h-auto opacity-90 group-hover:opacity-100 transition-opacity duration-200 hidden dark:block"
              />
              <Image
                src="/code plus logo black color RGP.png"
                alt={site.company.name}
                width={110}
                height={28}
                priority
                className="object-contain w-auto h-auto opacity-90 group-hover:opacity-100 transition-opacity duration-200 block dark:hidden"
              />
            </Link>

            {/* Tagline */}
            <p className="mt-4 text-[12px] leading-relaxed text-[var(--text-secondary)] max-w-[190px]">
              {site.company.description}
            </p>

            {/* Social icons */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ href, label, ariaLabel, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={ariaLabel}
                  className="w-9 h-9 rounded-md border border-[var(--border-default)] flex items-center justify-center text-[var(--text-muted)] hover:border-[var(--border-brand)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text-brand)] transition-all duration-200"
                >
                  <Icon />
                </a>
              ))}
            </div>

            {/* Status badge */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] px-3 py-1.5 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="absolute animate-ping rounded-full bg-emerald-400 opacity-75 h-full w-full" />
                <span className="relative rounded-full bg-emerald-500 h-2 w-2" />
              </span>
              <span className="text-[10px] tracking-wider text-[var(--text-muted)] uppercase">
                {t("status")}
              </span>
            </div>
          </div>

          {/* ── COLS 2-5 — Link columns ── */}
          {(Object.entries(footerLinks) as [string, readonly { label: string; href: string }[]][]).map(
            ([category, links]) => (
              <div key={category} className="flex flex-col gap-4">
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">
                  {category}
                </h3>
                <ul className="flex flex-col gap-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[13px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text-brand)] rounded transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>

        {/* ── 4. BOTTOM BAR ── */}
        <div className="border-t border-[var(--border-default)] py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[11px] text-[var(--text-muted)]">
            © {new Date().getFullYear()} {site.company.name}. {t("rights")}
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="/contact"
              className="text-[11px] text-[var(--text-muted)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text-brand)] rounded transition-colors"
            >
              {t("privacy")}
            </Link>
            <Link
              href="/contact"
              className="text-[11px] text-[var(--text-muted)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text-brand)] rounded transition-colors"
            >
              {t("terms")}
            </Link>
            <span className="text-[11px] text-[var(--text-ghost)] font-mono tracking-wider">
              {site.company.website.replace("https://", "")}
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
