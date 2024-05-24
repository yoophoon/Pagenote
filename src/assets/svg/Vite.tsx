// import * as React from "react";
import type { SVGProps } from "react";
const SvgVite = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={256}
    height={256}
    className="vite_svg__icon"
    viewBox="0 0 1024 1024"
    {...props}
  >
    <path
      fill="currentColor"
      d="m987.78 116.55-277.424 50.566L758.564 0 373.58 75.436l-5.998 101.28L30.29 116.428c-23.23-1.352-36.766 15.33-27.174 38.492l488.112 855.965c10.506 17.15 34.694 17.82 45.3 0l478.622-856.047c10.8-19.352-5.748-42.036-27.37-38.288m-474 870.87L35.74 149.111l329.986 58.982-15.556 262.73 135.264-31.216-37.716 184.687 102.748-31.216-50.99 246.794c-2.54 16.138 18.482 24.724 28.88 1.624l300.44-599.583-148.27 28.616 20.172-69.924 281.82-51.368z"
    />
  </svg>
);
export default SvgVite;
