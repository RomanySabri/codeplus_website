import { AboutPageClient } from "@/components/pages/AboutPageClient"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "meta.about" })
  const title = `${t("title")} - CodePlus`
  return {
    title,
    description: t("description"),
    openGraph: {
      title,
      description: t("description"),
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description: t("description"),
    },
  }
}

export default function AboutPage() {
  return (
    <main id="main-content" tabIndex={-1} className="bg-[var(--bg-primary)] pt-16 min-h-screen overflow-x-hidden">
      <AboutPageClient />
    </main>
  )
}
