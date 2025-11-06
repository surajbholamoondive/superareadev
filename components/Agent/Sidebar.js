import React, { useState } from 'react';
import {
    FaHome,
    FaUser,
    FaChevronRight,
    FaChevronLeft,
    FaBuilding,
    FaCalendar,
    FaList,
    FaHeart,
    FaInbox,
    FaFileSignature,
    FaPhone,
    FaSignOutAlt,
} from 'react-icons/fa';
import Styles from './ind.module.css'
import Image from 'next/image';
import Icon from '../../assets/AgentDashbord/Icon.svg'

export default function Sidebar() {
    const SidebarBotton = [
        { label: 'Home', icon: <FaHome />, link: '#' },
        { label: 'Profile', icon: <FaUser />, link: '#' },
        { label: 'Property', icon: <FaBuilding />, link: '#' },
        { label: 'Side Visit', icon: <FaCalendar />, link: '#' },
        { label: 'My Listing', icon: <FaList />, link: '#' },
        { label: 'Rent Agreement', icon: <FaFileSignature />, link: '#' },
        { label: 'Property Request', icon: <FaInbox />, link: '#' },
        { label: 'Wishlist', icon: <FaHeart />, link: '#' },
        { label: 'Contact Log', icon: <FaPhone />, link: '#' },
        { label: 'Logout', icon: <FaSignOutAlt />, link: '#' },
    ];

    const [isFullSidebarOpen, setFullSidebarOpen] = useState(false);
    const [activeButton, setActiveButton] = useState(null);


    const handleButtonClick = (label) => {
        if (label === activeButton) {
            setActiveButton(null);
        } else {
            setActiveButton(label);
        }
    };



    return (
        <div className={`h-[1000px] bg-white relative rounded-tr-[50px] rounded-br-[50px] ${isFullSidebarOpen ? 'w-[420px]' : 'w-[100px]'} `}>
            <div
                className="bg-white shadow-md absolute rounded-full w-10 h-10 top-[30px] -right-4"
                onClick={() => setFullSidebarOpen(!isFullSidebarOpen)}
            >
                <div
                    className="mt-[11px] ml-[13px]"
                    onClick={() => setFullSidebarOpen(!isFullSidebarOpen)}
                >
                    {isFullSidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
                </div>
            </div>

            <div className="absolute h-[100px] ml-4">
                {isFullSidebarOpen && (
                    <div
                        style={{ textAlign: '' }}
                        className="text-cente mb-6"
                    >
                        <h3 style={{ fontWeight: 'bold', color: '#931602', }}>
                            Welcome Agent Noody
                        </h3>

                        <div className='flex '>
                            <h3 className=" text-left] ">To Experience </h3>
                            <div className='mt-2.5 ml-2'>
                                <Image src={Icon} alt='icon' />
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <ul className={`sidebar ${isFullSidebarOpen ? '' : 'hidden'}`}></ul>
            <div
                className={`${isFullSidebarOpen ? 'ml-4 w-[100%] grid grid-cols-2' : 'w-[100%] grid grid-cols-1'
                    } pt-10`}
            >
                {SidebarBotton.map((d) => {
                    return (
                        <button
                            key={d.label}
                            className={` ${isFullSidebarOpen ? `w-32 h-2 py-6 my-3 mt-12 text-[12px] bg-white  gap-1  rounded-full text-gray-600  shadow ${Styles.Arrow}` : ` ml-4`}`}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            onClick={() => {
                                handleButtonClick(d.label);
                            }}
                        >
                              <span
                                className={`w-11 h-11 ml-1 px-4 py-4 my-3 rounded-full ${activeButton === d.label
                                    ? ' bg-red-800 bg-opacity-20 text-red-800'
                                    : 'text-cyan-700 bg-cyan-500 bg-opacity-20'
                                    }`}
                            >
                                {d.icon}

                            </span>
                            {isFullSidebarOpen && d.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
