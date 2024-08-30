"use client";

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

export function Auth() {
  const [step, setStep] = useState(1);
  const [otpTimer, setOtpTimer] = useState(30);
  const [userExists, setUserExists] = useState(false);

  useEffect(() => {
    if (step === 2) {
      const interval = setInterval(() => {
        setOtpTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [step]);

  const handleNext = () => {
    if (step === 1) {
      // Mock function to check if the user exists
      const exists = mockCheckUserExists();
      setUserExists(exists);
      setStep(2);
    } else if (step === 2) {
      if (userExists) {
        // If the user exists, skip to submission
        submitLogin();
      } else {
        setStep(3);
      }
    } else if (step === 3) {
      submitLogin();
    }
  };

  const getButtonText = () => {
    if (step === 1 || (step === 2 && !userExists)) {
      return "Continue";
    }
    return "Submit";
  };

  const submitLogin = () => {
    // Logic to handle the final submission
    console.log("Login Successfull");
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="h-8 w-fit ml-auto">
          Login
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[65vh]">
        <DrawerHeader className="flex items-start w-full">
          <div className="flex flex-col items-start w-full">
            <DrawerDescription>Order with Restro</DrawerDescription>
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
        {step === 2 && <Otp timer={otpTimer} />}
        {step === 3 && !userExists && <Name />}
        <DrawerFooter>
          <Button onClick={handleNext}>{getButtonText()}</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function Phone() {
  return (
    <div className="flex flex-col gap-2 w-full px-4">
      <Label>Mobile Number</Label>
      <Input placeholder="Enter Phone Number" required />
    </div>
  );
}

function Otp({ timer }) {
  return (
    <div className="flex flex-col gap-2 items-center w-full px-4">
      <Label>Enter OTP</Label>
      <InputOTP maxLength={6}>
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
        Resend in 00:{timer.toString().padStart(2, "0")}
      </p>
    </div>
  );
}

function Name() {
  return (
    <div className="flex flex-col gap-2 w-full px-4">
      <Label>Name</Label>
      <Input placeholder="Rahul Tiwari" required />

      <Label>Email</Label>
      <Input type="email" placeholder="rahul@restro.com" />
    </div>
  );
}

// Mock function to simulate user existence check
function mockCheckUserExists() {
  return Math.random() > 0.5; // Randomly returns true or false
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
