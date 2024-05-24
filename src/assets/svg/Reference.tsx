// import * as React from "react";
import type { SVGProps } from "react";
const SvgReference = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={256}
    height={256}
    className="reference_svg__icon"
    viewBox="0 0 1024 1024"
    {...props}
  >
    <path
      fill="currentColor"
      d="M65.28 60.373a32 32 0 0 1 34.347-3.669L952.96 483.371a32 32 0 0 1 0 57.258L99.627 967.296a32 32 0 0 1-45.355-36.395l85.333-341.333a32 32 0 0 1 23.296-23.296L380.075 512 162.9 457.728a32 32 0 0 1-23.296-23.296L54.272 93.099a32 32 0 0 1 11.05-32.726zm68.01 84.694 63.787 255.232 322.731 80.64a32 32 0 0 1 0 62.122l-322.73 80.64-63.83 255.232L867.115 512 133.248 145.067z"
    />
  </svg>
);
export default SvgReference;
