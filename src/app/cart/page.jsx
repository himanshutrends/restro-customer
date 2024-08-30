import Counter from "./Counter";
import Image from "next/image";

import {
  ChevronLeft,
  ChevronsRight,
  Copy,
  NotepadText,
  Store,
  Tags,
  Utensils,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export function Items() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="flex gap-1">
            <NotepadText className="h-4 w-4" /> Bill Summary
          </CardTitle>
          <CardDescription>Apply Offers to get discount</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <Label forHTML="coupon" className="flex items-center mb-1">
          <Tags className="h-3.5 w-3.5 mr-1" /> Discount
        </Label>
        <div className="flex items-center gap-2 mb-4">
          <Input
            id="coupon"
            label="Coupon Code"
            placeholder="Enter coupon code"
          />
          <Button>Apply</Button>
        </div>
        <div className="grid gap-3">
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>₹ 112</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">GST</span>
              <span>₹ 8</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Platform Fee</span>
              <span>₹ 0</span>
            </li>
            <li className="flex items-center justify-between font-semibold">
              <span className="text-muted-foreground">Discount</span>
              <span>₹ 0</span>
            </li>
            <li className="flex items-center justify-between font-semibold">
              <span className="text-muted-foreground">Total</span>
              <span>₹ 120</span>
            </li>
          </ul>
        </div>
        <Separator className="my-4" />
        <li className="flex items-center justify-between font-semibold">
          <span>To Pay</span>
          <span>₹ 120</span>
        </li>
      </CardContent>
    </Card>
  );
}

export default function Orders() {
  return (
    <main className="grid gap-4 p-6">
      <h2 className="text-2xl font-semibold">
        <Button size="icon" variant="outline" className="h-8 w-8 mr-2">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        Cart
      </h2>
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
            <BreadcrumbPage>Cart</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/50">
          <CardTitle className="flex gap-1">
            <Store className="h-4 w-4" /> Restaurant
          </CardTitle>
          <CardDescription>Outlet Information</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2 mt-4">
          <div className="flex items-center gap-4">
            <div className="aspect-square">
              <Image
                src="/pizza.jpg"
                alt="Restaurant"
                height="100"
                width="100"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            <div className="text-muted-foreground text-sm">
              <div className="text-base text-primary font-semibold">
                Sagar Gaire, Chhindwara
              </div>
              Liam Johnson1234 Main St.Anytown, CA 12345
              <div className="flex items-center gap-1">
                <Link
                  href="tel:+1234567890"
                  className="flex items-center text-blue-500"
                >
                  View Menu <ChevronRightIcon className="h-4 w-4 mt-1" />
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/50">
          <CardTitle className="flex gap-1">
            <Utensils className="h-4 w-4" /> Items
          </CardTitle>
          <CardDescription>Customize your quantity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-2">
            <div className="flex items-center justify-between">
              <p className="font-medium flex items-center gap-1">
                <Image src="/veg.svg" alt="Dash" height="14" width="14" />
                Chole Bhature
              </p>
              <Counter className="" />
            </div>
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="font-medium text-muted-foreground">₹ 120</span>
              <span className="font-medium">₹ 120</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="p-6 gap-2   flex flex-col">
        <Label forHTML="instruction">Add Cooking Instruction</Label>
        <Textarea id="instruction" placeholder="Add your cooking instruction" />

        <Label forHTML="tableid">Table</Label>
        <Select id="tableid">
          <SelectTrigger>
            <SelectValue placeholder="Table 2 - Inside" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Table 1 - Inside</SelectItem>
            <SelectItem value="2">Table 2 - Inside</SelectItem>
            <SelectItem value="3">Table 3 - Outside</SelectItem>
          </SelectContent>
        </Select>
      </Card>
      <Items />
      <button className="sticky bottom-5 right-0 p-4 rounded-xl bg-green-500 flex items-center justify-center text-white font-bold">
        Proceed to Pay ₹ 120 <ChevronsRight className="h-6 w-6 ml-3" />
      </button>
    </main>
  );
}
