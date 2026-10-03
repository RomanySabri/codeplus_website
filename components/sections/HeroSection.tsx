"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";

export default function HeroSection() {
  const t = useTranslations("hero");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let rafId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
        rafId = null;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <section
      className="relative h-[100svh] w-full overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)]"
    >
      {/* LAYER 1: Base gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(
            ellipse 80% 60% at 70% 40%,
            var(--shadow-brand) 0%,
            transparent 70%
          )`,
        }}
      />

      {/* LAYER 2: Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(var(--grid-line) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 70% 50%, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 70% 50%, black 30%, transparent 80%)",
        }}
      />

      {/* LAYER 3: Floating geometric shapes (SVG) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
        {/* Large slow-rotating hexagon */}
        <polygon
          points="700,120 760,155 760,225 700,260 640,225 640,155"
          fill="none"
          stroke="currentColor"
          className="text-[var(--text-brand)] opacity-20"
          strokeWidth="1"
          style={{
            transformOrigin: "700px 190px",
            animation: "spin-slow 20s linear infinite",
          }}
        />

        {/* Inner hexagon — counter rotate */}
        <polygon
          points="700,145 745,170 745,220 700,245 655,220 655,170"
          fill="none"
          stroke="currentColor"
          className="text-[var(--text-brand-bright)] opacity-10"
          strokeWidth="1"
          style={{
            transformOrigin: "700px 195px",
            animation: "spin-slow 15s linear infinite reverse",
          }}
        />

        {/* Floating square top right */}
        <rect
          x="900"
          y="80"
          width="60"
          height="60"
          fill="var(--bg-brand)"
          stroke="currentColor"
          className="text-[var(--text-brand)] opacity-20"
          strokeWidth="1"
          style={{ animation: "float 6s ease-in-out infinite" }}
        />

        {/* Small rotating square */}
        <rect
          x="820"
          y="300"
          width="30"
          height="30"
          fill="none"
          stroke="currentColor"
          className="text-[var(--text-brand-bright)] opacity-20"
          strokeWidth="1"
          style={{
            transformOrigin: "835px 315px",
            animation: "spin-slow 8s linear infinite",
          }}
        />

        {/* Triangle accent */}
        <polygon
          points="1050,200 1080,260 1020,260"
          fill="none"
          stroke="currentColor"
          className="text-[var(--text-brand)] opacity-15"
          strokeWidth="1"
          style={{ animation: "float 8s ease-in-out infinite 2s" }}
        />

        {/* Glowing dot cluster */}
        {(
          [
            [680, 380],
            [720, 360],
            [760, 375],
            [700, 400],
            [740, 410],
          ] as [number, number][]
        ).map(([cx, cy], i) => (
          <circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="2"
            fill="currentColor"
            className="text-[var(--text-brand-bright)] opacity-60"
            style={{
              animation: `pulse-dot 3s ease-in-out infinite ${i * 0.4}s`,
            }}
          />
        ))}

        {/* Connecting lines between dots */}
        <line
          x1="680" y1="380" x2="720" y2="360"
          stroke="currentColor"
          className="text-[var(--text-brand)] opacity-20"
          strokeWidth="1"
        />
        <line
          x1="720" y1="360" x2="760" y2="375"
          stroke="currentColor"
          className="text-[var(--text-brand)] opacity-20"
          strokeWidth="1"
        />
        <line
          x1="700" y1="400" x2="740" y2="410"
          stroke="currentColor"
          className="text-[var(--text-brand)] opacity-15"
          strokeWidth="1"
        />

        {/* Animated dashed circle */}
        <circle
          cx="750" cy="250" r="120"
          fill="none"
          stroke="currentColor"
          className="text-[var(--text-brand)] opacity-10"
          strokeWidth="1"
          strokeDasharray="8 12"
          style={{ animation: "spin-slow 30s linear infinite" }}
        />

        {/* Corner bracket decorations */}
        <path
          d="M 580 100 L 580 80 L 600 80"
          fill="none" stroke="currentColor" className="text-[var(--text-brand)] opacity-30" strokeWidth="1.5"
        />
        <path
          d="M 870 80 L 890 80 L 890 100"
          fill="none" stroke="currentColor" className="text-[var(--text-brand)] opacity-30" strokeWidth="1.5"
        />
        <path
          d="M 580 380 L 580 400 L 600 400"
          fill="none" stroke="currentColor" className="text-[var(--text-brand)] opacity-30" strokeWidth="1.5"
        />
        <path
          d="M 870 400 L 890 400 L 890 380"
          fill="none" stroke="currentColor" className="text-[var(--text-brand)] opacity-30" strokeWidth="1.5"
        />
      </svg>

      {/* LAYER 4: Mouse parallax glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(
            circle 300px at ${mousePos.x}px ${mousePos.y}px,
            rgba(26, 122, 181, 0.08) 0%,
            transparent 70%
          )`,
        }}
      />

      {/* UI Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col pointer-events-none">
        {/* LAYER 6: Left fade */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-primary)] via-[var(--bg-primary)]/70 to-transparent w-[55%] pointer-events-none" />
        {/* LAYER 5: Bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent pointer-events-none" />

        {/* Main Content */}
        <div className="absolute inset-0 z-10 flex flex-col justify-center px-4 lg:px-8 xl:px-12 pt-10 pointer-events-none">
          <div className="max-w-7xl mx-auto w-full">
            <div className="max-w-2xl pointer-events-auto">

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-black leading-[0.95] tracking-tight text-[var(--text-primary)]"
                style={{ fontSize: "clamp(36px, 6vw, 72px)" }}
              >
                {t("headline")}
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #165f8e 0%, #2894cf 60%, #4faee1 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {t("headlineAccent")}
                </span>
              </motion.h1>

              {/* Subtext */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-6 max-w-[340px] text-[14px] leading-[1.8] text-[var(--text-secondary)]"
              >
                {t("subtext")}
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
              >
                {/* Primary CTA */}
                <Link
                  href="/work"
                  className="group border border-[var(--border-brand)] relative overflow-hidden inline-flex items-center justify-center gap-2 bg-[var(--btn-primary)] hover:bg-[var(--btn-primary-hover)] text-[var(--btn-primary-text)] text-[11px] font-bold tracking-[0.2em] uppercase px-7 py-3.5 rounded-sm transition-all duration-300 shadow-[0_0_30px_var(--shadow-brand)] hover:shadow-[0_0_50px_var(--shadow-brand-strong)] active:scale-[0.98] w-full sm:w-auto text-center"
                >
                  {/* shimmer */}
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
                  <span className="relative">{t("ctaPrimary")}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="relative group-hover:translate-x-0.5 transition-transform duration-200">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>

                {/* Secondary CTA */}
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 border border-[var(--btn-ghost-border)] text-[var(--btn-ghost-text)] text-[11px] tracking-[0.2em] uppercase px-7 py-3.5 rounded-sm hover:border-[var(--btn-ghost-hover-border)] hover:text-[var(--btn-ghost-hover-text)] transition-all duration-200 w-full sm:w-auto text-center"
                >
                  {t("ctaSecondary")}
                </Link>
              </motion.div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
