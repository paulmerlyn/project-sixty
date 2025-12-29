import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'

/**
 * API Route: Serve Protected Game
 * 
 * This route serves the game.html file ONLY if the user has a valid session cookie.
 * This prevents unauthorized access even if someone discovers the direct URL.
 * 
 * Security measures:
 * - Checks for HTTP-only cookie set by verify-access route
 * - Serves game content only to authenticated users
 * - Returns 401 Unauthorized for invalid/missing authentication
 */
export async function GET(request: NextRequest) {
  // Check for the authentication cookie
  const gameAccess = request.cookies.get('game_access')

  if (!gameAccess || gameAccess.value !== 'granted') {
    return NextResponse.json(
      { error: 'Unauthorized. Please enter a valid access code.' },
      { status: 401 }
    )
  }

  try {
    // Read the OBFUSCATED game HTML file from the project root (not in public directory)
    // This prevents direct access via URL and protects the source code
    const filePath = join(process.cwd(), 'game.obfuscated.html')
    let htmlContent = await readFile(filePath, 'utf-8')

    // Ensure favicon links are present in the served HTML
    if (!htmlContent.includes('favicon.ico')) {
      const faviconLinks = `
  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  <link rel="shortcut icon" href="/favicon.ico" />
  <link rel="apple-touch-icon" href="/favicon.ico" />`
      htmlContent = htmlContent.replace('</head>', `${faviconLinks}\n</head>`)
    }

    // Return the game HTML as a response
    return new NextResponse(htmlContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        // Security headers
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        // Cache the game for performance
        'Cache-Control': 'private, max-age=3600',
      },
    })
  } catch (error) {
    console.error('Error reading game file:', error)
    return NextResponse.json(
      { error: 'Game file not found' },
      { status: 404 }
    )
  }
}
