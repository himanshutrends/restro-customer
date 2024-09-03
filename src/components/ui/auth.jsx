"use client";
import { createContext, useContext } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Separator } from "@/components/ui/separator";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "./input";
import { Label } from "./label";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function Auth() {
  const [step, setStep] = useState(1);
  const [otpTimer, setOtpTimer] = useState(30);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  useEffect(() => {
    if (step === 2) {
      const interval = setInterval(() => {
        setOtpTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step]);

  return (
    <AuthContext.Provider value={{ step, setStep, phone, setPhone, otp, setOtp, otpTimer }}>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline" className="h-8 w-fit ml-auto">
            Login
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-[65vh]">
          <DrawerHeader className="flex items-start w-full">
            <div className="flex flex-col items-start w-full">
              <DrawerDescription>Order with Tacoza</DrawerDescription>
              <DrawerTitle>Login</DrawerTitle>
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
          <Promo />
          <Separator className="my-4" />
          {step === 1 && <Phone />}
          {step === 2 && <Otp />}
          {step === 3 && <Name />}
        </DrawerContent>
      </Drawer>
    </AuthContext.Provider>
  );
}

function Phone() {
  const { phone, setPhone, setStep, setOtp } = useContext(AuthContext);
  const validatePhone = () => {
    if (phone.length !== 10) {
      return false;
    }
    if (!/^[6-9]\d{9}$/.test(phone)) {
      return false;
    }
    return true;
  };

  const handleNext = async () => {
    if (!validatePhone(phone)) {
      console.log("Invalid Phone Number");
      return;
    }
    const response = await fetch("http://localhost:8000/api/auth/send-otp/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 'phone_number': phone }),
    });
    if (response.status === 200) {
      const res = await response.json();
      setOtp(res.otp);
      setStep(2);
    }
    console.log(response);
  };
  return (
    <>
      <div className="flex flex-col gap-2 w-full px-4">
        <Label>Mobile Number</Label>
        <Input placeholder="Enter Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      </div>
      <DrawerFooter>
        <Button onClick={handleNext}>Get OTP</Button>
      </DrawerFooter>
    </>
  );
}

function Otp() {
  const { phone, otp, setOtp, setStep, otpTimer } = useContext(AuthContext);
  const router = useRouter();
  const handleNext = async () => {
    const response = await fetch("/api/verify-otp/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone, otp }),
    });
    if (response.status === 200) {
      const res = await response.json();
      if (!res.user.name || !res.user.email) {
        setStep(3);
      } else {
        router.push("/cart");
      }
    }
  }
  return (
    <>
      <div className="flex flex-col gap-2 items-center w-full px-4">
        {otp}
        <Label>Enter OTP</Label>
        <InputOTP maxLength={6} value={otp} onChange={setOtp}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <p className="text-xs">
          Resend in 00:{otpTimer.toString().padStart(2, "0")}
        </p>
      </div>
      <DrawerFooter>
        <Button onClick={handleNext}>Continue</Button>
      </DrawerFooter>
    </>
  );
}

function Name() {
  const { setStep } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleNext = async () => {
    if (!name || !email) {
      console.log("Invalid Name or Email");
      return;
    }
    const response = await fetch("/api/update-user/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    });
    if (response.status === 200) {
      console.log(response);
      router.push("/cart");
    }
  }
  return (
    <>
      <div className="flex flex-col gap-2 w-full px-4">
        <Label>Name</Label>
        <Input placeholder="Rahul Tiwari" value={name} onChange={(e) => setName(e.target.value)} required />

        <Label>Email</Label>
        <Input type="email" placeholder="name@restro.com" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <DrawerFooter>
        <Button onClick={handleNext}>Continue</Button>
      </DrawerFooter>
    </>
  );
}

export function Promo() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false }),
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full px-4"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        <CarouselItem>
          <div className="flex aspect-video items-center justify-center">
            <Image
              src="/pizza.jpg"
              width={200}
              height={200}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="flex aspect-video items-center justify-center">
            <img
              src="https://b.zmtcdn.com/data/pictures/2/20415942/d8ad25988e906612aea78a82543e25c7.jpg?output-format=webp&fit=around|771.75:416.25&crop=771.75:416.25;*,*"
              width={200}
              height={200}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="flex aspect-video items-center justify-center">
            <img
              src="https://b.zmtcdn.com/data/pictures/chains/7/19016907/bedddb08e3eafa541fdec9db26613993.jpg?output-format=webp&fit=around|300:273&crop=300:273;*,*"
              width={200}
              height={200}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}
