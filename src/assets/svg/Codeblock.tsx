// import * as React from "react";
import type { SVGProps } from "react";
const SvgCodeblock = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={256}
    height={256}
    className="codeblock_svg__icon"
    viewBox="0 0 1024 1024"
    {...props}
  >
    <path
      fill="currentColor"
      d="m438.4 849.1 222.7-646.7c.2-.5.3-1.1.4-1.6zm222.8-680.4h-67.5c-3.4 0-6.5 2.2-7.6 5.4L354.7 846c-.3.8-.4 1.7-.4 2.6 0 4.4 3.6 8 8 8h67.8c3.4 0 6.5-2.2 7.6-5.4l.7-2.1 223.1-648.3 7.4-21.4c.3-.8.4-1.7.4-2.6-.1-4.5-3.6-8.1-8.1-8.1m293.4 333.4q-1.2-1.5-2.7-2.7l-219-171.3c-3.5-2.7-8.5-2.1-11.2 1.4-1.1 1.4-1.7 3.1-1.7 4.9v81.3c0 2.5 1.1 4.8 3.1 6.3l115 90-115 90c-1.9 1.5-3.1 3.8-3.1 6.3v81.3c0 4.4 3.6 8 8 8 1.8 0 3.5-.6 4.9-1.7l219-171.3c6.9-5.4 8.2-15.5 2.7-22.5m-663.5-174-219 171.3q-1.5 1.2-2.7 2.7c-5.4 7-4.2 17 2.7 22.5l219 171.3c1.4 1.1 3.1 1.7 4.9 1.7 4.4 0 8-3.6 8-8v-81.3c0-2.5-1.1-4.8-3.1-6.3l-115-90 115-90c1.9-1.5 3.1-3.8 3.1-6.3v-81.3c0-1.8-.6-3.5-1.7-4.9-2.7-3.5-7.7-4.1-11.2-1.4"
    />
  </svg>
);
export default SvgCodeblock;
