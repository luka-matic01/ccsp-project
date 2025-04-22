// src/components/Icons/IconHamburger.tsx
import React from "react";

const IconHamburger = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="18"
    viewBox="0 0 32 18"
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M32 2H0V0H32V2Z"
      fill="#154B50"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19 10L-1.74846e-07 10L0 8L19 8L19 10Z"
      fill="#0B828A"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M32 18H0V16H32V18Z"
      fill="#154B50"
    />
  </svg>
);

export default IconHamburger;
