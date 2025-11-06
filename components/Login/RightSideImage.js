import React from "react";
import RightSideSvg from "@/pages/register/assets/left-side-image.svg";
import Image from "next/image";

const RightSideImage = ({
  src = RightSideSvg,
  alt = "right-side-image",
}) => {
  return <Image src={src} alt={alt}  />;
};

export default RightSideImage;
