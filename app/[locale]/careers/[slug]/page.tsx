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
        th: "ใบสมัครฝึกงานทั่วไป"
      },
      department: {
        en: "General",
        th: "ทั่วไป"
      },
      duration: {
        en: "Flexible",
        th: "ยืดหยุ่น"
      },
      description: {
        en: "Don't see an internship position that perfectly matches your skills? Submit a general application here. Our engineering and design teams will review your profile and contact you if a suitable spot opens up.",
        th: "ไม่พบตำแหน่งฝึกงานที่ตรงกับทักษะของคุณใช่หรือไม่? ส่งใบสมัครทั่วไปได้ที่นี่ ทีมวิศวกรและนักออกแบบของเราจะตรวจสอบโปรไฟล์ของคุณและติดต่อกลับเมื่อมีตำแหน่งงานที่เหมาะสม"
      },
      requirements: [
        {
          en: "Strong desire to learn and collaborate with a professional engineering team.",
          th: "มีความต้องการอย่างแรงกล้าที่จะเรียนรู้และร่วมงานกับทีมวิศวกรมืออาชีพ"
        },
        {
          en: "Basic familiarity with software development, programming languages, or design principles.",
          th: "มีความคุ้นเคยพื้นฐานเกี่ยวกับความรู้ด้านไอที การพัฒนาซอฟต์แวร์ หรือการออกแบบ"
        }
      ],
      responsibilities: [
        {
          en: "Contribute to client projects, participate in standups, and assist senior developers.",
          th: "มีส่วนร่วมในโครงการของลูกค้า เข้าร่วมประชุมทีม และช่วยเหลือนักพัฒนาอาวุโส"
        }
      ]
    }
  }
  return jobs.find((j) => j.slug === slug) || null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params
  const activeLocale = (locale === "th" ? "th" : "en") as "en" | "th"
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
        th: `/th/careers/${slug}`,
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

  const activeLocale = (locale === "th" ? "th" : "en") as "en" | "th"
  const jobTitle = job.title[activeLocale]
  const jobDesc = job.description?.[activeLocale] || ""

  const breadcrumbs = [
    { name: locale === "th" ? "หน้าแรก" : "Home", url: `/${locale}` },
    { name: locale === "th" ? "ร่วมงานกับเรา" : "Careers", url: `/${locale}/careers` },
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
