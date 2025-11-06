import React from 'react';

const PostPropertyCard = ({ title, subtitle, icon, borderColor, color, active, handleClick, edit= false }) => {

    return (
        <div className={`max-w-[360px] rounded-xl p-4`}>
            <div onClick={handleClick} className={`flex relative flex-col max-w-[350px] max-h-[200px] min-h-[130px] border-2 rounded-2xl cursor-pointer ${active && ` ${edit ?'bg-gray-400': 'bg-primary' }`}`} style={{ borderColor: borderColor }}>
                <div className='p-4'>
                    <h3 className={`${active && 'text-white'}`}>
                        {title}
                        <span className={`${active ?`text-white` :'text-primary'}`} style={{ marginLeft: '5px', fontSize:'1.125rem'}}>{subtitle}</span>
                    </h3>
                    
                </div>
                <div className='absolute bottom-1 right-3 flex justify-end items-center'>
                    <div >
                        {icon}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PostPropertyCard;
