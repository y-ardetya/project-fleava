export const LayerVariants = {
  hidden: {
    clipPath: "circle(0% at 50% 50%)",
    y: "-50vh",
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
  visible: {
    clipPath: "circle(75% at 50% 50%)",
    y: 0,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

export const SecondLayerVariants = {
  hidden: {
    clipPath: "circle(0% at 50% 50%)",
    y: "-50vh",
    transition: {
      delay: 0.3,
      duration: 1,
      ease: "easeInOut",
    },
  },
  visible: {
    clipPath: "circle(75% at 50% 50%)",
    y: 0,
    transition: {
      delay: 0.3,
      duration: 1,
      ease: "easeInOut",
    },
  },
};

export const ModalVariants = {
  hidden: {
    clipPath: "circle(0% at 50% 50%)",
    y: "-50vh",
    transition: {
      delay: 0.6,
      duration: 1,
      ease: "easeInOut",
    },
  },
  visible: {
    clipPath: "circle(200% at 50% 50%)",
    y: 0,
    transition: {
      delay: 0.6,
      duration: 1,
      ease: "easeInOut",
    },
  },
};
