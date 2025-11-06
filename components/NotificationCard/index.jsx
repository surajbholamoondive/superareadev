import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link'
import { makeApiRequest } from '@/utils/utils';
import NotificationIndicator from './NotificationIndicator';
import propertyPlaceholder from '@/assets/NotificationIcons/propertyPlaceholder.svg'
import { useAuth } from '@/context/auth'
import Styles from '@/utils/Notifications/index.module.css'
import cross from '../../assets/NotificationIcons/cross.svg'
import kycShield from '../../assets/NotificationIcons/kycShield.svg'
import right from '../../assets/NotificationIcons/right.svg'
import adminPushIcon from '../../assets/NotificationIcons/adminPushIcon.svg'
import { COMPONENTS, GLOBALLY_COMMON_TEXT } from '@/textV2';

import { useNotification } from '@/context/notificationContext';
import { NOTIFICATION_TYPE, USER_PROFILE_TEXT } from "@/textV2"
import { formatDate } from "@/utils/utils"

const { individualText, aprrovedText, upperCaseApprovedText, upperCaseRejected, restrictedText, reviseText, upperCaseRestricted } = GLOBALLY_COMMON_TEXT.text
const { text, routes } = COMPONENTS.NOTIFICATION_CARD_COMPO

const { ekycCompleted, idealProperty, modificationText, approvalStatusNotification, associateAssignmentNotification, associateAssignmentUser, eKycNotification,propertyPostedText, adminPushNotification, associateNotification, eKycText, listingStatusText, mAssociateText, recommendationText, userStatus } = text

const { completeText } = USER_PROFILE_TEXT.text

const { RECOMMENDATION, E_KYC, LISTING_STATUS, S_ASSOCIATE, USER_STATUS, ADMIN_NOTIFICATIONS, S_VERIFICATION, ASSOCIATE_ASSIGNMENT, POST_PROPERTY, TEST } = NOTIFICATION_TYPE

const NotificationCard = ({ data, dropdown }) => {

  const [auth, setAuth] = useAuth()
  const userType = auth?.userResult?.userType;
  const { markAsRead } = useNotification()
  const cardRef = useRef(null);
  const notificationType = data?.notificationType;
  const listingStatusLabel1 = "Heads up! Your property";
  const listingStatusLabel2 = "needs"
  const [hasMarkedRead, setHasMarkedRead] = useState(false);

  useEffect(() => {
    if (!dropdown || !cardRef.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !data?.viewed) {
        markAsRead(data?._id);
      }
    }, { threshold: 0.5 });

    // Start observing
    observer.observe(cardRef.current);

    // Immediately check if it's already in view
    const rect = cardRef.current.getBoundingClientRect();
    const inView = rect.top >= 0 && rect.bottom <= window.innerHeight;
    if (inView && !data?.viewed) {
      markAsRead(data?._id);
    }

    return () => {
      observer.disconnect();
    };
  }, [dropdown, data?._id, data?.viewed]);

  const markNotificationAsViewed = async (notificationId) => {
    await makeApiRequest(
      process.env.NEXT_PUBLIC_PUT_METHOD,
      `${process.env.NEXT_PUBLIC_UPDATE_NOTIFICATION}?notifId=${data._id}`,
    )
  };

  let notificationContent
  const generatePropertyURL = (propertyDetail) => {
    const {
      _id,
      propertyType,
      projectType,
      city,
      propertyTitle,
      projectTitle,
      propertySize,
      locality,
      projectSubType,
      propertySubType,
      propertyAreaUnit,
    } = propertyDetail || {}

    let metadataString = ''
    if (propertyTitle) metadataString += `${propertyTitle}-`
    if (projectTitle) metadataString += `${projectTitle}-`
    if (propertyType) metadataString += `${propertyType}-`
    if (projectType) metadataString += `${projectType}-`
    if (propertySize) metadataString += `${propertySize}-`
    if (propertyAreaUnit) metadataString += `${propertyAreaUnit}-`
    if (city) metadataString += `${city}-`
    if (locality) metadataString += `${locality}-`
    if (propertySubType) metadataString += `${propertySubType}-`
    if (projectSubType) metadataString += `${projectSubType}-`

    // Remove trailing hyphen if present
    metadataString = metadataString.replace(/-$/, '')

    let url = ''
    if (propertyTitle) {
      url = `${routes.viewPropertyRoute}/${metadataString}/${_id}`
    } else {
      url = `${routes.viewProjectRoute}/${metadataString}/${_id}`
    }

    // Ensure there are no double slashes
    url = url.replace(/\/\//g, '/')

    return url
  }

  switch (notificationType) {
    case S_ASSOCIATE:
      const { approvalStatus: statusAssociate, text: textAgent } = data;
      notificationContent = (
        <div className='min-w-[350px]'>
          <Link
            href={userType === individualText ? routes.userProfileRoute : routes.agentProfileRoute}
            target="_blank"
          >
            <div
              className={`flex w-5/5 py-2 ${Styles.notificationBox}`}
            >
              <div className="w-1/5 h-fit self-center flex justify-center">
                <Image
                  src={statusAssociate === restrictedText ? cross : right}
                  width={30}
                  height={30}
                  alt="Property Cover Image"
                  className="w-[50px] h-[50px] p-1 rounded-lg"
                />
              </div>
              <div className="h-fit self-center w-4/5">
                <p
                  className={` p-2 pr-7 self-center  relative`}
                >
                  {approvalStatusNotification} {" "}
                  <span
                    className={`font-bold ${statusAssociate === aprrovedText ? Styles.approved : Styles.rejected}`}
                  >
                    {statusAssociate === aprrovedText ? upperCaseApprovedText : upperCaseRestricted}
                  </span>

                  <br />
                  {textAgent && (<>({textAgent})</>)}
                  {!data.viewed && (
                    <NotificationIndicator />
                  )}
                </p>
              </div>
            </div>
          </Link>
        </div>
      )
      break
    case E_KYC:
      let kycListing;
      let kycCoverImage;

      if (data?.propertyData) {
        ({ propertyTitle: kycListing, propertyImage: kycCoverImage } = data.propertyData);
      }
      notificationContent = (
        <div>{!kycListing ?
          (<Link
            href={userType === individualText ? routes.userProfileRoute : routes.agentProfileRoute}
            target="_blank"
          >
            <div
              className={`flex w-5/5 py-2 ${Styles.notificationBox}`}
            >
              <div className='flex '>
                <div className="w-1/5 h-fit self-center flex justify-center">
                  <Image
                    src={kycShield}
                    width={30}
                    height={30}
                    alt="Property Cover Image"
                    className="w-[50px] h-[50px] p-1 rounded-lg"
                  />
                </div>
                <div className="h-fit self-center w-4/5">
                  <p className=" p-2 pr-7 h-fit self-center  relative">
                    {auth?.userResult?.isKycVerified ? eKycNotification : completeText}
                    {!data.viewed && (
                      <NotificationIndicator />
                    )}
                  </p>
                </div>
              </div>
            </div>
          </Link>) : (<Link
            href={routes.agentAssignedLisitngRoute}
            target="_blank"
          >
            <div
              className={`flex w-5/5 py-2 ${Styles.notificationBox}`}
            >
              <div className='flex '>
                <div className="w-1/5 h-fit self-center flex justify-center">
                  <Image
                    src={kycShield}
                    width={30}
                    height={30}
                    alt="Property Cover Image"
                    className="w-[50px] h-[50px] p-1 rounded-lg"
                  />
                </div>
                <div className="h-fit self-center w-4/5">
                  <p className=" p-2 pr-7 h-fit self-center relative">
                    {ekycCompleted}{' '} <span className="font-semibold">{kycListing}</span>
                    {!data.viewed && (
                      <NotificationIndicator />
                    )}
                  </p>
                </div>
              </div>
            </div>
          </Link>)
        }
        </div>
      )
      break
    case RECOMMENDATION:
      const {
        recommendProperty: {
          propertyTitle: propertyName,
          propertyCoverImage: propertyImage,
          propertySubType,
          locality: propertyLocality,
          city: propertyCity,
        } = {},
      } = data
      const EXPLORE = "Explore"
      const { recommendProperty: propertyData } = data;
      notificationContent = (
        <div>
          <Link
            href={generatePropertyURL(propertyData)}
            target="_blank"
          >
            <div
              className={`flex w-5/5 py-2 ${Styles.notificationBox}`}
            >
              <div className="w-1/5 h-fit self-center flex justify-center">
                <Image
                  src={propertyImage ? propertyImage : propertyPlaceholder}
                  width={30}
                  height={30}
                  alt="Property Cover Image"
                  className="w-[60px] h-[60px] p-1 rounded-lg"
                />
              </div>
              <div className="w-4/5">
                <p className=" p-2 pr-7 h-fit self-center  relative">
                  {EXPLORE} <span className="font-semibold">{propertyName}</span>, a{' '}
                  <span className="font-semibold">{propertySubType}</span> in{' '}
                  <span className="font-semibold">{propertyLocality}</span>,{' '}
                  <span className="font-semibold">{propertyCity}</span> - {idealProperty}
                  {!data.viewed && (
                    <NotificationIndicator />
                  )}
                </p>
              </div>
            </div>
          </Link>
        </div>
      )
      break
    case LISTING_STATUS:
      const {
        listingStatus,
        text,
        propertyData: {
          propertyTitle: listingName,
          propertyImage: listingImage
        } = {}
      } = data;
      const listingSlug = data?.propertyData?.slug;
      const listingmessage1 = "Heads up! The status of"
      const listingmessage2 = "you listed has changed to"
      notificationContent = (
        <div className="flex">
          <Link
            href={`${routes.viewPropertyRoute}/${listingSlug}`}
            target="_blank"
          >
            {listingStatus != reviseText ? (
              <div
                className={`flex w-5/5 py-2 ${Styles.notificationBox}`}
              >
                <div className="w-1/5 h-fit self-center flex justify-center">
                  <Image
                    src={listingImage || propertyPlaceholder}
                    width={30}
                    height={30}
                    alt="Property Cover Image"
                    className="w-[60px] h-[60px] p-1 rounded-lg"
                  />
                </div>
                <div className="w-4/5 flex">
                  <p
                    className={` p-2 pr-7 self-center  relative `}
                  >
                    {listingmessage1} {listingName} {listingmessage2} {''}
                    <span
                      className={` font-bold ${listingStatus == aprrovedText} ? Styles.approved : Styles.rejected}`}
                    >
                      {listingStatus == aprrovedText ? upperCaseApprovedText : upperCaseRejected}
                    </span>

                    <br />
                    {text && (< >"{text}"</>)}
                    {!data.viewed && (
                      <NotificationIndicator />
                    )}
                  </p>
                </div>
              </div>
            ) : (
              <div
                className={`flex w-5/5 py-2 ${Styles.notificationBox}`}
              >
                <div className="w-1/5 h-fit self-center flex justify-center">
                  <Image
                    src={listingImage || propertyPlaceholder}
                    width={30}
                    height={30}
                    alt="Property Cover Image"
                    className="w-[60px] h-[60px] p-1 rounded-lg"
                  />
                </div>
                <div className="w-4/5 flex">
                  <p className={` p-2 pr-7 self-center  relative `}>
                    {listingStatusLabel1} <span className="font-semibold">{listingName}</span> {listingStatusLabel2}{' '}
                    <span className={`${Styles.revise} font-semibold`}>{modificationText}</span>
                    <br />
                    {text && (<>"{text}"</>)}
                    {!data.viewed && (
                      <NotificationIndicator />
                    )}
                  </p>
                </div>
              </div>
            )}
          </Link>
        </div>
      )
      break
    case ASSOCIATE_ASSIGNMENT:
      const propertyId = data?.propertyId;
      const propertySlug = data?.propertyData?.slug
      const {
        propertyData: {
          propertyTitle: propertyNameAssociate,
          propertyImage: propertyImageAssociate
        } = {},
        agentName: MAssociateName
      } = data;
      notificationContent = (
        <div>
          {data.agentName ? (
            <Link
              href={`${routes.viewPropertyRoute}/${propertySlug}`}
              target="_blank"
            >
              <div
                className={`flex w-5/5 py-2 ${Styles.notificationBox}`}
              >
                <div className="w-1/5 h-fit self-center flex justify-center">
                  <Image
                    src={propertyImageAssociate ? propertyImageAssociate : propertyPlaceholder}
                    width={30}
                    height={30}
                    alt="Property Cover Image"
                    className="w-[60px] h-[60px] p-1 rounded-lg"
                  />
                </div>
                <div className="w-4/5 flex">
                  <p className=" p-2 pr-7  self-center  relative">
                    <span className="font-semibold">{MAssociateName}</span>{' '}
                    {associateAssignmentUser}{' '}
                    <span className="font-semibold">{propertyNameAssociate}</span>
                    {!data.viewed && (
                      <NotificationIndicator />
                    )}
                  </p>
                </div>
              </div>
            </Link>
          ) : (
            <Link
              href={`${routes.viewPropertyRoute}/${propertySlug}`}
              target="_blank"
            >
              <div
                className={`flex w-5/5 py-2 ${Styles.notificationBox}`}
              >
                <div className="w-1/5 h-fit self-center flex justify-center">
                  <Image
                    src={propertyImageAssociate ? propertyImageAssociate : propertyPlaceholder}
                    width={30}
                    height={30}
                    alt="Property Cover Image"
                    className="w-[60px] h-[60px] p-1 rounded-lg"
                  />
                </div>
                <div className="w-4/5 flex">
                  <p className=" p-2 pr-7 self-center  relative">
                    {associateAssignmentNotification}{' '}
                    <span className="font-semibold">{propertyNameAssociate}</span>
                    {!data.viewed && (
                      <NotificationIndicator />
                    )}
                  </p>
                </div>
              </div>
            </Link>
          )}
        </div>
      )
      break
    case USER_STATUS:
      const { userStatus, textUser } = data;
      notificationContent = (
        <div>
          <div
            className={`flex w-5/5 py-2 ${Styles.notificationBox}`}
          >
            <div className="w-1/5 h-fit self-center flex justify-center">
              <Image
                src={userStatus == restrictedText ? cross : right}
                width={30}
                height={30}
                alt="Property Cover Image"
                className="w-[50px] h-[50px] p-1 rounded-lg"
              />
            </div>
            <div className="h-fit self-center w-4/5">
              <p
                className={` p-2 pr-7 self-center  relative`}
              >
                {approvalStatusNotification} "
                <span
                  className={`font-bold ${userStatus === aprrovedText ? Styles.approved : Styles.rejected}`}
                >
                  {userStatus == aprrovedText ? upperCaseApprovedText : "Ristricted"}
                </span>
                "
                <br />
                {textUser && (<>"{textUser}"</>)}
                {!data.viewed && (
                  <NotificationIndicator />
                )}
              </p>
            </div>
          </div>
        </div>
      )
      break
    case ADMIN_NOTIFICATIONS:
      const { text: textAdmin } = data;
      notificationContent = (
        <div>
          <div
            className={`flex w-5/5 py-2 ${Styles.notificationBox}`}
          >
            <div className="w-1/5 h-fit self-center flex justify-center">
              <Image
                src={adminPushIcon}
                width={30}
                height={30}
                alt="Property Cover Image"
                className="w-[60px] h-[60px] pl-2 rounded-lg"
              />
            </div>
            <div className="h-fit self-center w-4/5">
              <p
                className={` p-2 pr-7 self-center  relative`}
              >
                <div dangerouslySetInnerHTML={{ __html: textAdmin }} />
                {!data.viewed && (
                  <NotificationIndicator />
                )}
              </p>
            </div>
          </div>
        </div>
      )
      break
    case S_VERIFICATION:
      const {
        meetingTime: time,
        listingStatus: verificationStatus,
        text: verificationRemark,
        subNotificationType: notificationSubType,
        locationVerificationStatus: locationStatus,
        propertyData: {
          propertyTitle: verificationPropertyTitle,
          propertyImage: verificationPropertyImage,
          postedBy: verificationPropertypostedBy
        } = {}

      } = data;
      const label1 = "Your live camera verification meeting has been scheduled for"
      const label2 = "on"
      const label3 = " for E verification"
      const reminderLabel = "Reminder: Your live camera verification meeting is scheduled for"
      notificationContent = (
        <div className="flex">
          {time != null && notificationSubType == "SCHEDULED_MEETING" ? (
            <Link
              href={userType === individualText ? routes.userListingRoute : routes.agentListingRoute}
              target="_blank"
            >
              <div
                className={`flex w-5/5 py-2 ${Styles.notificationBox}`}
              >
                <div className="w-1/5 h-fit self-center flex justify-center">
                  <Image
                    src={verificationPropertyImage || propertyPlaceholder}
                    width={30}
                    height={30}
                    alt="Property Cover Image"
                    className="w-[60px] h-[60px] p-1 rounded-lg"
                  />
                </div>
                <div className="w-4/5 flex">
                  <p className={` p-2 pr-7 self-center  relative `}>
                    {notificationSubType ? reminderLabel : label1} <span className="font-semibold">{verificationPropertyTitle}</span> {label2}{' '}
                    <span className="font-semibold">{formatDate(time)}</span>
                    <br />
                    {!data.viewed && (
                      <NotificationIndicator />
                    )}
                  </p>
                </div>

              </div>
            </Link>) : (
            <div
              className={`flex w-5/5 py-2 ${Styles.notificationBox}`}
            >
              <div className="w-1/5 h-fit self-center flex justify-center">
                <Image
                  src={verificationPropertyImage || propertyPlaceholder}
                  width={30}
                  height={30}
                  alt="Property Cover Image"
                  className="w-[60px] h-[60px] p-1 rounded-lg"
                />
              </div>
              {(() => {
                switch (notificationSubType) {
                  case "REVIEW_LISTING":
                    const reviewedBy = ("agentName" in data) ? data.agentName : data.userName
                    return <div className="w-4/5 flex">
                      {
                        <p className={"p - 2 pr-7 self-center relative "}>
                          {"Initial review of "}
                          {verificationPropertypostedBy === auth?.userResult?._id ? "your property " : "the property assigned to you "}

                          <span className="font-semibold">
                            {verificationPropertyTitle}
                          </span>

                          {" has been completed "}


                          {("agentName" in data) ? (
                            <span>
                              by the <span className="font-semibold">assigned agent</span>
                            </span>
                          ) : ("userName" in data) ? (
                            <span>
                              by the <span className="font-semibold">property owner</span>
                            </span>
                          ) : " "}


                          <br />
                          {!data.viewed && (<NotificationIndicator />)} </p>
                      }
                    </div>
                  case "LOCATION_VERIFICATION":
                    const locationVerified = ("agentName" in data) ? "Agents location for S-verification of " : ("userName" in data) ? "User location for S-verification of " : "Your location for S-verification of "

                    return <div className="w-4/5 flex">
                      {
                        <p className={"p - 2 pr-7 self-center relative "}>

                          {locationVerified}

                          <span className="font-semibold">              {verificationPropertyTitle}
                          </span> {' has been '}

                          <span className="font-semibold">
                            {locationStatus ? "completed" : "rejected"}
                          </span>
                          <br />
                          {!data.viewed && (<NotificationIndicator />)} </p>
                      }
                    </div>
                  case "APPROVAL_STATUS":
                    return <div className="w-4/5 flex">
                      {
                        <p className={"p - 2 pr-7 self-center relative "}>
                          {"S-verification of "}
                          {("agentName" in data) ? "your property" : " the property assigned to you "}

                          <span className="font-semibold">              {verificationPropertyTitle}
                          </span> {' have been '}

                          <span className="font-semibold">
                            {verificationStatus}
                          </span>
                          <br />
                          {!data.viewed && (<NotificationIndicator />)} </p>
                      }
                    </div>

                  default:
                    return
                }
              })()}
            </div>
          )
          }
        </div >
      )
      break
    case POST_PROPERTY:
      const {
        propertyData: {
          propertyTitle: postedPropertyTitle = '',
          propertyImage: postedPropertyImage = ''
        } = {}
      } = data;
      notificationContent = (
        <div>
          <Link
            href={`${routes.viewPropertyRoute}/${data.propertyData.slug}`}
            target="_blank"
          >
            <div className={`flex w-5/5 py-2 ${Styles.notificationBox}`}>
              <div className="w-1/5 h-fit self-center flex justify-center">
                <Image
                  src={postedPropertyImage || propertyPlaceholder}
                  width={30}
                  height={30}
                  alt="Property Cover Image"
                  className="w-[60px] h-[60px] pl-2 rounded-lg"
                />
              </div>
              <div className="h-fit self-center w-4/5">
                <p className="p-2 pr-7 self-center relative">

                  <span className="font-semibold">{postedPropertyTitle}</span>

                  <span> {' '+propertyPostedText} </span>

                  {!data.viewed && <NotificationIndicator />}

                </p>
              </div>
            </div>
          </Link>

        </div>
      );
      break
    case TEST:
      notificationContent = (
        <>
          <div>{"test notification"}</div>
        </>
      )
      break
  }
  return (
    <div ref={cardRef} >
      {notificationContent}
    </div>
  );
};

export default NotificationCard;
