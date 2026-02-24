export const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.35, ease: "easeOut" }
};

export const cardVariants = {
    hover: { scale: 1.02, transition: { duration: 0.2 } },
    tap: { scale: 0.97, transition: { duration: 0.1 } }
};

export const modalVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 50, opacity: 0 },
    transition: { duration: 0.3 }
};

export const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.05
        }
    }
};
