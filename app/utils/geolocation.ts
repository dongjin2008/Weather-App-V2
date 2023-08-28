import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: '/',
}

export async function middleware(req: NextRequest) {
  const { nextUrl: url, geo } = req;
  const lat: any = geo?.latitude;
  const lon: any = geo?.longitude;
  const city: any = geo?.city;

  url.searchParams.set('lat', lat);
  url.searchParams.set('lon', lon);
  url.searchParams.set('city', city);

  return NextResponse.rewrite(url)
}