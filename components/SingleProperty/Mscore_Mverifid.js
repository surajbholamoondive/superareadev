import React from 'react'
import mVerified from '../../assets/moreIcon/badge.svg'
import MScore from '../../assets/moreIcon/M.svg'
import Image from 'next/image';
import Styles from "./index.module.css"
 
export default function Mscore_Mverifid({ Data }) {
    return (
        <div className='flex lg:justify-start lg:gap-[50px] justify-between gap-[150px]  lg:text-lg md:text-lg text-sm my-2 ml-3'>
            <div className={`${Styles.Mscore_Mverifid}`}>
                <div className='flex text-[13px]'>
                    <Image
                        className="bg-contain lg:ml-3 md:mr-2 h-[33px] max-md:h-[20px] max-md:mt-1 "
                        src={mVerified}
                        alt="Mores M-verified"
                        height={35}
                        width={35}
                    />
                   
                    <h2 className='font-semibold text-[13px]  max-md:text-xs max-md:mt-[6px]  mt-1 text-primary'>{Data?.propertyType && Data.propertyType.charAt(0).toUpperCase() + Data.propertyType.slice(1).toLowerCase()}</h2>
                </div>
            </div>
            <div className='flex gap-1 bg-[#9316020f] rounded-full px-6 max-md:px-2 py-1 max-md:py-[3px]'>
                <Image
                    className="bg-contain h-[25px] max-md:h-[15px] max-md:mt-[3px]"
                    src={MScore}
                    alt="Mores M-verified"
                    height={10}
                    width={20}
                />
                <h2 className='text-[#9316020f] text-[14px] font-bold max-md:text-[10px]'>100</h2>
            </div>
        </div>
    )
}