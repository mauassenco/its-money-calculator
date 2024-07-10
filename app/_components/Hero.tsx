'use client'

import Image from "next/image";
import { Button } from "./ui/button";
import {
  ArrowRight,
  CheckCircle2Icon,
  ChevronDown,
  DollarSignIcon,
} from "lucide-react";
import { Separator } from "./ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import SimulatorHeader from "./SimulatorHeader";
import { Progress } from "./ui/progress";
import CardWithForm from "./CardWithForm";

type HeroProps = {
  upperTitle?: string;
  title?: string;
  underTitle?: string;
  description?: string;
  ctaLabel?: string;
}


const Hero = ({
  upperTitle,
  title,
  underTitle,
  description,
  ctaLabel,
}: HeroProps) => {
  return (
    <div className="container ">
      <div className="flex flex-col md:flex-row-reverse">
        <div className="relative md:basis-[100%]">
          <Image
            src="/assets/images/header_image2.png"
            alt=""
            height={0}
            width={0}
            className="geeks h-[320px] h-auto w-full bg-contain object-contain"
            sizes="100%"
            quality={100}
          />
          <div className="geeks absolute bottom-0 h-[31vh]"></div>
        </div>
        <div className="font-inter z-10 -mt-20 flex flex-col px-4 md:-mt-0 md:basis-[100%] md:justify-center">
          <h2 className="mb-6 text-2xl font-semibold text-white">
            {upperTitle}
          </h2>
          <h1 className="mb-10 font-Big_Shoulders_Text text-[40px] font-bold uppercase leading-[48px] text-highlight">
            {title}
          </h1>
          <h3 className="mb-10 text-[17px] font-semibold text-white">
            {underTitle}
          </h3>
          <p className="mb-10 text-[17px] font-normal text-white">
            {description}
          </p>
          <div className="mb-6 flex flex-col items-center gap-4 md:items-start">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  className="flex h-14 w-full gap-2 bg-highlight text-base font-semibold text-black md:mb-10 md:max-w-80"
                  variant="default"
                >
                  {ctaLabel}
                  <ArrowRight type="icon" size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full bg-[#F2FFFF] p-0 sm:w-[400px]">
                <SheetHeader className="">
                  <SimulatorHeader />
                  {/* <div className="flex items-center border-b-[1px] p-4">
                    <CheckCircle2Icon
                      className="mr-4 text-highlight"
                      size="icon"
                      width={32}
                      height={32}
                    />

                    <Progress value={10} />

                    <DollarSignIcon
                      className="ml-4 rounded-[100%] border-[2px] text-[#E5E5E7]"
                      size="icon"
                      width={32}
                    />
                  </div> */}
                </SheetHeader>
                <SheetDescription>
                  <CardWithForm />
                </SheetDescription>

                <SheetFooter className="hidden">
                  <SheetClose asChild>
                    <Button type="submit"></Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>

            <ChevronDown
              type="icon"
              size={24}
              className="text-highlight md:hidden"
            />
          </div>
          <Separator className="mb-10 bg-[#27272B;] md:hidden" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
