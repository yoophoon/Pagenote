import type { SVGProps } from "react";
const SvgMarkdown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={256}
    height={256}
    className="markdown_svg__icon"
    viewBox="0 0 1024 1024"
    {...props}
  >
    <path d="M85.333 682.667V341.333h85.334l128 128 128-128H512v341.334h-85.333V462.08l-128 128-128-128v220.587zm597.334-341.334h128V512h106.666L746.667 704 576 512h106.667z" />
  </svg>
);
export default SvgMarkdown;
