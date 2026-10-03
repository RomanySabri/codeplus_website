"use client";

import React from "react";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";

import { useTranslations, useLocale } from "next-intl";
import {
  ServerIcon,
  BrainCircuitIcon,
  LayersIcon,
  MonitorIcon,
  SmartphoneIcon,
  LayoutDashboardIcon,
  PaletteIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { services } from "@/data";

const ICON_MAP = {
  ServerIcon,
  BrainCircuitIcon,
  LayersIcon,
  MonitorIcon,
  SmartphoneIcon,
  LayoutDashboardIcon,
  PaletteIcon,
  ShieldCheckIcon,
};

export default function ServicesSection() {
  const t = useTranslations("services");
  const locale = useLocale() as "en" | "th";

  return (
    <section className="py-16 px-4 lg:px-8 xl:px-12 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <div className="text-[10px] font-medium tracking-[0.2em] text-[var(--text-muted)] uppercase mb-4">
            {t("tag")}
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--text-primary)] mb-6">
            {t("title")}
          </h2>
          <p className="text-[var(--text-secondary)] text-base md:text-lg leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {services.map((service, index) => {
            const Icon = ICON_MAP[service.icon as keyof typeof ICON_MAP] || ServerIcon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative flex items-center gap-4 p-5 border border-[var(--border-default)] rounded-xl bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] transition-all hover:border-[var(--border-brand)] shadow-[var(--card-shadow)]"
              >
                <Link
                  href={service.href}
                  className="absolute inset-0 z-10"
                  aria-label={service.title[locale]}
                />

                {/* Icon */}
                <div className="w-12 h-12 shrink-0 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center border border-[var(--border-subtle)]">
                  <Icon size={20} className="text-[var(--text-secondary)] group-hover:text-[var(--text-brand)] transition-colors" />
                </div>

                {/* Content */}
                <h3 className="text-sm xl:text-base font-semibold text-[var(--text-primary)] group-hover:text-[var(--text-brand)] transition-colors flex-1 min-w-0 break-normal">
                  {service.title[locale]}
                </h3>

                {/* Arrow */}
                <div className="ml-auto opacity-0 -translate-x-2 text-[var(--text-muted)] group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-[var(--text-brand)] transition-all duration-300">
                  &rarr;
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
