import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@/context/auth'
import { getLogger } from '@/helper/logger'
import {
  ADMIN_TYPE,
  AGENT,
  AGENT_SCHEDULE_TIME_TEXT,
  AGENT_VERIFICATION_TEXT,
  APPROVE_TEXT,
  APPROVED_STATUS,
  INDIVIDUAL_TEXT,
  NOTICE,
  POST_TEXT,
  REJECT_TEXT,
  SUPER_VERIFICATION_PATH_ROUTE,
  VERIFICATION_ASSOCIATE,
} from '@/text'
import { makeApiRequest } from '@/utils/utils'
import report from '../../assets/Kyc/report.svg'
import verificationTag from '../../assets/logo/verification-logo.svg'
import pending from '../../assets/M-verification/pending.svg'
import AgentForm from './agentForm'
import Report from './report'

export default function NoticeTray({ DATA, isReviewComplete }) {
  const [isModalOpen, setModalOpen] = useState(false)
  const [auth] = useAuth()
  const logger = getLogger()
  const [statusMessage, setStatusMessage] = useState('')

  const openModal = () => {
    setModalOpen(true)
  }
  const closeModal = () => setModalOpen(false)
  const id = DATA?._id
  const { userType } = auth?.userResult || {}
  const { mVerifiedStatus } = DATA || {}
  const { assignedTo } = DATA || {}
  const { liveCameraVerification } = DATA?.mVerificationDetails || {} 
  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await makeApiRequest(
          POST_TEXT,
          `/property/get-status-message/${DATA?._id}`
        )
        if (response.status == 200) {
          setStatusMessage(response?.data?.result?.Message)
        }
      } catch (error) {
        logger.error(error)
      }
    }
    fetchMessage()
  }, [DATA?._id, isReviewComplete])

  const AboutAssociate = VERIFICATION_ASSOCIATE

  function formatToIndianTime(isoString) {
    const date = new Date(isoString)
    const options = {
      weekday: 'long', 
      month: 'long', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric', 
      hour12: true, 
      year: 'numeric', 
    }
    const indianTime = date.toLocaleString('en-IN', {
      ...options,
      timeZone: 'Asia/Kolkata',
    })

    return indianTime
  }

  const scheduleTime =
    DATA?.mVerificationDetails?.liveCameraVerification?.ScheduleMeetingTime

  return (
    <div>
      <div className="flex pb-4 px-4 justify-between items-center max-md:flex-col max-md:py-0 max-md:px-2 max-md:gap-2 ">
        {!DATA?.mVerificationDetails?.liveCameraVerification?.assignedTo ? (
          DATA?.assignedTo ? (
            <div className="flex justify-start md:justify-start w-[100%] items-center gap-8">
              <div className="flex justify-center items-center gap-2">
                <div>
                  {assignedTo?.profileImage ? (
                    <Image
                      className=" rounded-full object-cover w-[40px] h-[40px]"
                      src={assignedTo?.profileImage}
                      width={40}
                  height={40}
                    />
                  ) : (
                    <Image
                      src={verificationTag}
                      width={25}
                      height={25}
                      alt="verificationTag"
                    />
                  )}
                </div>

                <div>
                  <p className="text-sm text-primary">
                    {assignedTo?.firstName
                      ? assignedTo?.firstName.charAt(0).toUpperCase() +
                        assignedTo?.firstName.slice(1).toLowerCase()
                      : ''}{' '}
                    {assignedTo?.lastName
                      ? assignedTo?.lastName.charAt(0).toUpperCase() +
                        assignedTo?.lastName.slice(1).toLowerCase()
                      : ''}
                  </p>
                  <div className="flex gap-1">
                    <p className="text-sm text-primary">
                      {VERIFICATION_ASSOCIATE}
                    </p>
                  </div>
                </div>
              </div>
              <div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center gap-2">
              <div>
                <Image
                  src={verificationTag}
                  width={25}
                  height={25}
                  alt="verificationTag"
                />
              </div>
              <div>
                <div className="flex gap-1">
                  <p className="text-sm text-primary">
                    {VERIFICATION_ASSOCIATE}
                  </p>
                </div>
                <Image
                  src={pending}
                  width={70}
                  height={70}
                  alt="verificationTag"
                />
              </div>
            </div>
          )
        ) : (
          <div className="flex justify-center items-center gap-2">
            <div>
              {liveCameraVerification?.assignedTo?.profileImage ? (
                <Image
                  className=" rounded-full object-cover w-[40px] h-[40px]"
                  src={liveCameraVerification?.assignedTo?.profileImage}
                  width={40}
                  height={40}
                />
              ) : (
                <Image
                  src={verificationTag}
                  width={25}
                  height={25}
                  alt="verificationTag"
                />
              )}
            </div>

            <div>
              <p className="text-sm text-primary">
                {liveCameraVerification?.assignedTo?.firstName
                  ?.charAt(0)
                  .toUpperCase() +
                  liveCameraVerification?.assignedTo?.firstName
                    ?.slice(1)
                    .toLowerCase()}{' '}
                {liveCameraVerification?.assignedTo?.lastName
                  ?.charAt(0)
                  .toUpperCase() +
                  liveCameraVerification?.assignedTo?.lastName
                    ?.slice(1)
                    .toLowerCase()}
              </p>
              <div className="flex gap-1">
                <p className="text-sm text-primary">
                  {VERIFICATION_ASSOCIATE}
                </p>
              </div>
            </div>
          </div>
        )}
        {(userType === AGENT || userType === INDIVIDUAL_TEXT) &&
          DATA?.postedBy?._id === auth?.userResult?._id && (
            <p className="px-1 flex text-sm md:text-end w-fit font-medium">
              {typeof statusMessage === 'undefined' ||
              typeof isReviewComplete === 'undefined' ? (
                <Link href={SUPER_VERIFICATION_PATH_ROUTE} target="_blank">
                  <div className="flex">
                    {NOTICE}
                    &nbsp;
                    <span className="underline text-primary cursor-pointer">
                      {/* <Image
                        src={verificationTag}
                        width={15}
                        height={15}
                        alt="verificationTag"
                      /> */}
                    </span>
                  </div>
                </Link>
              ) : !statusMessage || isReviewComplete ? (
                DATA?.mVerifiedStatus === APPROVE_TEXT ? (
                  statusMessage
                ) : DATA?.mVerificationDetails?.userLocationVerification
                    ?.isLocationVerified ||
                  DATA?.mVerificationDetails?.agentLocationVerification
                    ?.isLocationVerified ? (
                  <div>
                    {AGENT_VERIFICATION_TEXT}
                  </div>
                ) : DATA?.mVerificationDetails?.liveCameraVerification
                    ?.ScheduleMeetingTime ? (
                  <div>
                    Your appointment is scheduled for{' '}
                    {formatToIndianTime(scheduleTime)}
                  </div>
                ) : !DATA?.isAgentRequired ? (
                  DATA?.mVerificationDetails?.liveCameraVerification
                    ?.assignedTo ? (
                    <>
                      <p>
                        {AGENT_SCHEDULE_TIME_TEXT}
                      </p>
                    </>
                  ) : (
                    statusMessage
                  )
                ) : (
                  AGENT_SCHEDULE_TIME_TEXT
                )
              ) : (
                <Link href={SUPER_VERIFICATION_PATH_ROUTE} target="_blank">
                  <div className="flex">
                    {NOTICE}
                    &nbsp;
                    <span className="underline text-primary cursor-pointer">
                      <Image
                        src={verificationTag}
                        width={15}
                        height={15}
                        alt="verificationTag"
                      />
                    </span>
                  </div>
                </Link>
              )}
            </p>
          )}

        {(mVerifiedStatus === APPROVED_STATUS ||
          mVerifiedStatus === REJECT_TEXT) &&
        DATA?.postedBy?._id !== auth?.userResult?._id &&
        DATA?.isAgentRequired ? (
          <div className="flex justify-end">
            <Image
              src={report}
              width={80}
              height={80}
              alt="form"
              onClick={openModal}
              style={{ cursor: 'pointer' }}
            />

            <Report DATA={DATA} isOpen={isModalOpen} onClose={closeModal} />
          </div>
        ) : (
          (userType === AGENT || userType === ADMIN_TYPE) &&
          DATA?.postedBy?._id !== auth?.userResult?._id &&
          DATA?.mVerificationDetails?.mVerificationReport && (
            <div className="flex justify-end">
              <Image
                src={report}
                width={80}
                height={80}
                alt="form"
                onClick={openModal}
                style={{ cursor: 'pointer' }}
              />
              {(mVerifiedStatus === APPROVED_STATUS ||
                mVerifiedStatus === REJECT_TEXT) && (
                <Report DATA={DATA} isOpen={isModalOpen} onClose={closeModal} />
              )}
              {mVerifiedStatus !== APPROVED_STATUS &&
                mVerifiedStatus !== REJECT_TEXT && (
                  <AgentForm
                    DATA={DATA}
                    isOpen={isModalOpen}
                    onClose={closeModal}
                  />
                )}
            </div>
          )
        )}
      </div>
    </div>
  )
}
