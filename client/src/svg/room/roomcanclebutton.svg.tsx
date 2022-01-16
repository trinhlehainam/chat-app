import { FC } from "react";

interface Props {
    classname: string
    onClick?: Function
}

const RoomCancelButton: FC<Props> = ({ classname, onClick }) => {

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="268.824"
            height="268.827"
            version="1.1"
            viewBox="0 0 71.126 71.127"
            preserveAspectRatio="none"
            className={classname}
            onClick={() => onClick && onClick()}
        >
            <defs>
                <radialGradient id="my-gradient">
                    <stop offset="0%" stopColor="#e66465" />
                    <stop offset="100%" stopColor="#9198e5" />
                </radialGradient>
            </defs>
            <g transform="translate(592.125 -323.404)">
                <g transform="matrix(.03528 0 0 -.03528 -648.21 873.441)">
                    <g
                        fill="none"
                        stroke="#ffd58c"
                        strokeDasharray="none"
                        strokeLinecap="butt"
                        strokeLinejoin="miter"
                        strokeMiterlimit="10"
                        strokeOpacity="1"
                    >
                        <path
                            strokeWidth="40"
                            d="M3586 14583.5c0-545.7-442.38-988.1-988.09-988.1-545.7 0-988.09 442.4-988.09 988.1s442.39 988.1 988.09 988.1c545.71 0 988.09-442.4 988.09-988.1z"
                        ></path>
                        <path
                            strokeWidth="20"
                            d="M2313.3 15463.9c89.66 29 185.31 44.6 284.61 44.6 99.3 0 194.94-15.6 284.59-44.6"
                        ></path>
                        <path
                            strokeWidth="20"
                            d="M1632.41 14794.4h99.49c72.2 297.8 294 537.1 581.4 633.9v101.6"
                        ></path>
                        <path
                            strokeWidth="20"
                            d="M3463.9 14794.4h99.52-99.52c-72.2 297.8-294 537.1-581.4 633.9v101.6"
                        ></path>
                        <path strokeWidth="20" d="M3452.22 14837.8h101.67"></path>
                        <path strokeWidth="20" d="M1743.6 14837.8h-101.67"></path>
                        <path
                            strokeWidth="20"
                            d="M2313.3 13703c89.66-28.9 185.31-44.6 284.61-44.6 99.3 0 194.94 15.7 284.59 44.6"
                        ></path>
                        <path
                            strokeWidth="20"
                            d="M1632.41 14372.5h99.49c72.2-297.8 294-537.1 581.4-633.9V13637"
                        ></path>
                        <path
                            strokeWidth="20"
                            d="M3463.9 14372.5h99.52-99.52c-72.2-297.8-294-537.1-581.4-633.9V13637"
                        ></path>
                        <path
                            strokeWidth="20"
                            d="M1632.41 14794.4h99.49c72.2 297.8 294 537.1 581.4 633.9v101.6"
                        ></path>
                        <path
                            strokeWidth="20"
                            d="M3463.9 14794.4h99.52-99.52c-72.2 297.8-294 537.1-581.4 633.9v101.6"
                        ></path>
                        <path
                            strokeWidth="20"
                            d="M1632.41 14372.5h99.49c72.2-297.8 294-537.1 581.4-633.9V13637"
                        ></path>
                        <path
                            strokeWidth="20"
                            d="M3463.9 14372.5h99.52-99.52c-72.2-297.8-294-537.1-581.4-633.9V13637"
                        ></path>
                        <path strokeWidth="20" d="M3452.22 14329.2h101.67"></path>
                        <path strokeWidth="20" d="M1743.6 14329.2h-101.67"></path>
                    </g>
                </g>
            </g>
        </svg>
    );
}

export default RoomCancelButton;
