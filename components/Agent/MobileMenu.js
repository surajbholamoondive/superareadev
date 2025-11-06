import React, { useState } from 'react';
import icon from '../../assets/AgentDashbord/Home.svg';

export default function MobileMenu() {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const SidebarBotton = [
        { name: 'Home', link: '#' },
        { name: 'Profile', link: '#' },
        // Add other menu items here
    ];

    return (
        <div className="relative">
            <div className="cursor-pointer" onClick={() => setMenuOpen(!isMenuOpen)}>
                <img src={icon} alt="Menu Icon" />
            </div>
            {isMenuOpen && (
                <div className="bg-white shadow-md w-[200px] absolute top-0 right-0 mt-10 p-4 rounded-md">
                    <h3 style={{ fontWeight: 'bold', color: '#931602' }}>Welcome Agent Noody</h3>
                    <h3 className="text-left">To Experience</h3>
                    {SidebarBotton.map((e, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-md flex gap-2 font-semibold text-[13px] w-[110px] h-[55px] rounded-full m-[20px] items-center p-2"
                        >
                            <div className="w-[40px] h-[40px] bg-red-300 rounded-full">.</div>
                            <p>{e.name}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
