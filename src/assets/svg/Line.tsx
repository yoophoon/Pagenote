// import * as React from "react";
import type { SVGProps } from "react";
const SvgLine = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={256}
    height={256}
    className="line_svg__icon"
    viewBox="0 0 1024 1024"
    {...props}
  >
    <path d="M904 476H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8" />
  </svg>
);
export default SvgLine;
