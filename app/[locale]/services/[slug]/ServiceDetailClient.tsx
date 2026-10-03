"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import {
  Server,
  BrainCircuit,
  Layers,
  Monitor,
  Smartphone,
  LayoutDashboard,
  Palette,
  ShieldCheck,
  ArrowLeft,
  Calendar,
  CheckCircle,
} from "lucide-react";
import { Service } from "@/data";

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

const COLOR_MAP: Record<string, string> = {
  mobile: "#ec4899",
  web: "#3b82f6",
  design: "#d946ef",
  backend: "#0ea5c8",
  erp: "#f59e0b",
  ai: "#a855f7",
  industry: "#10b981",
  security: "#6366f1",
};

export function ServiceDetailClient({ service }: { service: Service }) {
  const t = useTranslations("services");
  const locale = useLocale() as "en" | "th";

  const IconComponent =
    ICON_MAP[service.icon as keyof typeof ICON_MAP] || Server;
  const accentColor = COLOR_MAP[service.id] || "#0ea5c8";

  return (
    <article className="bg-[var(--bg-primary)] min-h-screen text-[var(--text-primary)] relative">
      {/* Decorative ambient background glow */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none opacity-20 blur-[120px]"
        style={{
          background: `radial-gradient(circle, ${accentColor} 0%, transparent 80%)`,
        }}
      />

      <div className="px-4 lg:px-8 xl:px-12 py-16 relative z-10">
        <div className="max-w-7xl mx-auto">
        {/* BACK TO SERVICES LINK */}
        <div className="mb-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] text-[var(--text-ghost)] uppercase hover:text-[#22d3ee] hover:text-[var(--text-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5c8] rounded transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {t("learnMore") ? t("learnMore").replace("→", "").trim() : "Back to Services"}
          </Link>
        </div>

        {/* HERO SECTION */}
        <section className="mb-20">
          <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
            {/* Left - Icon with glowing bg */}
            <div className="relative shrink-0">
              <div
                className="absolute -inset-2 rounded-xl opacity-20 blur-md"
                style={{ backgroundColor: accentColor }}
              />
              <div className="relative w-20 h-20 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-default)] flex items-center justify-center">
                <IconComponent
                  className="w-10 h-10"
                  style={{ color: accentColor }}
                />
              </div>
            </div>

            {/* Right - Title & Tagline */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#0ea5c8] uppercase">
                  Service {service.tag}
                </span>
              </div>
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-4xl lg:text-6xl font-black tracking-tight"
              >
                {service.title[locale]}
              </motion.h1>
              {service.tagline && (
                <p className="text-[14px] text-[var(--text-secondary)] mt-3 font-medium">
                  {service.tagline[locale]}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* OVERVIEW / DESCRIPTION */}
        <section className="py-12 border-t border-[var(--border-default)] mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div>
              <h2 className="text-[11px] tracking-[0.25em] text-[var(--text-muted)] uppercase font-mono">
                {locale === "th" ? "ภาพรวมและแนวทาง" : "Overview & Approach"}
              </h2>
            </div>
            <div className="lg:col-span-2">
              <p className="text-[16px] text-[var(--text-secondary)] leading-relaxed font-light">
                {service.longDescription[locale]}
              </p>
            </div>
          </div>
        </section>

        {/* CORE CAPABILITIES / FEATURES */}
        <section className="mb-20">
          <div className="mb-10">
            <h2 className="text-[11px] tracking-[0.25em] text-[var(--text-muted)] uppercase font-mono mb-2">
              {locale === "th" ? "ขีดความสามารถหลัก" : "Core Capabilities"}
            </h2>
            <h3 className="text-2xl font-bold">
              {locale === "th" ? "สิ่งที่เราเชี่ยวชาญเป็นพิเศษ" : "What We Specialize In"}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feature, idx) => (
              <motion.div
                key={feature.en}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="group relative p-6 rounded-lg border border-[var(--border-default)] bg-[var(--bg-secondary)] hover:border-[var(--border-brand)] transition-all duration-300"
              >
                <div
                  className="absolute top-0 left-0 w-full h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: accentColor }}
                />
                <span className="text-[11px] font-mono text-[var(--text-ghost)] block mb-4">
                  0{idx + 1}
                </span>
                <p className="text-[13px] text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors leading-relaxed">
                  {feature[locale]}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* TECH STACK SECTION */}
        <section className="py-12 border-t border-[var(--border-default)] mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div>
              <h2 className="text-[11px] tracking-[0.25em] text-[var(--text-muted)] uppercase font-mono mb-2">
                {locale === "th" ? "เครื่องมือและเทคโนโลยี" : "Tech Arsenal"}
              </h2>
              <h3 className="text-2xl font-bold">
                {locale === "th" ? "พัฒนาด้วยความทันสมัย" : "Modern Tech Stack"}
              </h3>
            </div>
            <div className="lg:col-span-2 flex flex-wrap gap-2.5 items-center">
              {service.tech.map((techItem) => (
                <span
                  key={techItem}
                  className="px-4 py-2 text-[12px] font-mono text-[var(--text-secondary)] bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-sm hover:border-[#0ea5c8]/30 hover:text-[var(--text-primary)] transition-all duration-200"
                >
                  {techItem}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* DELIVERABLES & TIMELINE */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {/* Deliverables */}
          <div className="lg:col-span-2 p-8 rounded-lg border border-[var(--border-default)] bg-[var(--bg-tertiary)]">
            <h3 className="text-lg font-bold mb-6">
              {t("deliverables") || (locale === "th" ? "สิ่งที่จะได้รับส่งมอบ" : "Engineering Deliverables")}
            </h3>
            <ul className="flex flex-col gap-4">
              {service.deliverables.map((del) => (
                <li key={del.en} className="flex items-start gap-3">
                  <CheckCircle
                    className="w-4 h-4 mt-0.5 shrink-0"
                    style={{ color: accentColor }}
                  />
                  <span className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
                    {del[locale]}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Timeline Card */}
          <div className="p-8 rounded-lg border border-[var(--border-default)] bg-[var(--bg-secondary)] flex flex-col justify-between relative overflow-hidden">
            <div
              className="absolute -right-16 -top-16 w-32 h-32 opacity-10 rounded-full blur-2xl"
              style={{ backgroundColor: accentColor }}
            />
            <div>
              <div className="w-10 h-10 rounded-lg bg-[var(--bg-brand)] border border-[var(--border-brand)] flex items-center justify-center mb-6">
                <Calendar className="w-5 h-5 text-[var(--text-secondary)]" />
              </div>
              <h3 className="text-[10px] tracking-[0.2em] text-[var(--text-muted)] uppercase font-mono mb-2">
                {t("howWeWork") || (locale === "th" ? "ระยะเวลาดำเนินการ" : "Project Timeline")}
              </h3>
              <p
                className="text-3xl font-black tracking-tight"
                style={{ color: accentColor }}
              >
                {service.timeline[locale]}
              </p>
            </div>
            <p className="text-[11px] text-[var(--text-muted)] leading-relaxed mt-6">
              {locale === "th"
                ? "* ระยะเวลาประเมินขั้นต้น อาจปรับเปลี่ยนตามขอบข่ายที่ตกลงกัน"
                : "* Estimated delivery time; subject to adjustment based on scope agreement."}
            </p>
          </div>
        </section>

        {/* CTA BANNERS */}
        <section className="p-12 rounded-xl border border-[var(--border-default)] bg-[var(--bg-tertiary)] text-center relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none opacity-5 blur-[100px] -z-10"
            style={{
              background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
            }}
          />
          <h3 className="text-2xl lg:text-3xl font-black mb-3">
            {t("ctaQuestion") || (locale === "th" ? "พร้อมที่จะเริ่มต้นโครงการของคุณแล้วหรือยัง?" : "Ready to build something exceptional?")}
          </h3>
          <p className="text-[13px] text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed mb-8">
            {locale === "th"
              ? "ร่วมมือกับทีมวิศวกรของเราเพื่อสร้างโซลูชันระบบที่มั่นคงและมีประสิทธิภาพสูงสุดสำหรับองค์กรของคุณ"
              : "Collaborate with our engineering team to build highly resilient, high-performance systems customized for your enterprise."}
          </p>
          <Link
            href="/contact"
            className="inline-flex bg-[#0ea5c8] hover:bg-[#22d3ee] px-8 py-3.5 rounded-sm text-[11px] font-bold tracking-[0.2em] uppercase text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5c8] transition-all duration-200 shadow-[0_0_25px_rgba(14,165,200,0.3)] hover:shadow-[0_0_40px_rgba(14,165,200,0.5)]"
            style={{ backgroundColor: accentColor }}
          >
            {t("startThisProject") || (locale === "th" ? "เริ่มโครงการนี้" : "Start this project")} →
          </Link>
        </section>
        </div>
      </div>
    </article>
  );
}
