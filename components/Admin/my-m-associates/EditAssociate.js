import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import User_cicrle_light from '../../../assets/MenuIcons/ProfileDropdown/User_cicrle_light.svg'
import locationIcon from '../../../assets/userDashboard/location.svg'
import mobileIcon from '../../../assets/userDashboard/phoneflip.svg'
import userLogo from '../../../assets/userDashboard/user-profile.svg'
import closeIcon from '../../../assets/userDashboard/close.svg';
import { ADMIN_MASSOCIATE_EDIT_ROUTE, AGENT_APPROVED_SUCCESSSFULLY, AGENT_RESTRICTED, APPROVE, APPROVED_STATUS, CANNOT_COMPLETE_EDIT, NOTHING_TEXT, PUT_REQ, RESTRICT, RESTRICTED_STATUS, STATUS_REMARKS, } from '@/text';
import { toast } from "react-toastify";
import { makeApiRequest, OtpVerify } from '@/utils/utils';
import { useRouter } from 'next/router';
import { getLogger } from '@/helper/logger';
import ekycicon from "../../../assets/Kyc/e-kyc icon.svg";
import eKycpending from "../../../assets/Kyc/eKycpending.svg"
import style from './index.module.css'
import { MDLabel } from '@/components/MDLabel/MDLabel';
import { useNotification } from '@/context/notificationContext';
import {NOTIFICATION_TYPE} from "@/textV2"

const EditAssociate = ({ rowInfo, modalState, setClicked, clicked }) => {
  const router = useRouter();
  const logger = getLogger();
  const [verified] = useState(true);
  const [isApprovedButtonDisabled, setIsApprovedButtonDisabled] = useState(false);
  const [isRestrictButtonDisabled, setIsRestrictButtonDisabled] = useState(false);
  const [statusMessage, setStatusMessage] = useState(NOTHING_TEXT)
  const { _id, firstName, lastName, approvalStatus, isKycVerified, mobileNumber, city, profileImage } = rowInfo;
  const {storeNotification}=useNotification()

  const handleAgentEdit = (props) => {
    if (statusMessage === NOTHING_TEXT || statusMessage === '') {
      toast.error(STATUS_REMARKS)
    } else {
      makeApiRequest(PUT_REQ, ADMIN_MASSOCIATE_EDIT_ROUTE, { approvalStatus: props, agentId: _id, statusMessage: statusMessage })
        .then((response) => {
          const result = response?.data?.result;
          if (result) {
            storeNotification({
              userId:_id?.toString(),
              notificationType:NOTIFICATION_TYPE.USER_STATUS,
              userStatus:props
            })
            if (props == APPROVED_STATUS) {
              toast.success(AGENT_APPROVED_SUCCESSSFULLY)
              router.push(router.asPath);
              setClicked(!clicked)
            }
            else {
              toast.success(AGENT_RESTRICTED)
              router.push(router.asPath);
              setClicked(!clicked)
            }
            modalState(false);
          }
          else {
            toast.error(CANNOT_COMPLETE_EDIT)
            router.push(router.asPath);
          }
        })
        .catch((error) => {
          logger.error(error);
        });
    }
  };

  const handleClose = () => {
    modalState(false);
  };
  const handleChange = (event) => {
    setStatusMessage(event.target.value)
  }

  useEffect(() => {
    if (approvalStatus == APPROVED_STATUS) {
      setIsApprovedButtonDisabled(true);
    }
    if (approvalStatus == RESTRICTED_STATUS) {
      setIsRestrictButtonDisabled(true);
    }
  }, [approvalStatus]);

  return (
    <div key={_id} className='relative'>
      <div onClick={handleClose} className={`absolute top-0 right-0 flex justify-center items-center cursor-pointer rounded-full bg-transparent border border-gray-400 ${style.buttonEditModal}`}>
        <button onClick={handleClose}>
          <Image onClick={handleClose} src={closeIcon} alt="close" width={10} height={10} className='cursor-pointer m-[6px]' />
        </button>
      </div>
      <div className='flex mb-3 max-md:flex-col max-md:items-center max-md:mt-7 '>
        <div className='flex items-center flex-col gap-[2px] mr-6 rounded-full  max-md:w-[35%]'>
          {profileImage ? (<img className='rounded-full object-cover w-[70px] h-[70px] mb-[2px]' src={profileImage} alt='profileImage' />) : <Image src={User_cicrle_light} className='object-cover rounded-full w-[70px] h-[70px] -mt-[2px]' alt='User_cicrle_light' />}
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
          <div className='flex mt-2 font-semibold gap-3'>
            <Image src={userLogo} height={14} width={14} alt="user" />
            <p>{firstName ? `${firstName} ${lastName}` : '---'}</p>
          </div>
          <div className='flex mt-2 font-semibold  gap-3'>
            <Image src={locationIcon} height={12} width={12} alt='location' />
            <p>{city || '---'}</p>
          </div>
          <div className='flex mt-2 font-semibold gap-2 items-center'>
            <Image src={mobileIcon} height={14} width={14} alt='mobile' />
            <MDLabel mobileNumber={mobileNumber} />
            {verified && (
              <OtpVerify />
            )}
          </div>
          <div className='flex mt-2 '>
            <textarea
              onChange={handleChange}
              required
              id="remarks"
              className="w-64 mt-2 h-20 border border-gray-300 rounded-md p-2  placeholder-gray-400 resize-none"
              placeholder="Write your remarks here..."
            />
          </div>
          <div className="flex gap-4 mt-2">
            <button
              className={`text-white py-1 px-8 font-medium rounded mt-3 bg-[#931602] ${isRestrictButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'cursor-pointer'}`}
              onClick={() => handleAgentEdit(RESTRICTED_STATUS)}>
              {RESTRICT}
            </button>
            <button
              className={`text-white py-1 px-8  font-medium rounded mt-3 bg-[#931602] ${isApprovedButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'cursor-pointer'}`}
              onClick={() => handleAgentEdit(APPROVED_STATUS)}
              disabled={isApprovedButtonDisabled}>
              {APPROVE}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditAssociate;
