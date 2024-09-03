import { cookies } from "next/headers";
import { encrypt } from "@/app/lib/auth/session";

export async function POST(request) {
  const req = await request.json()

  const phone = req.phone
  const otp = req.otp

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
    if (!res.user) {
      return Response.json({ 'error': 'OTP Invalid or expired' })
    }
    const session = await encrypt(res);
    const cookieStore = cookies()
    cookieStore.set('session', session)
    return Response.json({ 'user': res.user })
  }
}