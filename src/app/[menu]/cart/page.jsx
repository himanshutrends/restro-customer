'use client';
import { useState, useEffect } from 'react';
import Image from "next/image";
import {
  Bike,
  ChevronLeft,
  ChevronsRight,
  Package,
  Store,
  Utensils,
  UtensilsCrossed,
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

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { ChevronRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { usePathname } from 'next/navigation'
import { Items } from "./Items";
import { SetQuantity } from "./SetQuantity";

export default function Orders() {
  const { fetchCartItems } = useCart();
  const [cartItems, setCartItems] = useState([]);
  const [outlet, setOutlet] = useState({});

  const pathname = usePathname();
  const pathnames = pathname.split('/');

  const fetchOutlet = async () => {
    const response = await fetch(`http://localhost:8000/api/shop/outlet/${pathnames[1]}`);
    return response.json();
  };

  useEffect(() => {
    (async () => {
      const outlet = await fetchOutlet();
      setOutlet(outlet);
      const items = await fetchCartItems();
      setCartItems(items);
    })()
  }, [cartItems]);

  return (
    <main className="grid gap-4 p-6">
      <h2 className="text-2xl font-semibold">
        <Link href={`/${pathnames[1]}`}>
          <Button size="icon" variant="outline" className="h-8 w-8 mr-2">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </Link>
        Cart
      </h2>

      <Breadcrumb>
        <BreadcrumbList>
          {
            pathnames.map((path, index) => {
              if (index === 0) {
                return (
                  <>
                    <BreadcrumbItem key={index}>
                      <BreadcrumbLink href="/">HOME</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                  </>
                );
              } else {
                return (
                  <>
                    {index < pathnames.length - 1 ?
                      <><BreadcrumbItem key={index}>
                        <BreadcrumbLink href={`/${path}`}>{path.toLocaleUpperCase()}</BreadcrumbLink>
                      </BreadcrumbItem>
                        <BreadcrumbSeparator /></>
                      :
                      <BreadcrumbItem key={index}>
                        <BreadcrumbPage>{path.toLocaleUpperCase()}</BreadcrumbPage>
                      </BreadcrumbItem>
                    }
                  </>
                );
              }
            }
            )
          }
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/50">
          <CardTitle className="flex gap-1">
            <Store className="h-4 w-4" /> {outlet?.shop?.name}
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
              {outlet?.location}
              <div className="flex items-center gap-1">
                <Link
                  href={`/${pathnames[1]}`}
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
        {cartItems.map((item, key) => (
          <CardContent key={key}>
            <div className="mt-2">
              <div className="flex items-center justify-between">
                <p className="font-medium flex items-center gap-1">
                  <Image src="/veg.svg" alt="Dash" height="14" width="14" />
                  {item.food_item?.name}{item.variant && ` - ${item.variant?.variant}`}
                </p>
                <SetQuantity item={item} />
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span className="font-medium text-muted-foreground">₹ {item.food_item.price}</span>
                <span className="font-medium">₹ {item.totalPrice}</span>
              </div>
            </div>
          </CardContent>
        ))}
      </Card>

      <Card className="p-6 gap-3 items-start flex flex-col">
        <Label forHTML="type">Order Type</Label>
        <ToggleGroup id="type" type="single">
          <ToggleGroupItem value="a" className="border rounded-full">
            <UtensilsCrossed className="h-3.5 w-3.5 mr-1" /> DineIn
          </ToggleGroupItem>
          <ToggleGroupItem value="b" className="border rounded-full">
            <Package className="h-3.5 w-3.5 mr-1" />
            Takeaway
          </ToggleGroupItem>
          <ToggleGroupItem value="c" className="border rounded-full">
            <Bike className="h-3.5 w-3.5 mr-1" /> Delivery
          </ToggleGroupItem>
        </ToggleGroup>

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
      <Items items={cartItems}/>
      <button className="sticky bottom-5 right-0 p-4 rounded-xl bg-green-500 flex items-center justify-center text-white font-bold">
        Proceed to Pay ₹ 120 <ChevronsRight className="h-6 w-6 ml-3" />
      </button>
    </main>
  );
}
