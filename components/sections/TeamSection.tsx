"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Link } from "@/i18n/routing"
import { useRef, useState } from "react"

import { team } from "@/data"
import { useTranslations, useLocale } from "next-intl"



export const TeamSection = () => {
  const t = useTranslations("team");
  const locale = useLocale() as "en" | "th";

  // Slider Refs and State
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Update progress on scroll
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const totalScrollable = scrollWidth - clientWidth;
      if (totalScrollable > 0) {
        setScrollProgress(Math.max(0, Math.min(1, scrollLeft / totalScrollable)));
      }
    }
  };

  // Scroll handler
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 px-4 lg:px-8 xl:px-12 bg-[var(--bg-primary)] relative overflow-hidden">
      {/* Background grid pattern (decorative) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.25]"
        style={{
          backgroundImage: `linear-gradient(var(--grid-line) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* SECTION HEADER (centered) */}
      <div className="max-w-7xl mx-auto text-center mb-20 relative z-10">
        <p className="text-[9px] tracking-[0.35em] text-[var(--text-muted)] uppercase mb-3">
          {t("tag")}
        </p>
        <h2 className="text-4xl lg:text-5xl font-black text-[var(--text-primary)] tracking-tight mb-4">
          {t("title")}
        </h2>
        <p className="text-[13px] text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">
          {t("subtitle")}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 items-stretch sm:items-center max-w-sm mx-auto sm:max-w-none">
          <Link href="/team" className="border border-[var(--btn-ghost-border)] rounded-sm px-6 py-2.5 text-[11px] tracking-[0.2em] text-[var(--btn-ghost-text)] uppercase hover:border-[var(--btn-ghost-hover-border)] hover:text-[var(--btn-ghost-hover-text)] transition-all duration-200 w-full sm:w-auto text-center justify-center flex items-center">
            {t("seeAllTeam")}
          </Link>
          <Link href="/contact" className="bg-[var(--btn-primary)] rounded-sm px-6 py-2.5 text-[11px] font-bold tracking-[0.2em] text-[var(--btn-primary-text)] uppercase hover:bg-[var(--btn-primary-hover)] transition-all duration-200 shadow-[0_0_20px_var(--shadow-brand)] w-full sm:w-auto text-center justify-center flex items-center">
            {t("startProject")}
          </Link>
        </div>
      </div>

      {/* TEAM SCROLL CONTAINER */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="max-w-6xl mx-auto flex gap-6 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory relative z-10 px-4 py-4 scroll-smooth"
      >
        {team.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="group flex flex-col items-center text-center gap-3 shrink-0 w-[200px] sm:w-[calc((100%-2*1.5rem)/3)] md:w-[calc((100%-3*1.5rem)/4)] lg:w-[calc((100%-4*1.5rem)/5)] snap-start"
          >
            {/* PHOTO CIRCLE */}
            <div className="relative">
              {/* Outer glow ring — appears on hover */}
              <div className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "radial-gradient(circle, var(--shadow-brand) 0%, transparent 70%)",
                  filter: "blur(8px)",
                }}
              />

              {/* Photo or initial fallback */}
              <div className="relative w-28 h-28 rounded-full overflow-hidden flex-shrink-0 bg-[var(--bg-secondary)] border-0 shadow-sm transition-all duration-300">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top mix-blend-multiply dark:mix-blend-normal"
                    sizes="112px"
                    priority={false}
                  />
                ) : (
                  <div className="w-full h-full flex items-center
                    justify-center
                    bg-[var(--bg-brand)]
                    text-[var(--text-brand)]
                    text-xl font-black">
                    {member.initial}
                  </div>
                )}
              </div>
            </div>

            {/* NAME */}
            <div className="flex flex-col gap-1 items-center">
              <h3 className="text-[15px] font-black text-[var(--text-primary)] transition-colors duration-200">
                {member.name}
              </h3>

              {/* ROLE */}
              <p className="text-[10px] font-extrabold tracking-wider text-[var(--text-brand)] uppercase">
                {member.role[locale]}
              </p>
            </div>

            {/* SOCIAL ICONS */}
            <div className="flex items-center gap-3">
              {/* LinkedIn */}
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                aria-label={`Follow ${member.name} on LinkedIn`}
                className="w-7 h-7 rounded-md border border-[var(--border-default)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-brand)] hover:border-[var(--border-brand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text-brand)] transition-all duration-200">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286z M5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z M22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>

              {/* Email */}
              {member.email && (
                <a href={`mailto:${member.email}`}
                  aria-label={`Send email to ${member.name}`}
                  className="w-7 h-7 rounded-md border border-[var(--border-default)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-brand)] hover:border-[var(--border-brand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text-brand)] transition-all duration-200">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Custom Scroll Progress Bar & Navigation Arrows */}
      <div className="flex items-center justify-center gap-6 mt-12 relative z-10">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="w-10 h-10 rounded-full border border-[var(--border-default)] bg-[var(--bg-card)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-brand)] hover:border-[var(--border-brand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text-brand)] active:scale-95 transition-all duration-200 cursor-pointer shadow-[var(--card-shadow)]"
          aria-label="Previous team members"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        {/* Scroll Progress Track */}
        <div className="w-48 h-[5px] bg-[var(--border-default)] rounded-full overflow-hidden relative">
          <div
            className="h-full bg-[var(--btn-primary)] rounded-full transition-all duration-150 absolute top-0"
            style={{
              width: "35%",
              left: `${scrollProgress * 65}%`,
            }}
          />
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="w-10 h-10 rounded-full border border-[var(--border-default)] bg-[var(--bg-card)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-brand)] hover:border-[var(--border-brand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text-brand)] active:scale-95 transition-all duration-200 cursor-pointer shadow-[var(--card-shadow)]"
          aria-label="Next team members"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* BOTTOM DIVIDER */}
      <div className="mt-24 max-w-7xl mx-auto relative z-10">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--border-default)] to-transparent" />
      </div>
    </section>
  )
}
