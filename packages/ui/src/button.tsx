
"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  appName?: string;
  variant?: "default" | "secondary" | "ghost" | "outline" | "link";
  size?: "lg" | "md";
}


export const Button = ({
  children,
  className ,
  appName,
  variant,
  size ,
}: ButtonProps) => {
  return (
    <button
      className={` size=${size} ${variant}  size=${size} ${className}`}
      onClick={() => appName && alert(`Hello from your ${appName} app!`)}
    >
      {children}
    </button>
  );
};
