import React from "react";
import { HERO_TEXT } from "@/textV2";

export default function Hero() {
  return (
    <div className="space-y-6 text-gray-700 text-base leading-loose">
      {HERO_TEXT.paragraphs.map((para, index) => (
        <p key={index}>{para}</p>
      ))}
    </div>
  );
}
