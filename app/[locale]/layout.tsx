import type { Metadata } from "next"
import { Geist_Mono, Inter } from "next/font/google"
import { Sarabun } from "next/font/google"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"

import "../globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { routing } from "@/i18n/routing"
import { OrganizationSchema } from "@/components/schema/OrganizationSchema"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

const sarabun = Sarabun({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-thai",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://codeplusdev.com"),
  authors: [{ name: "Code Plus Software House" }],
  creator: "Code Plus",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      th: "/th",
    },
  },
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as typeof routing.locales[number])) notFound()

  const messages = await getMessages()

  return (
    <html
      lang={locale}
      dir="ltr"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable,
        locale === "th" ? sarabun.variable : ""
      )}
    >
      <body
        className={`bg-[var(--bg-primary)] antialiased ${locale === "th" ? "font-[var(--font-thai)]" : ""}`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute
            focus:top-4 focus:left-4 focus:z-[100]
            focus:bg-[var(--btn-primary)] focus:text-white
            focus:px-4 focus:py-2 focus:rounded-sm"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <OrganizationSchema />
            <Navbar />
            {children}
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
