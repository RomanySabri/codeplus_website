import { Metadata } from "next"
import { notFound } from "next/navigation"
import { ServiceDetailClient } from "./ServiceDetailClient"
import { services } from "@/data"
import { routing } from "@/i18n/routing"
import { ServiceSchema } from "@/components/schema/ServiceSchema"
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema"

interface Props {
  params: Promise<{ slug: string; locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params
  const service = services.find((s) => s.id === slug)
  if (!service) return {}
  const activeLocale = (locale === "th" ? "th" : "en") as "en" | "th"
  const title = `${service.title[activeLocale]} - CodePlus`
  return {
    title,
    description: service.description[activeLocale],
    alternates: {
      canonical: `/${locale}/services/${slug}`,
      languages: {
        en: `/en/services/${slug}`,
        th: `/th/services/${slug}`,
      },
    },
    openGraph: {
      title,
      description: service.description[activeLocale],
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description: service.description[activeLocale],
    },
  }
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    services.map((s) => ({ locale, slug: s.id }))
  )
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug, locale } = await params
  const service = services.find((s) => s.id === slug)
  if (!service) notFound()

  const activeLocale = (locale === "th" ? "th" : "en") as "en" | "th"
  const serviceName = service.title[activeLocale]
  const serviceDesc = service.description[activeLocale]

  const breadcrumbs = [
    { name: locale === "th" ? "หน้าแรก" : "Home", url: `/${locale}` },
    { name: locale === "th" ? "บริการ" : "Services", url: `/${locale}/services` },
    { name: serviceName, url: `/${locale}/services/${slug}` },
  ]

  return (
    <main id="main-content" tabIndex={-1} className="bg-[var(--bg-primary)] pt-16 min-h-screen">
      <ServiceSchema name={serviceName} description={serviceDesc} slug={slug} />
      <BreadcrumbSchema items={breadcrumbs} />
      <ServiceDetailClient service={service} />
    </main>
  )
}
