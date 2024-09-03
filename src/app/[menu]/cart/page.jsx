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
  const [tables, setTables] = useState([]);
  const [outlet, setOutlet] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  const [orderType, setOrderType] = useState({});
  const handleOrderType = (e) => {
    setOrderType({ ...orderType, [e.target.name]: e.target.value });
  };


  const pathname = usePathname();
  const pathnames = pathname.split('/');

  const fetchOutlet = async () => {
    const response = await fetch(`http://localhost:8000/api/shop/outlet/${pathnames[1]}`);
    if (!response.ok) {
      throw new Error('Failed to fetch outlet');
    }
    return response.json();
  };
  
  const fetchTables = async () => {
    const response = await fetch(`http://localhost:8000/api/shop/tables/${pathnames[1]}`);
    if (!response.ok) {
      throw new Error('Failed to fetch tables');
    }
    return response.json();
  };
  
  useEffect(() => {
    (async () => {
      const [outlet, tables, cartItems] = await Promise.all([
        fetchOutlet(),
        fetchTables(),
        fetchCartItems(),
      ]);
      setOutlet(outlet);
      setTables(tables);
      setCartItems(cartItems);
      setTotalPrice(cartItems?.reduce((acc, item) => acc + item.totalPrice, 0))
    })()
  }, [cartItems]);

  return (
    <main className="grid gap-4 p-6">
      {/* Header */}
      <h2 className="text-2xl font-semibold">
        <Link href={`/${pathnames[1]}`}>
          <Button size="icon" variant="outline" className="h-8 w-8 mr-2">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </Link>
        Cart
      </h2>

      {/* Breadcrumb */}
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
      
      {/* Restro Info */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-rose-50">
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
        
      {/* List Items */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-rose-50">
          <CardTitle className="flex gap-1">
            <Utensils className="h-4 w-4" /> Items
          </CardTitle>
          <CardDescription>Customize your quantity</CardDescription>
        </CardHeader>
        {cartItems?.map((item, key) => (
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
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="font-medium text-muted-foreground">₹ 120</span>
              <span className="font-medium">₹ 120</span>
            </div>
            <p className="text-muted-foreground text-xs">Cheese, Dahi</p>
            <Link
              href="/components"
              className="flex items-center text-rose-500 text-xs"
            >
              Customize <ChevronsRight className="w-3 h-3 ml-1" />
            </Link>
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
        <Textarea id="instruction" placeholder="Add your cooking instruction" onChange={handleOrderType} />

        <Label forHTML="tableid">Table</Label>
        <Select id="tableid">
          <SelectTrigger>
            <SelectValue placeholder={tables?.length > 0 && tables[0]?.name} />
          </SelectTrigger>
          <SelectContent>
            {tables?.map((table, key) => (
              <SelectItem key={key} value={table.id} onClick={() => setOrderType({ tableid: table.id })}>
                {table.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Card>
      <Items items={cartItems}/>
      <button className="sticky bottom-5 right-0 p-4 rounded-xl bg-rose-500 flex items-center justify-center text-white font-bold shadow-xl">
        Proceed to Pay ₹ {totalPrice} <ChevronsRight className="h-6 w-6 ml-3" />
      </button>
    </main>
  );
}
