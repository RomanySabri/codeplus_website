import { getTranslations } from "next-intl/server"
import { ServicesPageClient } from "@/components/pages/ServicesPageClient"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "meta.services" })
  return {
    title: t("title"),
    description: t("description"),
  }
}

export default function ServicesPage() {
  return (
    <main id="main-content" tabIndex={-1} className="bg-[var(--bg-primary)] pt-16 min-h-screen">
      <ServicesPageClient />
    </main>
  )
}
