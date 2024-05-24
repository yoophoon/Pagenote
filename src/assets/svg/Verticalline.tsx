// import * as React from "react";
import type { SVGProps } from "react";
const SvgVerticalline = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={256}
    height={256}
    className="verticalline_svg__icon"
    viewBox="0 0 1024 1024"
    {...props}
  >
    <path
      fill="currentColor"
      d="M544 0c21.312 0 32 10.688 32 32v960c0 21.312-10.688 32-32 32s-32-10.688-32-32V32c0-21.312 10.688-32 32-32"
    />
  </svg>
);
export default SvgVerticalline;
