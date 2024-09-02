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
import firebase from "@/app/firebase";

export function Auth() {
  const [step, setStep] = useState(1);
  const [otpTimer, setOtpTimer] = useState(30);
  const [userExists, setUserExists] = useState(false);
  const [verificationId, setVerificationId] = useState("");
  const recaptchaVerifierRef = useRef(null);

  // useEffect(() => {
  //   // Initialize reCAPTCHA only if the container is available and step is 1
  //   if (step === 1) {
  //     const container = document.getElementById("recaptcha-container");
  //     if (container) {
  //       recaptchaVerifierRef.current = new firebase.auth.RecaptchaVerifier(container, {
  //         size: "invisible",
  //         callback: (response) => {
  //           handleSendCode();
  //         },
  //         'expired-callback': () => {
  //           console.warn("reCAPTCHA expired. Try again.");
  //         },
  //       });
  //     } else {
  //       console.error("Recaptcha container not found.");
  //     }
  //   }

  //   // Clean up reCAPTCHA verifier on unmount
  //   return () => {
  //     if (recaptchaVerifierRef.current) {
  //       recaptchaVerifierRef.current.clear();
  //     }
  //   };
  // }, [step]);

  const handleNext = () => {
    if (step === 1) {
      handleSendCode();
    } else if (step === 2) {
      handleVerifyCode();
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

  const handleSendCode = () => {
    const phoneNumber = document.getElementById("phone-number-input").value;

    if (!recaptchaVerifierRef.current) {
      console.error("RecaptchaVerifier is not initialized.");
      return;
    }

    firebase.auth().signInWithPhoneNumber(phoneNumber, recaptchaVerifierRef.current)
      .then((confirmationResult) => {
        setVerificationId(confirmationResult.verificationId);
        setStep(2);
      })
      .catch((error) => {
        console.error("Error during sending OTP: ", error);
        if (recaptchaVerifierRef.current) {
          recaptchaVerifierRef.current.clear();
          recaptchaVerifierRef.current = new firebase.auth.RecaptchaVerifier(
            "recaptcha-container",
            {
              size: "invisible",
              callback: (response) => {
                handleSendCode();
              },
              'expired-callback': () => {
                console.warn("reCAPTCHA expired. Try again.");
              },
            }
          );
        }
      });
  };

  const handleVerifyCode = () => {
    const code = document.getElementById("otp-input").value;

    if (verificationId) {
      const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);
      firebase
        .auth()
        .signInWithCredential(credential)
        .then((userCredential) => {
          console.log("User signed in successfully:", userCredential);
          setUserExists(true);
          setStep(3);
        })
        .catch((error) => {
          console.error("Error verifying OTP: ", error);
        });
    } else {
      console.error("No verification ID found.");
    }
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
        {step === 1 && <Phone handleSendCode={handleSendCode} />}
        {step === 2 && (
          <Otp timer={otpTimer} handleVerifyCode={handleVerifyCode} />
        )}
        {step === 3 && !userExists && <Name />}
        <div id="recaptcha-container"></div>
        <DrawerFooter>
          <Button onClick={handleNext}>{getButtonText()}</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

// Phone component
function Phone({ handleSendCode }) {
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <>
      <div className="flex flex-col gap-2 w-full px-4">
        <Label>Mobile Number</Label>
        <Input
          id="phone-number-input"
          placeholder="Enter Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>
      <DrawerFooter>
        <Button id="send-code-button" onClick={handleSendCode}>
          Send Code
        </Button>
      </DrawerFooter>
    </>
  );
}

// Otp component
function Otp({ timer, handleVerifyCode }) {
  const [otp, setOtp] = useState("");

  return (
    <div className="flex flex-col gap-2 items-center w-full px-4">
      <Label>Enter OTP</Label>
      <Input
        id="otp-input"
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        maxLength={6}
        required
      />
      <p className="text-xs">
        Resend in 00:{timer.toString().padStart(2, "0")}
      </p>
    </div>
  );
}

// Name component
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

// Promo component
function Promo() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
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
