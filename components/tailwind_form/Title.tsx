import React from "react";

export default function Title({
  className,
  text,
}: {
  className?: string;
  text: string;
}) {
  return (
    <h2
      className={
        className
          ? className
          : "text-base font-semibold leading-7 text-gray-900"
      }
    >
      {text}
    </h2>
  );
}
