import Image from 'next/image'
// import aadhaarMatch from '@/assets/Kyc/aadhaarMatch.svg'
import SuperVerification from '@/assets/NonLoggedUserImages/SuperVerification.svg'
import aadhaarMatch from '@/assets/MScore/aadhar 1.png'
import img2 from '@/assets/MScore/image 2.png'
import styles from '@/pages/faqs/super-verification/index.module.css'
import {
  E_KYC_VERIFICATION_PARAGRAPH_TEXT,
  E_KYC_VERIFICATION_TEXT,
  LIVE_CAMERA_VIDEO_VERIFICATION_PARAGRAPH_TEXT,
  LIVE_CAMERA_VIDEO_VERIFICATION_TEXT,
  REVIEW_LISTING_VERIFICATION_PARAGRAPH_TEXT,
  REVIEW_LISTING_VERIFICATION_TEXT,
  SCHEDULE_MEETING_VERIFICATION_PARAGRAPH_TEXT,
  SCHEDULE_VERIFICATION_TEXT,
} from '@/text'
import LiveCameraVerification from '../../../assets/M-verification/LiveCameraVerification.svg'
import locationCheck from '../../../assets/M-verification/locationCheck.svg'
import ScheduleMeeting from '../../../assets/M-verification/ScheduleMeeting.svg'
import BackgroundImage from '../../../assets/NonLoggedUserImages/backgroundImage.svg'

const Index = () => {
  return (
    <div className={styles.container}
      style={{
        backgroundImage: `url(${BackgroundImage.src})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center'
      }}
    >
      <div className='custom-section'>
        <h2 className="text-center text-primary font-thin">
          <span className="font-normal text-[1.5rem] md:text-[2.5rem]">Introducing</span>{" "}
          <span className="text-[1.5rem] font-bold md:text-[2.5rem]">SuperVerification</span>
        </h2>
        <div className=" sm:px-5  md:px-10 md:py-8">
          <h2 className='text-primary mt-[42px] text-[20px] md:mt-0 md:text-[32px]'>
            Introducing SuperVerification: Authenticity in Real Estate Made Simple.</h2 >
          <p className="pt-2 leading-loose">
            In the high-speed real estate world, trust and honesty are critical when selling or purchasing a property online. That's why we launched SuperVerification—a game-changing technology that skips the whole history of how properties are presented and sold. Using advanced technology, SuperVerification makes sure that each listing on our site is genuine, verified, and reliable. From property information to photos, we carefully check every detail, providing buyers with the assurance to make sound choices and sellers with the reputation they deserve. When you shop with SuperVerification, you're not only viewing a listing—you're viewing the genuine profiles.
          </p>
          <div>
            <h3 className='text-primary font-bold mt-8' >
              Steps to complete your SuperVerification :</h3>
          </div>
          <div className="flex px-5 max-md:flex-col justify-center items-center my-10">
            <Image src={SuperVerification} height={600} width={600} />
          </div>
          <div className="flex flex-col-reverse mt-5 md:flex-row items-center lg:gap-10 ">
            <div className="flex flex-col gap-5 justify-start w-full md:w-1/2">
              <h3 className="pt-3 flex items-center text-[#5F5F5F] font-bold text-[20px]">
                {E_KYC_VERIFICATION_TEXT}
              </h3>
              <p className=" leading-loose">
                {E_KYC_VERIFICATION_PARAGRAPH_TEXT}
              </p>
            </div>

            <Image
              src={aadhaarMatch}
              width={250}
              height={200}
              alt="aadhaarMatch"
              className="pt-[5px] w-[50%] "
            />
          </div>

          <div className="flex flex-col mt-5 md:flex-row items-center lg:gap-10 ">
            <div className="flex justify-center items-center w-full md:w-[40%]">
              <Image
                src={locationCheck}
                width={250}
                height={200}
                alt="locationCheck"
                className="pt-[5px] w-[50%] "
              />
            </div>
            <div className="flex flex-col gap-5 justify-start w-full md:w-[60%]">
              <h3 className="text-[#5F5F5F] font-bold text-[20px]">
                {REVIEW_LISTING_VERIFICATION_TEXT}
              </h3>
              <p className="py-2 md:w-full leading-loose">
                {REVIEW_LISTING_VERIFICATION_PARAGRAPH_TEXT}
              </p>
            </div>
          </div>

          <div className="flex flex-col-reverse mt-5 md:flex-row items-center lg:gap-10 ">
            <div className="flex flex-col gap-5 justify-start w-full md:w-[60%]">
              <h3 className="text-[#5F5F5F] font-bold text-[20px]">
                {SCHEDULE_VERIFICATION_TEXT}
              </h3>
              <p className="py-2  md:w-full leading-loose">
                {SCHEDULE_MEETING_VERIFICATION_PARAGRAPH_TEXT}
              </p>
            </div>

            <div className="flex justify-center items-center w-full md:w-[40%]">
              <Image
                src={ScheduleMeeting}
                width={200}
                height={200}
                alt="ScheduleMeeting"
                className="w-[50%] "
              />
            </div>
          </div>

          <div className="flex flex-col mt-5 md:flex-row items-center lg:gap-10">
            <div className="flex justify-center items-center w-full md:w-[40%]">
              <Image className="pt-[10px] md:pt-0 "
                src={img2} alt="image" />


            </div>
            <div className="flex flex-col gap-5 justify-start w-full md:w-[60%] mt-5 md:mt-0">
              <h3 className="text-[#5F5F5F] font-bold text-[20px]">Location verification</h3>
              <p className=" leading-loose">
                This step ensures that the property exists at the claimed address and matches official documents. We verify the location using tools like Google Maps, developer records, and sometimes on-site visits. Verified properties receive a trusted badge, helping buyers make confident decisions.              </p>
            </div>
          </div>
          <div className="flex flex-col mt-5 md:mt-8 md:flex-row items-center lg:gap-10">
            <div className="flex flex-col gap-5 justify-start w-full md:w-[60%]">
              <h3 className="text-[#5F5F5F] font-bold text-[20px]">
                {LIVE_CAMERA_VIDEO_VERIFICATION_TEXT}
              </h3>
              <p className="py-2  md:w-full leading-loose">
                {LIVE_CAMERA_VIDEO_VERIFICATION_PARAGRAPH_TEXT}
              </p>
            </div>
            <div className="flex justify-center items-center w-full md:w-[40%]">
              <Image
                src={LiveCameraVerification}
                width={250}
                height={200}
                alt="LiveCameraVerification"
                className="pt-[10px] "
              />
            </div>

          </div>
        </div>

        {/* <div className="my-3 sm:px-5  md:px-10 flex flex-col ">
          <h2 className="pb-2">FAQs</h2>
          <Mverification />

        </div> */}
      </div>
    </div>
  )
}

export default Index
