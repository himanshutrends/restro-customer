"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { Star } from "lucide-react"; // Import Star correctly as a named export
import { Separator } from "@/components/ui/separator";
import { Customize } from "./Customize";

const iconMap = {
  veg: "/veg.svg",
  nonveg: "/non-veg.svg",
  egg: "/egg.svg",
};

export function MenuItemComponent({ item }) {
  return (
    <>
      <div className="grid grid-cols-5 gap-2 justify-between py-8">
        <div className="col-span-3">
          <Image
            src={iconMap[item.food_type]}
            alt="Dash"
            height="16"
            width="16"
          />
          <p className="text-lg font-medium">{item.name}</p>
          <span className="text-base font-medium text-muted-foreground">
            ₹ {item.price}
          </span>
          <span className="text-green-700 flex gap-1 items-center my-2">
            <Star className="fill-green-700 w-4 h-4 ml-1" />
            {item.rating}
            <p className="text-primary text-xs">(12 Ratings)</p>
          </span>
          <p className="text-muted-foreground text-xs line-clamp-2">
            {item.description}
          </p>
        </div>
        <div className="col-span-2">
          <div className="relative flex flex-col items-center aspect-square align-top">
            <img
              src="https://media-assets.swiggy.com/swiggy/image/upload/f_auto,q_auto,fl_lossy/01cf72fa714c88dfe8d77145d6cf1091"
              className="w-full h-full object-cover rounded-xl"
            />
            <div
              className={`absolute ${
                item.variants ? "bottom-[-4vh]" : "bottom-[-2vh]"
              } flex flex-col items-center`}
            >
              <Customize item={item} />
              {item.variants && (
                <p className="text-xs text-muted-foreground/50 font-semibold mt-1">
                  Customisable
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Separator className={`${item.variants ? "mt-2" : ""}`} />
    </>
  );
}

function CategoryComponent({ category, depth = 0 }) {
  const isSubCategory = depth >= 1;

  return (
    <Accordion type="single" collapsible defaultValue={category.name}>
      <AccordionItem value={category.name}>
        <AccordionTrigger
          className={`${isSubCategory ? "border-none" : "border-b"}`}
        >
          <p
            className={`font-bold ${isSubCategory ? "text-base text-muted-foreground" : "text-xl"}`}
          >
            {category.name}
          </p>
        </AccordionTrigger>
        <AccordionContent>
          {/* Check if sub_categories exists and has items */}
          {Array.isArray(category.sub_categories) &&
          category.sub_categories.length > 0
            ? // If subcategories exist, recursively render them
              category.sub_categories.map((subCategory) => (
                <CategoryComponent
                  key={subCategory.name}
                  category={subCategory}
                  depth={depth + 1} // Increment the depth for subcategories
                />
              ))
            : // If no subcategories, render the menu items
              category.food_items.map((item) => (
                <MenuItemComponent key={item.name} item={item} />
              ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export function MenuAccordion({ items }) {
  return (
    <div className="space-y-4">
      {items.map((category) => (
        <CategoryComponent key={category.name} category={category} />
      ))}
    </div>
  );
}
