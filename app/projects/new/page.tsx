"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { FileUpload } from "@/components/file-upload"
import { DatePicker } from "@/components/date-picker"

type File = {
  name: string
  size: number
  type: string
}

const projectPackages = ["Basic Construction", "Standard Construction", "Premium Construction", "Custom Construction"]

export default function NewProjectPage() {
  const router = useRouter()
  const [files, setFiles] = useState<File[]>([])

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // Here you would typically send the form data and files to your API
    // await createProject(formData, files)
    router.push("/projects")
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Create New Project</h1>
      <form onSubmit={onSubmit} className="space-y-6 max-w-2xl">
        <div className="space-y-2">
          <Label htmlFor="name">Project Name</Label>
          <Input id="name" name="name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="client">Client</Label>
          <Input id="client" name="client" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="package">Package</Label>
          <Select name="package" required>
            <SelectTrigger>
              <SelectValue placeholder="Select a package" />
            </SelectTrigger>
            <SelectContent>
              {projectPackages.map((pkg) => (
                <SelectItem key={pkg} value={pkg}>
                  {pkg}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" />
        </div>
        <div className="space-y-2">
          <Label>Start Date</Label>
          <DatePicker />
        </div>
        <div className="space-y-2">
          <Label>End Date</Label>
          <DatePicker />
        </div>
        <div className="space-y-2">
          <Label>Upload Files (PDF, JPEG)</Label>
          <FileUpload
            onUploadComplete={(uploadedFiles) => setFiles(uploadedFiles)}
            acceptedFileTypes=".pdf,.jpg,.jpeg"
            multiple
          />
        </div>
        <Button type="submit">Create Project</Button>
      </form>
    </div>
  )
}

