import * as React from "react";

// https://react-svgr.com/playground/
export const Logo = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={100}
    height={50}
    viewBox="0 0 200 100"
    {...props}
  >
    <path d="M50 50 20 10l60 40ZM150 50l30-40-60 40Z" />
  </svg>
);
