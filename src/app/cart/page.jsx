import Counter from "./Counter";
import Image from "next/image";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  Copy,
  CreditCard,
  MoreVertical,
  ScrollText,
  Store,
  Truck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

export function Items() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            Total Bill
            <Button
              size="icon"
              variant="outline"
              className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Copy className="h-3 w-3" />
              <span className="sr-only">Copy Order ID</span>
            </Button>
          </CardTitle>
          <CardDescription>Date: November 23, 2023</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
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
    <main className="grid gap-6 p-8">
      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/50">
          <div className="text-lg font-bold flex gap-1">
            <Store /> Restaurant
          </div>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Outlet ID:</strong> 123456
          </p>
          <p>
            <strong>Outlet Name:</strong> Sagar Gaire
          </p>
          <p>
            <strong>Outlet Address:</strong> 1234 Main St., Anytown, CA 12345
          </p>
        </CardContent>
      </Card>
      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/50">
          <div className="text-lg font-bold flex gap-1">
            <ScrollText /> Items
          </div>
        </CardHeader>
        <CardContent>
          <div className="">
            <div className="flex items-center justify-between">
              <p className="text-lg font-medium flex items-center gap-2">
                <Image src="/veg.svg" alt="Dash" height="16" width="16" />
                Chole Bhature
              </p>
              <Counter className="" />
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-base font-medium text-muted-foreground">
                ₹ 120
              </span>
              <span className="text-base font-medium text-muted-foreground">
                ₹ 120
              </span>
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
