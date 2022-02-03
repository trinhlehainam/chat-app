import { motion, Variants } from 'framer-motion'
import cx from 'classnames'

const Title = () => {
    const variants: Variants = {
        hidden: {
            x: '-100vw',
        },
        visible: {
            x: 0,
            transition: {
                type: 'spring',
                stiffness: 120,
            }
        },
    };
    
    return (
        <motion.div
            className={cx(
                "relative flex justify-center items-center text-7xl text-yellow-custom",
                "mt-16 mb-16",
                "sm:text-9xl sm:mt-32 sm:mb-20"
            )}
            variants={variants}
            initial="hidden"
            animate="visible"
        >
            <motion.div
                variants={variants}
            >
                GEM
            </motion.div>
            <img
                className={cx(
                    "w-[72px] h-[72px]",
                    "sm:w-[128px] sm:h-[128px]",
                )}
                src={`${process.env.PUBLIC_URL}/images/gem.png`}
                alt="gem icon" />
            <motion.div
                variants={variants}
            >
                TD
            </motion.div>
        </motion.div>
    );
};

export default Title;
