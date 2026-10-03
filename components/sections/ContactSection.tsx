"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { sendContactEmail } from "@/app/actions/contact";
import type { ContactFormData } from "@/types/contact";

export function ContactSection() {
  const t = useTranslations("contact");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const schema = useMemo(() => {
    return z.object({
      name: z.string().min(2, t("form.errors.nameRequired")),
      email: z.string().email(t("form.errors.emailInvalid")),
      company: z.string().optional(),
      message: z.string().min(10, t("form.errors.messageLength")),
    });
  }, [t]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsError(false);
    const result = await sendContactEmail(data);
    if (result.success) {
      setIsSuccess(true);
    } else {
      setIsError(true);
    }
  };

  return (
    <section className="py-20 px-4 lg:px-8 xl:px-12 bg-[var(--bg-primary)] relative">
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.25]"
        style={{
          backgroundImage: `
            linear-gradient(var(--grid-line) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* SECTION HEADER */}
        <div className="mb-16">
          <p className="text-[9px] tracking-[0.35em] text-[var(--text-muted)] uppercase mb-3">
            {t("tag")}
          </p>
          <h2 className="text-4xl lg:text-5xl font-black text-[var(--text-primary)] tracking-tight">
            {t("title")}
          </h2>
        </div>

        {/* TWO COLUMNS */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* LEFT — Contact Info */}
          <div className="lg:w-2/5">
            <h3 className="text-3xl lg:text-4xl font-black text-[var(--text-primary)] tracking-tight mb-4">
              {t("heading")}
            </h3>
            <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed max-w-xs mb-10">
              {t("description")}
            </p>

            {/* Contact Cards */}
            <div className="flex flex-col gap-3 mb-8">
              {/* Email */}
              <a
                href="mailto:hello@codeplusdev.com"
                className="group flex items-center gap-4 p-4 rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)] hover:border-[var(--border-brand)] shadow-[var(--card-shadow)] transition-all duration-200"
              >
                <div className="w-9 h-9 rounded-md bg-[var(--bg-brand)] border border-[var(--border-brand)] flex items-center justify-center text-[var(--text-brand)]">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.2em] text-[var(--text-muted)] uppercase">
                    {t("contactCards.email.label")}
                  </p>
                  <p className="text-[13px] text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                    {t("contactCards.email.value")}
                  </p>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/201019422125"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)] hover:border-[var(--border-brand)] shadow-[var(--card-shadow)] transition-all duration-200"
              >
                <div className="w-9 h-9 rounded-md bg-[var(--bg-brand)] border border-[var(--border-brand)] flex items-center justify-center text-[var(--text-brand)]">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.2em] text-[var(--text-muted)] uppercase">
                    {t("contactCards.whatsapp.label")}
                  </p>
                  <p className="text-[13px] text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                    {t("contactCards.whatsapp.value")}
                  </p>
                </div>
              </a>

              {/* Location */}
              <div className="group flex items-center gap-4 p-4 rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)] shadow-[var(--card-shadow)]">
                <div className="w-9 h-9 rounded-md bg-[var(--bg-brand)] border border-[var(--border-brand)] flex items-center justify-center text-[var(--text-brand)]">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.2em] text-[var(--text-muted)] uppercase">
                    {t("contactCards.location.label")}
                  </p>
                  <p className="text-[13px] text-[var(--text-secondary)]">
                    {t("contactCards.location.value")}
                  </p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-3 mb-8">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/share/1AVF1TpX6X/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow CodePlus on Facebook"
                className="w-9 h-9 rounded-md border border-[var(--border-default)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-brand)] hover:border-[var(--border-brand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text-brand)] transition-all duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/code-plus-dev/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow CodePlus on LinkedIn"
                className="w-9 h-9 rounded-md border border-[var(--border-default)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-brand)] hover:border-[var(--border-brand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text-brand)] transition-all duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>

            {/* Response time */}
            <div className="inline-flex items-center gap-2 text-[11px] text-[var(--text-muted)]">
              <span>⚡</span> {t("responseTime")}
            </div>
          </div>

          {/* RIGHT — Contact Form */}
          <div className="lg:w-3/5">
            <div className="relative rounded-2xl border border-[var(--border-default)] bg-gradient-to-b from-[var(--bg-card-hover)] to-[var(--bg-tertiary)] p-8 lg:p-10 shadow-[var(--card-shadow)]">
              {/* Decorative top gradient line */}
              <div className="absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-[var(--border-brand)] to-transparent pointer-events-none" />

              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-center min-h-[400px] text-center gap-5 py-16"
                >
                  {/* Animated checkmark circle */}
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-emerald-500/10 blur-xl animate-pulse" />
                    <div className="relative w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-[var(--text-primary)] mb-2">
                      {t("form.success.title")}
                    </h3>
                    <p className="text-[13px] text-[var(--text-secondary)] max-w-xs mx-auto leading-relaxed">
                      {t("form.success.message")}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-[var(--text-muted)] uppercase tracking-widest">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute animate-ping rounded-full bg-emerald-400 opacity-75 h-full w-full" />
                      <span className="relative rounded-full bg-emerald-500 h-1.5 w-1.5" />
                    </span>
                    We&apos;ll reply within 24 hours
                  </div>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-6"
                >
                  {/* Name + Email grid on desktop */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label htmlFor="contact-name" className="text-[10px] tracking-[0.2em] text-[var(--text-secondary)] uppercase mb-2.5 block font-medium">
                        {t("form.name.label")}
                      </label>
                      <input
                        id="contact-name"
                        {...register("name")}
                        aria-required="true"
                        aria-invalid={errors.name ? "true" : "false"}
                        aria-describedby={errors.name ? "contact-name-error" : undefined}
                        placeholder={t("form.name.placeholder")}
                        className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] rounded-lg px-4 py-3.5 text-[13px] text-[var(--input-text)] placeholder:text-[var(--input-placeholder)] focus:outline-none focus:border-[var(--input-focus)] focus:ring-2 focus:ring-[var(--border-brand)] hover:border-[var(--border-brand)] transition-all duration-200"
                      />
                      {errors.name && (
                        <p id="contact-name-error" className="text-[11px] text-red-400/80 mt-1.5">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="contact-email" className="text-[10px] tracking-[0.2em] text-[var(--text-secondary)] uppercase mb-2.5 block font-medium">
                        {t("form.email.label")}
                      </label>
                      <input
                        id="contact-email"
                        {...register("email")}
                        type="email"
                        aria-required="true"
                        aria-invalid={errors.email ? "true" : "false"}
                        aria-describedby={errors.email ? "contact-email-error" : undefined}
                        placeholder={t("form.email.placeholder")}
                        className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] rounded-lg px-4 py-3.5 text-[13px] text-[var(--input-text)] placeholder:text-[var(--input-placeholder)] focus:outline-none focus:border-[var(--input-focus)] focus:ring-2 focus:ring-[var(--border-brand)] hover:border-[var(--border-brand)] transition-all duration-200"
                      />
                      {errors.email && (
                        <p id="contact-email-error" className="text-[11px] text-red-400/80 mt-1.5">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label htmlFor="contact-company" className="text-[10px] tracking-[0.2em] text-[var(--text-secondary)] uppercase mb-2.5 block font-medium">
                      {t("form.company.label")}
                    </label>
                    <input
                      id="contact-company"
                      {...register("company")}
                      placeholder={t("form.company.placeholder")}
                      className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] rounded-lg px-4 py-3.5 text-[13px] text-[var(--input-text)] placeholder:text-[var(--input-placeholder)] focus:outline-none focus:border-[var(--input-focus)] focus:ring-2 focus:ring-[var(--border-brand)] hover:border-[var(--border-brand)] transition-all duration-200"
                    />
                  </div>


                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" className="text-[10px] tracking-[0.2em] text-[var(--text-secondary)] uppercase mb-2.5 block font-medium">
                      {t("form.message.label")}
                    </label>
                    <textarea
                      id="contact-message"
                      {...register("message")}
                      rows={4}
                      aria-required="true"
                      aria-invalid={errors.message ? "true" : "false"}
                      aria-describedby={errors.message ? "contact-message-error" : undefined}
                      placeholder={t("form.message.placeholder")}
                      className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] rounded-lg px-4 py-3.5 text-[13px] text-[var(--input-text)] placeholder:text-[var(--input-placeholder)] focus:outline-none focus:border-[var(--input-focus)] focus:ring-2 focus:ring-[var(--border-brand)] hover:border-[var(--border-brand)] transition-all duration-200 resize-none"
                    />
                    {errors.message && (
                      <p id="contact-message-error" className="text-[11px] text-red-400/80 mt-1.5">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <div className="mt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="relative overflow-hidden group bg-[var(--btn-primary)] hover:bg-[var(--btn-primary-hover)] w-full py-4 rounded-lg text-[11px] font-bold tracking-[0.25em] uppercase text-[var(--btn-primary-text)] transition-all duration-300 shadow-[0_0_30px_var(--shadow-brand)] hover:shadow-[0_0_50px_var(--shadow-brand-strong)] active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {/* Shimmer */}
                      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
                      {/* Text */}
                      <span className="relative z-10">
                        {isSubmitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            {t("form.submitting")}
                          </span>
                        ) : (
                          t("form.submit")
                        )}
                      </span>
                    </button>

                    {isError && (
                      <p className="text-[11px] text-red-400/80 text-center mt-3">
                        Something went wrong. Please email us directly at hello@codeplusdev.com
                      </p>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
