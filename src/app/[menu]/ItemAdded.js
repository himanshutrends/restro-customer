"use client";
import { useCart } from "@/context/CartContext";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export function ItemAdded({ params }) {
  const { cartItems } = useCart();
  console.log(cartItems, "From ItemAdded.js");
  return (
    cartItems.length > 0 && (
      <button className="fixed bottom-0 right-0 w-full bg-rose-600 flex items-center justify-between p-6 slide-in-from-bottom-0 shadow-inner">
        <span className="text-white font-bold">
          {cartItems.length} item added
        </span>
        <span className="text-white font-bold flex gap-2">
          <Link
            href={`${params.menu}/cart`}
            className="flex items-center gap-2"
          >
            View Cart <ShoppingBag />
          </Link>
        </span>
      </button>
    )
  );
}
