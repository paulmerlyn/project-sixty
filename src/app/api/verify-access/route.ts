import { NextRequest, NextResponse } from 'next/server'

/**
 * API Route: Verify Access Code
 * 
 * This route verifies the user's access code server-side.
 * If valid, it sets a secure HTTP-only cookie to grant access to the game.
 * 
 * Security measures:
 * - Access code stored in environment variable (not in client code)
 * - Verification happens on server
 * - Uses HTTP-only cookie to prevent JavaScript access
 * - Cookie expires after 24 hours
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { accessCode } = body

    // Get the correct access code from environment variable
    const correctAccessCode = process.env.ACCESS_CODE

    if (!correctAccessCode) {
      console.error('ACCESS_CODE environment variable not set')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    // Verify the access code
    if (accessCode !== correctAccessCode) {
      return NextResponse.json(
        { error: 'Invalid access code' },
        { status: 401 }
      )
    }

    // Create response with success message
    const response = NextResponse.json(
      { success: true, message: 'Access granted' },
      { status: 200 }
    )

    // Set a secure HTTP-only cookie to remember authenticated state
    // This cookie cannot be accessed by JavaScript (XSS protection)
    response.cookies.set('game_access', 'granted', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Error verifying access code:', error)
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    )
  }
}
