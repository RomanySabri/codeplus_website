"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { ArrowLeft, Calendar, MapPin, CheckCircle2, AlertCircle } from "lucide-react";
import { Job } from "@/data";
import { sendInternshipApplication } from "@/app/actions/internship";

type FormData = {
  name: string;
  email: string;
  cvLink: string;
  message?: string;
};

export function InternshipDetailClient({ job }: { job: Job }) {
  const t = useTranslations("careers");
  const locale = useLocale() as "en" | "th";

  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  // Form Validation Schema using Zod
  const schema = useMemo(() => {
    return z.object({
      name: z.string().min(2, t("form.errors.nameRequired")),
      email: z.string().email(t("form.errors.emailInvalid")),
      cvLink: z.string().url(t("form.errors.cvLinkRequired")),
      message: z.string().optional(),
    });
  }, [t]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsError(false);
    const result = await sendInternshipApplication({
      ...data,
      position: job.title[locale] || job.title.en,
    });

    if (result.success) {
      setIsSuccess(true);
    } else {
      setIsError(true);
    }
  };

  return (
    <div className="bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen relative overflow-hidden py-16 px-4 lg:px-8 xl:px-12">
      {/* Dynamic ambient background glow */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none opacity-20 blur-[120px]"
        style={{
          background: `radial-gradient(circle, #a855f7 0%, transparent 80%)`,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* BACK TO CAREERS */}
        <div className="mb-12">
          <Link
            href={`/careers`}
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] text-[var(--text-muted)] uppercase hover:text-purple-400 hover:text-[var(--text-secondary)] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {t("back")}
          </Link>
        </div>

        {/* HERO */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-2.5 py-1 text-[9px] font-semibold uppercase tracking-widest rounded-full ${
              job.isOpen 
                ? "text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20" 
                : "text-[var(--text-muted)] bg-[var(--bg-secondary)] border border-[var(--border-default)]"
            }`}>
              {job.isOpen ? (locale === "th" ? "เปิดรับสมัคร" : "Hiring now") : (locale === "th" ? "ปิดรับสมัคร" : "Closed")}
            </span>
            <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest">
              {job.department[locale]}
            </span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-6 text-[var(--text-primary)]">
            {job.title[locale]}
          </h1>

          <div className="flex flex-wrap gap-6 text-[var(--text-muted)] text-[12px] font-light">
            <span className="flex items-center gap-2">
              <Calendar size={14} className="text-purple-500 dark:text-purple-400" />
              <strong>{t("duration")}:</strong> {job.duration[locale]}
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={14} className="text-purple-500 dark:text-purple-400" />
              <strong>{locale === "th" ? "สถานที่ทำงาน" : "Location"}:</strong> {locale === "th" ? "รีโมท / กรุงเทพฯ" : "Remote / Cairo"}
            </span>
          </div>
        </section>

        {/* DETAILS GRID */}
        <section className="grid grid-cols-1 lg:grid-cols-[1.5fr_1.2fr] gap-12 lg:gap-16 border-t border-[var(--border-default)] pt-12">
          {/* LEFT - Qualifications & Description */}
          <div className="space-y-10">
            <div>
              <h2 className="text-[11px] tracking-[0.25em] text-[var(--text-muted)] uppercase font-mono mb-4">
                {locale === "th" ? "เกี่ยวกับบทบาทนี้" : "About the Role"}
              </h2>
              <p className="text-[15px] text-[var(--text-secondary)] leading-relaxed font-light">
                {job.description?.[locale]}
              </p>
            </div>

            {job.requirements && job.requirements.length > 0 && (
              <div>
                <h2 className="text-[11px] tracking-[0.25em] text-[var(--text-muted)] uppercase font-mono mb-4">
                  {t("requirements")}
                </h2>
                <ul className="space-y-4">
                  {job.requirements.map((req) => (
                    <li key={req.en} className="flex items-start gap-3 text-[13px] text-[var(--text-secondary)] font-light">
                      <span className="text-purple-500 dark:text-purple-400 mt-1 select-none">→</span>
                      <span>{req[locale]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {job.responsibilities && job.responsibilities.length > 0 && (
              <div>
                <h2 className="text-[11px] tracking-[0.25em] text-[var(--text-muted)] uppercase font-mono mb-4">
                  {t("responsibilities")}
                </h2>
                <ul className="space-y-4">
                  {job.responsibilities.map((resp) => (
                    <li key={resp.en} className="flex items-start gap-3 text-[13px] text-[var(--text-secondary)] font-light">
                      <span className="text-purple-500 dark:text-purple-400 mt-1 select-none">✓</span>
                      <span>{resp[locale]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* RIGHT - Application Form */}
          <div>
            <div className="relative rounded-2xl border border-[var(--border-default)] bg-gradient-to-b from-[var(--bg-secondary)] to-[var(--bg-primary)] p-8 shadow-[var(--card-shadow)] relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent pointer-events-none" />

              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center min-h-[400px] text-center gap-5"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 dark:text-emerald-400 mb-2">
                    <CheckCircle2 size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-[var(--text-primary)] mb-2">
                      {t("form.success.title")}
                    </h3>
                    <p className="text-[13px] text-[var(--text-secondary)] max-w-xs mx-auto leading-relaxed">
                      {t("form.success.message")}
                    </p>
                  </div>
                  <Link
                    href={`/${locale}/careers`}
                    className="mt-4 border border-[var(--border-default)] hover:bg-[var(--bg-tertiary)] px-6 py-2.5 rounded-sm text-[11px] font-bold tracking-widest uppercase text-[var(--text-primary)] transition-all"
                  >
                    {t("back")}
                  </Link>
                </motion.div>
              ) : (
                <>
                  <div className="mb-8">
                    <h3 className="text-xl font-bold tracking-tight mb-2">
                      {t("applyTitle")}
                    </h3>
                    <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed font-light">
                      {t("applySubtitle")}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Name */}
                    <div>
                      <label htmlFor="intern-name" className="text-[9px] tracking-[0.2em] text-[var(--text-muted)] uppercase mb-2 block font-mono">
                        {t("form.name")}
                      </label>
                      <input
                        id="intern-name"
                        {...register("name")}
                        aria-required="true"
                        aria-invalid={errors.name ? "true" : "false"}
                        aria-describedby={errors.name ? "intern-name-error" : undefined}
                        placeholder={t("form.namePlaceholder")}
                        className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] hover:border-[var(--input-focus)]/30 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded px-4 py-3 text-[13px] text-[var(--input-text)] placeholder-[var(--input-placeholder)] focus:outline-none transition-all duration-200"
                      />
                      {errors.name && (
                        <p id="intern-name-error" className="text-[11px] text-red-500 dark:text-red-400/80 mt-1.5 flex items-center gap-1 font-light">
                          <AlertCircle size={12} /> {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="intern-email" className="text-[9px] tracking-[0.2em] text-[var(--text-muted)] uppercase mb-2 block font-mono">
                        {t("form.email")}
                      </label>
                      <input
                        id="intern-email"
                        {...register("email")}
                        type="email"
                        aria-required="true"
                        aria-invalid={errors.email ? "true" : "false"}
                        aria-describedby={errors.email ? "intern-email-error" : undefined}
                        placeholder={t("form.emailPlaceholder")}
                        className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] hover:border-[var(--input-focus)]/30 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded px-4 py-3 text-[13px] text-[var(--input-text)] placeholder-[var(--input-placeholder)] focus:outline-none transition-all duration-200"
                      />
                      {errors.email && (
                        <p id="intern-email-error" className="text-[11px] text-red-500 dark:text-red-400/80 mt-1.5 flex items-center gap-1 font-light">
                          <AlertCircle size={12} /> {errors.email.message}
                        </p>
                      )}
                    </div>



                    {/* CV Link */}
                    <div>
                      <label htmlFor="intern-cvLink" className="text-[9px] tracking-[0.2em] text-[var(--text-muted)] uppercase mb-2 block font-mono">
                        {t("form.cvLink")}
                      </label>
                      <input
                        id="intern-cvLink"
                        {...register("cvLink")}
                        aria-required="true"
                        aria-invalid={errors.cvLink ? "true" : "false"}
                        aria-describedby={errors.cvLink ? "intern-cvLink-error" : undefined}
                        placeholder={t("form.cvLinkPlaceholder")}
                        className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] hover:border-[var(--input-focus)]/30 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded px-4 py-3 text-[13px] text-[var(--input-text)] placeholder-[var(--input-placeholder)] focus:outline-none transition-all duration-200"
                      />
                      {errors.cvLink && (
                        <p id="intern-cvLink-error" className="text-[11px] text-red-500 dark:text-red-400/80 mt-1.5 flex items-center gap-1 font-light">
                          <AlertCircle size={12} /> {errors.cvLink.message}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="intern-message" className="text-[9px] tracking-[0.2em] text-[var(--text-muted)] uppercase mb-2 block font-mono">
                        {t("form.message")}
                      </label>
                      <textarea
                        id="intern-message"
                        {...register("message")}
                        rows={4}
                        placeholder={t("form.messagePlaceholder")}
                        className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] hover:border-[var(--input-focus)]/30 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded px-4 py-3 text-[13px] text-[var(--input-text)] placeholder-[var(--input-placeholder)] focus:outline-none transition-all duration-200 resize-none font-light"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-purple-600 hover:bg-purple-700 py-3.5 rounded font-bold text-[11px] tracking-widest uppercase text-white transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          {t("form.submitting")}
                        </>
                      ) : (
                        t("form.submit")
                      )}
                    </button>

                    {isError && (
                      <p className="text-[11px] text-red-500 dark:text-red-400 mt-2 text-center">
                        {t("form.errors.submitFailed")}
                      </p>
                    )}
                  </form>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
