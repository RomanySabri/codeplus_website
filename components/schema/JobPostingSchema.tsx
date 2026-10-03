import React from "react"

interface Props {
  title: string
  description: string
  slug: string
  datePosted?: string
}

export function JobPostingSchema({ title, description, slug, datePosted = "2026-06-27" }: Props) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": title,
    "description": description,
    "datePosted": datePosted,
    "validThrough": "2027-12-31",
    "employmentType": "INTERN",
    "hiringOrganization": {
      "@type": "Organization",
      "name": "Code Plus Software House",
      "url": "https://codeplusdev.com",
      "logo": "https://codeplusdev.com/logo.png"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Cairo",
        "addressCountry": "EG"
      }
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
