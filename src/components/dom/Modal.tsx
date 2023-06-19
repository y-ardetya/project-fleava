import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion as m } from "framer-motion";
import { gsap } from "gsap";

interface Props {
  modal: { active: boolean; index: number };
  projects: any;
}

const scaleAnimation = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  open: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
  },
  close: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.5, ease: [0.32, 0, 0.67, 0] },
  },
};

const index: React.FC<Props> = ({ modal, projects }) => {
  const $ref = useRef<HTMLInputElement>(null);
  const $cursor = useRef<HTMLInputElement>(null);
  const { active, index } = modal;

  useEffect(() => {
    const mouseMoveX = gsap.quickTo($ref.current, "left", {
      duration: 0.8,
      ease: "power3",
    });
    const mouseMoveY = gsap.quickTo($ref.current, "top", {
      duration: 0.8,
      ease: "power3",
    });

    const cursorMoveX = gsap.quickTo($cursor.current, "left", {
      duration: 0.5,
      ease: "power3",
    });

    const cursorMoveY = gsap.quickTo($cursor.current, "top", {
      duration: 0.5,
      ease: "power3",
    });

    window.addEventListener("mousemove", (e) => {
      const { clientX, clientY } = e;
      mouseMoveX(clientX);
      mouseMoveY(clientY);
      cursorMoveX(clientX);
      cursorMoveY(clientY);
    });
  }, []);

  return (
    <>
      <m.div
        ref={$ref}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "open" : "close"}
        exit="close"
        className="absolute h-[300px] mt-[400vh] w-[300px] flex items-center justify-center overflow-hidden pointer-events-none"
      >
        <div
          style={{ top: index * -100 + "%" }}
          className="absolute h-full w-full transition-top ease-[cubic-bezier(0.76, 0, 0.24,1)] duration-500"
        >
          {projects.map((project: any, index: number) => {
            const { url } = project;
            return (
              <div className="relative h-full flex items-center justify-center">
                <Image
                  src={`/images/${url}`}
                  alt="image"
                  width={300}
                  height={0}
                  className="h-auto"
                />
              </div>
            );
          })}
        </div>
      </m.div>
      <m.div
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "open" : "close"}
        exit="close"
        ref={$cursor}
        className="w-16 h-16 mt-[400vh] bg-teal-300 absolute pointer-events-none rounded-full flex items-center justify-center"
      >
        <div className="text-white font-bold text-xs">View</div>
      </m.div>
    </>
  );
};

export default index;
