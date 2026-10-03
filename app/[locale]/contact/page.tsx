import { getTranslations } from "next-intl/server"
import { ContactSection } from "@/components/sections/ContactSection"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "meta.contact" })
  return {
    title: t("title"),
    description: t("description"),
  }
}

export default function ContactPage() {
  return (
    <main id="main-content" tabIndex={-1} className="bg-[var(--bg-primary)] pt-16 min-h-screen">
      <ContactSection />
    </main>
  )
}
