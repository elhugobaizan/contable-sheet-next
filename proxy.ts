import { NextRequest, NextResponse } from 'next/server'

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

  const origin = request.headers.get('origin')
  const accessControlOrigin = origin ?? '*'

  if (request.method === 'OPTIONS') {
    return NextResponse.json(
      {},
      {
        headers: {
          'Access-Control-Allow-Origin': accessControlOrigin,
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
  response.headers.set('Access-Control-Allow-Origin', accessControlOrigin)
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

