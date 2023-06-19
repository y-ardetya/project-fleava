"use client";

import Carousel from "@/components/canvas/Carousel";
import React from "react";
import { AnimatePresence } from "framer-motion";
import { motion as m3 } from "framer-motion-3d";
import { usePathname } from "next/navigation";

const page = () => {
  const pathname = usePathname();

  return (
    <>
      <AnimatePresence>
        <m3.group
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Carousel position={[0, 0, 0]} />
        </m3.group>
      </AnimatePresence>
    </>
  );
};

export default page;
