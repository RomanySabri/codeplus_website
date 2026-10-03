"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiNodedotjs,
  SiBun,
  SiPrisma,
  SiPostgresql,
  SiRedis,
  SiGraphql,
  SiVercel,
  SiDocker,
  SiKubernetes,
  SiCloudflare,
  SiGithubactions,
  SiFirebase,
  SiFlutter,
} from "@icons-pack/react-simple-icons";
import {
  CloudIcon,
  BotIcon,
  DatabaseIcon,
  LinkIcon,
  DatabaseZapIcon,
  LayoutTemplate,
  Server,
  Network,
  BrainCircuit
} from "lucide-react";

const categories = [
  {
    key: "frontend",
    icon: LayoutTemplate,
    items: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "React", icon: SiReact },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Framer Motion", icon: SiFramer },
      { name: "Flutter", icon: SiFlutter },
    ],
  },
  {
    key: "backend",
    icon: Server,
    items: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Bun", icon: SiBun },
      { name: "Prisma", icon: SiPrisma },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "Redis", icon: SiRedis },
      { name: "GraphQL", icon: SiGraphql },
    ],
  },
  {
    key: "infrastructure",
    icon: Network,
    items: [
      { name: "Vercel", icon: SiVercel },
      { name: "Docker", icon: SiDocker },
      { name: "Kubernetes", icon: SiKubernetes },
      { name: "Cloudflare", icon: SiCloudflare },
      { name: "AWS", icon: CloudIcon },
      { name: "GitHub Actions", icon: SiGithubactions },
    ],
  },
  {
    key: "aiData",
    icon: BrainCircuit,
    items: [
      { name: "OpenAI", icon: BotIcon },
      { name: "LangChain", icon: LinkIcon },
      { name: "Pinecone", icon: DatabaseIcon },
      { name: "Firebase", icon: SiFirebase },
      { name: "Neon DB", icon: DatabaseZapIcon },
      { name: "Supabase", icon: DatabaseIcon },
    ],
  },
];

export default function TechStackSection() {
  const t = useTranslations("techStack");
  return (
    <section id="stack" className="py-24 px-4 lg:px-8 xl:px-12 bg-[var(--bg-primary)] relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--border-default)] to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--text-brand)]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Background Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.25]"
        style={{
          backgroundImage: `linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border-brand)] bg-[var(--bg-brand)] text-[var(--text-brand-bright)] text-[10px] font-medium tracking-[0.2em] uppercase mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-brand-bright)] animate-pulse" />
            {t("badge")}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-[var(--text-primary)] tracking-tight mb-6"
          >
            {t("title")} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ea5c8] to-[#1a7ab5]">
              {t("titleAccent")}
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[var(--text-muted)] text-[13px] md:text-sm leading-relaxed max-w-xl mx-auto"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {categories.map((category, idx) => (
            <motion.div
              key={category.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative group rounded-[2rem] border border-[var(--border-default)] bg-[var(--bg-card)] p-8 lg:p-10 overflow-hidden hover:border-[var(--border-brand)] transition-all duration-500 shadow-[var(--card-shadow)]"
            >
              {/* Card Hover Gradient */}
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-[var(--text-brand)]/10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Watermark Icon */}
              <category.icon
                className="absolute -bottom-8 -right-8 w-56 h-56 text-[var(--text-ghost)] opacity-20 group-hover:text-[var(--text-brand)] group-hover:opacity-5 transition-all duration-700 transform group-hover:scale-110 group-hover:-rotate-12"
                strokeWidth={1}
              />

              <div className="relative z-10">
                {/* Card Header */}
                <div className="flex items-center gap-5 mb-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--bg-tertiary)] to-[var(--bg-card)] border border-[var(--border-default)] flex items-center justify-center shadow-lg group-hover:border-[var(--border-brand)] group-hover:shadow-[0_0_15px_var(--shadow-brand)] transition-all duration-500">
                    <category.icon className="w-6 h-6 text-[var(--text-secondary)] group-hover:text-[var(--text-brand-bright)] transition-colors duration-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[var(--text-primary)] tracking-wide mb-1 group-hover:text-[var(--text-brand-bright)] transition-colors duration-300">
                      {t(category.key)}
                    </h3>
                    <p className="text-[11px] font-mono tracking-[0.1em] text-[var(--text-muted)] uppercase">
                      {t("technologiesCount", { count: category.items.length })}
                    </p>
                  </div>
                </div>

                {/* Tech Grid */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                  {category.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.name}
                        className="flex items-center gap-3 group/item cursor-default"
                      >
                        <div className="w-10 h-10 rounded-xl border border-[var(--border-default)] bg-[var(--bg-tertiary)] flex items-center justify-center group-hover/item:border-[var(--border-brand)] group-hover/item:bg-[var(--bg-brand)] group-hover/item:shadow-[0_0_15px_var(--shadow-brand)] transition-all duration-300">
                          <Icon size={18} className="text-[var(--text-muted)] group-hover/item:text-[var(--text-brand-bright)] group-hover/item:scale-110 transition-all duration-300" />
                        </div>
                        <span className="text-[13px] font-medium text-[var(--text-secondary)] group-hover/item:text-[var(--text-primary)] transition-colors duration-300">
                          {item.name}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
