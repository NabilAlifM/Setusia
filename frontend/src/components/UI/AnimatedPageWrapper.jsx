import { motion } from 'framer-motion';
import { pageVariants } from '../../animations/variants';

export default function AnimatedPageWrapper({ children, className }) {
    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageVariants.transition}
            className={className}
        >
            {children}
        </motion.div>
    );
}
