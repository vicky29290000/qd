"use client"

import { useState } from "react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const designPackages = ["Basic Design", "Standard Design", "Premium Design", "Custom Design"]

export function DesignList() {
  const [designs, setDesigns] = useState([
    {
      id: 1,
      name: "Modern Minimalist Office",
      client: "TechCorp",
      package: "Premium Design",
      status: "In Review",
    },
    {
      id: 2,
      name: "Eco-Friendly Residential Complex",
      client: "Green Living Ltd.",
      package: "Custom Design",
      status: "Approved",
    },
    // Add more sample designs as needed
  ])

  return (
    <Table>
      <TableCaption>A list of your architectural designs.</TableCaption>
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
        {designs.map((design) => (
          <TableRow key={design.id}>
            <TableCell className="font-medium">{design.name}</TableCell>
            <TableCell>{design.client}</TableCell>
            <TableCell>{design.package}</TableCell>
            <TableCell>
              <Badge variant={design.status === "Approved" ? "success" : "default"}>{design.status}</Badge>
            </TableCell>
            <TableCell>
              <Button asChild variant="ghost">
                <Link href={`/designs/${design.id}`}>View</Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

