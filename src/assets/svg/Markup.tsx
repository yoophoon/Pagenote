import type { SVGProps } from "react";
const SvgMarkup = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={256}
    height={256}
    className="markup_svg__icon"
    viewBox="0 0 1024 1024"
    {...props}
  >
    <path d="M85.333 682.667V341.333h85.334l128 128 128-128H512v341.334h-85.333V462.08l-128 128-128-128v220.587zM810.667 682h-128V511.333H576l170.667-192 170.666 192H810.667z" />
  </svg>
);
export default SvgMarkup;
