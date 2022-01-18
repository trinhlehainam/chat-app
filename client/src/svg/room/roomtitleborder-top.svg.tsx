import { FC } from "react";

interface Props {
    classname: string
}

const  TitleBorderTop: FC<Props> = ({classname}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="322.737"
            height="57.377"
            version="1.1"
            viewBox="0 0 85.391 15.181"
            preserveAspectRatio="none"
            className={classname}
        >
            <g transform="translate(102.487 -243.966)">
                <g transform="matrix(.03528 0 0 -.03528 -648.21 873.441)">
                    <g>
                        <g transform="scale(1.09382)">
                            <path
                                fill="none"
                                stroke="#ffd58c"
                                strokeDasharray="none"
                                strokeLinecap="butt"
                                strokeLinejoin="miter"
                                strokeMiterlimit="10"
                                strokeOpacity="1"
                                strokeWidth="12.285"
                                d="M15083.6 16015.1v119.4l165.5 165.5 165.4-165.5v-119.4"
                            ></path>
                        </g>
                        <g transform="scale(1.08036)">
                            <path
                                fill="none"
                                stroke="#ffd58c"
                                strokeDasharray="none"
                                strokeLinecap="butt"
                                strokeLinejoin="miter"
                                strokeMiterlimit="10"
                                strokeOpacity="1"
                                strokeWidth="12.512"
                                d="M15770.6 16136.4l-163.5 163.6"
                            ></path>
                        </g>
                        <g transform="scale(1.08036)">
                            <path
                                fill="none"
                                stroke="#ffd58c"
                                strokeDasharray="none"
                                strokeLinecap="butt"
                                strokeLinejoin="miter"
                                strokeMiterlimit="10"
                                strokeOpacity="1"
                                strokeWidth="12.512"
                                d="M15271 16300l-163.6-163.6"
                            ></path>
                        </g>
                        <g transform="scale(1.09631)">
                            <path
                                fill="none"
                                stroke="#ffd58c"
                                strokeDasharray="none"
                                strokeLinecap="butt"
                                strokeLinejoin="miter"
                                strokeMiterlimit="10"
                                strokeOpacity="1"
                                strokeWidth="16.486"
                                d="M16134.9 15901.6l68.9 68.9h96.2v-68.9h-843l-77.6 77.6-165 165-165.1-165.1-77.6-77.5h-843.1v68.9h96.3l68.8-68.9"
                            ></path>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
}

export default TitleBorderTop;
