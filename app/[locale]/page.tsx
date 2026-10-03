import dynamic from "next/dynamic"
import { getTranslations } from "next-intl/server"
import HeroSection from "@/components/sections/HeroSection"
import TrustRibbon from "@/components/sections/TrustRibbon"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "meta.home" })
  return {
    title: t("title"),
    description: t("description"),
  }
}

// Loading skeleton component
function SectionSkeleton() {
  return (
    <div className="w-full py-28 px-4 lg:px-8 xl:px-12 animate-pulse">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="h-3 w-24 rounded bg-white/[0.05] mx-auto" />
        <div className="h-10 w-64 rounded bg-white/[0.05] mx-auto" />
        <div className="h-4 w-96 rounded bg-white/[0.04] mx-auto" />
      </div>
    </div>
  )
}

// Dynamic section imports
const ServicesSection = dynamic(
  () => import("@/components/sections/ServicesSection"),
  { loading: () => <SectionSkeleton /> }
)
const ProjectsCarousel = dynamic(
  () =>
    import("@/components/sections/ProjectsCarousel").then((m) => ({
      default: m.ProjectsCarousel,
    })),
  { loading: () => <SectionSkeleton /> }
)
const TechStackSection = dynamic(
  () => import("@/components/sections/TechStackSection"),
  { loading: () => <SectionSkeleton /> }
)
const TestimonialsSection = dynamic(
  () => import("@/components/sections/TestimonialsSection"),
  { loading: () => <SectionSkeleton /> }
)
const TeamSection = dynamic(
  () =>
    import("@/components/sections/TeamSection").then((m) => ({
      default: m.TeamSection,
    })),
  { loading: () => <SectionSkeleton /> }
)
const InternshipSection = dynamic(
  () =>
    import("@/components/sections/InternshipSection").then((m) => ({
      default: m.InternshipSection,
    })),
  { loading: () => <SectionSkeleton /> }
)
const ContactSection = dynamic(
  () =>
    import("@/components/sections/ContactSection").then((m) => ({
      default: m.ContactSection,
    })),
  { loading: () => <SectionSkeleton /> }
)

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-[var(--bg-primary)]">
      {/* 1. Hero (Static) */}
      <HeroSection />

      {/* 2. Trust Ribbon (Static) */}
      <TrustRibbon />

      {/* 3. Stats Banner (Static) */}

      {/* 4. Services (Dynamic) */}
      <ServicesSection />

      {/* 5. Projects Carousel (Dynamic) */}
      <ProjectsCarousel />

      {/* 6. Process Section (Dynamic - TODO: ProcessSection not yet created) */}
      {/* <ProcessSection /> */}

      {/* 7. Tech Stack (Dynamic) */}
      <TechStackSection />

      {/* 8. Testimonials (Dynamic) */}
      <TestimonialsSection />

      {/* 9. Team (Dynamic) */}
      <TeamSection />

      {/* 10. Internship (Dynamic) */}
      {/* <InternshipSection /> */}

      {/* 11. FAQ Section (Dynamic - TODO: FAQSection not yet created) */}
      {/* <FAQSection /> */}

      {/* 12. Contact (Dynamic) */}
      <ContactSection />
    </main>
  )
}
