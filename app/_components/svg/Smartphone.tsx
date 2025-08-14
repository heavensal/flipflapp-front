const Smartphone = () => {
  return (
    <svg
      className="h-24 -rotate-25"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 7c0-1.886 0-2.828.586-3.414S8.114 3 10 3h4c1.886 0 2.828 0 3.414.586S18 5.114 18 7v10c0 1.886 0 2.828-.586 3.414S15.886 21 14 21h-4c-1.886 0-2.828 0-3.414-.586S6 18.886 6 17zm3.5-2a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5M12 19a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
        fill="#33363F"
      />
      <defs>
        <linearGradient
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
          id="b"
        >
          <stop stopColor="#FFC923" offset="0%" />
          <stop stopColor="#FFAD41" offset="100%" />
        </linearGradient>
        <linearGradient
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
          id="c"
        >
          <stop stopColor="#FE9F15" offset="0%" />
          <stop stopColor="#FFB03C" offset="100%" />
        </linearGradient>
        <linearGradient
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
          id="d"
        >
          <stop stopColor="#FFB637" offset="0%" />
          <stop stopColor="#FFBE2F" offset="100%" />
        </linearGradient>
        <linearGradient
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
          id="e"
        >
          <stop stopColor="#FFC226" offset="0%" />
          <stop stopColor="#FFE825" offset="100%" />
        </linearGradient>
        <linearGradient
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
          id="f"
        >
          <stop stopColor="#EB2E2E" offset="0%" />
          <stop stopColor="#D71919" offset="100%" />
        </linearGradient>
        <clipPath id="a">
          <rect
            x="7"
            y="5.3"
            width="10"
            height="13.4"
            rx="1.4"
            ry="1.4"
          />
        </clipPath>
      </defs>
      <g clipPath="url(#a)">
        <g transform="matrix(.2 0 0 .2 9 8.6)">
          <path
            d="M26 24.69V14c0-6.075-4.925-11-11-11S4 7.925 4 14v10.69z"
            fill="url(#b)"
          />
          <path
            d="M26.5 23a3.5 3.5 0 0 1 0 7h-23a3.5 3.5 0 0 1 0-7z"
            fill="url(#c)"
          />
          <path
            d="M21 34a6 6 0 1 0-12 0z"
            fill="url(#d)"
            transform="rotate(-180 15 31)"
          />
          <path
            d="M17 0h-6v1.563a3.5 3.5 0 0 0 3.5 3.5h1a3.5 3.5 0 0 0 3.5-3.5V0z"
            fill="url(#e)"
            transform="rotate(-180 15 2.531)"
          />
          <circle
            cx="24"
            cy="5.5"
            r="5"
            fill="url(#f)"
          />
        </g>
      </g>
    </svg>
  );
};

export default Smartphone;
