import { useState, useEffect, useRef } from "react";
import Stepper from "@/components/Stepper/Stepper";
import Step1 from "../Post-Project/Step1";
import Step2 from "../Post-Project/Step2";
import Step3 from "../Post-Project/Step3";
import Step4 from "../Post-Project/Step4";
import Step5 from "../Post-Project/Step5";
import Image from "next/image";
import newbackButton from '../../../assets/ButtonIcons/newbackButton.svg';
import { useRouter } from "next/router";
import { getLogger } from "@/helper/logger";
import { toast } from "react-toastify";
import {
    PROJECT_UPDATE_ROUTE,
    PUT_REQ, PROJECT_STEP_ONE,
    PROJECT_STEP_TWO, PROJECT_STEP_THREE, PROJECT_STEP_FOUR, PROJECT_STEP_FIVE,
    BACK, CONTINUE_TEXT, PROJECT_STEP_SEO, PREVIEW_POST_PROJECT, PROJECT_DESCRIPTION_MISSING,
    SELECT_DROPDOWN, PROJECT_STEP_1_CHECKS,
    PROJECT_KEYS,
    PROJECT_RERA_DETAILS_TITLE
} from "@/text";
import { makeApiRequest } from "@/utils/utils";
import style from './index.module.css';
import StepRera from "../Post-Project/StepRera";
import ProjectSEO from '../Post-Project/ProjectSEO';
import { COMPONENTS } from "@/textV2";

const EditProjectModal = ({ isOpen, onClose, initialProjectData, setEditUpdate, editUpdate, refresh }) => {
    const [projectData, setProjectData] = useState(initialProjectData);
    const [developerDetail, setDeveloperDetail] = useState(initialProjectData?.developerDetail || {});
    const [isLoading, setIsLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [unitList, setUnitList] = useState(initialProjectData?.projectUnits || []);
    const [landAmenity, setLandAmenity] = useState({});
    const [selectDropdown, setSelectDropdown] = useState(true);
    const [activeInput, setActiveInput] = useState(false);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [isplotRange, setIsPlotRange] = useState(false)
    const { POST_PROJECT_COMPO } = COMPONENTS
    const { indexFileText } = POST_PROJECT_COMPO
    const isProjectEdit = true
    const isLand =
        projectData?.projectSubType === indexFileText.residentialPlot ||
        projectData?.projectSubType === indexFileText.residentialLand ||
        projectData?.projectSubType === indexFileText.farmHouse ||
        projectData?.projectSubType === indexFileText.commercialLand ||
        projectData?.projectSubType === indexFileText.warehouse ||
        projectData?.projectSubType === indexFileText.godown ||
        projectData?.projectSubType === indexFileText.scoPlot ||
        projectData?.projectSubType === indexFileText.industrialLand ||
        projectData?.projectSubType === indexFileText.industrialShed ||
        projectData?.projectSubType === indexFileText.agriculturalLand
    const logger = getLogger();
    const modalContentRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        if (modalContentRef.current) {
            modalContentRef.current.scrollTop = 0;
        }
    }, [currentStep]);
    useEffect(() => {
        if (initialProjectData?.developerDetail) {
            const developerData = { ...initialProjectData.developerDetail };
            if (!developerData.developerLogoUrl || !Array.isArray(developerData.developerLogoUrl)) {
                developerData.developerLogoUrl = [];
            } else {
                developerData.developerLogoUrl = developerData.developerLogoUrl.map(item => {
                    if (typeof item === 'string') {
                        return { url: item };
                    } else if (item && typeof item === 'object' && item.url) {
                        return item;
                    } else {
                        return { url: '' };
                    }
                }).filter(item => item.url);
            }
            setDeveloperDetail(developerData);
        }
    }, [initialProjectData]);

    const handleNext = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        if (currentStep < steps.length - 1) {
            if (currentStep === 0) {
                setCurrentStep(1)
            } else if (currentStep === 1) {
                setCurrentStep(2)
            } else if (currentStep === 2) {
                setCurrentStep(3)
            } else if (currentStep === 3) {
                setCurrentStep(4)
            } else if (currentStep === 4) {
                setCurrentStep(5)
            } else if (currentStep === 5) {
                setCurrentStep(6)
            }
        }
    }
    const handleStepOne = () => {
        if (!selectDropdown) {
            toast.error(SELECT_DROPDOWN)
            return
        }
        if (isLand) {
            setProjectData(prevData => {
                const { flooring, ...restData } = prevData;
                return restData;
            });
        }
        const check = checkFieldStepOne();
        if (!check) {
            return
        }
        // const developerCheck = checkDeveloperFields();
        // if (!developerCheck) {
        // return
        // }
        handleNext()
    }
    const handleBack = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };
    const handleStepRera = () => {
        handleNext();
    };

    const handleStepTwo = () => {
        if (unitList.length === 0) {
            toast.error(indexFileText.missingUnitDetails);
            return;
        }
        setProjectData({
            ...projectData,
            projectUnits: unitList
        });
        handleNext();
    };

    const handleStepThree = () => {
        const check = checkFieldStepThree();
        if (!check) {
            return;
        }
        setProjectData({
            ...projectData,
            landAmenities: landAmenity
        });
        handleNext();
    };

    const handlePhotoAndVideoSubmit = () => {
        if (!projectData.projectImages) {
            return;
        }
        handleNext();
    };

    const handleDescriptionSubmit = () => {
        if (!projectData.projectDescription) {
            toast.error(PROJECT_DESCRIPTION_MISSING);
            return;
        }
        handleNext();
    };

    const handleFinish = async () => {
        try {
            setIsLoading(true);
            const updatedProjectData = {
                ...projectData,
                developerDetail: developerDetail
            };
            const response = await makeApiRequest(PUT_REQ, `${PROJECT_UPDATE_ROUTE}/${projectData._id}`, updatedProjectData);
            setProjectData(response?.data?.result);
            onClose();
            if (refresh) {
                router.reload();
                return;
            }
            setEditUpdate(!editUpdate);
            router.push(router.asPath);
        } catch (error) {
            logger.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const checkFieldStepOne = () => {
        for (const check of PROJECT_STEP_1_CHECKS) {
            const key = Object.keys(check)[0];
            if (!projectData[key]) {
                toast.error(check[key]);
                return false;
            }
        }
        return true;
    };

    // const checkDeveloperFields = () => {
    //     for (const check of DEVELOPER_CHECKS) {
    //         const key = Object.keys(check)[0];
    //         const value = developerDetail[key];
    //         if (key === 'developerLogoUrl') {
    //             if (!value || !Array.isArray(value) || value.length === 0) {
    //                 toast.error(check[key]);
    //                 return false;
    //             }
    //         }
    //         // else {
    //         //     // For other fields, check if they exist and are not empty
    //         //     if (!value || (typeof value === 'string' && value.trim() === '')) {
    //         //         toast.error(check[key]);
    //         //         return false;
    //         //     }
    //         // }
    //     }
    //     return true;
    // };
    const checkFieldStepThree = () => {
        if (!projectData[PROJECT_KEYS.PROJECT_HIGHLIGHT_TAGS] || projectData[PROJECT_KEYS.PROJECT_HIGHLIGHT_TAGS].length < 5) {
            toast.error(indexFileText.projectHighlightMissing)
            return false
        }
        // if (!isLand) {
        //     for (const check of PROJECT_STEP_3_APARTMENT_CHECKS) {
        //         const key = Object.keys(check)[0];
        //         if (!projectData[key]) {
        //             toast.error(check[key]);
        //             return false;
        //         }
        //     }
        //     return true;
        // } else {
        return true;
        // }
    };
    const steps = [
        {
            title: PROJECT_STEP_ONE,
            buttons: [{ label: CONTINUE_TEXT, onClick: [handleStepOne] }],
            component:
                <Step1
                    projectData={projectData}
                    setProjectData={setProjectData}
                    developerDetail={developerDetail}
                    setDeveloperDetail={setDeveloperDetail}
                    setSelectDropdown={setSelectDropdown}
                    edit={true}
                />,
            isProject: true
        },
        {
            title: PROJECT_RERA_DETAILS_TITLE,
            buttons: [{ label: BACK, onClick: [handleBack] }, { label: CONTINUE_TEXT, onClick: [handleStepRera,] }],
            component: <StepRera projectData={projectData} setProjectData={setProjectData} />,
            isProject: true
        },
        {
            title: PROJECT_STEP_TWO,
            buttons: [{ label: BACK, onClick: [handleBack] }, { label: CONTINUE_TEXT, onClick: [handleStepTwo] }],
            component: <Step2
                projectData={projectData}
                setProjectData={setProjectData}
                unitList={unitList}
                setUnitList={setUnitList}
                edit={true}
                activeInput={activeInput}
                setActiveInput={setActiveInput}
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                isplotRange={isplotRange}
                setIsPlotRange={setIsPlotRange}
                isProjectEdit={isProjectEdit}
            />,
            isProject: true
        },
        {
            title: PROJECT_STEP_THREE,
            buttons: [{ label: BACK, onClick: [handleBack] }, { label: CONTINUE_TEXT, onClick: [handleStepThree] }],
            component: <Step3
                projectData={projectData}
                setProjectData={setProjectData}
                landAmenity={landAmenity}
                setLandAmenity={setLandAmenity}
                edit={true}
            />,
            isProject: true
        },
        {
            title: PROJECT_STEP_FOUR,
            buttons: [{ label: BACK, onClick: [handleBack] }, { label: CONTINUE_TEXT, onClick: [handlePhotoAndVideoSubmit] }],
            component: <Step4 projectData={projectData} setProjectData={setProjectData} edit={true} />,
            isProject: true
        },
        {
            title: PROJECT_STEP_FIVE,
            buttons: [{ label: BACK, onClick: [handleBack] }, { label: CONTINUE_TEXT, onClick: [handleDescriptionSubmit] }],
            component: <Step5 projectData={projectData} setProjectData={setProjectData} edit={true} />,
            isProject: true
        },
        {
            title: PROJECT_STEP_SEO,
            buttons: [{ label: BACK, onClick: [handleBack] }, { label: PREVIEW_POST_PROJECT, onClick: [handleFinish] }],
            component: <ProjectSEO projectData={projectData} setProjectData={setProjectData} edit={true} />,
            isProject: true
        },
    ];

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-[2000] bg-black bg-opacity-50">
                    <div ref={modalContentRef} className={`rounded-xl h-full pr-3 w-[1000px] overflow-y-auto bg-[#FFFFFF] ${style.customScroll} `}>
                        <h2 className="text-center py-4 font-bold text-[24px] ">Edit Project</h2>
                        <Image className="cursor-pointer h-10 w-10 ml-auto pr-1 -mt-14 fixed top-[60px] right-[135px]" src={newbackButton} onClick={onClose} alt="close" />
                        <div className={`overflow-hidden ml-6 mr-6`}>
                            <Stepper
                                ButtonDisable={false}
                                steps={steps}
                                currentStep={currentStep}
                                setCurrentStep={setCurrentStep}
                                edit={true}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditProjectModal;
