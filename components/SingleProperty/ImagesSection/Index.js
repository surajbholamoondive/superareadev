const ImagesSection = () => {
    return ( 
    <div className="bg-black mt-4 px-7 h-[60vh]">
        
    </div>
    );
}
 
export default ImagesSection;



// {/* <div className="w-12/12 max-md:flex-col  flex items-start lg:gap-2 px-2 mt-4 gap-1 m-[5.5px]">
          
//           <div className="w-8/12 max-md:w-full  relative rounded-md ">
//             <div className="aspect-[160/86] ">
             
//               <div
//                 style={{
//                   backgroundImage: `url("https://media.istockphoto.com/id/1159873271/photo/residential-area-in-the-city-modern-apartment-buildings.jpg?s=1024x1024&w=is&k=20&c=1gbLy7yUxgRLnK1H4zMIUi08Vsg62Ye_s0jOmDMWYq0=")`,
//                   backgroundSize: "cover",
//                   backgroundPosition: "center",
//                   position: "absolute",
//                   top: 0,
//                   left: 0,
//                   right: 0,
//                   bottom: 0,
//                   borderRadius: "6px",
//                   zIndex: 0
//                 }}
//               />

             
//               <div
//                 className="absolute lg:w-[130px] md:w-[130px] max-md:w-[110px] max-md:h-[30px] sm:w-[120px] max-md:top-2 w-[110px] lg:h-[40px] md:h-[40px] h-[35px]  flex  px-6 justify-center items-center text-white  lg:top-4 md:top-3 top-0 lg:left-4 md:left-3 left-1"
//                 style={{
//                   borderRadius: "43px",
//                   background: "rgba(1, 129, 145, 0.47)",
//                   flexShrink: 0,
//                   zIndex: 1,
//                 }}
//               >
//                 <Image
//                   className="bg-contain lg:w-[20px] max-md:h-[15px] max-md:w-[15px] lg:h-[25px] md:w-[20px] md:h-[23px] sm:w-[19px] sm:h-[20px] w-[19px] h-[20px]"
//                   src={EYE}
//                   alt="eye SVG"
//                   height={20}
//                   width={20}
//                 />
//                 <span
//                   className="lg:text-[14px] md:text-[12px] ml-1 sm:text-[12px] text-[9px] font-semibold"
//                   style={{ color: "#FFF" }}
//                 >
//                   {property?.totalViews?.length} Views
//                 </span>
//               </div>

              
//               <div className="absolute flex justify-center md:top-5 top-3 lg:right-0 md:right-0 right-0 sm:right-0 max-md:mr-3 gap-2 md:w-[100px] lg:w-[100px] text-white rounded-tl-md z-1">
//                 <LikeUnlike id={id} />
//                 <LikeShareButtons id={id} />
//               </div>

              
//               {auth?.userResult &&
//                 property?.totalViews?.map((e, index) => {
//                   if (e === auth.userResult._id) {
//                     return (
//                       <div
//                         className="absolute items-center max-md:w-[80px] max-md:h-[30px] lg:w-[130px] md:w-[130px] sm:w-[120px] w-[110px] lg:h-[40px] md:h-[40px] h-[35px] flex justify-center bottom-4 lg:right-5 md:right-5 sm:right-5 right-3 text-white rounded-tl-md"
//                         style={{
//                           borderRadius: "43px",
//                           background: "rgba(147, 22, 2, 0.35)",
//                           flexShrink: 0,
//                           zIndex: 1,
//                         }}
//                         key={index}
//                       >
//                         <span
//                           className="lg:text-[14px] md:text-[12px] sm:text-[12px] text-[9px] font-semibold"
//                           style={{ color: "#FFF" }}
//                         >
//                           Already Seen
//                         </span>
//                       </div>
//                     );
//                   }
//                   return null; // Return null when the condition is not met
//                 })}
//             </div>
//           </div>

          
//           <div className="w-4/12 max-md:w-full ">
//             <div className="grid grid-cols-2  lg:gap-[6px] gap-[3px] ">
              
//               <div className="bg-gray-400 w-full max-md:hidden aspect-video rounded-md overflow-hidden">
//                 <Image
//                   className="w-full h-full"
//                   src={
//                     property?.images[0].url
//                       ? property?.images[0].url
//                       : DEFAULT_IMAGE
//                   }
//                   alt="First Image"
//                   height={400}
//                   width={500}
//                 />
//               </div>

              
//               <div className="w-full bg-gray-400 max-md:hidden aspect-video  rounded-md overflow-hidden">
//                 <Image
//                   className="w-full h-full"
//                   src={
//                     property?.images[1]?.url
//                       ? property?.images[1]?.url
//                       : DEFAULT_IMAGE
//                   }
//                   alt="First Image"
//                   height={400}
//                   width={500}
//                 />
//               </div>

              
//               <div className="w-full bg-gray-400 max-md:hidden aspect-video rounded-md overflow-hidden">
//                 <Image
//                   className="w-full h-full"
//                   src={
//                     property?.images[2]?.url
//                       ? property?.images[2]?.url
//                       : DEFAULT_IMAGE
//                   }
//                   alt="First Image"
//                   height={400}
//                   width={500}
//                 />
//               </div>
            
//               <div className="w-full bg-gray-400 max-md:hidden aspect-video rounded-md overflow-hidden">
//                 <Image
//                   className="w-full h-full"
//                   src={
//                     property?.images[3]?.url
//                       ? property?.images[3]?.url
//                       : DEFAULT_IMAGE
//                   }
//                   alt="First Image"
//                   height={400}
//                   width={500}
//                 />
//               </div>

//               const Float_longitude = parseFloat(longitude);
//   const Float_latitude = parseFloat(latitude);


//               <div className="w-full  bg-gray-400 aspect-square rounded-md overflow-hidden " >

//                 <OsmMapWithNearby localityLat={property?.localityLatitude} localityLng={property?.localityLongitude} nearby={nearbyPlaces} property={property} />
//               </div>
             

             
//               <div className="w-full  bg-gray-400 aspect-square rounded-md overflow-hidden relative ">
//                 <Image
//                   className="w-full h-full"
//                   src={property?.images[0]?.url}
//                   alt="First Image"
//                   height={400}
//                   width={500}
//                 />

//               </div>
//               <div className="w-full  bg-gray-400 aspect-square rounded-md overflow-hidden relative ">
//                 <Image
//                   className="w-full h-full"
//                   src={property?.images[3]?.url}
//                   alt="First Image"
//                   height={400}
//                   width={500}
//                 />
//                 <div className="absolute inset-0 flex justify-center items-center text-white bg-gray-800 bg-opacity-75">
//                   <p className="text-2xl font-semibold">
//                     {property?.images?.length - 2} +
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div> */}