import { Inter } from "next/font/google"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Providers } from "@/components/providers"
import { SEO } from "@/components/seo"
import { Schema } from "@/components/schema"
import type React from "react" // Added import for React

import "@/styles/globals.css"

const inter = Inter({ subsets: ["latin"] })

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ConstructPro",
  url: "https://www.constructpro.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.constructpro.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <SEO
        title="ConstructPro - Construction Management Software"
        description="Manage your construction projects and architectural designs with ConstructPro's comprehensive project management tools."
        canonicalUrl="https://www.constructpro.com"
        ogImageUrl="https://www.constructpro.com/og-image.jpg"
        ogType="website"
      />
      <Schema schema={websiteSchema} />
      <body className={inter.className}>
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}



import './globals.css'