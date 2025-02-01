"use client"

import { Check } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function PricingPackages() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Construction Packages</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {packages.map((pkg, index) => (
            <Card key={index} className={pkg.featured ? "border-primary shadow-lg" : ""}>
              <CardHeader>
                <CardTitle>{pkg.name}</CardTitle>
                <CardDescription>{pkg.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-6">${pkg.price}</div>
                <ul className="space-y-2">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href={`/packages/${pkg.id}`}>Select Package</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

const packages = [
  {
    id: "basic",
    name: "Basic Package",
    description: "Perfect for small renovations",
    price: "5,000",
    featured: false,
    features: ["Initial consultation", "Basic design plans", "Material selection assistance", "Project timeline"],
  },
  {
    id: "standard",
    name: "Standard Package",
    description: "Ideal for medium-sized projects",
    price: "15,000",
    featured: true,
    features: [
      "Everything in Basic",
      "Detailed 3D renderings",
      "Permit assistance",
      "Project management",
      "Regular progress updates",
    ],
  },
  {
    id: "premium",
    name: "Premium Package",
    description: "Complete construction solution",
    price: "30,000",
    featured: false,
    features: [
      "Everything in Standard",
      "Custom architectural plans",
      "Interior design services",
      "Premium materials",
      "Extended warranty",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise Package",
    description: "Large-scale construction projects",
    price: "50,000+",
    featured: false,
    features: [
      "Everything in Premium",
      "Multiple site management",
      "Dedicated project team",
      "24/7 support",
      "Custom solutions",
    ],
  },
]

