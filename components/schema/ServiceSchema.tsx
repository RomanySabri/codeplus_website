import React from "react"

interface Props {
  name: string
  description: string
  slug: string
}

export function ServiceSchema({ name, description, slug }: Props) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "url": `https://codeplusdev.com/services/${slug}`,
    "provider": {
      "@type": "Organization",
      "name": "Code Plus Software House",
      "url": "https://codeplusdev.com"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
