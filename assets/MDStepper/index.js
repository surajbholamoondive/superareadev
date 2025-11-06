import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/auth";
import { toast } from "react-toastify";
import { useData } from "@/context/data";
import HelloWorldModal from "@/components/MobileNumberverify/index";
import useWindowWidth from "@/context/useWindowWidth";
import { ADDITIONAL, ADDITIONAL_DETAILS, ADD_PROPERTY_ROUTE, ADD_PROPERTY_SUCCESS, LOGIN, PROPERTY_DETAILS, RESIDENTIAL, WHATS_YOUR_PLAN, BACK_BUTTON, CONTINUE_TEXT, PRIVIEW_AND_POST_PROPERTY, COMMA} from "@/text";
import { makeApiRequest, useNavigateToPath } from "@/utils/utils";
import Step4 from "@/components/PostProperty/Step4";
import Step1 from "@/components/PostProperty/Step1";
import Step2 from "@/components/PostProperty/Step2";
import Step3 from "@/components/PostProperty/Step3";
import Step5 from "@/components/PostProperty/Step5";
import MDStepper from "@/components/MDStepper/MDStepper";

export default function AddProperty() {
  const [declarationOne, setDeclarationOne] = useState(true)
  const [declarationTwo, setDeclarationTwo] = useState(true)
  const [DATA, setDATA] = useState({});
  const navigatePath = useNavigateToPath();
  const [data, setData] = useData();
  const windowWidth = useWindowWidth();
  const [currentStep, setCurrentStep] = useState(0);
  const [auth] = useAuth();
  const [propertyId, setPropertyId] = useState([]);
  const [isHelloWorldModalOpen, setHelloWorldModalOpen] = useState(false);
  const [sellOrRent, setSellOrRent] = useState(false)
  const [propertyDetails, setPropertyDetails] = useState(false)
  const [listing, setListing] = useState("Rent");
  const [trigger, setTrigger] = useState(DATA?.propertySubType ? DATA?.propertySubType : RESIDENTIAL);
  const [additionalDetails, setAdditionalDetails] = useState(false)
  useEffect(() => {
    if (Object.keys(DATA).length > 0) {
      localStorage.setItem("PROPERTY_DATA", JSON.stringify(DATA));
    }
  }, [DATA]);
  function convertToSquareFeet(areaType, areaValue) {
    const conversionFactors = {
      'square meters': 10.764,

      'acres': 43560,
      'square yards': 9,
      'square feet': 1,

    };

    const conversionFactor = conversionFactors[areaType];
    if (conversionFactor !== undefined) {
      const squareFeet = areaValue * conversionFactor;
      return squareFeet;
    } else {
      console.error('Invalid area type. Conversion factor not defined.');
      return null;
    }
  }
  useEffect(() => {
    const _data = JSON.parse(localStorage.getItem("PROPERTY_DATA") || "{}");
    setDATA(_data);
    setTrigger(_data?.propertyType)
    setListing(_data?.listing)
  }, []);

  useEffect(() => {
    localStorage.removeItem("PROPERTY_DATA");
    setDATA({})
  }, [listing]);


  const handleFinish = async () => {
    if (DATA.propertySizeType && DATA.propertySize) {
      setDATA((prevDATA) => ({
        ...prevDATA,
        propertySize: convertToSquareFeet(DATA.propertySizeType, DATA.propertySize),
      }));
    }
    if (!auth.userResult) {
      toast.error(LOGIN);
      return;
    }
    const res = await makeApiRequest(`post`, `${ADD_PROPERTY_ROUTE}`, DATA)
    if (res) {
      setDATA({
        DATA: null,
      });
      const M_verify = res?.data?.result?.property_Result?._id;
      setPropertyId(M_verify);
      toast.success(ADD_PROPERTY_SUCCESS);
      setData("");
      navigatePath(`listing`)
    }
  };
  const handleNext = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if(DATA?.propertyTitle){
      const combinedAddress =DATA?.locality + COMMA + DATA?.city
      setDATA({...DATA, addressLabel: combinedAddress , propertySearchRegex: combinedAddress})
    } 
    if (currentStep < steps.length - 1) {
      if (sellOrRent && currentStep === 0 && propertyDetails) {
        setCurrentStep(1);
      }
      else if (propertyDetails && currentStep === 1) {
        setCurrentStep(2);
      }
      else if (propertyDetails && currentStep === 2) {
        setCurrentStep(3)
      }
      else if (currentStep === 3) {
        setCurrentStep(4)
      }
      else {
        toast.error("Please complete all required fields.");
      }
    }
    setTrigger(DATA?.propertySubType ? DATA?.propertySubType : DATA?.propertyType)
  };
  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
    setTrigger(DATA?.propertySubType ? DATA?.propertySubType : DATA?.propertyType)
  };
  const steps = [
    {
      title: WHATS_YOUR_PLAN,
      buttons: [{ label: 'Continue', onClick: handleNext }],
      component: <Step1
        sellOrRent={sellOrRent}
        setSellOrRent={setSellOrRent}
        DATA={DATA}
        setDATA={setDATA}
        trigger={trigger}
        setTrigger={setTrigger}
        listing={listing}
        setListing={setListing}
        setPropertyDetails={setPropertyDetails}
        showCard={true}
      />,
    },
    {
      title: PROPERTY_DETAILS,
      buttons: [
        { label: BACK_BUTTON, onClick: handleBack },
        { label: CONTINUE_TEXT, onClick: handleNext }
      ],
      component: (<Step2
        DATA={DATA}
        setDATA={setDATA}
        trigger={trigger}
        setTrigger={setTrigger}
        listing={listing}
        setListing={setListing}
        setPropertyDetails={setPropertyDetails} />)
    },
    {
      title: ADDITIONAL_DETAILS,
      buttons: [
        { label: BACK_BUTTON, onClick: handleBack },
        { label: CONTINUE_TEXT, onClick: handleNext }
      ],

      component: (<Step3
        DATA={DATA}
        setDATA={setDATA}
        trigger={trigger}
        setTrigger={setTrigger}
        listing={listing}
        setListing={setListing}
        setPropertyDetails={setPropertyDetails}
        setAdditionalDetails={setAdditionalDetails}
      />)
    },
    {
      title: ADDITIONAL,
      buttons: [
        { label: BACK_BUTTON, onClick: handleBack },
        { label: CONTINUE_TEXT, onClick: handleNext }
      ],
      component: <Step4 DATA={DATA} setDATA={setDATA} trigger={trigger} setTrigger={setTrigger} setPropertyDetails={setPropertyDetails} listing={listing} setListing={setListing} />
    },
    {
      title: PRIVIEW_AND_POST_PROPERTY,
      buttons: [
        { label: BACK_BUTTON, onClick: handleBack },
        { label: PRIVIEW_AND_POST_PROPERTY, onClick: handleFinish, },
      ],
      component: (
        <Step5 
        DATA={DATA}
        setDATA={setDATA}
        trigger={trigger}
        setTrigger={setTrigger}
        setPropertyDetails={setPropertyDetails}
        setAdditionalDetails={setAdditionalDetails}
        listing={listing}
        setListing={setListing}
        setDeclarationOne={setDeclarationOne}
        setDeclarationTwo={setDeclarationTwo}
        declarationOne={declarationOne}
        declarationTwo={declarationTwo}
        />
      )
    },
  ];

  return (
    <div className="flex rounded-md">
      <div className={`${windowWidth > 1024 ? `w-full` : `w-[100%]`}`}>
        {/* <Stepper
          ButtonDisable={true}
          steps={steps}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          setDATA={setDATA}
          DATA={DATA}
          setPropertyDetails={setPropertyDetails}
          propertyDetails={propertyDetails}
          declarationOne={declarationOne}
          declarationTwo={declarationTwo}
        /> */}
        <MDStepper />
        <HelloWorldModal
          open={isHelloWorldModalOpen}
          onClose={setHelloWorldModalOpen}
        />
      </div>
    </div>
  );
}