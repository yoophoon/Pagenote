// import * as React from "react";
import type { SVGProps } from "react";
const SvgHead = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={256}
    height={256}
    className="Head_svg__icon"
    viewBox="0 0 1024 1024"
    {...props}
  >
    <path
      fill="currentColor"
      d="M235.5 871.691v-740h98v304h385v-304h98v740h-98v-349h-385v349z"
    />
  </svg>
);
export default SvgHead;
