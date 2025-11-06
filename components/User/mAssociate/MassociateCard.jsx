import Image from 'next/image'
import { formatPhoneNumberIntl } from "react-phone-number-input";
import message from "@/assets/AgentProfile/Message.svg"
import location from '@/assets/AgentProfile/locationIcon.svg'
import User_cicrle_light from '@/assets/MenuIcons/ProfileDropdown/User_cicrle_light.svg'
import mobile from '@/assets/AgentDashbord/mobilePhone.svg'
import messageLight from '@/assets/AgentDashbord/Message_light.svg'
import ekycicon from "@/assets/Kyc/ekynew.svg";
import eKycpending from "@/assets/Kyc/eKycpending.svg"
import { GLOBALLY_COMMON_TEXT } from '@/textV2';
const {workingsinceText,}=GLOBALLY_COMMON_TEXT

const MassociateCard = ({ agentData }) => {
    const {
        firstName,
        lastName,
        languagePreferences,
        city,
        agentSince,
        profileImage,
        mobileNumber,
        email,
        isKycVerified
    } = agentData
    
    return (
  <div className='flex border border-primary p-4 rounded-xl my-2 gap-x-1 md:w-[49%] max-md:w-full '>
    {/* image div */}
    <div>
        <div className="relative h-16 w-16 rounded-full overflow-hidden mr-1">
            {profileImage ? (
              <Image src={profileImage} fill alt="icon" className="rounded-full" />
          ) : (
              <Image src={User_cicrle_light} fill alt="icon" className="rounded-full" />
            )}
       </div>
    </div>
    {/* Details div */}
      <div className='flex-1'>
        <div className='flex flex-col justify-start w-full border-0 border-gray-400 border-b-2 pb-2'>
       <div>
            <h3 className="capitalize font-semibold">{firstName} {lastName}</h3>
       </div>
        {isKycVerified ? (
             <div className="mt-2">
              <Image src={ekycicon} height={100} width={100} alt="KYC Verified" />
            </div>
             ) : (
              <div className="mt-2">
            <Image src={eKycpending} height={100} width={100} alt="KYC Pending" />
                </div>
          )}
        </div>
        {/* Associate details section */}
        <div>
            <div className="flex items-center gap-2 mt-2">
                <Image src={location} width={16} height={16} alt="Location icon" />
              <p>{city}</p>
            </div>
          <div className="flex items-center gap-2 mt-1">
               <Image src={mobile} width={16} height={16} alt="Phone icon" />
                 <p>{formatPhoneNumberIntl(mobileNumber)}</p>
               </div>
          </div>
        {languagePreferences.length > 0 && (
          <div className="flex items-center gap-2 mt-1">
           <Image src={message} width={16} height={16} alt="Languages icon" />
           <p>{languagePreferences.join(", ")}</p>
         </div>
       )}
        {email && (
            <div className="flex items-center gap-2 mt-1">
              <Image src={messageLight} width={18} height={18} alt="Email icon" />
              <p className="truncate w-40">{email}</p>
            </div>
        )}
      </div>
  </div>
  )
}

export default MassociateCard