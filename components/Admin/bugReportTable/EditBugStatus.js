import Image from 'next/image';
import React from 'react';
import BugIcon from '@/assets/BugTab/BugModalIcon.svg'
import { toast } from "react-toastify";
import { makeApiRequest } from '@/utils/utils';
import { getLogger } from '@/helper/logger';
import style from './index.module.css'
import { GLOBALLY_COMMON_TEXT } from '@/textV2'
const { bugtext,text } = GLOBALLY_COMMON_TEXT

const EditBugStatus = ({ rowInfo, setIsEditModalOpen,isEditModalOpen, setClicked, clicked }) => {
  const logger = getLogger();
  const { _id } = rowInfo;

  const handleSelectionSubmit = (props) => {
      makeApiRequest(text.putType, bugtext.adminbugsroute, {status:props,dataId:_id})
        .then((response) => {

          const result = response?.data?.result;
          setClicked(!clicked)
          if (result) {
            toast.success(bugtext.bugsedittoaster)
        }})
        .catch((error) => {
          logger.error(error);
        });
  };

  return (
    <div
    onClick={()=>{setIsEditModalOpen(!isEditModalOpen)}}
  >
    {open && (
      <div className={`${style.confirmationModal} w-[30] flex-col justify-center items-center px-10 `}>
        <h4 className='font-semibold pt-1'>{''}</h4>
        <Image className='pt-2 pb-2' src={BugIcon} alt='icon' width={120} height={120} />
        <div className=' flex justify-center items-center pt-2'><p>{'Has the bug been successfully resolved?'}</p></div>
        <div className='flex gap-10 pt-5'>
        <button onClick={() => handleSelectionSubmit(bugtext.notext)} className='border border-solid border-black text-black px-4 py-2 rounded-md w-[150px] cursor-pointer'>{bugtext.notext}</button>
          <button onClick={()=>{handleSelectionSubmit(bugtext.yestext)}} className="border border-solid bg-primary text-white px-4 py-2 rounded-md w-[150px] cursor-pointer">{bugtext.yestext}</button>
        </div>
      </div>
    )}
  </div>
  )
};
export default EditBugStatus;
