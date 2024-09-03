import React from "react";
import Counter from "./Counter";

export function SetQuantity({ item }) {
    const [quantity, setQuantity] = React.useState(item.quantity);
    return (
        <Counter count={quantity} item={item} setCount={setQuantity} />
    );
}