import React, { FC } from "react";

interface Props {
    classname: string,
};

const CancelMark: FC<Props> = ({classname}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0"
            y="0"
            enableBackground="new 0 0 490.29 490.29"
            version="1.1"
            viewBox="0 0 490.29 490.29"
            xmlSpace="preserve"
            preserveAspectRatio="none"
            className={classname}
        >
            <path
                d="M206.343 -62.678H283.74199999999996V552.916H206.343z"
                transform="rotate(134.999 245.045 245.12)"
            ></path>
            <path
                d="M-9.144 335.976H240.154V413.375H-9.144z"
                transform="rotate(-45.001 115.501 374.68)"
            ></path>
            <path
                d="M250.136 77.228H499.43399999999997V154.627H250.136z"
                transform="rotate(134.999 374.787 115.928)"
            ></path>
        </svg>
    );
}

export default CancelMark;
