import HoverRating from '@/components/Admin/Post-Project/HoverRating';
import { EXPERIENCE_TEXT, TOTAL_PROJECTS_TEXT, YEAR_TEXT, YEARS_TEXT } from '@/text';
import Image from 'next/image';
import React from 'react';

const DeveloperDetail = ({ developerData }) => {
  const {
    developerName,
    developerLogoUrl,
    developerSince,
    developerRating,
    developerDescription,
    totalProjects
  } = developerData;

  const calculateExperience = (sinceDate) => {
    const currentYear = new Date().getFullYear();
    const startYear = new Date(sinceDate).getFullYear();
    return currentYear - startYear;
  };

  const experience = developerSince ? calculateExperience(developerSince) : 'N/A';

  return (
    <div className="md:flex items-start md:p-6 md:max-h-96 overflow-auto">
      {/* Left Side: Developer Logo */}
      <div className="flex flex-shrink-0 md:w-[35%] items-center">
        {developerLogoUrl?.[0] && (
          <Image
            src={developerLogoUrl[0].url}
            alt={`${developerName} Logo`}
            width={1000}
            height={1000}
            className="rounded-md w-full max-h-[260px] object-contain"
          />
        )}
      </div>

      {/* Right Side: Developer Details */}
      <div className="md:ml-6 h-fit items-center">
        <h2 className="text-2xl font-semibold">{developerName}</h2>
        <div className="mt-2">
          <HoverRating
            value={developerRating}
            readOnly={true}
          />
        </div>
        <div className="mt-2 flex">
          <h4 className="font-semibold">{EXPERIENCE_TEXT}: {experience} {experience === 1 ? YEAR_TEXT : YEARS_TEXT} </h4>
          <span className='mx-1'>|</span>
          <h4 className="font-semibold">{TOTAL_PROJECTS_TEXT}: {totalProjects?.length} </h4>
        </div>
        <div
          className="mt-4 custom-scrollbar"
          dangerouslySetInnerHTML={{ __html: developerDescription }}
        />
      </div>
    </div>
  );
};

export default DeveloperDetail;
