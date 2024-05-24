// import * as React from "react";
import type { SVGProps } from "react";
const SvgTable = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={256}
    height={256}
    className="table_svg__icon"
    viewBox="0 0 1024 1024"
    {...props}
  >
    <path
      fill="currentColor"
      d="M63.298 120.015V903.45h895.355V120.015zm335.758 503.637V455.773h223.84v167.88zm223.84 55.96v167.881h-223.84V679.611zm0-447.679v167.882h-223.84V231.933zm-279.8 0v167.882H119.259V231.933zm-223.838 223.84h223.84v167.88h-223.84zm559.598 0h223.84v167.88h-223.84zm0-55.958V231.933h223.84v167.882zM119.258 679.61h223.84v167.882h-223.84zm559.598 167.882V679.611h223.84v167.882zm0 0"
    />
  </svg>
);
export default SvgTable;
