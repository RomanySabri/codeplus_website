"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";

import { projects } from "@/data";

export function WorkPageClient() {
  const t = useTranslations("work");
  const locale = useLocale() as "en" | "th";

  return (
    <>
      {/* HERO HEADER */}
      <section className="relative py-16 px-4 lg:px-8 xl:px-12 overflow-hidden">
        {/* Glow ambient background lights */}
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-[var(--text-brand)]/5 blur-[120px] pointer-events-none z-0" />
        <div className="absolute top-10 right-10 w-[250px] h-[250px] rounded-full bg-[var(--text-brand-bright)]/5 blur-[90px] pointer-events-none z-0" />

        {/* Dot pattern mesh */}
        <div 
          className="absolute inset-0 opacity-[0.25] pointer-events-none z-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--grid-line) 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-5xl">
            <p className="text-[10px] tracking-[0.4em] text-[var(--text-brand)] uppercase mb-4 font-mono font-bold">
              {t("tag")}
            </p>
            <h1 className="text-5xl lg:text-7xl font-black text-[var(--text-primary)] tracking-tight leading-[1.1]">
              Our <span className="bg-gradient-to-r from-[#0ea5c8] to-[#22d3ee] bg-clip-text text-transparent">Featured Work</span>
            </h1>
            <p className="text-[15px] text-[var(--text-secondary)] max-w-2xl leading-relaxed mt-6 font-light">
              Discover how we engineer high-performance B2B platforms, enterprise systems, and custom applications built to scale.
            </p>
          </div>

          <div className="h-px bg-gradient-to-r from-[var(--border-default)] via-[var(--border-subtle)] to-transparent mt-16" />
        </div>
      </section>

      {/* PROJECTS GRID */}
      <section className="py-12 px-4 lg:px-8 xl:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 gap-10">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href={`/work/${project.slug}`}
                className="relative rounded-2xl border border-[var(--border-default)] bg-gradient-to-b from-[var(--bg-card)] to-[var(--bg-tertiary)] overflow-hidden group hover:border-[var(--border-brand)] hover:-translate-y-1 hover:shadow-[var(--card-shadow)] transition-all duration-500 grid grid-cols-1 lg:grid-cols-[1fr_400px]"
              >
                {/* Hover line glow effect */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--border-brand)]/0 group-hover:via-[var(--border-brand)] to-transparent transition-all duration-500 pointer-events-none" />

                {/* LEFT */}
                <div className="p-8 lg:p-12 flex flex-col justify-between z-10 relative">
                  {/* TOP */}
                  <div>
                    <div className="flex items-center gap-3.5 flex-wrap">
                      <span className="text-[9px] tracking-[0.2em] text-[var(--text-brand)] bg-[var(--bg-brand)] border border-[var(--border-brand)] px-3.5 py-1.5 rounded-md uppercase font-bold font-mono">
                        {project.tag[locale]}
                      </span>
                      <span className="text-[10px] tracking-[0.2em] text-[var(--text-muted)] font-mono">
                        {project.year}
                      </span>
                      {project.featured && (
                        <span className="bg-amber-500/10 border border-amber-500/20 text-[9px] text-amber-400 tracking-widest px-2.5 py-1.5 rounded-md uppercase font-bold font-mono">
                          {t("featured")}
                        </span>
                      )}
                    </div>

                    <h2 className="text-3xl lg:text-4xl font-extrabold text-[var(--text-primary)] mt-6 mb-4 tracking-tight group-hover:text-[var(--text-brand)] transition-colors duration-300">
                      {project.title[locale]}
                    </h2>
                    <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed mb-8 max-w-2xl font-light">
                      {project.description[locale]}
                    </p>

                    <div className="flex flex-wrap gap-2.5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1.5 text-[9px] font-mono tracking-wider text-[var(--text-secondary)] uppercase bg-[var(--bg-tertiary)] border border-[var(--border-default)] group-hover:border-[var(--border-brand)] transition-colors duration-200"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* BOTTOM */}
                  <div className="mt-8 pt-6 border-t border-[var(--border-default)]">
                    <div className="flex items-center gap-2.5 text-[10px] tracking-[0.2em] font-bold text-[var(--text-brand)] uppercase group-hover:text-[var(--text-brand-bright)] group-hover:gap-4 transition-all duration-300 font-mono">
                      {t("viewCaseStudy").replace("→", "").trim()} <span className="text-base leading-none">→</span>
                    </div>
                  </div>
                </div>

                {/* RIGHT */}
                <div
                  className="min-h-[280px] relative flex items-center justify-center overflow-hidden border-t lg:border-t-0 lg:border-l border-[var(--border-default)] group-hover:border-[var(--border-brand)]/20 transition-colors duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${project.color}15, var(--bg-tertiary) 80%)`,
                  }}
                >
                  {/* Grid background inside preview representation */}
                  <div 
                    className="absolute inset-0 opacity-[0.25] group-hover:opacity-[0.4] transition-opacity duration-500 pointer-events-none"
                    style={{
                      backgroundImage: `radial-gradient(circle at 1px 1px, var(--grid-line) 1px, transparent 0)`,
                      backgroundSize: '16px 16px'
                    }}
                  />
                  {/* Glowing background blur circle */}
                  <div
                    className="w-48 h-48 rounded-full blur-3xl opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-700 absolute"
                    style={{ background: project.color }}
                  />
                  
                  {/* Floating browser mockup window with actual image */}
                  <div className="relative z-10 w-64 h-40 rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)]/40 backdrop-blur-md overflow-hidden shadow-[var(--card-shadow)] group-hover:border-[var(--border-brand)] group-hover:scale-[1.04] transition-all duration-500 flex flex-col">
                    {/* Browser header */}
                    <div className="h-6 border-b border-[var(--border-default)] bg-[var(--bg-tertiary)]/60 px-3 flex items-center justify-between shrink-0">
                      <div className="flex gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500/40" />
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/40" />
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500/40" />
                      </div>
                      <span className="text-[7px] font-mono text-[var(--text-ghost)] uppercase tracking-widest">
                        {project.slug}
                      </span>
                    </div>
                    {/* Browser body / actual cover image */}
                    <div className="flex-1 relative w-full bg-[var(--bg-tertiary)]">
                      {project.coverImage ? (
                        <Image
                          src={encodeURI(project.coverImage).replace(/&/g, '%26')}
                          alt={project.title[locale]}
                          fill
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                          sizes="256px"
                          quality={70}
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-white/20">
                            {project.tag[locale]}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-16 px-4 lg:px-8 xl:px-12 text-center relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <p className="text-[var(--text-secondary)] text-[13px] tracking-wider mb-6">{t("haveProject")}</p>
          <Link
            href="/contact"
            className="relative overflow-hidden group bg-[var(--btn-primary)] hover:bg-[var(--btn-primary-hover)] px-8 py-4 rounded-lg text-[11px] font-bold tracking-[0.25em] uppercase text-[var(--btn-primary-text)] transition-all duration-300 shadow-[0_0_30px_var(--shadow-brand)] hover:shadow-[0_0_50px_var(--shadow-brand-strong)] active:scale-[0.99]"
          >
            {/* Shimmer */}
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
            <span className="relative z-10">{t("startProject")}</span>
          </Link>
        </div>
      </section>
    </>
  );
}
