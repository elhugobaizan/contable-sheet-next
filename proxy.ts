import { NextRequest, NextResponse } from 'next/server'

const allowedOrigins = new Set(['http://localhost:8081', 'https://hb-sheet-contable.vercel.app', 'http://localhost:8082', 'http://localhost:8083'])

const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

const STATIC_PATH = /^\/_next\/static|^\/_next\/image|^\/favicon\.ico$|\.(?:svg|png|jpg|jpeg|gif|webp|ico)$/

export default function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname
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
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
  response.headers.set('Pragma', 'no-cache')
  response.headers.set('Expires', '0')
  if (isAllowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', origin)
  }
  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  return response
}

