import { heroData } from "@/data/HeroData";
import HeroSection from "./HeroSection";
import { useState } from "react";
import { motion as m } from "framer-motion";
import ModalContainer from "./ModalContainer";
import {
  ModalVariants,
  LayerVariants,
  SecondLayerVariants,
} from "@/helpers/Variants";

const Overlay = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const prev = () => {
    if (active === 0) {
      setActive(heroData.length - 1);
    } else {
      setActive(active - 1);
    }
  };

  const next = () => {
    if (active === heroData.length - 1) {
      setActive(0);
    } else {
      setActive(active + 1);
    }
  };

  return (
    <>
      <div className="w-screen h-screen">
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
        {heroData
          .filter((hero, i) => i === active)
          .map((hero, i) => {
            return (
              <HeroSection
                prev={() => prev()}
                next={() => next()}
                key={i}
                index={hero.index}
                title={hero.title}
                description={hero.description}
              />
            );
          })}
      </div>
    </>
  );
};

export default Overlay;
