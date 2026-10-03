import { Metadata } from "next"
import { notFound } from "next/navigation"
import { CaseStudyClient } from "./CaseStudyClient"
import { projects } from "@/data"
import { routing } from "@/i18n/routing"
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema"

interface Props {
  params: Promise<{ slug: string; locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return {}
  const activeLocale = (locale === "th" ? "th" : "en") as "en" | "th"
  const title = `${project.title[activeLocale]} - Code Plus`
  return {
    title,
    description: project.description[activeLocale],
    alternates: {
      canonical: `/${locale}/work/${slug}`,
      languages: {
        en: `/en/work/${slug}`,
        th: `/th/work/${slug}`,
      },
    },
    openGraph: {
      title,
      description: project.description[activeLocale],
      type: "article",
      images: project.coverImage ? [project.coverImage] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.description[activeLocale],
      images: project.coverImage ? [project.coverImage] : [],
    },
  }
}

export function generateStaticParams() {
  return routing.locales.flatMap(locale =>
    projects.map(p => ({ locale, slug: p.slug }))
  )
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug, locale } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) notFound()

  const activeLocale = (locale === "th" ? "th" : "en") as "en" | "th"
  const projectTitle = project.title[activeLocale]

  const breadcrumbs = [
    { name: locale === "th" ? "หน้าแรก" : "Home", url: `/${locale}` },
    { name: locale === "th" ? "ผลงานของเรา" : "Work", url: `/${locale}/work` },
    { name: projectTitle, url: `/${locale}/work/${slug}` },
  ]

  return (
    <main id="main-content" tabIndex={-1} className="bg-[var(--bg-primary)] pt-16 min-h-screen">
      <BreadcrumbSchema items={breadcrumbs} />
      <CaseStudyClient project={project} />
    </main>
  )
}
