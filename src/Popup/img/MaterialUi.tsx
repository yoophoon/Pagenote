// import * as React from "react";
import type { SVGProps } from "react";
const SvgMaterialUi = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={256}
    height={256}
    className="material-ui_svg__icon"
    viewBox="0 0 1024 1024"
    {...props}
  >
    <path
      fill="currentColor"
      d="M341.333 708.693v-52.906l256-147.627V308.48L384 431.787 170.667 308.48v246.187L128 579.413l-42.667-24.746V213.333l45.654-26.453L384 333.227l167.68-96.854 85.333-49.493 45.654 26.453v343.894L465.92 682.667l172.8 99.413 214.613-123.733V469.333L896 444.587l42.667 24.746v238.08L638.72 880.64zM938.667 416 896 440.747 853.333 416v-49.92L896 341.333l42.667 24.747z"
    />
  </svg>
);
export default SvgMaterialUi;
