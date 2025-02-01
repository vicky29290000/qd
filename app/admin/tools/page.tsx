"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { generateToolSchema } from "@/lib/schema-generator"

export default function ToolManagementPage() {
  const [tools, setTools] = useState([])
  const [newTool, setNewTool] = useState({ name: "", description: "", url: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const schema = generateToolSchema(newTool.name, newTool.description, newTool.url)
    setTools([...tools, { ...newTool, schema }])
    setNewTool({ name: "", description: "", url: "" })
    // Here you would typically save the new tool to your database
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Tool Management</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <Label htmlFor="name">Tool Name</Label>
          <Input
            id="name"
            value={newTool.name}
            onChange={(e) => setNewTool({ ...newTool, name: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={newTool.description}
            onChange={(e) => setNewTool({ ...newTool, description: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="url">URL</Label>
          <Input
            id="url"
            type="url"
            value={newTool.url}
            onChange={(e) => setNewTool({ ...newTool, url: e.target.value })}
            required
          />
        </div>
        <Button type="submit">Add Tool</Button>
      </form>
      <div>
        <h2 className="text-2xl font-bold mb-4">Existing Tools</h2>
        {tools.map((tool, index) => (
          <div key={index} className="mb-4 p-4 border rounded">
            <h3 className="text-xl font-semibold">{tool.name}</h3>
            <p>{tool.description}</p>
            <p className="text-sm text-muted-foreground">{tool.url}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

