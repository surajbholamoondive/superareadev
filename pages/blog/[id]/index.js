import { makeApiRequest } from "@/utils/utils"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { getLogger } from "@/helper/logger"
import { formatDateToDDMMYYYY } from "@/utils/utils"
import { GLOBALLY_COMMON_TEXT } from "@/textV2"
const {text,routes}=GLOBALLY_COMMON_TEXT
const Blogs = () => {
  const [data, setData] = useState({})
  const router = useRouter()
  const { id } = router.query || ''
  const logger = getLogger()
  const fetchAllModerations = async () => {
    try {
      const allData = await makeApiRequest(text.getType, routes.adminModerationRoute)
      const blogdata = allData?.data || {}
      const blogResult = blogdata?.result?.blog
      blogResult.forEach(item => {
        if (id == item._id) {
          setData(item)
        }
      });
    } catch (error) {
      logger.error(error)
    }
  }
  useEffect(() => {
    fetchAllModerations()
  }, [id])

  return (
    <>
      {data &&
        <div style={{ boxShadow: 'inset 0 7px 9px -7px rgba(0,0,0,0.4)', padding: '1.5%' }}>
          <div className="w-[100%] flex justify-center my-4">
            <div className="w-[70%] flex flex-col justify-center bg-white">
              <Image src={data.backgroundImage} width={1000} height={30} className=" w-[100%] h-[60vh]" alt="image" />
              <div className="text-right pr-4 pt-2">
                <h6 className="text-[12px]">{text.postedOnText} {formatDateToDDMMYYYY(data.createdAt)}</h6>
              </div>
              <h1 className="font-bold text-[30px] pl-4">{data.title}</h1>
              <p className="px-4 pb-4 ">{data.description}</p>
            </div>
          </div>
        </div>
      }
    </>
  )
}
export default Blogs