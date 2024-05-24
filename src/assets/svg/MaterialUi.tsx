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
      d="M0 105.6v443.307l128 73.941V327.253l256 147.84 256-147.84v147.84L384 622.848v147.797L640 918.4l384-221.653V401.152l-128 73.941v147.755L640 770.645l-128-73.898 256-147.84V105.6L384 327.253zm1024 0-128 73.813v147.84l128-73.898V105.557z"
    />
  </svg>
);
export default SvgMaterialUi;
