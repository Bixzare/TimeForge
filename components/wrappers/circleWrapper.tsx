import * as React from "react";

export default function CircleWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex size-full items-center justify-center">
      <div className="relative w-full bg-primary rounded-full">{children}</div>
    </div>
  );
}
