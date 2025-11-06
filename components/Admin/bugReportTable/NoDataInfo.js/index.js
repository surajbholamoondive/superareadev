import Image from 'next/image'
import nodataIcon from '../../../../assets/Massociate/nodataIcon.svg'
import { GLOBALLY_COMMON_TEXT } from '@/textV2'
const {noDataText}=GLOBALLY_COMMON_TEXT?.text
const NoDataInfo = () => {
  return (
      <div className="relative flex items-center justify-center ">
        <div className="flex-col justify-center items-center text-center">
          <div className="py-3 px-5">
            <Image src={nodataIcon} alt="nodataIcon" width={120} height={120} />
          </div>
        <h1 className=" text-xl font-black "
        style={{ color: '#333333' }}
        >{noDataText}</h1>
        </div>
      </div>
  )
}
export default NoDataInfo
