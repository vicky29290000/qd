"use client"

import { useState } from "react"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function UploadPage() {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setUploading(true)

    const formData = new FormData(event.currentTarget)
    const file = formData.get("file") as File

    if (!file || !file.name.endsWith(".pdf")) {
      setError("Please select a valid PDF file")
      setUploading(false)
      return
    }

    try {
      // Simulate upload progress
      for (let i = 0; i <= 100; i += 10) {
        setProgress(i)
        await new Promise((resolve) => setTimeout(resolve, 500))
      }

      // Here you would typically upload to your storage solution
      // const response = await uploadFile(file)

      setProgress(100)
      alert("File uploaded successfully!")
    } catch (err) {
      setError("Failed to upload file. Please try again.")
    } finally {
      setUploading(false)
      setProgress(0)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Upload Documents</h1>

        <div className="bg-muted p-8 rounded-lg">
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-12">
              <Upload className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-2">Drag and drop your PDF files here</p>
              <input
                type="file"
                name="file"
                accept=".pdf"
                className="block w-full text-sm text-muted-foreground
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-primary file:text-primary-foreground
                  hover:file:bg-primary/90"
              />
            </div>

            {uploading && (
              <div className="space-y-2">
                <Progress value={progress} />
                <p className="text-sm text-muted-foreground text-center">{progress}% uploaded</p>
              </div>
            )}

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" disabled={uploading} className="w-full">
              {uploading ? "Uploading..." : "Upload PDF"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

