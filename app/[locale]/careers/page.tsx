import { getTranslations } from "next-intl/server";
import { CareersPageClient } from "@/components/pages/CareersPageClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.careers" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function CareersPage() {
  return (
    <main id="main-content" tabIndex={-1} className="bg-[var(--bg-primary)] pt-16 min-h-screen">
      <CareersPageClient />
    </main>
  );
}
