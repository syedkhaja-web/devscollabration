import type { SVGProps } from 'react';

export const DevsTecIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M10 20.5 3.5 14a2.35 2.35 0 0 1 0-3L10 4.5" />
    <path d="M14 20.5 20.5 14a2.35 2.35 0 0 0 0-3L14 4.5" />
  </svg>
);
