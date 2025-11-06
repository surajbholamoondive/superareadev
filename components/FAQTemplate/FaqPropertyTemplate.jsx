import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FaqPropertyTemplate = ({ propertyData }) => {
  const { nearbyPlaces } = propertyData
  const [reraApproved]=useState((propertyData?.reraApproved && propertyData?.reraApproved==='Yes') ? 'Yes': 'No')
  const metroStation = nearbyPlaces?.find(item => item.hasOwnProperty("metroStations"));
  const railwayStation = nearbyPlaces?.find(item => item.hasOwnProperty("railwayStations"));
  const airPort = nearbyPlaces?.find(item => item.hasOwnProperty("aerodrome"));
  const [openIndex, setOpenIndex] = useState(null);
//   const beds = projectBedroomString(propertyData?.projectUnits)
//   const min =  projectPriceMap(propertyData?.projectUnits,true)
  const hospitalName =nearbyPlaces?.hospital?.tags?.name || 'Navkar Child Care Centre and Nursing Home, BMC Maternity Hospital and Apex Multispeciality Hospitals.'
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  let faqTemplates = [
    // {
    //   question: `What is pricing of ${propertyData?.projectTitle}?`,
    //   answer: `The price of ${propertyData?.projectTitle} starts from ${min}.`

    // },
    {
      question: `Is ${propertyData?.propertyTitle} RERA approved?`,
      answer: ` ${reraApproved}, ${propertyData?.propertyTitle} is ${ reraApproved==='No' ? 'not a' : 'a'} RERA approved property.`

    },
    {
      question: `What is location of ${propertyData?.propertyTitle}?`,
      answer: `The ${propertyData?.propertyTitle} is located at ${propertyData?.locality}, ${propertyData?.city}, ${propertyData?.state}.`

    },
    {
      question: `Are there any sports facility in ${propertyData?.propertyTitle}?`,
      answer: `${propertyData?.propertyTitle} has Indoor Games facilities to offer.`
    },
    {
      question: `Are there any safety facilities in this project?`,
      answer: `To make its residents feel safe, ${propertyData?.propertyTitle} has 24x7 Security.`
    },
    // {
    //   question: `What type of room configurations available in project?`,
    //   answer: `The ${propertyData.projectTitle} is available in ${beds} configurations.`
    // },
    {
      question: `What are the government charges when buying a Apartment in ${propertyData?.propertyTitle}?`,
      answer: `Buyers need to pay minimum 5.0% stamp duty and 1% of transaction value or max up to Rs 30,000 as registry charges when buying a property at ${propertyData?.propertyTitle}`
    },
    {
      question: `Are there are good hospitals in the vicinity of ${propertyData?.propertyTitle}?`,
      answer: `Yes, there are good hospitals in close vicinity of ${propertyData?.propertyTitle} such as ${hospitalName}.`
    },
    // {
    //   question: `What all property types are there in project?`,
    //   answer: `${propertyData?.projectTitle} offers ${propertyData?.projectSubType}.`
    // }
  ];
  if (metroStation?.metroStations?.distance) {
    faqTemplates.unshift({
      question: `Are there any metro station nearby ${propertyData?.propertyTitle}?`,
      answer: `Yes, the nearest metro station to ${propertyData?.propertyTitle} is approximately ${metroStation?.metroStations?.distance} kilometers away . `
    });
  }
  if (airPort?.aerodrome?.distance) {
    faqTemplates.splice(3, 0, {
      question: `How far is ${propertyData?.projectTitle} from airport?`,
      answer: `${propertyData?.projectTitle} is ${airPort?.aerodrome?.distance} Km away from airport.`
    });
  }
  if (railwayStation?.railwayStations?.distance) {
    faqTemplates.splice(4, 0, {
      question: `How far is railway station from ${propertyData?.projectTitle}?`,
      answer: `${propertyData?.projectTitle} is ${railwayStation?.railwayStations?.distance} Km away from the railway station.`
    });
  }
  return (
    <div className="mx-auto pb-8 pt-2">
      <div className="space-y-4">
        {faqTemplates?.map((faq, index) => (
          <div key={index} className="border border-gray-300 bg-[#fefefe] rounded-lg p-3">
            <button onClick={() => toggleFAQ(index)} className="w-full text-left flex justify-between items-center text-secon focus:outline-none">
              <p className="text-base ">{faq?.question} </p>
              <ExpandMoreIcon className={`transform transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}/>
            </button>
            {openIndex === index && (<p className="mt-2 text-gray-500">{faq?.answer}</p>)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqPropertyTemplate;
