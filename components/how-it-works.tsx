import { Lightbulb, PenTool, Code, Globe } from "lucide-react"

export function HowItWorks() {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 w-8 border-t-2 border-dashed border-primary" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const steps = [
  {
    title: "Planning & Conception",
    description: "We work with you to understand your vision and requirements",
    icon: <Lightbulb className="w-8 h-8 text-primary-foreground" />,
  },
  {
    title: "Design",
    description: "Our team creates detailed plans and designs",
    icon: <PenTool className="w-8 h-8 text-primary-foreground" />,
  },
  {
    title: "Development",
    description: "Construction begins with regular progress updates",
    icon: <Code className="w-8 h-8 text-primary-foreground" />,
  },
  {
    title: "Completion",
    description: "Final inspection and project handover",
    icon: <Globe className="w-8 h-8 text-primary-foreground" />,
  },
]

