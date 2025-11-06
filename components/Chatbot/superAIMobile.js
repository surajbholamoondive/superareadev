import React from 'react';
import { useRouter } from 'next/router';
import robotImage from './../../assets/chatbot/robot.png';
import Image from 'next/image';
import gridImage from './../../assets/chatbot/grid.png';

const SuperAI = () => {
    const router = useRouter();
    
    const handleNavigate = () => {
        router.push('/chatbot');
    };

    return (
        <div className="w-[95%] lg:w-[93%] custom-section  bg-white rounded-2xl">
            <div 
                className="relative"
                style={{
                    backgroundImage: `url(${gridImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className="flex flex-row ">
                   <Image src={robotImage} alt="Robot Assistant" width={140} height={208}  className='mr-2'/>
                    <div className="w-52 gap-2 flex flex-col justify-center ml-0.5">
                        <h2 className="text-primary text-2xl leading-6 font-bold w-40">
                            Ask. Explore. Discover.
                        </h2>
                        <p className="text-xs text-primary w-47">
                            Meet SuperAI - your smart real estate assistant. Ask anything about buying, renting, selling, or exploring the real estate world.
                        </p>
                        <button 
                            onClick={handleNavigate}
                            className="bg-primary rounded-md p-2 self-start hover:bg-gray-50 transition-colors duration-200 shadow-sm"
                        >
                            <span className="text-white  font-bold text-xs">Ask Super AI</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuperAI;