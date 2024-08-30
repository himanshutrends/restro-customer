import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LogOut, MenuIcon, ShoppingBag, User } from "lucide-react";
import Link from "next/link";

export function Menu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="h-8 w-8">
          <MenuIcon className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-64 flex-col flex justify-between">
        <SheetHeader className="items-start">
          <SheetTitle>My Account</SheetTitle>
          <SheetDescription>Hi Himanshu!</SheetDescription>

          <div className="grid items-start text-sm font-medium mt-4">
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg pr-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <User className="h-4 w-4" />
              Profile
            </Link>
            <Link
              href="/orders"
              className="flex items-center gap-3 rounded-lg pr-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <ShoppingBag className="h-4 w-4" />
              Orders
            </Link>
          </div>
        </SheetHeader>
        <Button variant="outline">
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg pr-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Link>
        </Button>
      </SheetContent>
    </Sheet>
  );
}
