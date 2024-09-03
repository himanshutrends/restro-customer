import { getSession } from "@/app/lib/auth/session";
import { cookies } from "next/headers";

export async function POST(request) {
    const req = await request.json()
    const name = req.name
    const email = req.email

    const cookieStore = cookies()
    const session = cookieStore.get("session")?.value;

    if (!session) return null;
    const user = await getSession(session);

    if (user.tokens){
        const response = await fetch("http://localhost:8000/api/auth/update-user/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.tokens.access}`
            },
            body: JSON.stringify({
                'name': name,
                'email': email
            }),
        });
        if (response.status === 200) {
            const res = await response.json();
            console.log(res)
            return Response.json(res)
        }
    }
    return Response.json({ 'error': 'Failed to update user' })
}
