import React from 'react'
import Image from 'next/image'
import img1 from '@/assets/MScore/aadhar 1.png'
import img4 from '@/assets/MScore/high quality.png'
import img2 from '@/assets/MScore/image 2.png'

import SuperVerificationIllustration from '@/assets/NonLoggedUserImages/SuperScore.svg'
import img3 from '@/assets/MScore/image 3.png'
import styles from '@/pages/faqs/super-score/index.module.css'
import Mscore from '@/components/Faq/mScore'
import { mScoreContent } from '@/content/faq/mScoreContent'
import BackgroundImage from '../../../assets/NonLoggedUserImages/backgroundImage.svg'
const index = () => {
  return (
        <div className={styles.container}
      style={{
        backgroundImage: `url(${BackgroundImage.src})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center'
      }}
    >
      <div className=' custom-section '>
        <h1 className="text-center text-primary font-bold">
          <span className="font-normal text-[1.5rem] md:text-[2.5rem]">Introducing</span>{" "}
          <span className="text-[1.5rem] font-bold md:text-[2.5rem]">SuperScore</span>
        </h1>
        <div className=" sm:px-5  md:px-10 md:py-5">
          <h2 className='text-primary '>
            SuperScore: Your property listing scores out of 100.
          </h2 >
          <p className="pt-2">
            The SuperScore is calculated by looking at several things around the
            property, like how close it is to hospitals, schools, buses and
            trains, banks, pharmacies, shops, ATMs, parks, restaurants, and major
            roads.
          </p>
          <p className="pt-2">
            In addition, the score reflects the quality of your property’s visuals, construction, and age, and ensures all the information provided is accurate and up-to-date. By combining all these elements, the SuperScore helps both buyers and sellers get a clear, reliable assessment of the property’s value and appeal.
          </p>
          <div>
            <h3 className='text-primary font-bold mt-2' >
              SuperScore depends on
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full max-w-5xl mx-auto mt-8 mb-4">
            {mScoreContent.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="flex items-center justify-center mb-2">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={40}
                    height={40}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <p className="text-xs text-center text-[#231F20] font-medium leading-tight">{item.title}</p>
              </div>
            ))}
          </div>


          <div>
            <h3 className="text-primary font-bold flex items-center pt-[30px]">
              How To Increase Your SuperScore
            </h3>
            <div className="flex flex-col mt-5 md:flex-row items-center lg:gap-10">
              <Image className="pt-[10px] w-[50%] max-md:w-full " src={SuperVerificationIllustration} alt="image" />
              <div className="flex flex-col gap-5 justify-start">
                <h3 className="py-3">Share Genuine Details for a Smooth Experience</h3>
                <ol className="list-decimal font-semibold pl-5">
                  <li>
                    <p >
                      Providing accurate information, along with high-quality photos and videos, is essential for maintaining trust and transparency on our platform.
                    </p>
                  </li>
                  <li className="pt-2">
                    <p >
                      Any attempts to manipulate or inflate your SuperScore will result in immediate action, including the permanent blocking of your account and related listings.
                    </p>
                  </li>
                  <li className="pt-2">
                    <p >
                      Fraudulent activity violates our platform’s terms and conditions, and we reserve the right to prevent future listings from your account.
                    </p>
                  </li>
                  <li className="pt-2">
                    <p>
                      Integrity is key—our goal is to create a safe, reliable space for both buyers and sellers to engage honestly.
                    </p>
                  </li>
                </ol>
              </div>
            </div>



            <div className="flex flex-col-reverse mt-5 md:flex-row items-center lg:gap-10 ">
              <div className="flex flex-col gap-5 justify-start">
                <h3 className="pt-3 flex items-center">
                  Get Your Property SuperVerified: Enhance Your SuperScore
                </h3>
                <p >
                  Verification plays a key role in increasing your SuperScore, contributing up to 15%. By completing the property verification process, which includes live camera verification, e-KYC, document verification, and adding high-quality property images, you can significantly enhance your score. This not only builds trust but also raises your listing’s visibility and credibility.
                </p>
              </div>
              <Image className="pt-[5px] w-[50%] max-md:w-full" src={img1} alt="image" />
            </div>
            <div className="flex flex-col mt-5 md:flex-row items-center lg:gap-10">
              <div className="flex justify-center items-center w-full md:w-[40%]">
                <Image className="pt-[10px] max-md:w-[200px]"
                  src={img2} alt="image" />
              </div>
              <div className="flex flex-col gap-5 justify-start w-full md:w-[60%]">
                <h3 className="">Provide Accurate Location: Enhance Your SuperScore</h3>
                <p>
                  We use precise location coordinates to gather information about your property’s surroundings. If your property is situated in a desirable area close to key amenities such as hospitals, schools, public transport, banks, pharmacies, shops, ATMs, parks, restaurants, and highways, it will receive a higher SuperScore. The accuracy of your property's location plays a crucial role in determining your score, so providing exact details can significantly improve its visibility and appeal.
                </p>
              </div>
            </div>
            <div className="flex flex-col-reverse mt-4 md:flex-row items-center lg:gap-10">
              <div className="flex flex-col gap-5 justify-start w-full md:w-[60%]">
                <h3 className="pt-[30px]">Listing Details Matter: Every Detail Counts for a Better SuperScore </h3>
                <p>
                  The more detailed and accurate your property listing is, the higher your SuperScore will be. Information like available amenities, furnishing details, and the facilities provided can greatly impact your score. While filling out every detail might feel like a task, it’s a crucial step in enhancing your SuperScore and increasing your property’s visibility. By taking the time to provide thorough information, you’re ensuring that your listing stands out in the best way possible.
                </p>
              </div>
              <div className="flex justify-center items-center w-full md:w-[40%]">
                <Image
                  className="pt-[10px] max-md:w-[200px]"
                  src={img3}
                  height={200}
                  width={200}
                  alt="image"
                />
              </div>
            </div>
            <div className="flex flex-col  max-md:mt-0 md:flex-row items-center lg:gap-10">
              <div className="flex justify-center items-center w-full md:w-[30%]">

                <Image src={img4} className=" "
                  height={200}
                  width={200}
                  alt="image" />
              </div>
              <div className="flex flex-col gap-5 justify-start w-full md:w-[70%]">
                <h3 className="py-3">
                  Use High-Quality Photos and Videos: Showcase Your Property in the Best Light
                </h3>
                <p>
                  Enhance your listing by uploading high-quality photos from multiple angles, along with engaging videos that truly capture your property. Pair these visuals with a clear, descriptive narrative that highlights its unique features. This not only raises your listing's score but also increases its visibility, helping you attract more potential buyers and make a lasting impression.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="my-3 sm:px-5  md:px-10 flex flex-col ">
          <h2 className="pb-2">FAQs</h2>
          <Mscore />
        </div>
      </div>
    </div>
  )
}
export default index