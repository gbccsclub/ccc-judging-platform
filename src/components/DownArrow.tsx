export default function DownArrow() {
    return <>
        {/* SVG curved arrow */}
        <svg
            width="60"
            height="40"
            viewBox="0 0 60 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute bottom-[-35px] left-5"
        >
            <path
                d="M40 5 Q 30 10 35 35"
                stroke="#D0D0D0"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                className="animate-draw"
            />
            {/* Arrow head */}
            <path
                d="M30 30 L 35 35 L 40 30"
                stroke="#D0D0D0"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
            />
        </svg>
    </>;
}