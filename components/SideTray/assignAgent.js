import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useNotification } from '@/context/notificationContext'
import { getLogger } from '@/helper/logger'
import {
  ADMIN_ASSIGN_AGENT_M_VERIFY,
  ADMIN_ASSIGN_AGENT_TO_PROPERTY,
  ADMIN_SEARCH_ASSOCIATE,
  AGENT_ASSIGNMENT_FAILED,
  AGENT_ASSIGNMENT_SUCCESSFULL,
  POST_TEXT,
  PUT_REQ,
  SEARCH_BUTTON_TEXT,
  TEXT_ASSIGN,
  TEXT_ASSIGNMENT,
  TEXT_ASSOCIATE,
  TOAST_MESSAGE_LISTING_APPROVED,
} from '@/text'
import { NOTIFICATION_TYPE } from '@/textV2'
import { makeApiRequest } from '@/utils/utils'
import { toast } from 'react-toastify'

import style from '@/components/Admin/my-m-associates/index.module.css'

import MoresIcon from '../../assets/logo/logo-icon.svg'
import closeIcon from '../../assets/userDashboard/close.svg'
import SuperAssociateCard from './superAssociateCard'

const assignAgent = ({
  propertyid,
  closeEditModal,
  setuserId,
  setPropertyId,
  mVerify,
  setAssigning,
  assigning,
  propertyModalClose,
  myStatusMessage,
  newagent,
  setNewagent,
  setAssociateclick,
}) => {
  const logger = getLogger()
  const { storeNotification } = useNotification()
  const [hasSearched, setHasSearched] = useState(false)

  const [searchQuery, setSearchQuery] = useState('')
  const [agentData, setAgentData] = useState([])
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value)
  }
  const handleSearchClick = () => {
    fetchAssociates()
  }
  const handleAssociateClick = (item, propertyid) => {
    AssignMassociate(item, propertyid)
  }
  const fetchAssociates = () => {
    makeApiRequest(POST_TEXT, ADMIN_SEARCH_ASSOCIATE, {
      searchText: searchQuery,
      propertyId: propertyid,
    })
      .then((response) => {
        const result = response?.data?.result
        setAgentData(result)
      })
      .catch((error) => {
        logger.error(error)
      })
  }

  const AssignMassociate = (item, propertyid) => {
    const userId = item._id
    const AgentName = item.firstName + ' ' + item.lastName
    let reqString = ''
    if (mVerify) {
      reqString = ADMIN_ASSIGN_AGENT_M_VERIFY
    } else {
      reqString = ADMIN_ASSIGN_AGENT_TO_PROPERTY
    }

    makeApiRequest(PUT_REQ, reqString, {
      userId,
      propertyid,
      statusMessage: myStatusMessage,
    })
      .then((response) => {
        const result = response?.data?.result
        closeEditModal(false)
        if (result) {
          if (newagent === TEXT_ASSIGNMENT) {
            setNewagent('')
            setAssigning(!assigning)
            propertyModalClose()
            toast.success(TOAST_MESSAGE_LISTING_APPROVED)

            storeNotification({
              userId: userId.toString(),
              propertyId: propertyid.toString(),
              notificationType: NOTIFICATION_TYPE.ASSOCIATE_ASSIGNMENT,
            })
          } else {
            toast.success(AGENT_ASSIGNMENT_SUCCESSFULL)
            setuserId(result.propertyResult.assignedTo)
            setAssociateclick(result)
            storeNotification({
              userId: userId.toString(),
              notificationType: NOTIFICATION_TYPE.ASSOCIATE_ASSIGNMENT,
              propertyId: propertyid.toString(),
            })
          }

          setuserId(result.propertyResult.assignedTo)
          setPropertyId(result.propertyResult._id)
        } else {
          toast.error(AGENT_ASSIGNMENT_FAILED)
        }
      })
      .catch((error) => {
        logger.error(error)
      })
  }
  useEffect(() => {
    if (searchQuery !== '') {
      fetchAssociates()
    }
  }, [searchQuery])

  return (
    <div className="relative">
      <div className="flex items-center pb-4">
        <div className="flex items-center w-full justify-center text-center">
          <div className="flex">
            <h3 className=" font-bold mr-1">{TEXT_ASSIGN}</h3>
            <Image
              src={MoresIcon}
              alt="close"
              width={18}
              height={18}
              className=" mb-1"
            />
            <h3 className="font-bold ml-1">{TEXT_ASSOCIATE}</h3>
          </div>
        </div>
        <div
          onClick={() => closeEditModal(false)}
          className={`top-0 right-0 absolute flex justify-center items-center cursor-pointer rounded-full bg-transparent border-gray-400 p-1  ${style.buttonEditModal}`}
        >
          <button onClick={() => closeEditModal(false)}>
            <Image
              onClick={() => closeEditModal(false)}
              src={closeIcon}
              alt="close"
              width={15}
              height={15}
              className="cursor-pointer"
            />
          </button>
        </div>
      </div>
      <div className="flex justify-between w-[85%] m-auto items-center ml-[94px]">
        <input
          type="text"
          className=" appearance-none border border-gray-200 rounded mr-2  py-2 px-3 text-gray-700 leading-tight w-[700px]" 
          placeholder="Enter Associate's Name"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <div>
          <button
            onClick={handleSearchClick}
            className="  shadow bg-[#931602] text-white py-2 px-4 rounded flex items-center justify-center"
          >
            {SEARCH_BUTTON_TEXT}
          </button>
        </div>
      </div>
      <div
        className={`grid grid-cols-2 max-lg:grid-cols-1 mt-5 gap-5 p-2 w-[900px] h-[250px] max-w-fit overflow-x-hidden overflow-y-auto ${style.customScroll} leading-3 px-[13px] ml-20  border-gray-200 rounded-md`}
      >
        {agentData &&
          agentData.length > 0 &&
          agentData.map((item, index) => (
            <div
              onClick={() => handleAssociateClick(item, propertyid)}
              key={index}
              className="cursor-pointer border-2 border-transparent leading-0"
            >
              <SuperAssociateCard agentData={item} />
            </div>
          ))}
      </div>
    </div>
  )
}
export default assignAgent
