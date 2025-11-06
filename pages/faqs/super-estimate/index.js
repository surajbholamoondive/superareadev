import React from "react";
import Image from "next/image";
import Img2 from "@/assets/Images/Mestimate/mestimateImg2.png";
import Img3 from "@/assets/Images/Mestimate/mestimateImg3.png";
import Img4 from "@/assets/Images/Mestimate/mestimateImg4.png";
import address from "@/assets/Images/Mestimate/address.svg";
import Style from "./index.module.css"
import BackgroundImage from '../../../assets/NonLoggedUserImages/backgroundImage.svg'

const mestimate = () => {
  return (
    <div className={Style.container}
      style={{
        backgroundImage: `url(${BackgroundImage.src})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center'
      }}
    >
      <div className=" custom-section">

        <h2 className="text-center text-primary font-thin">
          <span className="font-normal text-[1.5rem] md:text-[2.5rem]">Introducing</span>{" "}
          <span className="text-[1.5rem] font-bold md:text-[2.5rem]">SuperEstimate</span>
        </h2>


        <div className=" sm:px-5  md:px-10 md:py-8">
          <div className="  pt-0 justify-between items-center">
            <h2 className="text-primary mt-[20px] md:mt-0">
              SuperEstimate : Predict your property's worth
            </h2>
            <p className="pt-2 leading-loose">
              The SuperEstimate is a method that uses artificial intelligence (AI) and machine learning (ML) to figure out the value of a house based on what houses are selling in your area. The more details it has about a house, like its size, number of rooms, bathrooms, and parking space, the better it can predict its value. This method also pays attention to how house prices are changing in the area and gets better at making guesses by learning from this information.
            </p>
          </div>
          <div className="flex px-5 max-md:flex-col justify-evenly items-center my-10 gap-y-5 ">
            <Image src={Img2} height={350} width={350} />
            <div className="flex gap-2 items-center border-2 border-dashed border-primary rounded-md px-2 p-1">
              <Image src={address} height={40} width={40} />
              <h3 className="text-primary font-bold" >Estimate ₹ 90L - ₹ 1.5CR</h3>
            </div>
          </div>
          <div className="flex max-md:flex-col justify-center items-center border-2 border-dashed border-primary rounded-xl px-5 lg:px-[180px] py-6">
            <div className="flex-1 flex flex-col justify-center">
              <h2 className="text-[#5F5F5F] font-semibold text-base md:text-lg mb-2">
                How accurate is SuperEstimate?
              </h2>
              <p className=" text-sm md:text-base mb-2">
                We continuously monitor the accuracy of SuperEstimate by comparing
              </p>
              <ul className="list-disc pl-5  text-xs md:text-sm space-y-1 leading-loose">
                <li>
                  Actual sales prices for recently sold property over a 3-month period.
                </li>
                <li>
                  Those property's estimates at the end of the month prior to sale.
                </li>
              </ul>
            </div>
            <Image src={Img3} alt="SuperEstimate Accuracy" width={200} height={200} className="opacity-90 " />
          </div>
          <div className="flex  flex-col-reverse mt-10 md:flex-row justify-between items-center lg:gap-10">

            <div className="w-1/2 max-md:w-full p-10 ">
              <Image className=" w-[full]" src={Img4} alt="image" />
            </div>
            <div className="w-1/2 max-md:w-full flex flex-col gap-5 justify-start">
              <h2 className="py-3 text-[#5F5F5F] ">How is SuperEstimate calculated?</h2>

              <p className=" text-sm md:text-base mb-2 leading-loose">
                The SuperEstimate calculates property values using machine learning, which collects information from across the country. It gathers data from various real estate listings and agencies.
              </p>
              <ul className="list-disc pl-5  text-xs md:text-sm space-y-1 leading-loose">
                <li>
                  SuperEstimates provide you exact details about the size, location, and number of bathrooms.
                </li>
                <li>
                  Sale-related details such as the listing price, the description of the home, comparable homes in the area, and the time it has been listed.
                </li>
                <li>
                  Market trends, which vary seasonally and influence buyer interest in properties
                </li>
              </ul>
            </div>

          </div>
        </div>
        {/* <div className="my-3 sm:px-5  md:px-10 flex flex-col ">
          <h2 className="pb-2">FAQs</h2>
          <MEstimate />
        </div> */}
      </div>
    </div >
  );
};

export default mestimate;
