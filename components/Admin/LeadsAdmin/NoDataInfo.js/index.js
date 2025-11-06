import { NO_DATA } from '@/text';
import closeIcon from '../../../../assets/ButtonIcons/newbackButton.svg'
import Image from 'next/image'
import nodataIcon from '../../../../assets/Massociate/nodataIcon.svg'

const NoDataInfo = ({ closeModal,isVisble=true }) => {
  return (<>
  <div className='relative flex items-center justify-center' >
  <div className='flex-col justify-center items-center text-center py-4 px-1'>
      <Image src={nodataIcon} alt="nodataIcon" width={160} height={160} />
      <h1 className=' text-xl font-black mt-[-20px]'>{NO_DATA}</h1>
    </div>
   { isVisble && 
        <button >
          <Image onClick={()=>closeModal(false)} src={closeIcon} alt="close" width={28} height={28}  className='absolute top-0 right-2 cursor-pointer' />
        </button>
      }</div></>
  );
};
export default NoDataInfo;