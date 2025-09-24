import Image from "next/image";
import React from "react";

export default function MainLogo({
  height,
  width,
}: {
  height?: number;
  width?: number;
}) {
  return (
    <Image
      src={"/main-logo.png"}
      alt="Main-logo"
      className="rounded-full"
      height={height || 50}
      width={width || 50}
    />
  );
}
