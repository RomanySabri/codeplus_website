import type { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    default: "CodePlus — Build Better",
    template: "%s | CodePlus",
  },
  icons: {
    icon: "/only icon full color RGB.png",
    shortcut: "/only icon full color RGB.png",
    apple: "/only icon full color RGB.png",
  },
}

// Root layout is minimal — locale layout handles everything
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
