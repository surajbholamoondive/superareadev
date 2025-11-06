import React, { useEffect, useState } from 'react'
import { getLogger } from '@/helper/logger'
import { makeApiRequest } from '@/utils/utils'
import NoDataInfo from '@/components/Admin/my-m-associates/NoDataInfo.js/index'
import MassociateCard from './MassociateCard'
import { GLOBALLY_COMMON_TEXT, USER_MODULE } from '@/textV2'
const {getType}=GLOBALLY_COMMON_TEXT?.text
const {userMyassociateRoute}=USER_MODULE?.USER_SASSOCIATES_PAGE?.routes
const {Super, associates}=USER_MODULE?.USER_SASSOCIATES_PAGE?.text
export default function MAssociate() {
  const [data, setData] = useState([])
  const [noDataModal, setNoDataModal] = useState(false)
  const logger = getLogger()

  const fetchData = async () => {
    try {
      const { data } = await makeApiRequest(getType, userMyassociateRoute)
      if (data?.result?.assignedListing.length === 0) {
        setNoDataModal(true)
      }
      setData(data?.result?.assignedListing || [])
    } catch (error) {
      logger.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div
      className={`flex justify-center rounded-lg pb-9 border-2 border-primary ${
        noDataModal ? "h-[450px] overflow-hidden" : "min-h-[900px] overflow-auto"
      }`}
    >
      <div className="w-full">
        {noDataModal ? (
          <div className="bg-white w-full rounded-md max-md:w-full justify-center h-[450px] flex items-center">
            <NoDataInfo />
          </div>
        ) : (
        <div>
          {/* <h2 className='p-2 text-primary font-black'>{Super}<span className='font-thin text-[1.5rem]'> {associates}</span></h2> */}
          <div className='flex flex-wrap p-2 justify-between'>
            {data &&
              data.map((item) => (
                <MassociateCard key={item.id} agentData={item} isContact={true} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
  
}
