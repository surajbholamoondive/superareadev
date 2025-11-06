import Modal from '@mui/material/Modal'
import Image from 'next/image'
import { ADMIN_MODULE } from "@/textV2"
import trashImage from '@/assets/AgentDashbord/trashImage.svg'
import cross from "../../../assets/ButtonIcons/cross.svg"
const {ADMIN_APP_MODERATION_TAB} =ADMIN_MODULE
const {text}=ADMIN_APP_MODERATION_TAB
function DeleteConfirm ({open, setOpen, setToBeDeletedImageUrl, toBeDeletedImageUrl, handleCarouselImageDelete}){
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        backgroundColor: 'white',
        boxShadow: 1,
        padding: 10,
        borderRadius: '8px',
      }
    return(
        <Modal
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
      
      <div style={style} className="flex flex-col gap-4 justify-center items-center">
      <h4 className="text-center font-semibold pt-2">{text?.deleteConfirm}</h4>
              <Image src={trashImage} alt='icon' width={120} height={120} />
          <div className="flex gap-4">
              <button onClick={()=>handleCarouselImageDelete(toBeDeletedImageUrl)} className="border border-solid bg-primary text-white px-4 py-2 rounded-md">Delete</button>
              <button onClick={()=>{
                  setOpen(false)
                  setToBeDeletedImageUrl('')
                  }} 
                  className='border border-solid border-black text-black px-4 py-2 rounded-md'
                  >{text.back}</button>
          </div>
          <div className="absolute top-2 right-2 cursor-pointer" onClick={()=>setOpen(false)}>
              <Image src={cross} width={30} height={30}/>
          </div>
      </div>
    </Modal>
    )
}
export default DeleteConfirm