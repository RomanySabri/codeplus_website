import type { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    default: "CodePlus — Build Better",
    template: "%s | CodePlus",
  },
  icons: {
    icon: "/app-icon.png",
    shortcut: "/app-icon.png",
    apple: "/app-icon.png",
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
