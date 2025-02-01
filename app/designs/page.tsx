import { DesignList } from "@/components/design-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { SEO } from "@/components/seo"
import { Schema } from "@/components/schema"
import { generateToolSchema } from "@/lib/schema-generator"

const designManagementSchema = generateToolSchema(
  "ConstructPro Design Management",
  "Comprehensive design management tool for architectural projects",
  "https://www.constructpro.com/designs",
)

export default function DesignsPage() {
  return (
    <>
      <SEO
        title="ConstructPro - Design Management"
        description="Manage your architectural designs with ConstructPro's powerful design management tools."
        canonicalUrl="https://www.constructpro.com/designs"
        ogImageUrl="https://www.constructpro.com/og-image-designs.jpg"
        ogType="website"
      />
      <Schema schema={designManagementSchema} />
      <div className="container mx-auto py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Architectural Designs</h1>
          <Button asChild>
            <Link href="/designs/new">New Design</Link>
          </Button>
        </div>
        <DesignList />
      </div>
    </>
  )
}

