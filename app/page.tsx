import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { HomeIcon, BuildingIcon, PenToolIcon as ToolIcon, ClipboardIcon } from "lucide-react" // Import missing icons

import { Button } from "@/components/ui/button"
import { PricingPackages } from "@/components/pricing-packages"
import { HowItWorks } from "@/components/how-it-works"

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-red-900/80 z-10"
          style={{
            backgroundImage: `url('${process.env.NEXT_PUBLIC_BACKGROUND_URL}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative z-20 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Expert Construction Solutions</h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Professional construction services with over 20 years of experience. Quality work, competitive pricing, and
            customer satisfaction guaranteed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/packages">
                View Packages
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Construction Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-background p-6 rounded-lg shadow-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Packages */}
      <PricingPackages />

      {/* How It Works */}
      <HowItWorks />
    </main>
  )
}

const services = [
  {
    title: "Residential Construction",
    description: "Custom homes and renovations built to your specifications",
    icon: <HomeIcon className="w-6 h-6 text-primary" />,
  },
  {
    title: "Commercial Projects",
    description: "Office buildings, retail spaces, and industrial facilities",
    icon: <BuildingIcon className="w-6 h-6 text-primary" />,
  },
  {
    title: "Renovation",
    description: "Modernize and upgrade your existing property",
    icon: <ToolIcon className="w-6 h-6 text-primary" />,
  },
  {
    title: "Consultation",
    description: "Expert advice for your construction projects",
    icon: <ClipboardIcon className="w-6 h-6 text-primary" />,
  },
]

