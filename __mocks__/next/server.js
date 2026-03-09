/**
 * Mock for next/server so route handler tests run without Next.js internals.
 * Provides NextRequest and NextResponse compatible with App Router usage.
 */

class NextRequest {
  constructor(input, init = {}) {
    this.url = typeof input === 'string' ? input : input.href;
    this._url = new URL(this.url);
    this.method = (init.method || 'GET').toUpperCase();
    this._body = init.body;
    this._headers = init.headers || {};
    this.nextUrl = {
      pathname: this._url.pathname,
      searchParams: this._url.searchParams,
    };
  }

  async json() {
    if (this._body == null) return {};
    if (typeof this._body === 'string') return JSON.parse(this._body);
    return this._body;
  }

  get headers() {
    const h = new Map();
    Object.entries(this._headers).forEach(([k, v]) => h.set(k.toLowerCase(), v));
    return h;
  }
}

function nextResponseLike(body, init = {}) {
  const status = init.status ?? 200;
  const headers = new Map(Object.entries(init.headers || {}));
  return {
    status,
    headers,
    async json() {
      return typeof body === 'function' ? body() : body;
    },
    text: async () => (typeof body === 'string' ? body : JSON.stringify(body)),
  };
}

const NextResponse = {
  json(body, init) {
    return nextResponseLike(body, init);
  },
  next(init) {
    return nextResponseLike(undefined, { status: 200, ...init });
  },
};

module.exports = { NextRequest, NextResponse };
