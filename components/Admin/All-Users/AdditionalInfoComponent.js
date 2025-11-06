import Image from 'next/image';
import React from 'react';
import User_cicrle_light from '../../../assets/MenuIcons/ProfileDropdown/User_cicrle_light.svg'
import locationIcon from '../../../assets/userDashboard/location.svg'
import mobileIcon from '../../../assets/userDashboard/phoneflip.svg'
import userLogo from '../../../assets/userDashboard/user-profile.svg'
import ekycicon from "../../../assets/Kyc/e-kyc icon.svg";
import eKycpending from "../../../assets/Kyc/eKycpending.svg"
import { MDLabel } from '@/components/MDLabel/MDLabel';
import { ADDRESS, DATE_OF_BIRTH, EMAIL_TEXT, GENDER, KYC, LANGUAGE_PREFERENCES, NOT_AVAILABLE, PERSONAL_DETAILS } from '@/text';
import { OtpVerify } from '@/utils/utils';

const AdditionalInfoComponent = ({ rowData }) => {
  const { _id, firstName, lastName, email, gender, address, languagePreferences, city, isKycVerified, dateOfBirth, mobileNumber, profileImage,agentOfficeDetails } = rowData;
  
  const formattedDateOfBirth = dateOfBirth ? new Date(dateOfBirth).toLocaleDateString() : '---';
  const {
    shopNumber= '',
    buildingName= '',
    locality= '',
    pincode= '',
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
    officeAddress = '---'
  }
  return (<div key={_id} className={`bg-white  p-2 rounded-lg shadow-md w-[400px] h-[400px] custom-scrollbar`} >
    <div key={_id} className=' h-[80%] w-[80%] items-center m-auto mb-2'>
      <div key={_id} className='h-[20%] flex mb-6 max-md:flex-col max-md:items-center max-md:mt-7'>
        <div key={_id} className=' flex items-center mr-3 pt-2 rounded-full w-[30%] max-md:w-[45%]' >
          {profileImage ? (<img className=' rounded-full object-cover w-[60px] h-[60px]' src={profileImage} />) : <Image src={User_cicrle_light} className='object-cover rounded-full w-[60px] h-[60px]' />}
        </div>
        <div key={_id} className='w-fit '>
          <div key={_id} className='flex mt-2  gap-2 '>
            <Image key={_id} src={userLogo} height={12} width={12} alt="user" />
            <p>{firstName ? `${firstName} ${lastName}` : '---'}</p>
          </div>
          <div key={_id} className='flex mt-2  gap-2'>
            <Image key={_id} src={locationIcon} height={12} width={12} alt='location' />
            <p style = {{textOverflow:"ellipsis", overflow:"hidden", whiteSpace:"nowrap"}}>{city ? city : '---'}</p>
          </div>
          <div key={_id} className='flex mt-2  gap-2 items-center whitespace-nowrap'>
            <Image src={mobileIcon} height={12} width={12} alt='mobile' />
            <MDLabel mobileNumber={mobileNumber} />
            <div>
              <OtpVerify />
            </div>
          </div>
        </div>
      </div>
      <div key={_id} className='h-[65%] text-left max-md:h-fit'>
        <div>
          <p>{PERSONAL_DETAILS}</p>
          <hr className='bg-gray-400'></hr>
        </div>
        <div key={_id} className=' w-[100%] '>
          <div key={_id} className='flex justify-between max-md:flex-col'>
            <div key={_id} className='w-[40%] mt-4 '>
              <p className='text-gray-500'>{EMAIL_TEXT}</p>
              <p className=' mt-2 break-words'>{email ? email : '---'}</p>
            </div>
            <div key={_id} className='w-[40%] mt-4 ml-2'>
              <p className='text-gray-500'>{GENDER}</p>
              <p className=' mt-2 capitalize'>{gender ? gender : '---'}</p>
            </div>
          </div>
          <div key={_id} className='flex  justify-between max-md:flex-col max-md:w-[80%]'>
            <div className='w-[40%] mt-4 '>
              <p className='text-gray-500'>{DATE_OF_BIRTH}</p>
              <p className=' mt-2'>{formattedDateOfBirth}</p>
            </div>
            <div key={_id} className='w-[40%] mt-4 '>
              <p className='text-gray-500'>{KYC}</p>
              <div key={_id} className='flex gap-1 mt-2 items-center max-md:gap-3'>
                {isKycVerified ? (
                  <>
                    <Image key={_id} src={ekycicon} height={100} width={100} alt='tag' />

                  </>
                ) : (
                  <Image key={_id} src={eKycpending} height={100} width={100} alt='tag' />
                )}
              </div>
            </div>
          </div>
          <div key={_id} className='flex justify-between max-md:flex-col w-[100%]'>
            <div key={_id} className='w-[40%] mt-4 pr-2  max-md:w-[100%]'>
              <p className='text-gray-500'>{ADDRESS}</p>
              <p className=' mt-2'>{officeAddress}</p>
            </div>
            <div key={_id} className="w-[40%] mt-4  pr-2 max-md:w-[100%]">
              <p className='text-gray-500 whitespace-nowrap'>{LANGUAGE_PREFERENCES}</p>
              {languagePreferences && languagePreferences.length > 0 ? <div key={_id} className="mt-2 flex flex-wrap gap-2 ">
                {languagePreferences?.map((language, index) => (
                  <button
                    key={index}
                    className="px-1 py-1 mb-2 bg-languageBackground text-black rounded-full">
                    {language}
                  </button>
                ))}
              </div> : <p className=' capitalize mt-2'>{NOT_AVAILABLE}</p>}
            </div>
          </div>
        </div>
      </div>
    </div></div>
  );
};
export default AdditionalInfoComponent;
