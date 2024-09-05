import { Badge } from "@/components/ui/badge";
import {
  BellRing,
  BookmarkPlus,
  Share2,
  Star,
  ChefHat,
  MapPin,
  Phone,
  LeafyGreen,
  Timer,
  Images,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Auth, Promo } from "@/components/ui/auth";
import { Menu } from "./Menu";
import { apiGet } from "@/handlers/apiHandler";
import { MenuAccordion } from "./MenuAccordion";
import { ItemAdded } from "./ItemAdded";
import { getSession } from "@/app/lib/auth/session";

export default async function Home({ params }) {
  const itemsPromis = apiGet(`/api/shop/client-menu/${params.menu}`);
  const outletPromis = apiGet(`/api/shop/outlet/${params.menu}`);
  const waitPromisForLoader = new Promise((resolve) => setTimeout(resolve, 1000));
  const [items, outlet] = await Promise.all([itemsPromis, outletPromis, waitPromisForLoader]);
  const session = await getSession();

  return (
    <main className="flex w-full min-h-screen flex-col gap-4 justify-evenly p-6 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold">
          <Button size="icon" variant="outline" className="h-8 w-8 mr-2">
            <ChefHat className="h-4 w-4" />
          </Button>
          Tacoza
        </h2>
        {session ? <Menu menu={params.menu}/> : <Auth menu={params.menu}/>}
      </div>

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">HOME</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{params.menu.toUpperCase()}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Outlet Image */}
      <div className="hidden w-full grid-cols-5 grid-rows-2 gap-2">
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

      <div className="relative">
        <Promo />
        <div className="absolute flex items-center bottom-0 right-0 border rounded text-xs px-1 bg-black/30 border-white shadow-md text-white m-2">
          <Images className="h-3-5 w-3.5 mr-1" /> More
        </div>
      </div>

      {/* Restaurant Details */}
      <section className="w-full flex justify-between my-4">
        <div>
          <h1 className="text-xl font-semibold">{outlet.name}</h1>
          <p className="text-xs">Pizza, Italian, Pasta, Fast Food, Desserts</p>
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

      <MenuAccordion items={items} />

      {/* Item Added */}    
      <ItemAdded params={params} />
    </main>
  );
}
