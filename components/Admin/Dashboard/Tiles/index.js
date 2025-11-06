import React from 'react';
import Image from 'next/image';
import MoresIcon from '../../../../assets/logo/logo-icon.svg'
import {ADMIN_MODULE} from '@/textV2';
const {headings}=ADMIN_MODULE?.ADMIN_DASHBOARD_PAGE
const Tile = ({ title, count, backgroundColor }) => {
    return (
        <>
            {title === headings?.associates? (
                <div className='flex flex-col justify-center items-center  bg-[#EAFCFF] p-2 pb-2  w-52 capitalize rounded-lg border'>
                    <div className="flex items-center">
                        <span className='flex gap-2'>
                            <Image width={14} height={14} src={MoresIcon} alt="MoresIcon" />
                            <div className='pr-2'> <h3 className='font-semibold'>{headings?.associates}</h3></div>
                        </span>
                    </div>
                    <div className="tile-count"><h2>{count}</h2></div>
                </div>
            ) : (
                <div className={`flex flex-col items-center justify-center  whitespace-nowrap border p-4 pb-2 w-52 capitalize  rounded-lg`}
                    style={{ backgroundColor }}> <h3 className="  font-semibold ">{title}</h3>
                    <h2 className="tile-count font-bold mb-2">{count}</h2>
                </div>
            )}
        </>
    );
}
module.exports = Tile