import type * as React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const Layout = ({ children, className = "" }: Props) => {
  return (
    <main
      className={`px-4 p-5 container mx-auto max-w-[1000px] ${className}`}
    >
      {children}
    </main>
  );
};
