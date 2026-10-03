"use client";

/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { testimonials } from "@/data";
import { useTranslations, useLocale } from "next-intl";

export default function TestimonialsSection() {
  const t = useTranslations("testimonials");
  const locale = useLocale() as "en" | "th";
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;

    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 7000);

    return () => {
      clearInterval(timer);
    };
  }, [autoplay]);

  // Reset progress bar when slide is manually changed
  const handleSelect = (index: number) => {
    setActive(index);
  };

  const activeTestimonial = testimonials[active];

  return (
    <section className="py-16 lg:py-0 lg:h-screen lg:min-h-[650px] lg:max-h-[900px] px-4 lg:px-8 xl:px-12 bg-[var(--bg-primary)] relative overflow-hidden flex flex-col justify-center">
      {/* Background elements */}
      <div className="absolute top-1/3 left-1/4 w-[380px] h-[380px] bg-[var(--text-brand)]/5 rounded-full blur-[120px] pointer-events-none animate-pulse" />

      {/* Styles for composited progress bar — uses scaleX (GPU-accelerated, no layout reflow) */}
      <style>{`
        @keyframes progress-bar-scale {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(var(--grid-line) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="max-w-6xl mx-auto w-full relative z-10 lg:py-8 flex flex-col lg:h-[90%] justify-between">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 lg:mb-6 text-center lg:text-left shrink-0"
        >
          <span className="inline-block text-[10px] tracking-[0.45em] text-[var(--text-brand)] uppercase font-bold mb-2">
            {t("tag")}
          </span>
          <h2 className="text-3xl lg:text-4xl font-black text-[var(--text-primary)] tracking-tight">
            {t("title")}
          </h2>
        </motion.div>

        {/* Testimonials Layout Grid */}
        <div
          className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-stretch flex-grow min-h-0"
          onMouseEnter={() => setAutoplay(false)}
          onMouseLeave={() => setAutoplay(true)}
        >

          {/* LEFT SIDE — DETAILED ACTIVE CARD */}
          <div className="w-full lg:w-[45%] flex flex-col min-h-0">
            <div
              className="rounded-2xl border border-white/[0.06] bg-white/[0.01] backdrop-blur-lg p-8 lg:p-10 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.25)] relative overflow-hidden min-h-[350px] lg:min-h-0 h-full flex-grow transition-all duration-300"
              style={{
                boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)"
              }}
            >
              {/* Decorative Quote Mark */}
              <div className="text-[120px] font-serif text-[var(--text-brand)]/10 leading-none absolute -top-2 left-6 select-none pointer-events-none">
                “
              </div>

              {/* Quote text with animation — initial={false} on first slide prevents opacity:0 on first paint */}
              <div className="relative z-10 flex-grow flex items-center mb-8 min-h-0 overflow-y-auto">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={active}
                    initial={{ opacity: 0, y: 12, filter: "blur(3px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -12, filter: "blur(3px)" }}
                    transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                    className="text-base lg:text-lg leading-[1.75] text-[var(--text-secondary)] font-light italic pr-1"
                  >
                    &ldquo;{activeTestimonial.quote[locale]}&rdquo;
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Author Info */}
              <div className="relative z-10 pt-4 border-t border-white/[0.06] shrink-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col"
                  >
                    <div>
                      <h3 className="text-sm font-bold text-[var(--text-primary)]">
                        {activeTestimonial.author}
                      </h3>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5">
                        {activeTestimonial.role[locale]} &bull; {activeTestimonial.company}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Progress Bar at very bottom — uses scaleX (GPU-composited, no layout thrash) */}
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/[0.04] overflow-hidden">
                <div
                  key={`${active}-${autoplay}`}
                  className="h-full w-full origin-left bg-gradient-to-r from-[var(--text-brand)] to-[var(--text-brand-bright)]"
                  style={{
                    animation: autoplay ? "progress-bar-scale 7s linear forwards" : "none",
                    transform: autoplay ? undefined : "scaleX(0)"
                  }}
                />
              </div>
            </div>
          </div>

          {/* RIGHT SIDE — HIGHLY CREATIVE TESTIMONIAL PANEL */}
          <div className="w-full lg:w-[55%] flex flex-col gap-3 overflow-y-auto pr-1 max-h-[480px] h-full no-scrollbar">
            {testimonials.map((testimonial, idx) => {
              const isActive = active === idx;
              return (
                <div
                  key={testimonial.id}
                  onClick={() => handleSelect(idx)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleSelect(idx);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  className={`group relative rounded-xl p-4 cursor-pointer outline-none border focus-visible:ring-2 focus-visible:ring-[var(--text-brand)] transition-all duration-500 overflow-hidden shrink-0 ${isActive
                    ? "border-[var(--border-brand)] bg-gradient-to-r from-[var(--bg-brand)]/60 to-[var(--bg-brand)]/20 shadow-[0_12px_24px_rgba(0,0,0,0.15)]"
                    : "border-white/[0.04] bg-white/[0.01] hover:border-white/[0.12] hover:bg-white/[0.03] shadow-sm"
                    }`}
                >
                  {/* Left sliding border active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="active-indicator-bar"
                      className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[var(--text-brand)] to-purple-500"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Metadata & Details */}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-[12px] font-bold text-[var(--text-primary)] truncate group-hover:text-[var(--text-brand)] transition-colors">
                        {testimonial.author}
                      </h3>
                      {/* Company Badge */}
                      <span
                        className={`text-[9px] font-mono px-2 py-0.5 rounded-full border transition-colors shrink-0 ${isActive
                          ? "bg-[var(--text-brand)]/10 border-[var(--border-brand)]/20 text-[var(--text-brand)] font-semibold"
                          : "bg-white/[0.02] border-white/[0.06] text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]"
                          }`}
                      >
                        {testimonial.company}
                      </span>
                    </div>

                    <p className="text-[10px] text-[var(--text-muted)] mt-0.5 truncate">
                      {testimonial.role[locale]}
                    </p>

                    {/* Animated Snippet / Quote Teaser */}
                    <p className="text-[11px] text-[var(--text-secondary)] italic font-light mt-2 line-clamp-1 opacity-85 group-hover:opacity-100 transition-opacity">
                      &ldquo;{testimonial.quote[locale]}&rdquo;
                    </p>
                  </div>

                  {/* Micro-interaction chevron indicator on hover */}
                  <div className="absolute right-3.5 bottom-3.5 opacity-0 scale-75 group-hover:opacity-60 group-hover:scale-100 transition-all duration-300">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[var(--text-secondary)]">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
