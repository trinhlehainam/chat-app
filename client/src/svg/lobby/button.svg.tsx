import { FC } from "react";

interface Props {
    classname?: string,
    fillClass?: string, 
};

const Button: FC<Props> = ({ classname, fillClass }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="352.002"
            height="141.099"
            version="1.1"
            viewBox="0 0 93.134 37.332"
            preserveAspectRatio="none"
            className={classname}
        >
            <defs>
                <radialGradient id="my-gradient">
                    <stop offset="0%" stopColor="#e66465" />
                    <stop offset="100%" stopColor="#9198e5" />
                </radialGradient>
            </defs>
            <g transform="translate(127.817 208.603)">
                <g transform="matrix(.03528 0 0 -.03528 -596.765 755.278)">
                    <g>
                        <g transform="scale(1.6745)">
                            <path
                                fill="none"
                                stroke="#ffd58c"
                                strokeDasharray="none"
                                strokeLinecap="butt"
                                strokeLinejoin="miter"
                                strokeMiterlimit="10"
                                strokeOpacity="1"
                                strokeWidth="23.888"
                                d="M9503.15 16214.8V15787h-691.08l-85.28-85.2-85.21 85.2h-691.14v427.8h691.14l85.21 85.2 85.28-85.2z"
                            ></path>
                            <path
                                fill="none"
                                stroke="#ffd58c"
                                strokeDasharray="none"
                                strokeLinecap="butt"
                                strokeLinejoin="miter"
                                strokeMiterlimit="10"
                                strokeOpacity="1"
                                strokeWidth="23.888"
                                d="M9503.15 16214.8V15787h-691.08l-85.28-85.2-85.21 85.2h-691.14v427.8h691.14l85.21 85.2 85.28-85.2z"

                                className={fillClass}
                            ></path>
                        </g>
                        <g transform="scale(1.67094)">
                            <path
                                fill="none"
                                stroke="#ffd58c"
                                strokeDasharray="none"
                                strokeLinecap="butt"
                                strokeLinejoin="miter"
                                strokeMiterlimit="10"
                                strokeOpacity="1"
                                strokeWidth="11.969"
                                d="M8710.69 16300h-370.15l-49.79-49.8"
                            ></path>
                        </g>
                        <g transform="scale(1.67094)">
                            <path
                                fill="none"
                                stroke="#ffd58c"
                                strokeDasharray="none"
                                strokeLinecap="butt"
                                strokeLinejoin="miter"
                                strokeMiterlimit="10"
                                strokeOpacity="1"
                                strokeWidth="11.969"
                                d="M8780.17 16300h370.15l49.8-49.8"
                            ></path>
                        </g>
                        <g transform="scale(1.62171)">
                            <path
                                fill="none"
                                stroke="#ffd58c"
                                strokeDasharray="none"
                                strokeLinecap="butt"
                                strokeLinejoin="miter"
                                strokeMiterlimit="10"
                                strokeOpacity="1"
                                strokeWidth="12.333"
                                d="M8975.1 16248.7h-381.38l-51.31 51.3"
                            ></path>
                        </g>
                        <g transform="scale(1.62171)">
                            <path
                                fill="none"
                                stroke="#ffd58c"
                                strokeDasharray="none"
                                strokeLinecap="butt"
                                strokeLinejoin="miter"
                                strokeMiterlimit="10"
                                strokeOpacity="1"
                                strokeWidth="12.333"
                                d="M9046.7 16248.7h381.38l51.31 51.3"
                            ></path>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
}

export default Button;
