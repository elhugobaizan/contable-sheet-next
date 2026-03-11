import { NextRequest, NextResponse } from 'next/server'

const allowedOrigins = new Set([
  'http://localhost:8081',
  'http://localhost:8082',
  'http://localhost:8083',
  'https://hb-sheet-contable.vercel.app',
  'https://hbcompass.vercel.app'])

const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

const STATIC_PATH = /^\/_next\/static|^\/_next\/image|^\/favicon\.ico$|\.(?:svg|png|jpg|jpeg|gif|webp|ico)$/

export default function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Log incoming requests for debugging
  console.log('Incoming request:', {
    method: request.method,
    url: request.nextUrl.href,
    headers: Object.fromEntries(request.headers.entries()),
  })

  if (STATIC_PATH.test(pathname)) {
    return NextResponse.next()
  }

  const origin = request.headers.get('origin') ?? ''
  const isAllowedOrigin = allowedOrigins.has(origin)

  if (request.method === 'OPTIONS') {
    return NextResponse.json(
      {},
      {
        headers: {
          ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
          ...corsOptions,
        },
      }
    )
  }

  const response = NextResponse.next()

  // Set cache control headers
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
  response.headers.set('Pragma', 'no-cache')
  response.headers.set('Expires', '0')

  // Ensure CORS headers are always set
  if (isAllowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', origin)
  } else {
    console.warn('Disallowed origin:', origin)
    return NextResponse.json(
      { error: 'CORS policy does not allow this origin.' },
      {
        status: 403,
        headers: {
          'Content-Type': 'application/json',
          ...corsOptions,
        },
      }
    )
  }

  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  // Handle redirects explicitly
  if (request.headers.get('x-forwarded-proto') === 'http') {
    const httpsUrl = request.nextUrl.clone()
    httpsUrl.protocol = 'https'
    return NextResponse.redirect(httpsUrl, 308)
  }

  // Log response headers for debugging
  console.log('Response headers:', Object.fromEntries(response.headers.entries()))

  return response
}

