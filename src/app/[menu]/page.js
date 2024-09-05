import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  BellRing,
  BookmarkPlus,
  Share2,
  Star,
  SwatchBook,
  ChefHat,
  MapPin,
  Phone,
  LeafyGreen,
  Timer,
  Images,
  Settings2,
  Dot,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Auth, Promo } from "@/components/ui/auth";
import { Menu } from "./Menu";
import { apiGet } from "@/handlers/apiHandler";
import { MenuAccordion, SearchMenu } from "./temp";
import { ItemAdded } from "./ItemAdded";
import { getSession } from "@/app/lib/auth/session";
import { Separator } from "@/components/ui/separator";

export default async function Home({ params }) {
  const itemsPromis = apiGet(`/api/shop/client-menu/${params.menu}`);
  const outletPromis = apiGet(`/api/shop/outlet/${params.menu}`);
  const [items, outlet] = await Promise.all([itemsPromis, outletPromis]);
  const session = await getSession();
  return (
    <>
      <main className="flex w-full min-h-screen flex-col gap-4 justify-evenly p-6 overflow-hidden">
        {/* Header */}
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold">
            <Button size="icon" variant="outline" className="h-8 w-8 mr-2">
              <ChefHat className="h-4 w-4" />
            </Button>
            Tacoza
          </h2>
          {session ? <Menu /> : <Auth />}
        </div>

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{params.menu.toUpperCase()}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Outlet Image */}

        <div className="relative">
          <Promo />
          <div className="absolute flex items-center bottom-0 right-0 rounded-full text-xs px-1.5 bg-black/30  shadow-md text-white m-2">
            <Images className="h-3-5 w-3.5 mr-1" /> More
          </div>
          <div className="absolute bottom-0 left-0 flex items-end">
            <img
              src="https://i.pinimg.com/564x/10/84/70/1084704494593cdda1144c91ef188237.jpg"
              className=" m-2 h-10 w-10 object-cover rounded-full"
            />
            <div className="p-1 px-2 flex items-center  rounded-full text-xs bg-black/30  shadow-md text-secondary mb-2">
              <span className="h-2 w-2 rounded-full mr-1 bg-green-600" /> Open
            </div>
          </div>
        </div>

        {/* Restaurant Details */}
        <section className="w-full flex justify-between my-4">
          <div>
            <h1 className="text-xl font-semibold">{outlet.name}</h1>
            <p className="text-xs">
              Pizza, Italian, Pasta, Fast Food, Desserts
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" /> {outlet.location}
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Phone className="h-3.5 w-3.5" /> +91 {outlet.phone}
            </p>

            <div className="text-sm flex gap-2 items-center mt-2">
              <span className="flex items-center">
                <Timer className="h-3.5 w-3.5 mr-1" /> 30 Mins
              </span>
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
              <span className="flex items-center text-muted-foreground text-sm">
                Filters <Settings2 className="w-3.5 h-3.5 ml-1" />{" "}
                <Separator orientation="vertical" className="mx-2" />
              </span>
              <ToggleGroup type="single" variant="outline">
                <ToggleGroupItem
                  value="bold"
                  aria-label="Toggle bold"
                  className="gap-2 px-4 data-[state=on]:bg-green-100 data-[state=on]:text-green-700"
                >
                  <Image src="/veg.svg" alt="Dash" height="16" width="16" />
                  <span>Veg</span>
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="italic"
                  aria-label="Toggle italic"
                  className="gap-2 px-4 data-[state=on]:bg-yellow-50 data-[state=on]:text-yellow-400"
                >
                  <Image src="/egg.svg" alt="Dash" height="16" width="16" />
                  <span>Egg</span>
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="strikethrough"
                  aria-label="Toggle strikethrough"
                  className="gap-2 px-4 whitespace-nowrap data-[state=on]:bg-red-100 data-[state=on]:text-red-800"
                >
                  <Image src="/non-veg.svg" alt="Dash" height="16" width="16" />
                  <span>Non-Veg</span>
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <SearchMenu items={items} />

            {/* Menu */}
            <MenuAccordion items={items} />
          </div>
        </section>

        <div className="fixed bottom-20 right-0 m-2 w-fit">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="rounded-full aspect-square h-16 w-16 flex flex-col justify-center items-center bg-black text-white text-xs shadow-lg">
                <SwatchBook />
                Menu
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mr-6">
              <DropdownMenuLabel>Menu</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {items.map((item) => (
                <DropdownMenuItem key={item.id}>
                  {item.name}
                  <DropdownMenuShortcut>
                    <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                      {item.food_items ? item.food_items?.length : 0}
                    </Badge>
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <ItemAdded params={params} />
      </main>
      <section className="bg-muted p-4 pb-20">
        <p className="text-muted-foreground/70 text-xs font-bold">
          Disclaimer:
        </p>
        <ul class="mx-3 list-disc text-muted-foreground/70 text-xs">
          <li>All prices are set directly by restaurant.</li>
          <li>
            All nutritional information is indicative and approximate, it may
            vary depending on the preparation and ingredients used.
          </li>
          <li>
            Dish details and images might be AI crafted for better experience.
          </li>
        </ul>
        <Separator className="my-4" />

        <div aria-hidden="true" className="flex items-center gap-2">
          <img
            className="h-6"
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_120,h_60/fssai_final_edss9i"
            alt="FSSAI"
          />
          <p className="text-muted-foreground/70 text-xs">
            License No. XX2235500XXXXX
          </p>
        </div>
        <Separator className="my-4" />
        <p className="text-muted-foreground/80 text-xs font-bold">
          Sagar Gaire
        </p>
        <p className="text-muted-foreground/70 text-xs">
          (Outlet: Chhatarpur Town)
        </p>
        <p className="text-muted-foreground/70 text-xs flex items-center">
          <MapPin className="w-3 h-3" /> Chhatarpur, Madhya Pradesh
        </p>
      </section>
    </>
  );
}
