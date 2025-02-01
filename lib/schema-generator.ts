export function generateToolSchema(toolName: string, toolDescription: string, toolUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: toolName,
    description: toolDescription,
    applicationCategory: "ConstructionManagement",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: toolUrl,
  }
}

