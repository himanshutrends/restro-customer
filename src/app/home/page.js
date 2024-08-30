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
  X,
  Pin,
  Locate,
  MapPin,
  Phone,
  LeafyGreen,
  Timer,
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

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Input } from "@/components/ui/input";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Counter from "../cart/Counter";
import { Auth, Promo } from "@/components/ui/auth";
import { Menu } from "./menu";

export function Item() {
  return (
    <>
      <div className="grid grid-cols-5 justify-between py-8">
        <div className="col-span-3">
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
          <p className="text-muted-foreground text-xs">
            Chole Bhature is a popular North Indian dish. It is a combination of
            chana masala and bhatura, a fried bread made from maida flour.
          </p>
        </div>
        <div className="col-span-2">
          <div className="relative aspect-square align-top">
            <img
              src="https://media-assets.swiggy.com/swiggy/image/upload/f_auto,q_auto,fl_lossy/01cf72fa714c88dfe8d77145d6cf1091"
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute bottom-[-32px] left-7 flex flex-col items-center">
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

export function Customize() {
  return (
    <Drawer>
      <DrawerTrigger>Open</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="flex items-start w-full">
          <div className="flex flex-col items-start w-full">
            <DrawerDescription>Veggie Burger • ₹120 - ₹230</DrawerDescription>
            <DrawerTitle>Customise as per your taste</DrawerTitle>
          </div>
          <DrawerClose>
            <Button
              size="icon"
              variant="outline"
              className="rounded-full h-6 w-6"
            >
              <X size={16} />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <Separator className="my-4" />
        <VariantAddon />

        <DrawerFooter>
          <div className="flex w-full gap-2 justify-between">
            <span className="flex items-center gap-4 text-base font-bold">
              ₹ 120
              <Counter />
            </span>

            <Button
              className="bg-blue-500 text-white text-base font-semibold w-24"
              variant="outline"
            >
              ADD
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function VariantAddon() {
  return (
    <div className="mx-4">
      {/* Variant */}
      <Label forhtml="size">Size</Label>
      <RadioGroup
        className="flex flex-col gap-2 bg-accent rounded-xl p-4"
        defaultValue="option-one"
      >
        <div
          htmlFor="addon"
          className="flex items-center justify-between w-full"
        >
          <div
            htmlFor="option-one"
            className="w-full flex items-center justify-between"
          >
            <p className="font-medium flex items-center gap-2">
              <Image src="/veg.svg" alt="Dash" height="16" width="16" />
              Small
            </p>
            <span className="text-muted-foreground mr-4">+ ₹20</span>
          </div>
          <RadioGroupItem value="option-one" id="option-one" />
        </div>
        <div
          htmlFor="addon"
          className="flex items-center justify-between w-full"
        >
          <div
            htmlFor="option-t"
            className="w-full flex items-center justify-between"
          >
            <p className="font-medium flex items-center gap-2">
              <Image src="/non-veg.svg" alt="Dash" height="16" width="16" />
              Medium
            </p>
            <span className="text-muted-foreground mr-4">+ ₹40</span>
          </div>
          <RadioGroupItem value="option-t" id="option-t" />
        </div>
      </RadioGroup>

      {/* Add-on */}
      <Label forhtml="addon">Add-on</Label>
      <section className="flex flex-col gap-2 bg-accent rounded-xl p-4">
        <div
          htmlFor="addon"
          className="flex items-center justify-between w-full"
        >
          <div
            htmlFor="option-one"
            className="w-full flex items-center justify-between mr-4"
          >
            <p className="font-medium flex items-center gap-2">
              <Image src="/egg.svg" alt="Dash" height="16" width="16" />
              Cheese
            </p>
            <span className="text-muted-foreground">+ ₹20</span>
          </div>
          <Checkbox value="addons" id="addons" />
        </div>
      </section>
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex max-w-lg min-h-screen flex-col gap-4 justify-evenly p-6 overflow-hidden">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold">
          <Button size="icon" variant="outline" className="h-8 w-8 mr-2">
            <ChefHat className="h-4 w-4" />
          </Button>
          Restro
        </h2>

        <Auth />
        <Menu />
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

      {/* Outlet Image */}
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

      {/* Restaurant Details */}
      <section className="w-full flex justify-between my-4">
        <div>
          <h1 className="text-xl font-semibold">Dominos India</h1>
          <p className="text-xs">Pizza, Italian, Pasta, Fast Food, Desserts</p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" /> Chhatarpur, Madhya Pradesh
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <Phone className="h-3.5 w-3.5" /> +91 1234567890
          </p>

          <div className="text-sm flex gap-2 items-center mt-2">
            <span className="flex items-center">
              <Timer className="h-3.5 w-3.5 mr-1" /> 30 Mins
            </span>
            <span className="text-current"> • ₹400 for 2</span>
          </div>
          <p className="text-sm text-green-600 bg-green-50 flex items-center gap-1 border border-green-600 p-1 px-2 rounded-xl w-fit mt-2">
            <LeafyGreen className="h-3.5 w-3.5" /> Pure Veg
          </p>
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

      {/* Call Waiter, Bookmark, Share */}
      <div className="flex gap-2">
        <Button>
          <BellRing className="h-4 w-4 mr-2" /> Call Waiter
        </Button>
        <Button>
          <BookmarkPlus className="h-4 w-4" />
        </Button>
        <Button>
          <Share2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Menu and Filters */}
      <section className="w-full">
        <div className="">
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
          </div>
          <Input className="my-2" placeholder="Search for dishes" />

          {/* Menu */}
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

      <section className="flex flex-col items-end fixed bottom-0 right-0 w-full">
        <div className="m-2 w-fit">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="rounded-full flex flex-col justify-center items-center bg-black p-4 text-white">
                <SwatchBook />
                Menu
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mr-6">
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
      <Customize />
    </main>
  );
}
