import { getSession } from '@/app/lib/auth/session';
import { cookies } from 'next/headers';

export async function GET(request) {
    try {
        // Get user session
        const cookieStore = cookies();
        const session = cookieStore.get("session")?.value;
        if (!session) return new Response("User not authenticated", { status: 401 });
        const user = await getSession(session);
        if (!user.tokens) return new Response("Invalid session", { status: 401 });

        return Response.json({ message: 'Success' });
    } catch (error) {
        console.error('User not authenticated:', error);
        return new Response('User not authenticated', { status: 500 });
    }
}
