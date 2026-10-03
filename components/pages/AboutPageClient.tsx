"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ShieldCheck, Cpu, Activity } from "lucide-react";
import FinalCTA from "@/components/sections/FinalCTA";

export function AboutPageClient() {
  const t = useTranslations("about");

  const valuesIcons = {
    quality: ShieldCheck,
    scale: Cpu,
    reliability: Activity,
  };

  const valuesKeys = ["quality", "scale", "reliability"] as const;

  return (
    <div className="bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen relative">
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Decorative ambient background glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] pointer-events-none opacity-20 blur-[120px] bg-[radial-gradient(circle,_#0ea5c8_0%,_transparent_80%)]" />
      <div className="absolute top-[40%] right-10 w-[400px] h-[400px] pointer-events-none opacity-10 blur-[120px] bg-[radial-gradient(circle,_#22d3ee_0%,_transparent_80%)]" />

      {/* HERO SECTION */}
      <section className="relative z-10 px-4 lg:px-8 xl:px-12 pt-16 pb-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="text-[10px] font-mono tracking-[0.35em] text-[#0ea5c8] uppercase mb-4 block">
              {t("hero.tag")}
            </span>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-6">
              {t("hero.title")}
            </h1>
            <p className="text-[15px] lg:text-[17px] text-[var(--text-secondary)] leading-relaxed font-light">
              {t("hero.description")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* CORE VALUES / VISION */}
      <section className="relative z-10 px-4 lg:px-8 xl:px-12 py-16 border-t border-[var(--border-default)]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[var(--text-muted)] uppercase mb-3 block">
              {t("values.tag")}
            </span>
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight mb-4">
              {t("values.title")}
            </h2>
            <p className="text-[13px] text-[var(--text-secondary)] max-w-md leading-relaxed">
              {t("values.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {valuesKeys.map((key, i) => {
              const Icon = valuesIcons[key];
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative rounded-lg border border-[var(--border-default)] bg-[var(--bg-tertiary)] p-8 hover:border-[#0ea5c8]/30 transition-all duration-300"
                >
                  {/* Accent glow on hover */}
                  <div
                    className="absolute top-0 left-0 w-full h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#0ea5c8] to-[#22d3ee]"
                  />

                  <div className="w-12 h-12 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-default)] flex items-center justify-center mb-6 group-hover:border-[#0ea5c8]/30 transition-all duration-300">
                    <Icon className="w-5 h-5 text-[#0ea5c8] group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  <h3 className="text-[16px] font-bold mb-3 text-[var(--text-primary)] group-hover:text-[#0ea5c8] transition-colors">
                    {t(`values.${key}.title`)}
                  </h3>
                  <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed font-light">
                    {t(`values.${key}.desc`)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <FinalCTA />
    </div>
  );
}
