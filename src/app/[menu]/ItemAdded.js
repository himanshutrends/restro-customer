'use client';
import { useCart } from "@/context/CartContext";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export function ItemAdded({ params }) {

    const { cartItems } = useCart();
    return (
        cartItems.length > 0 &&
        <button className="w-full bg-green-600 flex items-center justify-between p-6">
            <span className="text-white font-bold">{cartItems.length} item added</span>
            <span className="text-white font-bold flex gap-2">
                <Link href={`${params.menu}/cart`}>
                    View Cart <ShoppingBag />
                </Link>
            </span>
        </button>
    );
}