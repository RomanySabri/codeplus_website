import { getTranslations } from "next-intl/server"
import { TeamPageClient } from "@/components/pages/TeamPageClient"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "meta.team" })
  return {
    title: t("title"),
    description: t("description"),
  }
}

export default function TeamPage() {
  return (
    <main id="main-content" tabIndex={-1} className="bg-[var(--bg-primary)] pt-16 min-h-screen">
      <TeamPageClient />
    </main>
  )
}
