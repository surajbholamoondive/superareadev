import React from 'react';
import { PropertyGuideContent } from '@/content/HomePage/PropertyGuideContent';
import Image from 'next/image';

const PropertyGuideHighlights = () => {

  const { leftPanel, rightPanel } = PropertyGuideContent;
  const { title: leftTitle, description: leftDescription, buttonText: leftButtonText, image } = leftPanel;
  const { title: rightTitle, features } = rightPanel;

  return (
    <div className="custom-section md:flex flex-wrap justify-between py-9 px-4 lg:px-9 max-w-[1300px] m-auto w-[95%] lg:w-[90%]">
      
      {/* Left Panel */}
      <div className="border-2 border-primary bg-primaryLight rounded-lg p-7 pt-8 max-md:pt-1 shadow-sm mb-5 md:mb-0 md:w-[300px] lg:w-[320px] relative">
        <h2 className="text-[24px] font-bold">{leftTitle}</h2>
        <p className="mt-4 max-md:mt-0 max-md:pb-6 text-[14px] text-gray-600">{leftDescription}</p>
        <button className="bg-primary absolute max-md:bottom-[0.56rem] text-white font-[500] py-2 px-5 rounded mt-5 z-20 ">
          {leftButtonText}
        </button>
        <Image 
        src={image} 
        alt={leftDescription} 
        width={280} 
        height={200}
        className='absolute bottom-0 right-0 z-10 max-lg:hidden '
        />
      </div>

     {/* Right Panel */}
      <div className="max-md:mt-12 ml-0 md:ml-5 w-full md:w-[50%] lg:w-[60%]">
        <h2 className="text-[24px] font-bold mb-5">{rightTitle}</h2>
        <div className='grid grid-cols-2 gap-3 lg:gap-6'>
            {features.map((feature, index) => (
            <div key={index} className="items-start mt-5">
                <div className='flex min-w-fit'>
                    <div className="rounded-full  items-center flex shrink-0 justify-center mr-4">
                        <Image src={feature.icon} alt={feature.altText} width={45} height={45} />
                    </div>
                    <h3 className="text-[18px] font-bold flex items-center h-auto">{feature.title}</h3>
                </div>
                <div>
                    <p className="text-[14px] mt-4 text-gray-600">{feature.description}</p>
                </div>
            </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyGuideHighlights;
