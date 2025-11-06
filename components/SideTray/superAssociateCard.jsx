import Image from 'next/image'
import { formatPhoneNumberIntl } from "react-phone-number-input";
import watch from "@/assets/AgentProfile/watch.svg"
import message from "@/assets/AgentProfile/Message.svg"
import locationIcon from '@/assets/AmenitiesIcons/location.svg'
import User_cicrle_light from '@/assets/MenuIcons/ProfileDropdown/User_cicrle_light.svg'
import mobile from '@/assets/AgentDashbord/mobilePhone.svg'
import messageLight from '@/assets/AgentDashbord/Message_light.svg'
import ekycicon from "@/assets/Kyc/e-kyc icon.svg";
import eKycpending from "@/assets/Kyc/eKycpending.svg"
import { GLOBALLY_COMMON_TEXT } from '@/textV2';

const { viewedText, workingsinceText, } = GLOBALLY_COMMON_TEXT

const MassociateCard = ({ agentData, inlineCss = {} }) => {
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
    
    return <>
            <div className={`flex items-center rounded-md p-2 border-grey-600 border-[1px]`} style={inlineCss.cardContainer}>
                <div className='flex items-center max-sm:flex-col gap-4 w-full' style={inlineCss.contentWrapper}>
                    <div className='max-sm:flex max-sm:justify-center' style={inlineCss.imageContainer}>
                        <div className="relative h-14 w-14 rounded-full" style={inlineCss.imageWrapper}>
                            {profileImage ? (
                                <Image src={profileImage} fill alt="icon" className='rounded-full' style={inlineCss.profileImage} />
                            ) : (
                                <Image src={User_cicrle_light} fill alt="icon" className='rounded-full' style={inlineCss.profileImage} />
                            )}
                        </div>
                    </div>

                    <div className='w-[100%] ' style={inlineCss.infoContainer}>
                        <div className='flex  justify-between'>
                            <h4 className='font-medium max-sm:mb-2 w-[50%] mb-3' style={inlineCss.name}>{firstName} {lastName}</h4>
                            <div className='' >
                                {isKycVerified ? (
                                    <>
                                        <Image src={ekycicon} height={80} width={80} alt='tag' />

                                    </>
                                ) : (
                                    <Image src={eKycpending} height={80} width={80} alt='tag' />
                                )}
                            </div>
                        </div>
                        <div className='flex items-center gap-2 w-[50%]' style={{ ...inlineCss.locationWrapper, display: 'flex', alignItems: 'center', }}>
                            <Image src={locationIcon} width={12} height={12} alt='location icon' style={inlineCss.icon}/>
                            <p className='text-black opacity-40 whitespace-nowrap' style={{...inlineCss.location,marginBottom: 0,}} >{city}</p>
                        </div>
                        <hr className="my-1 border border-black opacity-10" style={inlineCss.divider} />
                        <div className='flex items-center mt-2 mb-1 justify-between'>
                            {
                                <div className='flex items-center gap-2 w-[50%] ' style={inlineCss.infoRow}>
                                    <Image src={watch} height={12} width={12} alt='icon' style={inlineCss.icon} />
                                    <p className=' ' style={inlineCss.infoText}>{workingsinceText}: {agentSince ? new Date(agentSince).getFullYear() : 'NA'}</p>
                                </div>
                            }
                            {email && <div className='flex items-center  gap-1 w-[50%] ' style={inlineCss.infoRow}>
                                <Image src={messageLight} height={15} width={15} alt='icon' style={inlineCss.icon} />
                                <p className='h-4 truncate' style={inlineCss.infoText}>{email}</p>
                            </div>}
                        </div>
                        <div className='flex items-center mb-1 justify-between '>
                            {languagePreferences?.length != 0 && <div className='flex w-[50%] items-center gap-2' style={inlineCss.infoRow}>
                                <Image src={message} height={12} width={12} alt='icon' style={inlineCss.icon} />
                                <p style={inlineCss.languageWrapper}>
                                    <div className=' flex line-clamp-2 h-[15px] text-ellipsis max-w-[95px]'>
                                        {languagePreferences?.map((language, index) => (
                                            <p className=' max-md:text-sm text-md text-ellipsis ' key={index} style={inlineCss.language}>{language.trim()}{index !== languagePreferences.length - 1 ? ', ' : ''}</p>
                                        ))}
                                    </div>
                                </p>
                            </div>}
                            {formatPhoneNumberIntl(mobileNumber) && <div className='flex items-center  w-[50%] whitespace-nowrap' style={inlineCss.infoRow}>
                                <Image src={mobile} height={12} width={12} alt='icon' style={inlineCss.icon} />
                                <p className='w-[150px] overflow-hidden text-ellipsis ' style={inlineCss.infoText}>{formatPhoneNumberIntl(mobileNumber)}</p>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
            </>
        
}

export default MassociateCard