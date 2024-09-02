'use client';
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export function ItemAdded() {
    const { cartItems } = useCart();
    console.log(cartItems);
    return (
        cartItems.length > 0 &&
        <button className="w-full bg-green-600 flex items-center justify-between p-6">
            <span className="text-white font-bold">{cartItems.length} item added</span>
            <span className="text-white font-bold flex gap-2">
                <Link href='/cart'>
                    View Cart <ShoppingBag />
                </Link>
            </span>
        </button>
    );
}