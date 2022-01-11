import { FC } from "react";

interface Props {
    classname: string
}

const RoomTitleBorderBottom: FC<Props> = ({classname}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="322.737"
            height="57.355"
            version="1.1"
            viewBox="0 0 85.391 15.175"
            preserveAspectRatio="none"
            className={classname}
        >
            <g transform="translate(102.487 -273.925)">
                <g transform="matrix(.03528 0 0 -.03528 -648.21 873.441)">
                    <g>
                        <g transform="scale(1.03618)">
                            <path
                                fill="none"
                                stroke="#ffd58c"
                                strokeDasharray="none"
                                strokeLinecap="butt"
                                strokeLinejoin="miter"
                                strokeMiterlimit="10"
                                strokeOpacity="1"
                                strokeWidth="12.302"
                                d="M16271.8 16300v-126l-174.7-174.7-174.5 174.7v126"
                            ></path>
                        </g>
                        <g transform="scale(1.04136)">
                            <path
                                fill="none"
                                stroke="#ffd58c"
                                strokeDasharray="none"
                                strokeLinecap="butt"
                                strokeLinejoin="miter"
                                strokeMiterlimit="10"
                                strokeOpacity="1"
                                strokeWidth="12.206"
                                d="M15673.1 16300l169.7-169.7"
                            ></path>
                        </g>
                        <g transform="scale(1.04527)">
                            <path
                                fill="none"
                                stroke="#ffd58c"
                                strokeDasharray="none"
                                strokeLinecap="butt"
                                strokeLinejoin="miter"
                                strokeMiterlimit="10"
                                strokeOpacity="1"
                                strokeWidth="12.134"
                                d="M16130.9 16070l169.1 169.1"
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
                                d="M14293.7 15483l-68.8-68.9h-96.3v68.9h843l77.7-77.6 165-165 165.1 165.1 77.5 77.5h843.1v-68.9h-96.2l-68.9 68.9"
                            ></path>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
}

export default RoomTitleBorderBottom;
