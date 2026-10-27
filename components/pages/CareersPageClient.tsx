"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { Calendar, MapPin, ArrowRight, GraduationCap, Users, Code } from "lucide-react";
import { jobs } from "@/data";

export function CareersPageClient() {
  const t = useTranslations("careers");
  const locale = useLocale() as "en" | "ar";

  // Filter internships
  const openPositions = jobs.filter((job) => job.type === "internship" && job.isOpen);
  const closedPositions = jobs.filter((job) => job.type === "internship" && !job.isOpen);

  const highlights = [
    {
      icon: Code,
      title: locale === "ar" ? "مشاريع عملاء حقيقية" : "Real Client Projects",
      desc: locale === "ar" ? "ستعمل على قواعد كود حقيقية وميزات حقيقية تُسلَّم للعملاء، وليس مشاريع تجريبية." : "Work on real production codebases and features that ship to clients, not toy projects.",
    },
    {
      icon: Users,
      title: locale === "ar" ? "توجيه فردي" : "1-on-1 Mentorship",
      desc: locale === "ar" ? "ستعمل بجانب مهندس كبير يوجّهك ويراجع كودك ويدعم نموك." : "Get paired with a senior engineer who guides you, reviews your code, and supports your growth.",
    },
    {
      icon: GraduationCap,
      title: locale === "ar" ? "طريق إلى الوظيفة الدائمة" : "Path to Full-Time",
      desc: locale === "ar" ? "برنامج التدريب هو مصدرنا الرئيسي لتوظيف المطورين المبتدئين بدوام كامل." : "Our internship is our primary pipeline for hiring full-time junior developers.",
    },
  ];

  return (
    <div className="bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen relative overflow-hidden py-16 px-4 lg:px-8 xl:px-12">
      {/* Background glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] pointer-events-none opacity-10 blur-[150px] bg-[#006bfd] rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] pointer-events-none opacity-10 blur-[150px] bg-[#006bfd] rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* HERO */}
        <section className="text-center max-w-3xl mx-auto mb-20 pt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[9px] tracking-[0.35em] text-[#006bfd] dark:text-[#4da3ff] uppercase mb-4 font-mono">
              {locale === "ar" ? "الوظائف في CODEPLUS" : "CAREERS @ CODEPLUS"}
            </p>
            <h1 className="text-5xl lg:text-6xl font-black tracking-tight mb-6 bg-gradient-to-r from-[var(--text-primary)] via-[var(--text-primary)] to-[#006bfd] dark:to-[#4da3ff] bg-clip-text text-transparent">
              {t("title")}
            </h1>
            <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed font-light">
              {t("subtitle")}
            </p>
          </motion.div>
        </section>

        {/* HIGHLIGHTS */}
        <section className="mb-24 grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-8 rounded-xl border border-[var(--border-default)] bg-[var(--bg-tertiary)] relative group overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#006bfd] to-[#4da3ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="w-12 h-12 rounded-lg bg-[#006bfd]/10 border border-[#006bfd]/20 flex items-center justify-center text-[#006bfd] dark:text-[#4da3ff] mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={22} />
                </div>
                <h2 className="text-[16px] font-bold mb-3">{item.title}</h2>
                <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            );
          })}
        </section>

        {/* OPEN OPPORTUNITIES */}
        <section className="mb-24">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-black tracking-tight mb-2">
              {t("sectionTitle")}
            </h2>
            <p className="text-[13px] text-[var(--text-secondary)]">
              {t("sectionSubtitle")}
            </p>
          </div>

          {openPositions.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {openPositions.map((job, idx) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="group rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-6 flex flex-col justify-between hover:border-[#006bfd]/50 shadow-[var(--card-shadow)] hover:shadow-[0_0_30px_rgba(0,107,253,0.1)] transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-2.5 py-1 text-[9px] font-semibold uppercase tracking-widest text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                        {locale === "ar" ? "التوظيف مفتوح" : "Hiring"}
                      </span>
                      <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest">
                        {job.department[locale]}
                      </span>
                    </div>

                    <h3 className="text-[18px] font-bold mb-3 text-[var(--text-primary)] group-hover:text-[#006bfd] dark:group-hover:text-[#4da3ff] transition-colors">
                      {job.title[locale]}
                    </h3>
                    <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed mb-6 font-light">
                      {job.description?.[locale]}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[var(--border-default)] mt-auto">
                    <div className="flex items-center gap-4 text-[var(--text-muted)] text-[11px] font-light">
                      <span className="flex items-center gap-1">
                        <Calendar size={13} className="text-[var(--text-muted)]/60" />
                        {job.duration[locale]}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={13} className="text-[var(--text-muted)]/60" />
                        {locale === "ar" ? "عن بُعد / القاهرة" : "Remote / Cairo"}
                      </span>
                    </div>

                    <Link
                      href={`/${locale}/careers/${job.slug}`}
                      className="inline-flex items-center gap-1 text-[11px] font-bold tracking-widest text-[#006bfd] dark:text-[#4da3ff] group-hover:text-[#006bfd] dark:group-hover:text-[#4da3ff] uppercase transition-colors"
                    >
                      {t("roleDetails")}
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border border-[var(--border-default)] rounded-xl bg-[var(--bg-tertiary)]">
              <p className="text-[14px] text-[var(--text-secondary)] mb-4">{locale === "ar" ? "لا توجد وظائف متاحة حاليًا." : "No open roles at the moment."}</p>
            </div>
          )}
        </section>

        {/* CLOSED / FUTURE ROLES */}
        {closedPositions.length > 0 && (
          <section className="mb-24 opacity-70">
            <div className="mb-8">
              <h2 className="text-xl font-bold tracking-tight mb-1">
                {locale === "ar" ? "وظائف أخرى (مغلقة حاليًا)" : "Other Roles (Currently Closed)"}
              </h2>
              <p className="text-[12px] text-[var(--text-muted)]">
                {locale === "ar" ? "وظائف نوظف لها بشكل دوري. يمكنك إرسال طلب عام ليتم إشعارك." : "Roles we hire for periodically. You can submit a general application to be notified."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {closedPositions.map((job) => (
                <div
                  key={job.id}
                  className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-tertiary)] p-5 flex items-center justify-between"
                >
                  <div>
                    <h3 className="text-[14px] font-bold text-[var(--text-secondary)]">
                      {job.title[locale]}
                    </h3>
                    <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest mt-1 block">
                      {job.department[locale]} · {job.duration[locale]}
                    </span>
                  </div>
                  <span className="text-[9px] tracking-widest uppercase text-[var(--text-muted)] px-2 py-1 rounded bg-[var(--bg-secondary)] border border-[var(--border-default)]">
                    {locale === "ar" ? "مغلق" : "Closed"}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* GENERAL APPLICATION CTA */}
        <section className="p-10 rounded-xl border border-[var(--border-default)] bg-gradient-to-r from-[#006bfd]/[0.04] via-[var(--bg-tertiary)] to-[#4da3ff]/[0.04] dark:from-[#006bfd]/15 dark:to-[#4da3ff]/10 relative overflow-hidden text-center max-w-4xl mx-auto">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#006bfd]/10 blur-xl rounded-full" />
          <h2 className="text-2xl font-black mb-3">{t("generalCta.title")}</h2>
          <p className="text-[13px] text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed mb-6 font-light">
            {t("generalCta.description")}
          </p>
          <Link
            href={`/${locale}/careers/general-application`}
            className="inline-flex bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] border border-[var(--border-default)] px-6 py-3 rounded-sm text-[11px] font-bold tracking-widest uppercase text-[var(--text-primary)] transition-all duration-200"
          >
            {t("generalCta.cta")}
          </Link>
        </section>
      </div>
    </div>
  );
}
