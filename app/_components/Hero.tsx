'use client'

import Image from "next/image";
import { Button } from "./ui/button";
import {
  ArrowRight,
  ChevronDown
} from "lucide-react";
import { Separator } from "./ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";
import SimulatorHeader from "./SimulatorHeader";
import CardWithForm from "./CardWithForm";
import parse from 'html-react-parser';
import { AcfFieldsContext, useAcfFieldsContext } from "../context/AcfFields";
import { useContext } from "react";



const Hero = () => {
  const AcfData = useContext(AcfFieldsContext);

  return (
    <div className="container ">
      {AcfData !== undefined && (
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
              {parse(String(AcfData?.superior_title_text))}
            </h2>
            <h1 className="mb-10 font-Big_Shoulders_Text text-[40px] font-bold uppercase leading-[48px] text-highlight">
              {parse(String(AcfData?.title))}
            </h1>
            <h3 className="mb-10 text-[17px] font-semibold text-white">
              {parse(String(AcfData?.inferior_title_text))}
            </h3>
            <p className="mb-10 text-[17px] font-normal text-white">
              {parse(String(AcfData?.description_text))}
            </p>
            <div className="mb-6 flex flex-col items-center gap-4 md:items-start">
              <Sheet>
                <SheetTrigger asChild>

                  <Button
                    className="ct flex h-14 w-full gap-2 bg-highlight text-base font-semibold text-black md:mb-10 md:max-w-80"
                    variant="default"
                  >
                    {AcfData?.cta_label}
                    <ArrowRight type="icon" size={24} />
                  </Button>

                </SheetTrigger>
                <SheetContent className="w-full bg-[#F2FFFF] p-0 sm:w-[400px]">
                  <SheetHeader className="">
                    <SimulatorHeader />
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
      )}
    </div>
  );
};

export default Hero;
