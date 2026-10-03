"use client"

import { useState, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Link } from "@/i18n/routing"
import { projects, LocalizedString } from "@/data"
import { useTranslations, useLocale } from "next-intl"

export function ProjectsCarousel() {
  const t = useTranslations("work")
  const locale = useLocale() as "en" | "th"
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const total = projects.length

  // Handle responsive check safely after mounting
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total)
  }, [total])

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total)
  }, [total])

  const goTo = useCallback((index: number) => {
    setActiveIndex(index)
  }, [])

  // Auto-play feature (pauses on hover)
  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(goNext, 5000)
    return () => clearInterval(interval)
  }, [goNext, isPaused])

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev()
      if (e.key === "ArrowRight") goNext()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [goPrev, goNext])

  // Helper function to extract translation or return string
  const getLocalized = useCallback(
    (field: string | LocalizedString | null | undefined, currentLocale: "en" | "th"): string => {
      if (typeof field === "object" && field !== null) {
        return (field as LocalizedString)[currentLocale] || (field as LocalizedString)["en"] || ""
      }
      return typeof field === "string" ? field : ""
    },
    []
  )

  // Calculate relative position for each card
  const getCardStyle = (index: number) => {
    let diff = index - activeIndex

    // Wrap around for circular effect
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total

    const absDiff = Math.abs(diff)

    if (absDiff === 0) {
      return {
        x: "0%",
        scale: 1,
        rotateY: 0,
        opacity: 1,
        zIndex: 30,
        filter: "blur(0px)",
      }
    } else if (absDiff === 1) {
      return {
        x: diff > 0 ? (isMobile ? "55%" : "65%") : (isMobile ? "-55%" : "-65%"),
        scale: isMobile ? 0.75 : 0.8,
        rotateY: diff > 0 ? -35 : 35,
        opacity: isMobile ? 0.45 : 0.55,
        zIndex: 20,
        filter: "blur(1px)",
      }
    } else if (absDiff === 2) {
      return {
        x: diff > 0 ? (isMobile ? "95%" : "115%") : (isMobile ? "-95%" : "-115%"),
        scale: isMobile ? 0.55 : 0.6,
        rotateY: diff > 0 ? -45 : 45,
        opacity: isMobile ? 0.1 : 0.2,
        zIndex: 10,
        filter: "blur(2px)",
      }
    } else {
      return {
        x: diff > 0 ? "160%" : "-160%",
        scale: 0.5,
        rotateY: diff > 0 ? -50 : 50,
        opacity: 0,
        zIndex: 0,
        filter: "blur(3px)",
      }
    }
  }

  const activeProject = projects[activeIndex]

  return (
    <section
      className="relative py-24 px-4 lg:px-8 xl:px-12 overflow-hidden bg-[var(--bg-primary)]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── DYNAMIC BLURRED BACKGROUND ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.slug}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {activeProject.coverImage ? (
              <Image
                src={encodeURI(activeProject.coverImage).replace(/&/g, '%26')}
                alt=""
                aria-hidden="true"
                fill
                className="object-cover scale-110"
                style={{ filter: "blur(60px) saturate(1.2)" }}
                sizes="32px"
                quality={20}
                priority={false}
              />
            ) : (
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(ellipse at center, ${activeProject.color}40 0%, transparent 70%)`,
                  filter: "blur(60px)",
                }}
              />
            )}
            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-[var(--bg-primary)]/80" />
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-transparent to-[var(--bg-primary)]" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── HEADER ── */}
      <div className="relative z-10 max-w-7xl mx-auto mb-14">
        <p className="text-[9px] tracking-[0.35em] text-[var(--text-ghost)] uppercase mb-3">
          {t("tag")}
        </p>
        <div className="flex items-end justify-between flex-wrap gap-4">
          <h2 className="text-4xl lg:text-5xl font-black text-[var(--text-primary)] tracking-tight">
            {t("title")}
          </h2>
          <Link
            href="/work"
            className="text-[11px] tracking-[0.15em] text-[var(--text-brand)] uppercase hover:text-[var(--text-brand-bright)] transition-colors duration-200"
          >
            {t("viewAll")}
          </Link>
        </div>
      </div>

      {/* ── 3D CAROUSEL ── */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div
          className="relative h-[400px] sm:h-[500px] flex items-center justify-center perspective-container"
          style={{ perspective: "1200px" }}
        >
          {projects.map((project, index) => {
            let diff = index - activeIndex;
            if (diff > total / 2) diff -= total;
            if (diff < -total / 2) diff += total;
            const absDiff = Math.abs(diff);

            if (absDiff > 2) return null;

            const style = getCardStyle(index)
            const isActive = index === activeIndex
            const tagText = getLocalized(project.tag, locale)
            const titleText = getLocalized(project.title, locale)
            const descriptionText = getLocalized(project.description, locale)

            return (
              <motion.div
                key={project.slug}
                onClick={() => !isActive && goTo(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    if (!isActive) goTo(index);
                  }
                }}
                aria-label={`Select project ${titleText}`}
                animate={{
                  x: style.x,
                  scale: style.scale,
                  rotateY: style.rotateY,
                  opacity: style.opacity,
                  filter: style.filter,
                }}
                style={{ zIndex: style.zIndex }}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className={`absolute w-[280px] sm:w-[360px] h-[380px] sm:h-[480px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text-brand)] ${isActive ? "cursor-default" : "cursor-pointer"
                  }`}
              >
                {/* Project image */}
                {project.coverImage ? (
                  <Image
                    src={encodeURI(project.coverImage).replace(/&/g, '%26')}
                    alt={titleText}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 280px, 360px"
                    quality={70}
                    priority={index === 0}
                    onError={(e) => {
                      // Hide broken images, show color fallback
                      e.currentTarget.style.display = "none"
                    }}
                  />
                ) : (
                  <div
                    className="absolute inset-0 flex items-center
                      justify-center"
                    style={{
                      background: `linear-gradient(135deg,
                        ${project.color}40, ${project.color}15)`,
                    }}
                  >
                    <span className="text-[11px] font-mono uppercase
                      tracking-[0.2em] text-white/40">
                      {tagText}
                    </span>
                  </div>
                )}

                {/* Gradient overlay for text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                {/* Content — bottom */}
                <div className="absolute bottom-0 inset-x-0 p-5 flex flex-col gap-2">
                  <h3 className="text-lg sm:text-xl font-black text-white leading-tight">
                    {titleText}
                  </h3>
                  <p className="text-[11px] text-white/60 leading-relaxed line-clamp-2">
                    {descriptionText}
                  </p>

                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.3 }}
                    >
                      <Link
                        href={`/work/${project.slug}`}
                        className="inline-flex items-center gap-1.5 mt-2 text-[10px] tracking-[0.2em] uppercase border border-white/20 rounded-sm px-3 py-1.5 text-white/70 backdrop-blur-sm bg-white/[0.05] hover:border-white/40 hover:text-white hover:bg-white/[0.1] transition-all duration-200"
                      >
                        {t("viewProject")}
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* ── ARROWS ── */}
        <button
          onClick={goPrev}
          aria-label="Previous project"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[var(--bg-card)]/80 backdrop-blur-md border border-[var(--border-default)] hover:border-[var(--border-brand)] hover:bg-[var(--bg-brand)] flex items-center justify-center text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text-brand)] transition-all duration-200 -translate-x-2 sm:translate-x-0"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <button
          onClick={goNext}
          aria-label="Next project"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[var(--bg-card)]/80 backdrop-blur-md border border-[var(--border-default)] hover:border-[var(--border-brand)] hover:bg-[var(--bg-brand)] flex items-center justify-center text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text-brand)] transition-all duration-200 translate-x-2 sm:translate-x-0"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* ── DOT INDICATORS ── */}
        <div className="flex items-center justify-center gap-1 mt-10">
          {projects.map((project, index) => (
            <button
              key={project.slug}
              onClick={() => goTo(index)}
              aria-label={`Go to ${getLocalized(project.title, locale)}`}
              className="relative flex items-center justify-center w-11 h-11 -m-[10px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--text-brand)] focus-visible:outline-offset-2"
            >
              <span className={`rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-8 h-1.5 bg-[var(--text-brand)]"
                  : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
              }`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
