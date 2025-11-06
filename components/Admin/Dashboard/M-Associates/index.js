import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import MoresIcon from '../../../../assets/logo/logo-icon.svg'
import LeadsTable from './Table';
import { ADMIN_MODULE, ADMIN_DASHBOARD_TEXT } from '@/textV2';
const { headings, text } = ADMIN_MODULE?.ADMIN_DASHBOARD_PAGE
const Massociates = ({ data }) => {
    const [associates, setAssociates] = useState([]);
    const { mAssociateRoute } = ADMIN_DASHBOARD_TEXT.routes
    useEffect(() => {
        setAssociates(data || []);
    }, [data]);
    const router = useRouter();
    const { city, days } = router.query

    const handleClick = () => {
        let path = mAssociateRoute;
        if (city || days) {
            path += `?city=${city}&days=${days}`;
        }
        router.push(path);
    };

    return (
        <div className="top-associates mt-9">
            <div className="top-header flex items-center justify-between  py-2">
                <div className='flex gap-1'>
                    <h2 className="  ml-8 text-primary" >{text.top}</h2>
                    <Image src={MoresIcon} height={14} width={14} alt='MoresIcon' />
                    <h2 className="  text-primary mt-[1.5px]" >{headings.associates}</h2>
                </div>
                <div className=''>
                    <button onClick={handleClick} className=" mr-[32px]  underline text-[#0168A2]">
                        {text.viewAll}
                    </button>
                </div>
            </div>
            <div className='px-2'>

                <LeadsTable Leads={data} recentOnly="true" />
            </div>
        </div>
    );
};
export default Massociates;
