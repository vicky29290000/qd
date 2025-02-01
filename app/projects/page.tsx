import { ProjectList } from "@/components/project-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { SEO } from "@/components/seo"
import { Schema } from "@/components/schema"
import { generateToolSchema } from "@/lib/schema-generator"

const projectManagementSchema = generateToolSchema(
  "ConstructPro Project Management",
  "Comprehensive project management tool for construction projects",
  "https://www.constructpro.com/projects",
)

export default function ProjectsPage() {
  return (
    <>
      <SEO
        title="ConstructPro - Project Management"
        description="Manage your construction projects with ConstructPro's powerful project management tools."
        canonicalUrl="https://www.constructpro.com/projects"
        ogImageUrl="https://www.constructpro.com/og-image-projects.jpg"
        ogType="website"
      />
      <Schema schema={projectManagementSchema} />
      <div className="container mx-auto py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Construction Projects</h1>
          <Button asChild>
            <Link href="/projects/new">New Project</Link>
          </Button>
        </div>
        <ProjectList />
      </div>
    </>
  )
}

