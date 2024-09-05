import { cookies } from "next/headers";
import { encrypt } from "@/app/lib/auth/session";
import { NextResponse } from 'next/server'

export async function POST(request) {
  const req = await request.json()

  const phone = req.phone
  const otp = req.otp

  console.log(phone, otp)

  const response = await fetch("http://localhost:8000/api/auth/verify-otp/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      'phone_number': phone,
      'otp': otp
    }),
  });

  if (response.status === 200) {
    const res = await response.json();
    console.log(res, 'res')
    if (!res.user) {
      return NextResponse.json(res, { status: 400 })
    }
    const session = await encrypt(res);
    const cookieStore = cookies()
    cookieStore.set('session', session)
    return NextResponse.json(res, { status: 200 })
  }
  return NextResponse.error('Error verifying OTP', { status: 500 })
}