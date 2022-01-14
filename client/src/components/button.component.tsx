import { FC } from "react";
import { motion, Variants } from 'framer-motion'
import cx from 'classnames'

import Icon from "../svg/icon.svg"
import { useNavigate } from "react-router-dom";

interface Props {
    classname: string,
    text: string
    enter_delay: number,
    exit_delay: number,
    path: string
};

const Button: FC<Props> = ({ classname, text, enter_delay, exit_delay, path }) => {
    const navigate = useNavigate();

    const variants: Variants = {
        hidden: {
            y: '100vh',
        },
        visible: {
            y: '0',
            transition: {
                type: 'spring',
                stiffness: 60,
                delay: enter_delay
            }
        },
        exit: {
            y: '100vh',
            transition: {
                duration: 0.4,
                delay: exit_delay
            }
        },
        hover: {
            scale: 1.2,
            transition: {
                duration: 0.8,
                ease: 'linear',
            }
        }
    };

    return (
        <motion.div
            className={cx(
                "relative flex justify-center items-center btn-base cursor-pointer",
                classname
            )}
            variants={variants}
            initial='hidden'
            animate='visible'
            exit='exit'
            whileHover='hover'
            whileTap='hover'

            onClick={() => navigate(path, {replace: true})}
        >
            <Icon />
            <div className="absolute m-auto text-center text-[#ffd58c] select-none">
                {text}
            </div>
        </motion.div>
    )
};

export default Button;
