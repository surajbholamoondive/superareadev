import Image from "next/image";
import React from "react";
import Missions from "../../assets/AboutPage/Missions.png";
import Vision from "../../assets/AboutPage/shared-vision.png";
import Values from "../../assets/AboutPage/Values.png";

export const mvData = [
  {
    icon: Missions,
    title: "Mission",
    description:
      "Our Mission is to transform the traditional real estate through AI-powered intelligence, offering users fast, transparent, and verified property solutions that redefine the way India discovers, assesses, and engages with real estate.",
  },
  {
    icon: Vision,
    title: "Vision",
    description:
      "Our vision is to become India's go-to platform for simplifying property decisions through an intelligent AI-powered system that delivers real-time data and smart tools while offering simple solutions and a smooth and confident experience for every property seeker.",
  },
  {
    icon: Values,
    title: "Values",
    description:
      "Innovation, clarity, and disruption drive us. We believe in challenging norms, using technology responsibly, and making real estate accessible, fair, and smarter for all through continuous learning and AI excellence.",
  },
];

export default function MvData() {
  return (
    <div className="flex justify-center w-full px-4">
      <div
        className="
          grid grid-cols-1 
          md:grid-cols-3  
          gap-8 md:gap-12 
          w-full md:w-[90%] lg:w-[80%] xl:w-[75%] 2xl:w-[70%]
          place-items-center
        "
      >
        {mvData.map((item, index) => (
          <div
            key={index}
            className="p-6 border border-dashed border-red-500 rounded-2xl text-center transition duration-300 
                       w-full sm:w-[300px] h-auto min-h-[400px] flex flex-col items-center justify-start bg-white"
          >
            {item.icon && (
              <div className="flex justify-center mb-4">
                <Image
                  src={item.icon}
                  alt={item.title}
                  className="w-12 h-16 object-contain"
                />
              </div>
            )}
            <h3 className="text-xl font-semibold mb-6">{item.title}</h3>
            <div className="max-w-[320px] mx-auto">
              <p className="text-gray-600 leading-loose text-base">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
