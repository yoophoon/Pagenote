// import * as React from "react";
import type { SVGProps } from "react";
const SvgLink = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={256}
    height={256}
    className="Link_svg__icon"
    viewBox="0 0 1024 1024"
    {...props}
  >
    <path
      fill="currentColor"
      d="m977.423 372.087-290.841 290.84c-1.344 1.345-3.008 2.273-4.352 3.553-2.176 2.4-4.128 4.928-6.4 7.264l-1.12-1.12a182.11 182.11 0 0 1-225.147 5.247 34.4 34.4 0 0 1-6.24-4.127l-3.68-3.712-39.134-39.135-26.912-26.912a32.863 32.863 0 0 1 46.495-46.495l23.232 23.232.512-.512c1.088 1.28 1.92 2.976 3.2 4.192l39.167 39.103a118.4 118.4 0 0 0 153.852-7.072l81.598-81.598 209.21-209.21a104.413 104.413 0 0 0-3.04-143.805L842.29 96.222a104.477 104.477 0 0 0-143.997-3.2l-22.623 22.623-69.598 69.95a32.895 32.895 0 0 1-46.527-46.494l69.726-69.727 22.656-22.655a169.756 169.756 0 0 1 236.794 3.2l85.534 85.566a169.596 169.596 0 0 1 3.168 236.602m-348.12 22.623 23.263 23.264a32.863 32.863 0 1 1-46.494 46.495l-23.264-23.264-46.495-46.495a98.75 98.75 0 0 0-139.484 0L94.596 696.943a98.72 98.72 0 0 0 0 139.485l92.99 92.99a98.78 98.78 0 0 0 139.516 0l23.264-23.264 69.758-69.726a32.895 32.895 0 0 1 46.495 46.526l-69.758 69.695-23.232 23.263a164.604 164.604 0 0 1-232.538 0l-93.022-92.99a164.57 164.57 0 0 1 0-232.474l302.233-302.264a164.54 164.54 0 0 1 232.442 0z"
    />
  </svg>
);
export default SvgLink;