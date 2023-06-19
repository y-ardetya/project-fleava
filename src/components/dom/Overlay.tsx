"use client";

import { heroData } from "@/data/HeroData";
import HeroSection from "./HeroSection";
import { useEffect, useRef, useState } from "react";
import { motion as m, useInView } from "framer-motion";
import ModalContainer from "./ModalContainer";
import {
  ModalVariants,
  LayerVariants,
  SecondLayerVariants,
  ImageVariants,
} from "@/helpers/Variants";
import Image from "next/image";

import { useStore } from "@/store/useStore";

const Overlay = () => {
  const $mask = useRef(null);
  const $image = useRef(null);
  const [open, setOpen] = useState(false);
  const isInView = useInView($mask, { margin: "20px" });
  const imageInView = useInView($image, { once: true, margin: "-10px" });

  const phrases = [
    "Fleava is a digital agency :kek:,",
    "that focuses on creating immersive experience",
    "exceed imaginations.",
  ];

  useEffect(() => {
    console.log(isInView);
  }, [isInView]);

  const [dataIndex]: any = useStore((state) => [state.dataIndex]);

  const maskVariants = {
    initial: {
      y: "100%",
    },
    open: {
      y: "0%",
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <>
      <div className="w-screen h-screen mt-[100vh]">
        <nav className="flex justify-end mr-36 mt-10 gap-x-5 z-20">
          <h1 className="text-white">Fleava</h1>
          <h1
            onClick={() => setOpen(!open)}
            className="text-white cursor-pointer"
          >
            hamburger
          </h1>
        </nav>
        <m.div
          variants={LayerVariants}
          initial="hidden"
          animate={open ? "visible" : "hidden"}
          className="w-full h-full bg-black absolute top-0 left-0 pointer-events-none z-0"
        />
        <m.div
          variants={SecondLayerVariants}
          initial="hidden"
          animate={open ? "visible" : "hidden"}
          className="w-full h-full bg-gray-500 absolute top-0 left-0 pointer-events-none z-0"
        />
        <m.div
          variants={ModalVariants}
          initial="hidden"
          animate={open ? "visible" : "hidden"}
          className="w-full h-full bg-white absolute top-0 left-0 pointer-events-none z-0"
        >
          <div className="h-screen w-screen absolute">
            <div className="flex justify-center items-center h-screen flex-col">
              <h1>hello</h1>
              <div className="flex flex-row text-4xl gap-x-10 outline-dashed outline-red-300">
                <h1>/Design</h1>
                <h1>/Development</h1>
                <h1>/Marketing</h1>
                <h1>/Consulting</h1>
              </div>
            </div>
          </div>
        </m.div>

        <HeroSection
          title={heroData[dataIndex].title}
          description={heroData[dataIndex].description}
          dataLength={heroData.length}
        />
      </div>
      <div className="w-screen h-screen bg-black">
        <div className="w-screen h-screen bg-black text-white flex-col justify-center">
          <div className="flex justify-start items-center h-screen">
            <div className="ml-[8rem] flex gap-y-10 flex-col">
              <p>/Introduction</p>
              <h1 className="text-5xl">
                Accelerating Global Brands - Years ahead.
              </h1>
              <p className="text-2xl">We are a world class team of industry</p>
            </div>
          </div>
        </div>
        <div className="w-full h-full bg-black flex justify-center items-center relative">
          <m.div
            ref={$image}
            variants={ImageVariants}
            initial="hidden"
            animate={imageInView ? "visible" : "hidden"}
            className="w-full h-full"
          >
            <Image
              src={"/images/one.jpg"}
              alt="image"
              sizes="100vw"
              fill={true}
              style={{ objectFit: "cover" }}
            />
          </m.div>
        </div>
        <section className="w-full h-full bg-black text-white">
          <main className="flex flex-col items-center">
            <div className="text-[5vw]">
              {phrases.map((phrase, index) => {
                return (
                  <div ref={$mask} key={index} className="overflow-hidden">
                    <m.p
                      variants={maskVariants}
                      initial="initial"
                      animate={isInView ? "open" : "initial"}
                      className="m-0 font-bold translate-y-[50%]"
                    >
                      {phrase}
                    </m.p>
                  </div>
                );
              })}
            </div>
          </main>
        </section>
        <div className="w-full h-full bg-black">
          <ModalContainer />
        </div>
      </div>
    </>
  );
};

export default Overlay;
