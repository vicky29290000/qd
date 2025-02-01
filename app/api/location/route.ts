import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"

export async function POST(req: Request) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { latitude, longitude, timestamp } = await req.json()

    // Here you would typically:
    // 1. Validate the coordinates
    // 2. Store the location data in your database
    // 3. Check if the location is within allowed boundaries

    // Example validation
    if (!latitude || !longitude || !timestamp) {
      return NextResponse.json({ error: "Invalid location data" }, { status: 400 })
    }

    // Example location check (adjust coordinates as needed)
    const isWithinBoundary = checkLocationBoundary(latitude, longitude)
    if (!isWithinBoundary) {
      return NextResponse.json(
        {
          error: "Location is outside of permitted work area",
        },
        { status: 403 },
      )
    }

    // Store location data
    // await saveLocationData({ userId: session.user.id, latitude, longitude, timestamp })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function checkLocationBoundary(lat: number, lng: number) {
  // Define your construction site boundaries
  const siteBoundaries = {
    north: 51.5074, // Example coordinates - adjust these
    south: 51.5,
    east: -0.1278,
    west: -0.13,
  }

  return (
    lat <= siteBoundaries.north &&
    lat >= siteBoundaries.south &&
    lng <= siteBoundaries.east &&
    lng >= siteBoundaries.west
  )
}

