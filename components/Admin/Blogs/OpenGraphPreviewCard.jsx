import React from "react";
import Image from "next/image";
const OpenGraphPreviewCard = ({ title, description, image }) => {
  return (
    <div className="max-w-[510px] h-36 rounded overflow-hidden flex shadow-md border border-gray-200">
      {image && (
        <div className="relative w-[160px] h-36">
          <Image
            src={image}
            alt="Open Graph"
            layout="fill"
            objectFit="cover"
            className="rounded-l"
          />
        </div>
      )}
      <div className="px-3 w-[380px] pt-1 bg-gray-50">
        <div className="h-[75%]">
          <p className="font-bold mb-1">{title}</p>
          <p className="text-gray-700 w-full text-xs mb-2 h-15">{description}</p>
        </div>
        <p className="mt-3 text-sm ">https://superarea.ai</p>
      </div>
    </div>
  );
};
export default OpenGraphPreviewCard;
