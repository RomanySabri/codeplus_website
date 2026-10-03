"use client";

import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function FinalCTA() {
  const t = useTranslations("finalCTA");
  return (
    <section className="py-20 px-4 lg:px-8 xl:px-12 bg-[var(--bg-primary)] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--shadow-brand)_0%,_transparent_70%)]" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--border-brand)] to-transparent" />

      {/* Content */}
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[9px] tracking-[0.4em] text-[var(--text-muted)] uppercase mb-6">
            {t("tag")}
          </p>
          <h2 className="text-4xl lg:text-6xl font-black text-[var(--text-primary)] tracking-tight leading-[1.05] mb-6">
            {t("headlinePart1")} <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a7ab5] via-[#0ea5c8] to-[#22d3ee]">
              {t("headlineAccent")}
            </span>{" "}
            {t("headlinePart2")}
          </h2>
          <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mb-10">
            {t("subtitleLine1")} <br className="hidden lg:block" />
            {t("subtitleLine2")}
          </p>

          {/* CTA Buttons Row */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center max-w-sm mx-auto sm:max-w-none">
            <Link
              href="/contact"
              className="bg-[var(--btn-primary)] hover:bg-[var(--btn-primary-hover)] px-8 py-3 rounded-sm text-[11px] font-bold tracking-[0.2em] uppercase text-[var(--btn-primary-text)] transition-all active:scale-[0.98] shadow-[0_0_30px_var(--shadow-brand)] hover:shadow-[0_0_40px_var(--shadow-brand-strong)] w-full sm:w-auto text-center justify-center flex items-center"
            >
              {t("startProject")}
            </Link>
            <Link
              href="/work"
              className="border border-[var(--btn-ghost-border)] hover:border-[var(--btn-ghost-hover-border)] px-8 py-3 rounded-sm text-[11px] tracking-[0.2em] uppercase text-[var(--btn-ghost-text)] hover:text-[var(--btn-ghost-hover-text)] transition-all w-full sm:w-auto text-center justify-center flex items-center"
            >
              {t("viewWork")}
            </Link>
          </div>

          {/* Trust Signals */}
          <div className="mt-10 flex items-center justify-center gap-8 flex-wrap">
            <span className="text-[10px] tracking-[0.15em] text-[var(--text-muted)] uppercase">
              ✦ {t("trustSignals.response")}
            </span>
            <span className="text-[10px] tracking-[0.15em] text-[var(--text-muted)] uppercase">
              ✦ {t("trustSignals.nda")}
            </span>
            <span className="text-[10px] tracking-[0.15em] text-[var(--text-muted)] uppercase">
              ✦ {t("trustSignals.fixedPrice")}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
