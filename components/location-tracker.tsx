"use client"

import { useState, useEffect } from "react"
import { MapPin } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function LocationTracker() {
  const [error, setError] = useState<string | null>(null)
  const [tracking, setTracking] = useState(false)
  const [location, setLocation] = useState<{
    latitude: number
    longitude: number
  } | null>(null)

  useEffect(() => {
    if (!tracking) return

    let watchId: number

    async function startTracking() {
      if (!navigator.geolocation) {
        setError("Geolocation is not supported by your browser")
        return
      }

      try {
        watchId = navigator.geolocation.watchPosition(
          async (position) => {
            const { latitude, longitude } = position.coords
            setLocation({ latitude, longitude })

            // Send location to server
            const response = await fetch("/api/location", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                latitude,
                longitude,
                timestamp: new Date().toISOString(),
              }),
            })

            if (!response.ok) {
              const data = await response.json()
              setError(data.error || "Failed to update location")
              setTracking(false)
            }
          },
          (error) => {
            setError(getLocationErrorMessage(error))
            setTracking(false)
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          },
        )
      } catch (err) {
        setError("Failed to start location tracking")
        setTracking(false)
      }
    }

    startTracking()

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId)
      }
    }
  }, [tracking])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          <div>
            <p className="font-medium">Location Tracking</p>
            <p className="text-sm text-muted-foreground">{tracking ? "Active" : "Inactive"}</p>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={tracking}
            onChange={(e) => setTracking(e.target.checked)}
          />
          <div className="w-11 h-6 bg-muted-foreground/30 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
        </label>
      </div>

      {location && (
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm font-medium">Current Location:</p>
          <p className="text-sm text-muted-foreground">Latitude: {location.latitude.toFixed(6)}</p>
          <p className="text-sm text-muted-foreground">Longitude: {location.longitude.toFixed(6)}</p>
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

function getLocationErrorMessage(error: GeolocationPositionError): string {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return "Location permission denied"
    case error.POSITION_UNAVAILABLE:
      return "Location information unavailable"
    case error.TIMEOUT:
      return "Location request timed out"
    default:
      return "Failed to get location"
  }
}

