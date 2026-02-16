export default function ReturnSvg({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className}`}
    >
      <path
        d="M12.8412 13.5V11.3333C12.8412 11.0572 12.6174 10.8333 12.3412 10.8333H10.1745M3.16667 2.5V4.66667C3.16667 4.94281 3.39053 5.16667 3.66667 5.16667H5.83333M2.54255 7.31253C2.51447 7.53773 2.5 7.7672 2.5 8C2.5 11.0375 4.96243 13.5 8 13.5C9.7844 13.5 11.4074 12.6503 12.4215 11.3333M13.4575 8.68747C13.4855 8.46227 13.5 8.2328 13.5 8C13.5 4.96243 11.0375 2.5 8 2.5C6.21561 2.5 4.59258 3.34975 3.57856 4.66667"
        stroke="#278EFF"
        strokeOpacity="0.3"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
