import * as React from "react";

const MailIcon = ({color='none' , height="16", width="16"}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill='none'
    viewBox="0 0 24 24"
  >
    <g id="ic:baseline-email">
      <path
        id="Vector"
        fill='none'
        stroke={color}
        d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 4-8 5-8-5V6l8 5 8-5z"
      ></path>
    </g>
  </svg>
);

export default MailIcon;
