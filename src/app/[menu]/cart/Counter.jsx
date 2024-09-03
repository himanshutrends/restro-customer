"use client";
import { useCart } from "@/context/CartContext";
import { SquareMinus, SquarePlus } from "lucide-react";
import React from "react";

function Counter({ count, item, setCount }) {
  const { updateQuantity } = useCart();

  const decrement = () => {
    updateQuantity(item?.id, count - 1);
    setCount(count - 1)
  };

  const increment = () => {
    updateQuantity(item?.id, count + 1);
    setCount(count + 1);
  };

  return (
    <div className="flex items-center justify-center w-fit bg-blue-50 rounded-md p-1 text-blue-600">
      <SquareMinus size={24} onClick={decrement} />
      <span id="counter" className="font-bold w-8 text-center">
        {count}
      </span>
      <SquarePlus size={24} onClick={increment} />
    </div>
  );
}

export default Counter;
