"use client"
import Styles from './index.module.css'
import { GLOBALLY_COMMON_TEXT } from '@/textV2';
const {privacyPolicyText}=GLOBALLY_COMMON_TEXT.text
const Banner = () => {
  return (
    <div
      className={`relative bg-cover bg-center text-white text-center h-32 ${Styles.image}`}
    >
      <div className="absolute inset-0"></div>

      <div className="absolute inset-0 flex flex-col justify-center items-center">
        
        <h1 className="text-3xl font-semibold p-1 px-8 absolute z-10">{privacyPolicyText}</h1>
        <div className="bg-slate-600 opacity-70 rounded-3xl h-10 w-40 "></div>
        
      </div>
    </div>
  );
};
export default Banner