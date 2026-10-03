"use client"

import { motion } from "framer-motion"
import { Link } from "@/i18n/routing"
import { jobs } from "@/data"
import { useTranslations, useLocale } from "next-intl"

export function InternshipSection() {
  const t = useTranslations("internship")
  const locale = useLocale() as "en" | "th"

  const internships = jobs.filter((job) => job.type === "internship")
  const openInternships = internships.filter((job) => job.isOpen)
  const displayedJobs = openInternships.slice(0, 3)
  const remainingCount = openInternships.length - displayedJobs.length

  const highlights = [
    {
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 2v20M2 12h20" />
          <circle cx="12" cy="12" r="9" />
        </svg>
      ),
      text: t("highlights.realProjects"),
    },
    {
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      text: t("highlights.mentorship"),
    },
    {
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      ),
      text: t("highlights.fullTimePath"),
    },
  ]

  return (
    <section className="py-24 px-4 lg:px-8 xl:px-12 bg-[var(--bg-primary)] relative overflow-hidden">
      {/* Decorative background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.4]"
        style={{
          backgroundImage: `
            linear-gradient(var(--grid-line) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 60% 60% at 70% 50%, black 30%, transparent 80%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ── LEFT — Content ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[9px] tracking-[0.35em] text-[var(--text-ghost)] uppercase mb-3">
              {t("eyebrow")}
            </p>

            <h2 className="text-4xl lg:text-5xl font-black text-[var(--text-primary)] tracking-tight mb-5">
              {t("title")}
            </h2>

            <p className="text-[14px] leading-relaxed text-[var(--text-secondary)] max-w-md mb-8">
              {t("description")}
            </p>

            {/* Highlights */}
            <div className="flex flex-col gap-4 mb-10">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-md bg-[var(--bg-brand)] border border-[var(--border-brand)] flex items-center justify-center text-[var(--text-brand)] flex-shrink-0">
                    {item.icon}
                  </div>
                  <span className="text-[13px] text-[var(--text-primary)]">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-4 flex-wrap">
              <Link
                href="/careers"
                className="group relative overflow-hidden inline-flex items-center gap-2 bg-[var(--btn-primary)] hover:bg-[var(--btn-primary-hover)] text-white text-[11px] font-bold tracking-[0.2em] uppercase px-6 py-3 rounded-sm transition-all duration-300 shadow-[0_0_25px_var(--shadow-brand)] hover:shadow-[0_0_40px_var(--shadow-brand-strong)] active:scale-[0.98]"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative">{t("cta")}</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="relative group-hover:translate-x-0.5 transition-transform duration-200"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>

              {openInternships.length > 0 && (
                <div className="flex items-center gap-2 text-[11px] text-[var(--text-muted)]">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute animate-ping rounded-full bg-emerald-400 opacity-75 h-full w-full" />
                    <span className="relative rounded-full bg-emerald-500 h-1.5 w-1.5" />
                  </span>
                  {t("openCount", { count: openInternships.length })}
                </div>
              )}
            </div>
          </motion.div>

          {/* ── RIGHT — Visual card ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
            <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] shadow-[var(--card-shadow)] overflow-hidden">
              {/* Card header */}
              <div className="px-6 py-4 border-b border-[var(--border-default)] flex items-center justify-between">
                <span className="text-[10px] tracking-[0.2em] text-[var(--text-ghost)] uppercase font-mono">
                  {t("cardTitle")}
                </span>
                <span className="flex items-center gap-1.5 text-[9px] tracking-[0.15em] uppercase text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {openInternships.length > 0
                    ? t("status.open")
                    : t("status.closed")}
                </span>
              </div>

              {/* Jobs list or empty state */}
              <div className="p-4">
                {displayedJobs.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    {displayedJobs.map((job, index) => (
                      <motion.div
                        key={job.id}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.08 }}
                      >
                        <Link
                          href={`/careers/${job.slug}`}
                          className="group flex items-center justify-between gap-3 p-4 rounded-lg border border-[var(--border-default)] hover:border-[var(--border-brand)] hover:bg-[var(--bg-brand)] transition-all duration-200"
                        >
                          <div>
                            <h3 className="text-[13px] font-semibold text-[var(--text-primary)] group-hover:text-[var(--text-brand)] transition-colors duration-200">
                              {job.title[locale] ?? job.title.en}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] text-[var(--text-muted)]">
                                {job.department[locale] ?? job.department.en}
                              </span>
                              <span className="text-[var(--text-ghost)]">
                                ·
                              </span>
                              <span className="text-[10px] text-[var(--text-muted)]">
                                {job.duration[locale] ?? job.duration.en}
                              </span>
                            </div>
                          </div>
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            className="text-[var(--text-brand)] flex-shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </motion.div>
                    ))}

                    {remainingCount > 0 && (
                      <Link
                        href="/careers"
                        className="text-center text-[11px] tracking-[0.15em] uppercase text-[var(--text-brand)] hover:text-[var(--text-brand-bright)] py-3 transition-colors duration-200"
                      >
                        {t("moreCount", { count: remainingCount })}
                      </Link>
                    )}
                  </div>
                ) : (
                  /* Empty state */
                  <div className="flex flex-col items-center justify-center text-center py-12 px-6 gap-4">
                    <div className="w-12 h-12 rounded-full bg-[var(--bg-brand)] border border-[var(--border-brand)] flex items-center justify-center text-[var(--text-brand)]">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 8v4l3 3" />
                        <circle cx="12" cy="12" r="9" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[13px] font-medium text-[var(--text-primary)] mb-1">
                        {t("empty.title")}
                      </p>
                      <p className="text-[12px] text-[var(--text-secondary)] max-w-[240px]">
                        {t("empty.description")}
                      </p>
                    </div>
                    <Link
                      href="/careers/general-application"
                      className="text-[11px] tracking-[0.15em] uppercase text-[var(--text-brand)] hover:text-[var(--text-brand-bright)] transition-colors duration-200"
                    >
                      {t("empty.cta")}
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Decorative glow */}
            <div className="absolute -inset-4 -z-10 bg-[var(--bg-brand)] blur-3xl opacity-30 rounded-full pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
