// src/components/Icons/IconHamburger.tsx
import React from "react";

const IconLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="55"
    height="64"
    viewBox="0 0 55 64"
    fill="none"
    {...props}
  >
    <path
      d="M54.9997 0.571533H47.1426V63.4287H54.9997V0.571533Z"
      fill="#4E4E50"
    />
    <path
      d="M39.2854 16.2859H31.4282V63.4287H39.2854V16.2859Z"
      fill="#4E4E50"
    />
    <path d="M23.5715 32H15.7144V63.4286H23.5715V32Z" fill="#4E4E50" />
    <path d="M7.85714 47.7144H0V63.4286H7.85714V47.7144Z" fill="#4E4E50" />
  </svg>
);

export default IconLogo;
