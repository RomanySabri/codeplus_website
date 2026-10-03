"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { team } from "@/data";

interface MemberImageProps {
  src: string;
  alt: string;
  initial: string;
  sizes: string;
}

function MemberImage({ src, alt, initial, sizes }: MemberImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="relative w-full h-full bg-transparent">
      {(!loaded || error) && (
        <div className="absolute inset-0 flex items-center justify-center bg-transparent z-0">
          <span className="text-3xl font-black text-[#0ea5c8] tracking-widest select-none">
            {initial}
          </span>
        </div>
      )}

      {!error && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105 mix-blend-multiply dark:mix-blend-normal"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          style={{ opacity: loaded ? 1 : 0 }}
        />
      )}
    </div>
  );
}

export function TeamPageClient() {
  const t = useTranslations("team");
  const locale = useLocale() as "en" | "th";

  return (
    <div className="bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen relative pb-28">
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Hero header */}
      <section className="relative z-10 px-4 lg:px-8 xl:px-12 pt-16 pb-12 text-center">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <span className="text-[9px] font-mono tracking-[0.35em] text-[#0ea5c8] uppercase mb-4 block">
              {t("tag")}
            </span>
            <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-6">
              {t("pageTitle")}
            </h1>
            <p className="text-[15px] text-[var(--text-secondary)] font-semibold mb-4">
              {t("pageSubtitle")}
            </p>

            <p className="text-[13px] text-[var(--text-muted)] leading-relaxed max-w-2xl mx-auto">
              {t("pageDesc2")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Cards Grid */}
      <section className="relative z-10 px-4 lg:px-8 xl:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center max-w-6xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.id || index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group rounded-xl border border-white/[0.05] bg-[var(--bg-card)] flex flex-col justify-between min-h-[440px] text-center hover:border-[#0ea5c8]/30 transition-all duration-300 relative overflow-hidden shadow-[var(--card-shadow)]"
              >
                {/* Top portion (Gray background header band) */}
                <div className="relative w-full h-24 bg-slate-500/[0.06] dark:bg-white/[0.02] flex items-center justify-center overflow-hidden shrink-0" />

                {/* Floating Circular Avatar */}
                <div className="absolute top-10 left-1/2 -translate-x-1/2 z-20">
                  {/* Outer glow ring — appears on hover */}
                  <div className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: "radial-gradient(circle, var(--shadow-brand) 0%, transparent 70%)",
                      filter: "blur(8px)",
                    }}
                  />

                  {/* Photo circle frame */}
                  <div className="relative w-28 h-28 rounded-full overflow-hidden bg-[var(--bg-secondary)] border-4 border-[var(--bg-card)] shadow-md transition-all duration-300 group-hover:border-[#0ea5c8]/30">
                    <MemberImage
                      src={member.image}
                      alt={member.name}
                      initial={member.initial}
                      sizes="112px"
                    />
                  </div>
                </div>

                {/* Bottom portion (Details Box) */}
                <div className="w-full bg-[var(--bg-secondary)] pt-16 p-6 z-10 flex-grow flex flex-col justify-between transition-colors duration-300">
                  <div className="flex-grow flex flex-col justify-start mb-4">
                    <h2 className="text-[16px] font-black text-[var(--text-primary)] group-hover:text-[#0ea5c8] transition-colors duration-200">
                      {member.name}
                    </h2>
                    <p className="text-[11px] font-extrabold tracking-wider text-[#0ea5c8] uppercase mt-1">
                      {member.role[locale]}
                    </p>
                    <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed font-light mt-3 line-clamp-3">
                      {member.bio[locale]}
                    </p>
                  </div>

                  {/* Social Links Row (Centered) */}
                  <div className="flex items-center justify-center gap-3 pt-3 border-t border-white/[0.04]">
                    {/* LinkedIn */}
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Follow ${member.name} on LinkedIn`}
                      className="w-7 h-7 rounded-md border border-[var(--border-default)] flex items-center justify-center text-[var(--text-muted)] hover:text-[#0ea5c8] hover:border-[#0ea5c8]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5c8] transition-all duration-200"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286z M5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z M22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>

                    {/* Email */}
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        aria-label={`Send email to ${member.name}`}
                        className="w-7 h-7 rounded-md border border-[var(--border-default)] flex items-center justify-center text-[var(--text-muted)] hover:text-[#0ea5c8] hover:border-[#0ea5c8]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5c8] transition-all duration-200"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect width="20" height="16" x="2" y="4" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
