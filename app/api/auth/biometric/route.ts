import { NextResponse } from "next/server"
import { verifyRegistrationResponse, verifyAuthenticationResponse } from "@simplewebauthn/server"
import { generateAuthenticationOptions, generateRegistrationOptions } from "@simplewebauthn/server"

// These values should be stored in environment variables
const rpName = "Construction Site Manager"
const rpID = "your-domain.com"
const origin = `https://${rpID}`

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { action, userId } = body

    if (action === "register-options") {
      // Generate registration options
      const options = await generateRegistrationOptions({
        rpName,
        rpID,
        userID: userId,
        userName: body.email,
        attestationType: "none",
        authenticatorSelection: {
          authenticatorAttachment: "platform",
          userVerification: "required",
          requireResidentKey: false,
        },
      })

      // Store options for verification
      // await saveUserChallenge(userId, options.challenge)

      return NextResponse.json(options)
    }

    if (action === "verify-registration") {
      // Verify registration response
      const verification = await verifyRegistrationResponse({
        response: body.credential,
        expectedChallenge: body.expectedChallenge,
        expectedOrigin: origin,
        expectedRPID: rpID,
      })

      if (verification.verified) {
        // Save the credential to the user's account
        // await saveUserCredential(userId, verification.registrationInfo)
        return NextResponse.json({ verified: true })
      }
    }

    if (action === "auth-options") {
      const options = await generateAuthenticationOptions({
        rpID,
        userVerification: "required",
        // allowCredentials: [...user's saved credentials],
      })

      // Store challenge for verification
      // await saveUserChallenge(userId, options.challenge)

      return NextResponse.json(options)
    }

    if (action === "verify-authentication") {
      const verification = await verifyAuthenticationResponse({
        response: body.credential,
        expectedChallenge: body.expectedChallenge,
        expectedOrigin: origin,
        expectedRPID: rpID,
      })

      if (verification.verified) {
        return NextResponse.json({ verified: true })
      }
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

