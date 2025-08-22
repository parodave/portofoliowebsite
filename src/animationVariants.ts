export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export const panelVariants = {
  hidden: (reduce: boolean) => ({
    opacity: 0,
    y: reduce ? 0 : 20,
  }),
  visible: (reduce: boolean) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: reduce ? 0 : 0.3,
      ease: 'easeOut',
    },
  }),
};
