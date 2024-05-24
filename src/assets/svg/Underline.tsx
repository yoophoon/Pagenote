// import * as React from "react";
import type { SVGProps } from "react";
const SvgUnderline = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={256}
    height={256}
    className="underline_svg__icon"
    viewBox="0 0 1024 1024"
    {...props}
  >
    <path
      fill="currentColor"
      d="M934.4 978.432H89.6a46.08 46.08 0 0 1-46.933-46.933c0-26.624 20.352-46.934 46.933-46.934h844.8c26.581 0 46.933 20.31 46.933 46.934 0 26.581-20.352 46.933-46.933 46.933M512 828.245A332.5 332.5 0 0 1 178.773 495.02V88.235c0-26.582 20.352-46.934 46.934-46.934s46.933 20.352 46.933 46.934v406.784c0 131.413 107.947 239.36 239.36 239.36a239.36 239.36 0 0 0 239.36-239.36V88.235c0-26.582 20.352-46.934 46.933-46.934 26.582 0 46.934 20.352 46.934 46.934v406.784c0 184.576-150.187 333.226-333.227 333.226"
    />
  </svg>
);
export default SvgUnderline;
