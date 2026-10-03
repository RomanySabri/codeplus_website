"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import {
  Server,
  BrainCircuit,
  Layers,
  Monitor,
  Smartphone,
  LayoutDashboard,
  Palette,
  ShieldCheck,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

import { services } from "@/data";

const ICON_MAP = {
  ServerIcon: Server,
  BrainCircuitIcon: BrainCircuit,
  LayersIcon: Layers,
  MonitorIcon: Monitor,
  SmartphoneIcon: Smartphone,
  LayoutDashboardIcon: LayoutDashboard,
  PaletteIcon: Palette,
  ShieldCheckIcon: ShieldCheck,
};

export function ServicesPageClient() {
  const t = useTranslations("services");
  const locale = useLocale() as "en" | "th";

  return (
    <>
      {/* HERO */}
      <section className="py-16 px-4 lg:px-8 xl:px-12 bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[9px] tracking-[0.35em] text-[var(--text-muted)] uppercase mb-3">
            {t("hero.tag")}
          </p>
          <h1 className="text-5xl lg:text-6xl font-black text-[var(--text-primary)] tracking-tight mb-6">
            {t("hero.title")}
          </h1>
          <p className="text-[14px] text-[var(--text-secondary)] max-w-xl leading-relaxed">
            {t("hero.subtitle")}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-12 mt-10">
            <div>
              <div className="text-3xl font-black text-[var(--text-brand)]">{services.length}</div>
              <div className="text-[11px] text-[var(--text-muted)] uppercase tracking-widest mt-1">
                {t("hero.stats.core")}
              </div>
            </div>
            <div>
              <div className="text-3xl font-black text-[var(--text-brand)]">48+</div>
              <div className="text-[11px] text-[var(--text-muted)] uppercase tracking-widest mt-1">
                {t("hero.stats.projects")}
              </div>
            </div>
            <div>
              <div className="text-3xl font-black text-[var(--text-brand)]">99.9%</div>
              <div className="text-[11px] text-[var(--text-muted)] uppercase tracking-widest mt-1">
                {t("hero.stats.uptime")}
              </div>
            </div>
          </div>

          <div className="h-px bg-[var(--border-default)] mt-16" />
        </div>
      </section>

      {/* SERVICES LIST */}
      <section className="py-12 px-4 lg:px-8 xl:px-12 bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-6">
            {services.map((service, index) => {
              const Icon = ICON_MAP[service.icon as keyof typeof ICON_MAP] || Server;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] overflow-hidden grid grid-cols-1 lg:grid-cols-[1fr_300px] shadow-[var(--card-shadow)]"
                >
                  {/* LEFT */}
                  <div className="p-8 lg:p-10 flex flex-col justify-between">
                    <div>
                      {/* TOP ROW */}
                      <div className="flex items-center gap-3 mb-6">
                        <span className="text-[10px] tracking-[0.2em] text-[var(--text-brand)] uppercase">
                          {service.tag}
                        </span>
                        <Icon className="w-4 h-4 text-[var(--text-ghost)]" />
                      </div>

                      <h2 className="text-2xl font-black text-[var(--text-primary)] mb-3">
                        {service.title[locale]}
                      </h2>
                      <p className="text-[14px] leading-relaxed text-[var(--text-secondary)] mb-8 max-w-2xl font-light">
                        {service.description[locale]}
                      </p>

                      {/* TWO COLUMN GRID */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {/* Features */}
                        <div>
                          <h3 className="text-[9px] tracking-[0.3em] text-[var(--text-muted)] uppercase mb-4">
                            {t("whatsIncluded")}
                          </h3>
                          <ul className="flex flex-col gap-3">
                            {service.features.map((feature) => (
                              <li
                                key={feature.en}
                                className="text-[12px] text-[var(--text-secondary)] flex items-start gap-2"
                              >
                                <span className="text-[var(--text-brand)]/60 mt-0.5">→</span>
                                {feature[locale]}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Tech stack */}
                        <div>
                          <h3 className="text-[9px] tracking-[0.3em] text-[var(--text-muted)] uppercase mb-4">
                            {t("technologies")}
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {service.tech.map((tech) => (
                              <span
                                key={tech}
                                className="px-2.5 py-1 text-[10px] tracking-[0.1em] text-[var(--text-secondary)] uppercase bg-[var(--bg-tertiary)] rounded-sm border border-[var(--border-default)]"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* BOTTOM ROW */}
                    <div className="mt-8 pt-6 border-t border-[var(--border-default)] flex flex-wrap gap-4 justify-between items-center">
                      <div className="text-[11px] text-[var(--text-muted)]">
                        ⏱ {service.timeline[locale]}
                      </div>
                      <Link
                        href={`/${locale}${service.href}`}
                        className="text-[11px] text-[var(--text-brand)] hover:text-[var(--text-brand-bright)] transition-colors font-semibold"
                      >
                        {t("learnMore")}
                      </Link>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="p-8 bg-gradient-to-b from-[var(--bg-card-hover)] to-transparent flex flex-col h-full border-l border-[var(--border-default)] lg:border-t-0 border-t">
                    <h3 className="text-[9px] tracking-[0.3em] text-[var(--text-muted)] uppercase mb-5">
                      {t("deliverables")}
                    </h3>
                    <ul className="flex flex-col gap-3 mb-8 flex-1">
                      {service.deliverables.map((item) => (
                        <li
                          key={item.en}
                          className="flex items-start gap-3 text-[12px] text-[var(--text-secondary)]"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            className="text-[var(--text-brand)] shrink-0 mt-0.5"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>{item[locale]}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Link
                      href={`/${locale}/contact?service=${service.id}`}
                      className="w-full text-center border border-[var(--btn-ghost-border)] text-[var(--btn-ghost-text)] text-[11px] tracking-widest uppercase py-2.5 rounded-sm hover:border-[var(--btn-ghost-hover-border)] hover:bg-[var(--bg-brand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text-brand)] transition-all duration-200 mt-auto"
                    >
                      {t("startThisProject")}
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>





      {/* FINAL CTA */}
      <section className="py-16 px-4 lg:px-8 xl:px-12 text-center border-t border-[var(--border-default)] bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl lg:text-4xl font-black text-[var(--text-primary)] tracking-tight mb-6">
            {t("readyToStart")}
          </h2>
          <p className="text-[var(--text-secondary)] text-[13px] mb-10 max-w-md">
            {t("readyToStartSubtitle")}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 items-stretch sm:items-center max-w-sm mx-auto sm:max-w-none w-full">
            <Link
              href={`/${locale}/contact`}
              className="bg-[var(--btn-primary)] hover:bg-[var(--btn-primary-hover)] px-8 py-4 rounded-sm text-[11px] font-bold tracking-[0.2em] uppercase text-[var(--btn-primary-text)] transition-all duration-200 shadow-[0_0_25px_var(--shadow-brand)] hover:shadow-[0_0_40px_var(--shadow-brand-strong)] w-full sm:w-auto text-center justify-center flex items-center"
            >
              {t("startProjectBtn")}
            </Link>
            <Link
              href={`/${locale}/work`}
              className="border border-[var(--btn-ghost-border)] hover:bg-[var(--bg-brand)] px-8 py-4 rounded-sm text-[11px] font-bold tracking-[0.2em] uppercase text-[var(--btn-ghost-text)] hover:text-[var(--btn-ghost-hover-text)] transition-colors w-full sm:w-auto text-center justify-center flex items-center"
            >
              {t("viewOurWork")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
