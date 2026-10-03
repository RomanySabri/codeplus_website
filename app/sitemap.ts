import { MetadataRoute } from "next"
import { projects, services, jobs } from "@/data"
import { routing } from "@/i18n/routing"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://codeplusdev.com"
  const locales = routing.locales

  const staticRoutes = [
    "",
    "/work",
    "/services",
    "/team",
    "/careers",
    "/contact",
    "/about",
  ]

  const staticEntries = locales.flatMap(locale =>
    staticRoutes.map(route => ({
      url: `${baseUrl}/${locale}${route}`,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    }))
  )

  const projectEntries = locales.flatMap(locale =>
    projects.map(project => ({
      url: `${baseUrl}/${locale}/work/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  )

  const serviceEntries = locales.flatMap(locale =>
    services.map(service => ({
      url: `${baseUrl}/${locale}/services/${service.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  )

  const careerSlugs = [...jobs.map(job => job.slug), "general-application"]
  const careerEntries = locales.flatMap(locale =>
    careerSlugs.map(slug => ({
      url: `${baseUrl}/${locale}/careers/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  )

  return [...staticEntries, ...projectEntries, ...serviceEntries, ...careerEntries]
}
