import React from "react";
import footer_image from "../../pages/register/assets/image-removebg-preview.svg"
import Image from "next/image";


const FooterImageFullSize = ({ src=footer_image, alt="footer-image",height, width }) => {
  return (
      <Image
        className={`h-${height} w-${width}`}
        src={src}
        alt={alt}
      />
  );
};

export default FooterImageFullSize;
