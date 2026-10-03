import { getTranslations } from "next-intl/server"
import { WorkPageClient } from "@/components/pages/WorkPageClient"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "meta.work" })
  return {
    title: t("title"),
    description: t("description"),
  }
}

export default function WorkPage() {
  return (
    <main id="main-content" tabIndex={-1} className="bg-[var(--bg-primary)] pt-16 min-h-screen">
      <WorkPageClient />
    </main>
  )
}
