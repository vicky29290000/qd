"use client"

import { useState } from "react"
import { Upload } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface FileUploadProps {
  onUploadComplete: (files: File[]) => void
  acceptedFileTypes: string
  multiple?: boolean
}

export function FileUpload({ onUploadComplete, acceptedFileTypes, multiple = false }: FileUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files
    if (!files || files.length === 0) return

    setError(null)
    setUploading(true)

    try {
      // Simulate upload progress
      for (let i = 0; i <= 100; i += 10) {
        setProgress(i)
        await new Promise((resolve) => setTimeout(resolve, 100))
      }

      // Here you would typically upload to your storage solution
      // const uploadedFiles = await uploadFiles(files)

      setProgress(100)
      onUploadComplete(Array.from(files))
    } catch (err) {
      setError("Failed to upload files. Please try again.")
    } finally {
      setUploading(false)
      setProgress(0)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
        <Upload className="w-12 h-12 text-muted-foreground mb-4" />
        <p className="text-muted-foreground mb-2">Drag and drop your files here</p>
        <Input
          type="file"
          accept={acceptedFileTypes}
          multiple={multiple}
          onChange={handleUpload}
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
    </div>
  )
}

