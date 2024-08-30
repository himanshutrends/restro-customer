"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronRightIcon,
  Copy,
  CreditCard,
  HelpCircle,
  MapPin,
  MoreVertical,
  PhoneCall,
  RotateCcwSquare,
  Star,
  Truck,
} from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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

import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

export default function Order() {
  return (
    <main className="max-w-lg p-4 gap-4 grid">
      <h2 className="text-2xl font-semibold">
        <Button size="icon" variant="outline" className="h-8 w-8 mr-2">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        Orders History
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
            <BreadcrumbPage>Orders</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/50">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16">
              <Image
                src="/pizza.jpg"
                alt="Restaurant"
                height="100"
                width="100"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            <div className="text-muted-foreground text-sm">
              <div className="text-lg text-primary font-semibold">
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
        </CardHeader>
        <CardContent className="grid gap-2 mt-4">
          <div className="flex items-center justify-between">
            <p className="font-medium flex items-center gap-2">
              <Image src="/veg.svg" alt="Dash" height="16" width="16" />
              <span className="text-muted-foreground">1 x </span>
              Chole Bhature
            </p>
          </div>
          <Separator />
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm font-medium text-muted-foreground">
              Order placed on 23 Mar, 08:23 PM
              <p className="text-base">Completed</p>
            </span>
            <span className="flex items-center text-base font-medium">
              ₹ 120 <ChevronRightIcon className="h-4 w-4" />
            </span>
          </div>
          <Separator />

          <Button className="h-8 gap-1 w-fit">
            <RotateCcwSquare className="h-3.5 w-3.5" />
            <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
              Reorder
            </span>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
