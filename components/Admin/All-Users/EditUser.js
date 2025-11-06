import Image from 'next/image';
import React, { useState } from 'react';
import User_cicrle_light from '../../../assets/MenuIcons/ProfileDropdown/User_cicrle_light.svg'
import locationIcon from '../../../assets/userDashboard/location.svg'
import mobileIcon from '../../../assets/userDashboard/phoneflip.svg'
import userLogo from '../../../assets/userDashboard/user-profile.svg'
import closeIcon from '../../../assets/userDashboard/close.svg';
import { ADMIN_MASSOCIATE_EDIT_ROUTE, USER_APPROVED_SUCCESSSFULLY, USER_RESTRICTED, APPROVE, APPROVED_STATUS, CANNOT_COMPLETE_EDIT, PUT_REQ, RESTRICT, RESTRICTED_STATUS, NOTIFICATION_TYPE_M_ASSOCIATE, TIME_SENSITIVITY_HIGH ,NOTHING_TEXT,STATUS_REMARKS} from '@/text';
import {NOTIFICATION_TYPE} from "@/textV2"
import { toast } from "react-toastify";
import { makeApiRequest, OtpVerify } from '@/utils/utils';
import { getLogger } from '@/helper/logger';
import ekycicon from "../../../assets/Kyc/e-kyc icon.svg";
import eKycpending from "../../../assets/Kyc/eKycpending.svg"
import style from './index.module.css'
import { useNotification } from '@/context/notificationContext';

const EditUsers = ({ rowInfo, modalState, restricted, setApproved, setRestricted, approved, restrict }) => {
    const logger = getLogger()
    const [verified] = useState(true);
    const [statusMessage, setStatusMessage] = useState(NOTHING_TEXT)
    const { _id, firstName, lastName, isKycVerified, mobileNumber, city, profileImage } = rowInfo;
    const {storeNotification}=useNotification()
    const handleAgentEdit = (props) => {
        if(statusMessage ===NOTHING_TEXT || statusMessage ===''){
            toast.error(STATUS_REMARKS)
          }
          else{
            makeApiRequest(PUT_REQ, ADMIN_MASSOCIATE_EDIT_ROUTE, { approvalStatus: props, agentId: _id, statusMessage: statusMessage })
            .then((response) => {
                const result = response?.data?.result;
                if (result) {
                    if (props == APPROVED_STATUS) {
                        toast.success(USER_APPROVED_SUCCESSSFULLY)
                        setApproved(!approved)
                    }
                    else {
                        toast.info(USER_RESTRICTED)
                        setRestricted(!restrict)
                    }
                }
                else {
                    toast.error(CANNOT_COMPLETE_EDIT)
                }
            })
            .catch((error) => {
                logger.error(error);
            });

            
            storeNotification({
              userId:_id?.toString(),
              notificationType:NOTIFICATION_TYPE.USER_STATUS,
              userStatus:props
            })

            
        const notificationType = NOTIFICATION_TYPE_M_ASSOCIATE;
        const Time = TIME_SENSITIVITY_HIGH
        const text = statusMessage
        makeApiRequest(PUT_REQ, process.env.NEXT_PUBLIC_STORE_NOTIFICATION, {
            userId: _id?.toString(),
            notificationType: notificationType,
            timeSensitivity: Time,
            text: text,
            approvalStatus: props,
        }).then((response) => {
            logger.info(response)
        })
            .catch((error) => {
                logger.error(error);
            });
          }
    };
    const handleChange = (event) => {
        setStatusMessage(event.target.value)
    }
    const handleClose = () => {
        modalState(false);
    };
    return (
        <div key={_id} className='relative '>
            <div onClick={handleClose} className={`absolute top-0 right-0 flex justify-center items-center cursor-pointer rounded-full bg-transparent border border-gray-400 ${style.buttonEditModal}`}>
                <button onClick={handleClose}>
                    <Image onClick={handleClose} src={closeIcon} alt="close" width={9} height={9} className='cursor-pointer' />
                </button>
            </div>
            <div className='flex   max-md:flex-col max-md:items-center max-md:mt-7 '>
                <div className='flex items-center flex-col gap-[2px] mr-6 rounded-full  max-md:w-[35%]'>
                    {profileImage ? (<img className='rounded-full object-cover w-[70px] h-[70px] mb-[2px]  ' src={profileImage} alt='profileImage' />) : <Image src={User_cicrle_light} className='object-cover rounded-full w-[70px] h-[70px] -mt-[2px]' alt='User_cicrle_light' />}
                    {isKycVerified ? (
                        <>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Image src={ekycicon} height={120} width={120} alt="ekycicon" />
                            </div>
                        </>
                    ) : (<>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Image src={eKycpending} height={120} width={120} alt="eKycpending" />
                        </div></>
                    )}
                </div>
                <div className='w-fit'>
                    <div className='flex mt-2 font-semibold text-xs gap-3'>
                        <Image src={userLogo} height={14} width={14} alt="user" />
                        <p>{firstName ? `${firstName} ${lastName}` : '---'}</p>
                    </div>
                    <div className='flex mt-2 font-semibold text-xs gap-3'>
                        <Image src={locationIcon} height={12} width={12} alt='location' />
                        <p>{city || '---'}</p>
                    </div>
                    <div className='flex mt-2 font-semibold text-xs gap-2 items-center'>
                        <Image src={mobileIcon} height={14} width={14} alt='mobile' />
                        <p>{mobileNumber}</p>
                        {verified && (
                            <OtpVerify />
                        )}
                    </div>
                    <div className='flex mt-2 '>
                        <textarea
                            onChange={handleChange}
                            id="remarks"
                            className="w-64 mt-2 h-20 border border-gray-300 rounded-md p-2 placeholder-gray-400 resize-none"
                            placeholder="Write your remarks here..."
                        />
                    </div>
                    <div>
                        {!restricted &&
                            <div className='flex gap-4'>
                                <button
                                    className={`text-white py-1 px-8 font-medium rounded mt-3 bg-primary cursor-pointer `}
                                    onClick={() => handleAgentEdit(RESTRICTED_STATUS)}>
                                    {RESTRICT}
                                </button>
                                <button
                                    className={`bg-gray-400 cursor-not-allowed text-white py-1 px-8 font-medium rounded mt-3`}
                                    onClick={() => handleAgentEdit(APPROVED_STATUS)}
                                >
                                    {APPROVE}
                                </button>
                            </div>

                        }
                        {restricted &&

                            <div className='flex gap-4'>

                                <button
                                    className={`text-white py-1 px-8 font-medium rounded mt-3 bg-primary`}
                                    onClick={() => handleAgentEdit(APPROVED_STATUS)}
                                >
                                    {APPROVE}
                                </button>
                                <button
                                    className={`text-white py-1 px-8 font-medium rounded mt-3 bg-gray-400 cursor-not-allowed`}
                                    onClick={() => handleAgentEdit(RESTRICTED_STATUS)}>
                                    {RESTRICT}
                                </button>



                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};
export default EditUsers;
