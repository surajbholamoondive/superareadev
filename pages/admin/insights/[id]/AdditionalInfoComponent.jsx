import Image from 'next/image';
import React from 'react';
import User_cicrle_light from '../../../../assets/MenuIcons/ProfileDropdown/User_cicrle_light.svg'
import locationIcon from '../../../../assets/userDashboard/locationIcon.svg'
import mobileIcon from '../../../../assets/userDashboard/mobileIcon.svg'
import userLogo from '../../../../assets/userDashboard/userLogo.svg'
import ekycicon from "../../../../assets/Kyc/e-kyc icon.svg"
import eKycpending from "../../../../assets/Kyc/eKycpending.svg"
import { MDLabel } from '@/components/MDLabel/MDLabel'
import { OtpVerify } from '@/utils/utils'
import { GLOBALLY_COMMON_TEXT, ADMIN_MODULE } from '@/textV2';
const {text}=GLOBALLY_COMMON_TEXT
const {ADMIN_INSIGHTS_PAGE}=ADMIN_MODULE
const {text:insightText}=ADMIN_INSIGHTS_PAGE

export default function AdditionalInfoComponent ({ rowData}) {
  const { firstName, lastName, email, gender, languagePreferences, city, isKycVerified, dateOfBirth, mobileNumber, profileImage,agentOfficeDetails } = rowData || '';
  
  const formattedDateOfBirth = dateOfBirth ? new Date(dateOfBirth).toLocaleDateString() : text.threeDash;
  const {
    shopNumber= '',
    buildingName= '',
    locality= '',
  } = agentOfficeDetails || {}
  
  let officeAddress = ''
  if (
    (shopNumber === undefined || shopNumber === '') &&
    (buildingName === undefined || buildingName === '') &&
    (locality === undefined || locality === '') &&
    (city != undefined || city != '')
  ) {
    officeAddress = `${city}`
  } else if (
    shopNumber != undefined &&
    shopNumber != '' &&
    locality != undefined &&
    locality != '' &&
    buildingName != undefined &&
    buildingName != '' &&
    city != undefined
  ) {
    officeAddress = `${shopNumber}, ${buildingName}, ${locality} ${city}`
  } else if (
    shopNumber != undefined &&
    shopNumber != '' &&
    locality != undefined &&
    locality != '' &&
    (buildingName === undefined || buildingName === '') &&
    (city != undefined || city != '')
  ) {
    officeAddress = `${shopNumber}, ${locality}, ${city}`
  } else if (
    (shopNumber === undefined || shopNumber === '') &&
    buildingName != undefined &&
    buildingName != '' &&
    locality != undefined &&
    locality != '' &&
    (city != undefined || city != '')
  ) {
    officeAddress = `${buildingName}, ${locality}, ${city}`
  } else if (
    shopNumber != undefined &&
    shopNumber != '' &&
    (buildingName === undefined || buildingName === '') &&
    (locality === undefined || locality === '') &&
    (city != undefined || city != '')
  ) {
    officeAddress = `${shopNumber}, ${city}`
  } else if (
    (shopNumber === undefined || shopNumber === '') &&
    (buildingName === undefined || buildingName === '') &&
    locality != undefined &&
    locality != '' &&
    (city != undefined || city != '')
  ) {
    officeAddress = `${locality}, ${city}`
  } else {
    officeAddress = text.threeDash
  }
  return (<div className={`bg-white  p-2 rounded-lg shadow-md w-[400px] h-[400px] custom-scrollbar`} >
    <div className=' h-[80%] w-[80%] items-center m-auto mb-2'>
      <div className='h-[20%] flex mb-6 max-md:flex-col max-md:items-center max-md:mt-7'>
        <div className=' flex items-center mr-3 pt-2 rounded-full w-[30%] max-md:w-[45%]' >
          {profileImage ? (<Image className=' rounded-full object-cover w-[60px] h-[60px]' src={profileImage} />) : <Image src={User_cicrle_light} className='object-cover rounded-full w-[60px] h-[60px]' />}
        </div>
        <div className='w-fit '>
          <div className='flex mt-2  gap-2 '>
            <Image src={userLogo} height={12} width={12} alt="user" />
            <p>{firstName ? `${firstName} ${lastName}` : text.threeDash}</p>
          </div>
          <div className='flex mt-2  gap-2'>
            <Image src={locationIcon} height={12} width={12} alt='location' />
            <p style = {{textOverflow:"ellipsis", overflow:"hidden", whiteSpace:"nowrap"}}>{city ? city : text.threeDash}</p>
          </div>
          <div className='flex mt-2  gap-2 items-center whitespace-nowrap'>
            <Image src={mobileIcon} height={12} width={12} alt='mobile' />
            <MDLabel mobileNumber={mobileNumber} />
            <div>
              <OtpVerify />
            </div>
          </div>
        </div>
      </div>
      <div className='h-[65%] text-left max-md:h-fit'>
        <div>
          <p>{insightText.personalDetails}</p>
          <hr className='bg-gray-400'></hr>
        </div>
        <div className=' w-[100%] '>
          <div className='flex justify-between max-md:flex-col'>
            <div className='w-[40%] mt-4 '>
              <p className='text-gray-500'>{insightText.emailText}</p>
              <p className=' mt-2 break-words'>{email ? email : text.threeDash}</p>
            </div>
            <div className='w-[40%] mt-4 ml-2'>
              <p className='text-gray-500'>{insightText.genderText}</p>
              <p className=' mt-2 capitalize'>{gender ? gender : text.threeDash}</p>
            </div>
          </div>
          <div className='flex  justify-between max-md:flex-col max-md:w-[80%]'>
            <div className='w-[40%] mt-4 '>
              <p className='text-gray-500'>{insightText.dateOfBirth}</p>
              <p className=' mt-2'>{formattedDateOfBirth}</p>
            </div>
            <div className='w-[40%] mt-4 '>
              <p className='text-gray-500'>{text.kyc}</p>
              <div className='flex gap-1 mt-2 items-center max-md:gap-3'>
                {isKycVerified ? (
                  <>
                    <Image src={ekycicon} height={100} width={100} alt='tag' />

                  </>
                ) : (
                  <Image src={eKycpending} height={100} width={100} alt='tag' />
                )}
              </div>
            </div>
          </div>
          <div className='flex justify-between max-md:flex-col w-[100%]'>
            <div className='w-[40%] mt-4 pr-2  max-md:w-[100%]'>
              <p className='text-gray-500'>{insightText.addressText}</p>
              <p className=' mt-2'>{officeAddress}</p>
            </div>
            <div className="w-[40%] mt-4  pr-2 max-md:w-[100%]">
              <p className='text-gray-500 whitespace-nowrap'>{insightText.languagePreferencesText}</p>
              {languagePreferences && languagePreferences.length > 0 ? <div className="mt-2 flex flex-wrap gap-2 ">
                {languagePreferences?.map((language, index) => (
                  <button
                    key={index}
                    className="px-1 py-1 mb-2 bg-languageBackground text-black rounded-full">
                    {language}
                  </button>
                ))}
              </div> : <p className='capitalize mt-2'>{text.threeDash}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
