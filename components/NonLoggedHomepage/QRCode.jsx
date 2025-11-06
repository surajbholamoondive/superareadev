"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import QRCode from "../../assets/NonLoggedUserImages/QRCode.png";
import { NON_LOGGED_USER_TEXT } from "@/textV2";

const { text } = NON_LOGGED_USER_TEXT;

const QR = () => {
  const [isAboveFooter, setIsAboveFooter] = useState(true);
  const qrRef = useRef(null);
  useEffect(() => {
    const footer = document.getElementById("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsAboveFooter(!entry.isIntersecting);
      },
      { root: null, threshold: 0.1 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={qrRef}
      className={`p-2 pb-1 bg-[#ffffff77] shadow-sm rounded-md gap-1 md:flex flex-col items-center z-[999] transition-all duration-300
        ${isAboveFooter ? "fixed bottom-10 left-5" : "absolute bottom-[80px] left-5"}`}
    >
      <Image src={QRCode} width={90} height={90} className="2xl:w-[140px]" alt={text.scanToDownload} />
      <p className="text-[11px]">{text.scanToDownload}</p>
    </div>
  );
};

export default QR;
