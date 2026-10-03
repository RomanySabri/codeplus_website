"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { Project, projects } from "@/data";

export function CaseStudyClient({ project }: { project: Project }) {
  const t = useTranslations("caseStudy");
  const locale = useLocale() as "en" | "th";

  // Next project for bottom navigation
  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <article className="bg-[var(--bg-primary)] min-h-screen">
      {/* ── HERO ── */}
      <section
        className="relative py-16 px-4 lg:px-8 xl:px-12 overflow-hidden"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 70% 50%,
            ${project.color}15 0%, transparent 70%)`,
        }}
      >
        {/* Back link */}
        <div className="max-w-7xl mx-auto">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-[10px]
              tracking-[0.2em] text-[var(--text-muted)] uppercase hover:text-[var(--text-secondary)]
              transition-colors mb-12"
          >
            {t("backToWork")}
          </Link>

          {/* Tag + year */}
          <div className="flex items-center gap-3 mb-6">
            <span
              className="text-[9px] font-mono tracking-[0.2em]
              text-[var(--text-secondary)] uppercase border border-[var(--border-default)]
              px-3 py-1.5 rounded-sm"
            >
              {project.tag[locale]}
            </span>
            <span className="text-[9px] font-mono text-[var(--text-ghost)]">
              {project.year}
            </span>
          </div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl lg:text-7xl font-black text-[var(--text-primary)]
              tracking-tight mb-6"
          >
            {project.title[locale]}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[15px] text-[var(--text-secondary)] max-w-2xl leading-relaxed mb-12"
          >
            {project.description[locale]}
          </motion.p>

          {/* Quick stats row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-wrap gap-8 pt-8
              border-t border-[var(--border-default)]"
          >
            <div>
              <div
                className="text-[9px] tracking-[0.2em]
                text-[var(--text-muted)] uppercase mb-1"
              >
                {t("duration")}
              </div>
              <div className="text-[14px] font-semibold text-[var(--text-secondary)]">
                {project.duration[locale]}
              </div>
            </div>
            <div>
              <div
                className="text-[9px] tracking-[0.2em]
                text-[var(--text-muted)] uppercase mb-1"
              >
                {t("teamSize")}
              </div>
              <div className="text-[14px] font-semibold text-[var(--text-secondary)]">
                {project.team[locale]}
              </div>
            </div>
            <div>
              <div
                className="text-[9px] tracking-[0.2em]
                text-[var(--text-muted)] uppercase mb-1"
              >
                {t("year")}
              </div>
              <div className="text-[14px] font-semibold text-[var(--text-secondary)]">
                {project.year}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── METRICS ── */}
      <section
        className="py-12 px-4 lg:px-8 xl:px-12 border-y border-[var(--border-default)] bg-[var(--bg-tertiary)]"
      >
        <div
          className="max-w-7xl mx-auto
          grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8"
        >
          {project.metrics.map((m, i) => (
            <motion.div
              key={m.label[locale]}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              className="text-center"
            >
              <div className="text-2xl lg:text-3xl font-black text-[var(--text-brand)] mb-1">
                {m.value[locale]}
              </div>
              <div
                className="text-[10px] tracking-[0.15em]
                text-[var(--text-muted)] uppercase"
              >
                {m.label[locale]}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="py-16 px-4 lg:px-8 xl:px-12 bg-[var(--bg-primary)]">
        <div
          className="max-w-7xl mx-auto
          grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16"
        >
          {/* LEFT — narrative */}
          <div className="space-y-16">
            {/* Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2
                className="text-[9px] tracking-[0.3em]
                text-[var(--text-muted)] uppercase mb-5"
              >
                {t("overview")}
              </h2>
              <p
                className="text-[15px] leading-[1.9] text-[var(--text-secondary)]
                whitespace-pre-line"
              >
                {project.longDescription[locale]}
              </p>
            </motion.div>

            {/* Challenge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-xl border border-[var(--border-default)]
                bg-[var(--bg-card)] p-8 shadow-[var(--card-shadow)]"
            >
              <h2
                className="text-[9px] tracking-[0.3em]
                text-[var(--text-muted)] uppercase mb-5"
              >
                {t("challenge")}
              </h2>
              <p className="text-[14px] leading-relaxed text-[var(--text-secondary)]">
                {project.challenge[locale]}
              </p>
            </motion.div>

            {/* Solution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-xl border border-[var(--border-brand)]
                bg-[var(--bg-brand)] p-8 shadow-[var(--card-shadow)]"
            >
              <h2
                className="text-[9px] tracking-[0.3em]
                text-[var(--text-brand)]/70 uppercase mb-5"
              >
                {t("solution")}
              </h2>
              <p className="text-[14px] leading-relaxed text-[var(--text-secondary)]">
                {project.solution[locale]}
              </p>
            </motion.div>

            {/* Results */}
            {project.results && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-xl border border-emerald-500/20
                  bg-emerald-500/5 p-8 shadow-[var(--card-shadow)]"
              >
                <h2
                  className="text-[9px] tracking-[0.3em]
                  text-emerald-500 dark:text-emerald-400 uppercase mb-5"
                >
                  {t("results")}
                </h2>
                <p className="text-[14px] leading-relaxed text-[var(--text-secondary)]">
                  {project.results[locale]}
                </p>
              </motion.div>
            )}

            {/* Testimonial */}
            {project.testimonial && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] p-8 overflow-hidden shadow-[var(--card-shadow)]"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[var(--shadow-brand)] to-transparent rounded-full blur-xl pointer-events-none" />
                <span className="absolute top-4 right-6 text-6xl font-serif text-[var(--text-ghost)] leading-none pointer-events-none">“</span>
                <p className="text-[14px] italic leading-relaxed text-[var(--text-secondary)] mb-6 relative z-10">
                  &ldquo;{project.testimonial.quote[locale]}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--bg-brand)] flex items-center justify-center text-[10px] font-bold text-[var(--text-brand)] border border-[var(--border-brand)]">
                    {project.testimonial.author.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                  <div>
                    <div className="text-[12px] font-bold text-[var(--text-primary)]">{project.testimonial.author}</div>
                    <div className="text-[10px] text-[var(--text-muted)]">{project.testimonial.role[locale]}</div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* RIGHT — sidebar */}
          <div className="space-y-6">
            {/* Tech stack */}
            <div
              className="rounded-xl border border-[var(--border-default)]
              bg-[var(--bg-card)] p-6 shadow-[var(--card-shadow)]"
            >
              <h2
                className="text-[9px] tracking-[0.3em]
                text-[var(--text-muted)] uppercase mb-5"
              >
                {t("techStack")}
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono tracking-wide
                      text-[var(--text-secondary)] border border-[var(--border-default)]
                      bg-[var(--bg-tertiary)] px-2.5 py-1.5 rounded-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Deliverables */}
            <div
              className="rounded-xl border border-[var(--border-default)]
              bg-[var(--bg-card)] p-6 shadow-[var(--card-shadow)]"
            >
              <h2
                className="text-[9px] tracking-[0.3em]
                text-[var(--text-muted)] uppercase mb-5"
              >
                {t("deliverables")}
              </h2>
              <ul className="space-y-3">
                {project.deliverables.map((d) => (
                  <li
                    key={d[locale]}
                    className="flex items-start gap-3
                      text-[12px] text-[var(--text-secondary)]"
                  >
                    <span className="text-[var(--text-brand)] text-xs">✓</span>
                    {d[locale]}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div
              className="rounded-xl border border-[var(--border-brand)]
              bg-[var(--bg-brand)] p-6 text-center shadow-[var(--card-shadow)]"
            >
              <p className="text-[12px] text-[var(--text-secondary)] mb-4">
                {t("wantSimilar")}
              </p>
              <Link
                href="/contact"
                className="block w-full bg-[var(--btn-primary)] hover:bg-[var(--btn-primary-hover)]
                  text-[var(--btn-primary-text)] text-[11px] font-bold tracking-[0.2em]
                  uppercase py-3 rounded-sm transition-all duration-200
                  shadow-[0_0_20px_var(--shadow-brand)] hover:shadow-[0_0_40px_var(--shadow-brand-strong)]"
              >
                {t("startProject")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEXT PROJECT ── */}
      <section className="border-t border-[var(--border-default)] px-4 lg:px-8 xl:px-12 bg-[var(--bg-primary)]">
        <Link
          href={`/work/${nextProject.slug}`}
          className="group flex flex-col sm:flex-row items-start
            sm:items-center justify-between gap-6
            py-12 max-w-7xl mx-auto
            hover:bg-[var(--bg-card-hover)] transition-colors duration-300 rounded-lg px-4"
        >
          <div>
            <p
              className="text-[9px] tracking-[0.3em]
              text-[var(--text-ghost)] uppercase mb-2"
            >
              {t("nextProject")}
            </p>
            <h2
              className="text-2xl font-black text-[var(--text-secondary)]
              group-hover:text-[var(--text-primary)] transition-colors duration-300"
            >
              {nextProject.title[locale]}
            </h2>
            <p className="text-[12px] text-[var(--text-muted)] mt-1">
              {nextProject.tag[locale]}
            </p>
          </div>
          <span
            className="text-[var(--text-brand)] text-2xl
            group-hover:translate-x-2 transition-transform duration-300"
          >
            →
          </span>
        </Link>
      </section>
    </article>
  );
}
