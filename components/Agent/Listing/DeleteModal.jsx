import React from 'react'
import style from './index.module.css'
import { GLOBALLY_COMMON_TEXT, USER_MODULE } from '@/textV2'
import trashImage from '@/assets/AgentDashbord/trashImage.svg'
import Image from 'next/image';
const {deleteFinalText,deleteText}=USER_MODULE?.USER_MY_LISTING_PAGE
const {backButton,deleteButton}=GLOBALLY_COMMON_TEXT?.buttons
const DeleteModal = ({open,confirmDelete,cancelDelete,id ,headText,footText ,disable}) => {
  return (
    <div
    className={` ${open ? `${style.modalOverlay}` : ""}`}
  >
    {open && (
      <div className={`${style.confirmationModal} w-[30] flex-col justify-center items-center px-10 `}>
        <h4 className='font-semibold pt-2'>{headText?headText:deleteText}</h4>
        <Image className='pt-2 pb-2' src={trashImage} alt='icon' width={120} height={120} />
        <div className=' flex justify-center items-center pt-2'><p>{footText?footText:deleteFinalText}</p></div>
        <div className='flex gap-10 pt-5'>
          <button onClick={()=>{confirmDelete(id)}} disabled ={disable} className="border border-solid bg-primary text-white px-4 py-2 rounded-md w-[150px] cursor-pointer">{disable ? 'Deleting...': deleteButton}</button>
          <button onClick={cancelDelete} className='border border-solid border-black text-black px-4 py-2 rounded-md w-[150px] cursor-pointer'>{backButton}</button>
        </div>
      </div>
    )}
  </div>
  )
}

export default DeleteModal