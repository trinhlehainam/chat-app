import React, { FC } from "react";

interface Props {
    classname?: string,
    onClick?: Function,
}

const Arrow: FC<Props> = ({ classname, onClick }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="131.742"
            height="227.657"
            version="1.1"
            viewBox="0 0 34.857 60.234"
            preserveAspectRatio="none"
            className={classname}
            onClick={() => onClick && onClick()}
        >
            <g transform="translate(-87.25 -365.935)">
                <g transform="matrix(.03528 0 0 -.03528 -503.865 733.46)">
                    <g>
                        <g transform="scale(1.08679)">
                            <path
                                fill="none"
                                stroke="#ffd58c"
                                strokeDasharray="none"
                                strokeLinecap="butt"
                                strokeLinejoin="miter"
                                strokeMiterlimit="10"
                                strokeOpacity="1"
                                strokeWidth="36.806"
                                d="M15872.4 9535.87l-427.5-1085.31h140.3l287.2-287.27 287.3 287.27h140.3z"
                            ></path>
                        </g>
                        <g transform="scale(1.06815)">
                            <path
                                fill="none"
                                stroke="#ffd58c"
                                strokeDasharray="none"
                                strokeLinecap="butt"
                                strokeLinejoin="miter"
                                strokeMiterlimit="10"
                                strokeOpacity="1"
                                strokeWidth="18.724"
                                d="M16149.4 8168.11l-150.6 150.63 150.6 150.64 150.6-150.64z"
                            ></path>
                        </g>
                        <g transform="scale(1.06667)">
                            <path
                                fill="none"
                                stroke="#ffd58c"
                                strokeDasharray="none"
                                strokeLinecap="butt"
                                strokeLinejoin="miter"
                                strokeMiterlimit="10"
                                strokeOpacity="1"
                                strokeWidth="18.75"
                                d="M16043.6 8451.4l128.1 128.16 128.3-128.16"
                            ></path>
                        </g>
                        <g transform="scale(1.08427)">
                            <path
                                fill="none"
                                stroke="#ffd58c"
                                strokeDasharray="none"
                                strokeLinecap="butt"
                                strokeLinejoin="miter"
                                strokeMiterlimit="10"
                                strokeOpacity="1"
                                strokeWidth="18.446"
                                d="M15518.7 8578.77l390.6 390.58 390.7-390.58"
                            ></path>
                        </g>
                        <g transform="scale(1.07944)">
                            <path
                                fill="none"
                                stroke="#ffd58c"
                                strokeDasharray="none"
                                strokeLinecap="butt"
                                strokeLinejoin="miter"
                                strokeMiterlimit="10"
                                strokeOpacity="1"
                                strokeWidth="18.528"
                                d="M15661.1 8797.6l319.4 319.52 319.5-319.52"
                            ></path>
                        </g>
                        <g transform="scale(1.06398)">
                            <path
                                fill="none"
                                stroke="#ffd58c"
                                strokeDasharray="none"
                                strokeLinecap="butt"
                                strokeLinejoin="miter"
                                strokeMiterlimit="10"
                                strokeOpacity="1"
                                strokeWidth="18.797"
                                d="M16300 8514.05v537.51"
                            ></path>
                        </g>
                        <g transform="scale(1.06849)">
                            <path
                                fill="none"
                                stroke="#ffd58c"
                                strokeDasharray="none"
                                strokeLinecap="butt"
                                strokeLinejoin="miter"
                                strokeMiterlimit="10"
                                strokeOpacity="1"
                                strokeWidth="18.718"
                                d="M16300 8458.84v493.22"
                            ></path>
                        </g>
                        <g transform="scale(1.05259)">
                            <path
                                fill="none"
                                stroke="#ffd58c"
                                strokeDasharray="none"
                                strokeLinecap="butt"
                                strokeLinejoin="miter"
                                strokeMiterlimit="10"
                                strokeOpacity="1"
                                strokeWidth="19.001"
                                d="M16300 8606.21v543.32"
                            ></path>
                        </g>
                        <g transform="scale(1.04808)">
                            <path
                                fill="none"
                                stroke="#ffd58c"
                                strokeDasharray="none"
                                strokeLinecap="butt"
                                strokeLinejoin="miter"
                                strokeMiterlimit="10"
                                strokeOpacity="1"
                                strokeWidth="19.082"
                                d="M16300 8623.58v502.82"
                            ></path>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
}

export default Arrow;
