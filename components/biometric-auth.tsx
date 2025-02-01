"use client"

import { useState } from "react"
import { startRegistration, startAuthentication } from "@simplewebauthn/browser"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Fingerprint } from "lucide-react"

export function BiometricAuth({ userId, onSuccess }: { userId: string; onSuccess: () => void }) {
  const [error, setError] = useState<string | null>(null)
  const [registering, setRegistering] = useState(false)

  async function handleBiometricRegistration() {
    try {
      setError(null)
      setRegistering(true)

      // 1. Get registration options from server
      const optionsRes = await fetch("/api/auth/biometric", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "register-options",
          userId,
        }),
      })
      const options = await optionsRes.json()

      // 2. Create credentials using WebAuthn
      const credential = await startRegistration(options)

      // 3. Verify registration with server
      const verificationRes = await fetch("/api/auth/biometric", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "verify-registration",
          userId,
          credential,
          expectedChallenge: options.challenge,
        }),
      })

      const verification = await verificationRes.json()

      if (verification.verified) {
        onSuccess()
      } else {
        setError("Biometric registration failed")
      }
    } catch (err) {
      setError("Failed to register biometric authentication")
      console.error(err)
    } finally {
      setRegistering(false)
    }
  }

  async function handleBiometricLogin() {
    try {
      setError(null)

      // 1. Get authentication options from server
      const optionsRes = await fetch("/api/auth/biometric", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "auth-options",
          userId,
        }),
      })
      const options = await optionsRes.json()

      // 2. Authenticate using WebAuthn
      const credential = await startAuthentication(options)

      // 3. Verify authentication with server
      const verificationRes = await fetch("/api/auth/biometric", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "verify-authentication",
          userId,
          credential,
          expectedChallenge: options.challenge,
        }),
      })

      const verification = await verificationRes.json()

      if (verification.verified) {
        onSuccess()
      } else {
        setError("Biometric authentication failed")
      }
    } catch (err) {
      setError("Failed to authenticate with biometrics")
      console.error(err)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center gap-4">
        <Button onClick={handleBiometricRegistration} disabled={registering} className="w-full">
          <Fingerprint className="mr-2 h-4 w-4" />
          {registering ? "Setting up..." : "Set up Biometric Authentication"}
        </Button>

        <Button onClick={handleBiometricLogin} variant="outline" className="w-full">
          <Fingerprint className="mr-2 h-4 w-4" />
          Login with Biometrics
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}

