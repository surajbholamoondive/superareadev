import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Arrow from '@/assets/Images/HomePage/Arrow.svg';
import { GLOBALLY_COMMON_TEXT } from '@/textV2';
const { text } = GLOBALLY_COMMON_TEXT

const FeatureCard = ({ image, preHeading, imagePosition, heading, bulletPoints, button, icon }) => {
  return (
    <div className='px-10 flex flex-col items-center justify-center'>
      <div className={`flex justify-center`}>
        {/* <Image src={icon} alt={`${heading} icon`} width={(heading === text.superEstimate) ? 190 : 50} height={50} className='mr-4' /> */}

        <div className={`flex justify-center`}>
          {/* <Image src={icon} alt={`${heading} icon`} width={(heading === text.superEstimate) ? 190 : 50} height={50} className='mr-4' /> */}
          <h2 className="text-primary font-[4px] text-center">
            <span className="text-2xl sm:text-3xl md:text-4xl font-hairline">
              {preHeading}
            </span>
            <span className="text-2xl sm:text-3xl md:text-4xl font-black ml-2 sm:ml-3">
              {heading}
            </span>
          </h2>

        </div>
      </div>
      <div className={`flex flex-col md:flex-row gap-4 ${imagePosition === 'right' && 'md:flex-row-reverse'} my-2 w-[100%] md:h-[400px] max-w-[1230px] justify-between`}>

        <div className={`${imagePosition === 'right' ? 'md:rounded-r-lg' : 'md:rounded-l-lg'} max-md:rounded-t-lg lg:w-1/2 flex items-center relative`}>
          <Image src={image} alt={heading} className="rounded-lg w-full h-auto" />
          {/* {heading==='SuperEstimate' && (<div>
            <Image src={grow} alt='grow icon' width={800} height={800} className='absolute -bottom-48 -left-24' />
            </div>
          )} */}
        </div>
        <div className="lg:w-1/2 flex flex-col justify-center md:p-4">
          <ul style={{ listStylePosition: 'outside' }} className="list-disc list-inside mb-4 ">
            {bulletPoints?.map((point, index) => (
              <li key={index} className="text-featureText leading-7 md:leading-6 sm:my-2  md:list-disc ">
                <h3 className='text-featureText font-black'>{point.strong}</h3>{point?.content}
              </li>
            ))}
          </ul>
          <div className='flex justify-end'>
            <Link href={button.url} target='_blank' className="mx-4 md:mx-10 min-w-28 gap-2 justify-between flex rounded-lg">
              <p className='font-bold text-primary'>{button.text}</p>
              <Image src={Arrow} alt='Arrow' height={10} width={10} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// FeatureSection Component
const FeatureSection = ({ data }) => {

  return (
    <div className='flex flex-col my-4 justify-center w-[95%] lg:w-[93%] custom-section'>
      <FeatureCard {...data} />
    </div>
  );
};

export default FeatureSection;
