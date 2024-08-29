import Link from "next/link";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import {
  BellRing,
  BookmarkPlus,
  Share2,
  ShoppingBag,
  Star,
  SwatchBook,
  ChevronLeft,
  ChefHat,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function Item() {
  return (
    <>
      <div className="w-[700px] flex justify-between py-8">
        <div className="max-w-sm">
          <Image src="/veg.svg" alt="Dash" height="16" width="16" />
          <p className="text-lg font-medium">Chole Bhature</p>
          <span className="text-base font-medium text-muted-foreground">
            ₹ 120
          </span>
          <span className="text-green-700 flex gap-1 items-center my-2">
            <Star className="fill-green-700 w-4 h-4 ml-1" />
            3.5
            <p className="text-primary text-xs">(12 Ratings)</p>
          </span>
          <p className="text-muted-foreground text-sm">
            Chole Bhature is a popular North Indian dish. It is a combination of
            chana masala and bhatura, a fried bread made from maida flour.
          </p>
        </div>
        <div>
          <div className="relative w-40 h-40 align-top">
            <img
              src="https://media-assets.swiggy.com/swiggy/image/upload/f_auto,q_auto,fl_lossy/01cf72fa714c88dfe8d77145d6cf1091"
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute bottom-[-32px] left-10 flex flex-col items-center">
              <Button
                className="border-2 border-blue-500 text-blue-500 text-base font-semibold"
                variant="outline"
              >
                ADD +
              </Button>
              <p className="text-xs text-muted-foreground font-semibold mt-1">
                CUSTOMIZE
              </p>
            </div>
          </div>
        </div>
      </div>
      <Separator />
    </>
  );
}

export default function Home() {
  return (
    <main className="relative flex max-w-4xl min-h-screen flex-col gap-4 justify-evenly p-8">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold">
          <Button size="icon" variant="outline" className="h-8 w-8 mr-2">
            <ChefHat className="h-4 w-4" />
          </Button>
          Restro
        </h2>
        <Button variant="outline" className="h-8 w-fit ml-auto">
          Login
        </Button>
      </div>

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/components">Restaurant</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Table 4 - Inside</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="w-full grid grid-cols-5 grid-rows-2 gap-2">
        <div className="col-span-3 row-span-2">
          <img
            className="object-cover w-full h-full rounded-lg"
            src="https://b.zmtcdn.com/data/pictures/2/20415942/d8ad25988e906612aea78a82543e25c7.jpg?output-format=webp&fit=around|771.75:416.25&crop=771.75:416.25;*,*"
            alt="Dash"
          />
        </div>
        <div className="col-span-1 row-span-2">
          <div className="mb-2">
            <img
              className="object-cover w-full h-full rounded-lg"
              src="https://b.zmtcdn.com/data/pictures/chains/7/19016907/bedddb08e3eafa541fdec9db26613993.jpg?output-format=webp&fit=around|300:273&crop=300:273;*,*"
              alt="Dash"
            />
          </div>
          <div className="">
            <img
              className="object-cover w-full h-full rounded-lg"
              src="https://b.zmtcdn.com/data/pictures/chains/7/19016907/bedddb08e3eafa541fdec9db26613993.jpg?output-format=webp&fit=around|300:273&crop=300:273;*,*"
              alt="Dash"
            />
          </div>
        </div>
        <div className="col-span-1 row-span-2">
          <img
            className="object-cover w-full h-full rounded-lg"
            src="https://b.zmtcdn.com/data/reviews_photos/b43/77f9c9cc1be802a8607ed2ce32eecb43_1707568963.jpg?output-format=webp&fit=around|300:273&crop=300:273;*,*"
            alt="Dash"
          />
        </div>
      </div>
      <section className="w-full flex justify-between my-8">
        <div>
          <h1 className="text-4xl font-semibold">Dominos India</h1>
          <p className="text-lg">Pizza, Italian, Pasta, Fast Food, Desserts</p>
          <p className="text-lg text-muted-foreground">
            Address: Chhatarpur, Madhya Pradesh
          </p>
          <div className="flex gap-2 mt-2">
            <Button>
              <BellRing className="h-4 w-4 mr-2" /> Call Waiter
            </Button>
            <Button>
              <BookmarkPlus className="h-4 w-4 mr-2" /> Favourite
            </Button>
            <Button>
              <Share2 className="h-4 w-4 mr-2" /> Share
            </Button>
          </div>
        </div>
        <div>
          <Badge
            variant="outline"
            className="text-white text-base bg-green-700"
          >
            4.7
            <Star className="fill-white w-4 h-4 ml-1" />
          </Badge>
          <p className="text-xs">
            <b>12</b> Reviews
          </p>
        </div>
      </section>
      <section className="w-full grid grid-cols-4 mt-5 gap-8">
        <div className="w-[700px]">
          <div className="flex justify-between">
            <ToggleGroup type="multiple" variant="outline">
              <ToggleGroupItem
                value="bold"
                aria-label="Toggle bold"
                className="gap-2 px-4"
              >
                <Image src="/veg.svg" alt="Dash" height="16" width="16" />
                <span>Veg</span>
              </ToggleGroupItem>
              <ToggleGroupItem
                value="italic"
                aria-label="Toggle italic"
                className="gap-2 px-4"
              >
                <Image src="/egg.svg" alt="Dash" height="16" width="16" />
                <span>Egg</span>
              </ToggleGroupItem>
              <ToggleGroupItem
                value="strikethrough"
                aria-label="Toggle strikethrough"
                className="gap-2 px-4 whitespace-nowrap"
              >
                <Image src="/non-veg.svg" alt="Dash" height="16" width="16" />
                <span>Non-Veg</span>
              </ToggleGroupItem>
            </ToggleGroup>
            <Input className="w-56" placeholder="Search for dishes" />
          </div>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <p className="text-xl font-bold">Breakfast</p>
              </AccordionTrigger>
              <AccordionContent className="gap-2 flex flex-col">
                <Item />
                <Item />
                <Item />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
      <section className="sticky bottom-0 right-0 w-full">
        <div className="m-2 w-fit">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="rounded-full flex flex-col justify-center items-center bg-black p-4 text-white">
                <SwatchBook />
                Menu
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mr-16">
              <DropdownMenuLabel>Menu</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Recommended
                <DropdownMenuShortcut>
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    2
                  </Badge>
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Main course
                <DropdownMenuShortcut>
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    2
                  </Badge>
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Chinese
                <DropdownMenuShortcut>
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    2
                  </Badge>
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                South Indian
                <DropdownMenuShortcut>
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    2
                  </Badge>
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <button className="w-full bg-green-600 flex items-center justify-between p-6">
          <span className="text-white font-bold">2 item added</span>
          <span className="text-white font-bold flex gap-2">
            View Cart <ShoppingBag />
          </span>
        </button>
      </section>
    </main>
  );
}
