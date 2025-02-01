import Head from "next/head"

interface SEOProps {
  title: string
  description: string
  canonicalUrl: string
  ogImageUrl: string
  ogType: "website" | "article"
}

export function SEO({ title, description, canonicalUrl, ogImageUrl, ogType }: SEOProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="ConstructPro" />
      <meta property="og:image" content={ogImageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  )
}

