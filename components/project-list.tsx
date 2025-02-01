"use client"

import { useState } from "react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const projectPackages = ["Basic Construction", "Standard Construction", "Premium Construction", "Custom Construction"]

export function ProjectList() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "City Center Complex",
      client: "Metropolis Developers",
      package: "Premium Construction",
      status: "In Progress",
    },
    {
      id: 2,
      name: "Seaside Resort",
      client: "Coastal Retreats Inc.",
      package: "Custom Construction",
      status: "Planning",
    },
    // Add more sample projects as needed
  ])

  return (
    <Table>
      <TableCaption>A list of your construction projects.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Package</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map((project) => (
          <TableRow key={project.id}>
            <TableCell className="font-medium">{project.name}</TableCell>
            <TableCell>{project.client}</TableCell>
            <TableCell>{project.package}</TableCell>
            <TableCell>
              <Badge variant={project.status === "In Progress" ? "default" : "secondary"}>{project.status}</Badge>
            </TableCell>
            <TableCell>
              <Button asChild variant="ghost">
                <Link href={`/projects/${project.id}`}>View</Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

