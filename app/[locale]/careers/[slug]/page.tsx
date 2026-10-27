import { Metadata } from "next"
import { notFound } from "next/navigation"
import { InternshipDetailClient } from "@/components/pages/InternshipDetailClient"
import { jobs, Job } from "@/data"
import { routing } from "@/i18n/routing"
import { JobPostingSchema } from "@/components/schema/JobPostingSchema"
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema"

interface Props {
  params: Promise<{ slug: string; locale: string }>
}

const getJob = (slug: string): Job | null => {
  if (slug === "general-application") {
    return {
      id: 999,
      slug: "general-application",
      type: "internship",
      isOpen: true,
      title: {
        en: "General Internship Application",
        ar: "طلب تدريب عام"
      },
      department: {
        en: "General",
        ar: "عام"
      },
      duration: {
        en: "Flexible",
        ar: "مرن"
      },
      description: {
        en: "Don't see an internship position that perfectly matches your skills? Submit a general application here. Our engineering and design teams will review your profile and contact you if a suitable spot opens up.",
        ar: "لا تجد وظيفة تدريب تناسب مهاراتك تمامًا؟ أرسل طلبًا عامًا من هنا. سيراجع فريقا الهندسة والتصميم ملفك ويتواصلان معك عند توفر مكان مناسب."
      },
      requirements: [
        {
          en: "Strong desire to learn and collaborate with a professional engineering team.",
          ar: "رغبة قوية في التعلم والتعاون مع فريق هندسي محترف."
        },
        {
          en: "Basic familiarity with software development, programming languages, or design principles.",
          ar: "إلمام أساسي بتطوير البرمجيات أو لغات البرمجة أو مبادئ التصميم."
        }
      ],
      responsibilities: [
        {
          en: "Contribute to client projects, participate in standups, and assist senior developers.",
          ar: "المساهمة في مشاريع العملاء وحضور الاجتماعات اليومية ومساعدة المطورين الكبار."
        }
      ]
    }
  }
  return jobs.find((j) => j.slug === slug) || null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params
  const activeLocale = (locale === "ar" ? "ar" : "en") as "en" | "ar"
  const job = getJob(slug)
  if (!job) return {}
  const title = `${job.title[activeLocale]} - CodePlus`
  return {
    title,
    description: job.description?.[activeLocale],
    alternates: {
      canonical: `/${locale}/careers/${slug}`,
      languages: {
        en: `/en/careers/${slug}`,
        ar: `/ar/careers/${slug}`,
      },
    },
    openGraph: {
      title,
      description: job.description?.[activeLocale],
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description: job.description?.[activeLocale],
    },
  }
}

export function generateStaticParams() {
  const slugs = [...jobs.map((j) => j.slug), "general-application"]
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  )
}

export default async function InternshipDetailPage({ params }: Props) {
  const { slug, locale } = await params
  const job = getJob(slug)
  if (!job) notFound()

  const activeLocale = (locale === "ar" ? "ar" : "en") as "en" | "ar"
  const jobTitle = job.title[activeLocale]
  const jobDesc = job.description?.[activeLocale] || ""

  const breadcrumbs = [
    { name: locale === "ar" ? "الرئيسية" : "Home", url: `/${locale}` },
    { name: locale === "ar" ? "الوظائف" : "Careers", url: `/${locale}/careers` },
    { name: jobTitle, url: `/${locale}/careers/${slug}` },
  ]

  return (
    <main id="main-content" tabIndex={-1} className="bg-[var(--bg-primary)] pt-16 min-h-screen">
      <JobPostingSchema title={jobTitle} description={jobDesc} slug={slug} />
      <BreadcrumbSchema items={breadcrumbs} />
      <InternshipDetailClient job={job} />
    </main>
  )
}
