import React from "react";

const IconButton = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
    {...props}
  >
    <path
      d="M8.44551 0.470506C8.73794 0.177152 9.21281 0.176403 9.50617 0.468835C9.79952 0.761266 9.80027 1.23614 9.50784 1.52949L8.44551 0.470506ZM9.50784 1.52949L1.53302 9.52949L0.470686 8.47051L8.44551 0.470506L9.50784 1.52949Z"
      fill="#F9FCFC"
    />
    <path d="M9 8.99329V1H1.0322" stroke="#F9FCFC" strokeWidth="1.5" />
  </svg>
);

export default IconButton;
