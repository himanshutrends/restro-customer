import { apiGet, apiPost } from '@/handlers/apiHandler';
import { getSession, logout } from '@/app/lib/auth/session';
import { cookies } from 'next/headers';

export async function GET(request, { params }) {
    try {
        // Extract the outlet slug from the URL
        const outlet_slug = params.outletSlug;

        // Get user session
        const cookieStore = cookies();
        const session = cookieStore.get("session")?.value;

        if (!session) return new Response("User not authenticated", { status: 401 });

        const user = await getSession(session);

        if (!user.tokens) return new Response("Invalid session", { status: 401 });

        const response = await apiGet(`/api/shop/orders/${outlet_slug}`, {
            headers: {
                "Authorization": `Bearer ${user.tokens.access}`
            }
        });
        return Response.json(response);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        return new Response('Error fetching cart items', { status: 500 });
    }
}

export async function POST(request, { params }) {
    const req = await request.json()
    const order_type = req.type
    const table_id = req.table_id
    const instructions = req.instruction

    const cookieStore = cookies();
    const session = cookieStore.get("session")?.value;

    if (!session) return new Response("User not authenticated", { status: 401 });
    const user = await getSession(session);

    if (!user.tokens) return new Response("Invalid session", { status: 401 });

    try {
        const response = await apiPost(`/api/shop/checkout/${params.outletSlug}/`,
            JSON.stringify({
                'order_type': order_type,
                'table_id': table_id,
                'instructions': instructions
            }), {
            headers: {
                "Authorization": `Bearer ${user.tokens.access}`
            }
        });
        const res = await response.json();
        return Response.json(res)
    } catch (error) {
        console.error('Failed to place order:', error);
        await logout();
        return new Response("Failed to place order", { status: 500 });
    }
}
