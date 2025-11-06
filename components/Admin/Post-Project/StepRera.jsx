import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import dayjs from 'dayjs'
import { PROPERTY_SIZE_UNIT } from '@/text'
import { makeApiRequest } from '@/utils/utils'
import { toast } from 'react-toastify'
import ReraDetails from '@/components/Detail-Section/ReraDetail'
import ImageUploader from '@/components/ImageUpload/Upload'
import MDLabelAndInput from '@/components/MDLabelAndInput'
import MDContentSection from '@/components/SingleProperty/MDContentSection'
import faTrash from '../../../assets/ImageComponent/trash.svg'
import defaultIcon from '../../../assets/userDashboard/close.svg'
import PdfToImage from './pdf'
import { GLOBALLY_COMMON_TEXT, COMPONENTS } from '@/textV2'
const { POST_PROJECT_COMPO } = COMPONENTS
const { stepRera } = POST_PROJECT_COMPO
const { text, stepsReraCheck } = GLOBALLY_COMMON_TEXT

export const formStructure = {
  buttonName: "Add RERA",
  projectDocument: {
    title: "Project RERA Documents (Add one by one)",
  },
  reraDetail: {
    projectReraId: {
      type: "text",
      label: "RERA ID",
      isCapital: true,
      placeholder: "e.g. UPRERA1234567",
      tooltip: "Enter RERA ID for this project",
    },
    reraProjectName: {
      type: "text",
      label: "Project Name",
      placeholder: "e.g. Supertech ORB Tower-S",
    },
    reraProjectType: {
      label: "Project Type",
      options: ['Residential', 'Commercial', 'Industrial', 'Agricultural'],
      tooltip: "Select the project type as per RERA guidelines.",
    },
    projectStatus: {
      label: "Project Status",
      options: ["Completed", "Ongoing", "Planned"],
      tooltip: "Select the current status of the project",
    },
    projectStartDate: {
      type: "date",
      label: "Proposed Start date",
      placeholder: "Select start date",
      tooltip: "Proposed Start date of the project.",
    },
    projectCompletionDate: {
      type: "date",
      label: "Project Completion Date",
      placeholder: "Select completion date",
      tooltip: "Expected completion date of the project.",
    },

    sanctioningAuthority: {
      type: "text",
      label: "Sanctioning Authority",
      placeholder: "e.g. Noida Authority",
      tooltip: "The authority that has sanctioned the project.",
    },
    reraExternalLink: {
      type: "url",
      label: "RERA External Link",
      placeholder:
        "e.g. https://up-rera.in/Projectsummary?UI0aPA1ISD=UF8Qx/6W54k=&hfFlag=9emr4VdBw22M7BGjKtJWMPDI4s5cHQZP&NPJ6RAme=MYYUI/gB8HcZHZI2q2IYmOpXq4CzYELzV3jkGzL2LWE=&PaURJEMAN4=ZL9MNERkNdbfFjWsELVxTQ==&IRSAHEB=D6PY3lyims8=",
      tooltip: "Provide RERA link of this Project.",
    },
    projectTotalArea: {
      type: "text",
      isInputNumber: true,
      label: "Total Area",
      tooltip: "Total area of the project.",
      options: PROPERTY_SIZE_UNIT
    },
  },
};

const StepRera = ({ projectData, setProjectData }) => {
  const [imageKey, setImageKey] = useState(0)
  const [upload, setUpload] = useState(false)
  const [uploadStates, setUploadStates] = useState([false])
  const modalRef = useRef(null)
  const [reraId, setReraId] = useState([])

  const [DocumentUploadLoading, setDocumentUploadLoading] = useState(false)
  const [editingIndex, setEditingIndex] = useState(null);
  const [reraDetail, setReraDetail] = useState({
    projectReraId: projectData?.projectReraId || "",
    reraProjectName: projectData?.projectTitle || "",
    projectStatus: projectData?.projectStatus || "",
    reraProjectType: projectData?.reraProjectType || "",
    projectStartDate: projectData?.projectStartDate || "",
    projectCompletionDate: projectData?.projectCompletionDate || "",
    projectTotalArea: projectData?.projectTotalArea,
    projectTotalAreaUnit: projectData?.projectTotalAreaUnit || "",
    projectDocuments: projectData?.projectDocuments || [],
    sanctioningAuthority: projectData?.sanctioningAuthority || "",
    reraExternalLink: projectData?.reraExternalLink || "",
  })
  const [documents, setDocuments] = useState([
    {
      documentName: '',
      documentUrl: '',
    },
  ])
  const [brochureURLs, setBrochureURLs] = useState(
    documents?.documentUrl || null
  )
  const handleInputChange = (name, value) => {
    setProjectData((prevstate) => ({
      ...prevstate,
      [name]: value
    }))
    setReraDetail((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }
  const handleAreaUnitChange = (unit) => {
    setReraDetail((prevState) => ({
      ...prevState,
      projectTotalAreaUnit: unit
    }));
    setProjectData((prevstate) => ({
      ...prevstate,
      projectTotalAreaUnit: unit
    }));
  };

  useEffect(() => {
    setReraDetail((prevReraDetail) => ({
      ...prevReraDetail,
      projectDocuments: [...documents],
    }))
  }, [documents])



  const handleReraDocument = (index, name, value) => {
    setDocuments((prevDocuments) =>
      prevDocuments.map((doc, i) =>
        i === index ? { ...doc, [name]: value } : doc
      )
    )
  }


  
  const handleFormSubmit = () => {
   setReraDetail({
      projectReraId: "",
      projectStatus: stepRera.completed,
      projectType: stepRera.residential,
      projectStartDate: "",
      projectCompletionDate: "",
      projectTotalArea: "",
      projectTotalAreaUnit: "",
      projectDocuments: [],
      sanctioningAuthority: "",
      reraExternalLink: "",
    })
    setDocuments([
      {
        documentName: '',
        documentUrl: '',
      },
    ])
    setUploadStates([false])
    setEditingIndex(null);

    if (editingIndex != null) {
      setProjectData((prevState) => {
        const updatedReraDetails = prevState.projectReraDetails.map((detail, index) =>
          index === editingIndex ? reraDetail : detail
        );
        return {
          ...prevState,
          projectReraDetails: updatedReraDetails,
        };
      });
    } else {
      setProjectData((prevState) => ({
        ...prevState,
        projectReraDetails: [
          ...(prevState.projectReraDetails || []),
          reraDetail,
        ],
      }));
      return;
    }
  }

  const handleDocumentSelect = async (index, selectedFiles) => {
    if (selectedFiles.length === 0) {
      return;
    }
  const allowedFileTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!allowedFileTypes.includes(selectedFiles[0].type)) {
        setUploadStates((prevState) => {
          const newState = [...prevState];
          newState[index] = false;
          return newState;
        });
        return;
      }
    const formData = new FormData();
    formData.append('brochure', selectedFiles[0]);

    try {
      setDocumentUploadLoading(true);


      const response = await makeApiRequest(
        text.postType,
        `${process.env.NEXT_PUBLIC_API}user/${selectedFiles[0].type==="application/pdf"?"aws-brochure":"aws-image"}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (response.status === 200) {
        const { result } = response?.data || {};
        const newPhotoUrls = result?.brochureUrl||result?.imageUrls[0];

        setDocuments((prevState) =>
          prevState.map((doc, i) =>
            i === index ? { ...doc, documentUrl: newPhotoUrls } : doc
          )
        );

        setUploadStates((prevState) => {
          const newState = [...prevState];
          newState[index] = true;
          return newState;
        });
        setBrochureURLs(newPhotoUrls);
        setDocumentUploadLoading(false);
        setImageKey((prev) => prev + 1);
        toast.success(stepRera.documentUploadSuccess);
        setReraDetail((prevState) => ({
          ...prevState,
          projectDocuments: documents,
        }));
        setProjectData((prevstate) => ({
          ...prevstate,
          projectDocuments: documents
        }))
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDocumentUploadLoading(false);
    }
  };

  const deleteBrochure = async (index) => {
    try {
      const key = brochureURLs.substring(brochureURLs.lastIndexOf('/') + 1)
      const BUCKET_NAME = 'superarea-prod-s3'
      const response = await makeApiRequest(
        text.postType,
        `${process.env.NEXT_PUBLIC_API}user/remove-image`,
        { Bucket: BUCKET_NAME, Key: key },
        { headers: { 'Content-Type': 'application/json' } }
      )
      if (response.status === 200) {
        setDocuments((prevDocuments) =>
          prevDocuments.map((doc, i) =>
            i === index ? { ...doc, documentUrl: '' } : doc
          )
        )
        setUploadStates((prevState) => {
          const newState = [...prevState]
          newState[index] = false
          return newState
        })
        setBrochureURLs(null)
        toast.success(stepRera.documentDeleteSuccess)
        setUpload(false)
      }
    } catch (error) {
      console.error(error)
    }
  }



  const handleAddDocument = () => {
  
    setDocuments([...documents, { documentName: '', documentUrl: '' }])
    setUploadStates([...uploadStates, false])
  }
  const handleDeleteDocument = (index) => {
    const updatedDocuments = documents.filter((_, i) => i !== index)
    setDocuments(updatedDocuments)
    const updatedUploadStates = uploadStates.filter((_, i) => i !== index)
    setUploadStates(updatedUploadStates)
  }

  const deleteRera = (index) => {
    setProjectData((prev) => {
      const newArray = prev.projectReraDetails.filter((_, i) => i !== index)
      return {
        ...prev,
        projectReraDetails: newArray,
      }
    })
  }
  const editfunction = (index) => {
    if (modalRef.current) {
      modalRef.current.scrollIntoView({ top: 0, behavior: 'smooth' });
    }
    const selectedReraDetail = projectData?.projectReraDetails[index];
    const formattedProjectStartDate = selectedReraDetail?.projectStartDate
      ? dayjs(selectedReraDetail.projectStartDate).format('YYYY-MM-DD')
      : '';
    const formattedProjectCompletionDate = selectedReraDetail?.projectCompletionDate
      ? dayjs(selectedReraDetail.projectCompletionDate).format('YYYY-MM-DD')
      : '';
    setReraDetail({
      projectReraId: selectedReraDetail?.projectReraId || "",
      reraProjectName: selectedReraDetail?.reraProjectName || "",
      projectStatus: selectedReraDetail?.projectStatus || "Completed",
      reraProjectType: selectedReraDetail?.reraProjectType || "Residential",
      projectStartDate: formattedProjectStartDate,
      projectCompletionDate: formattedProjectCompletionDate,
      projectTotalArea: selectedReraDetail?.projectTotalArea || "",
      projectTotalAreaUnit: selectedReraDetail?.projectTotalAreaUnit || "",
      projectDocuments: selectedReraDetail?.projectDocuments || [],
      sanctioningAuthority: selectedReraDetail?.sanctioningAuthority || "",
      reraExternalLink: selectedReraDetail?.reraExternalLink || "",
    });

    setDocuments(selectedReraDetail?.projectDocuments || [
      {
        documentName: '',
        documentUrl: '',
      },
    ]);
    setUploadStates(
      selectedReraDetail?.projectDocuments.map(() => false) || [false]
    );
    setEditingIndex(index);
  };


  const validateDocuments = () => {
    for (const document of documents) {
    if (document.documentUrl == '' || document.documentName =='') {
        toast.error('Please select file and add document name');
        return false
      }
    }
    return true
  }

  return (
    <div ref={modalRef} >
      <div className="px-7 py-2">
        <div className="flex flex-wrap gap-x-6 w-[85%]">
          {Object.keys(formStructure.reraDetail).map((key) => {
            const field = formStructure.reraDetail[key];
            let handleFunction = {};

            if (key === "projectStatus" || key === "reraProjectType") {
              handleFunction = { onSelectFunction: (value) => handleInputChange(key, value) };
            } else if (key === "projectTotalArea") {
              handleFunction = {
                onChangeFunction: (value) => handleInputChange(key, value),
                onSelectFunction: (unit) => handleAreaUnitChange(unit)
              };
            } else {
              handleFunction = {
                onChangeFunction: (value) => handleInputChange(key, value)
              };
            }

            return (
              <MDLabelAndInput
                labelClass="text-headingColor"
                key={key}
                isRequired={false}
                label={field.label}
                inputType={field.type}
                isInputNumber={field.isInputNumber}
                dropdownArray={field.options}
                inputState={reraDetail[key]}
                dropdownState={key === "projectTotalArea" ? reraDetail.projectTotalAreaUnit : reraDetail[key]}
                cssClass="mb-4 h-[38px] w-[240px]"
                dropdownClass={key === "projectTotalArea" ? "mb-4 h-[38px] !w-[130px] -ml-[3px]" : "mb-4 h-[38px] w-[240px] -ml-[3px]"}
                tooltipText={field.tooltip}
                capitalize={field.isCapital}
                placeholder={field.placeholder}
                {...handleFunction}
              />
            )
          })}
        </div>
        {/* upload document */}
        <div>
          <h4 className="mb-3 text-headingColor">{formStructure.projectDocument.title}</h4>
          {documents?.map((document, index) => (
            <div
              className="flex items-center relative py-1 gap-x-6 w-[85%]"
              key={index}
            >
              <MDLabelAndInput
                labelClass="text-headingColor"
                label={text.projectDocument}
                onChangeFunction={(value) =>
                  handleReraDocument(index, 'documentName', value)
                }
                inputState={document.documentName}
                isRequired={false}
                cssClass="h-[38px] w-[240px]"
              />
              <div className={`h-[63px] flex`}>
                <div className="mt-8 w-[100px] flex justify-around">
                  <ImageUploader
                    onFileSelect={(selectedFiles) =>
                      handleDocumentSelect(index, selectedFiles)
                    }
                    brochureURLs={document.documentUrl}
                    deletePhoto={() => deleteBrochure(index)}
                    onlyButton="true"
                    upload={uploadStates[index]}
                    key={imageKey}
                    setUpload={() =>
                      setUploadStates((prev) => {
                        const newState = [...prev]
                        newState[index] = false
                        return newState
                      })
                    }
                  />
                </div>

                {document.documentUrl && (
                  <div className="max-w-[80%] w-fit flex justify-start">
                    <div className="relative border shadow-sm  border-gray-400  rounded-md">
                      {document.documentUrl.endsWith('.pdf')?<PdfToImage
                        pdfUrl={document.documentUrl}
                        width={70}
                        height={60}
                      />:
                      <Image src={document.documentUrl}                         
                      width={70}
                      height={60}/>}
                      <div className=" absolute top-1 right-1">
                        <button
                          onClick={() => deleteBrochure(index)}
                          className="p-1 text-white bg-gray-600 rounded"
                        >
                          <Image
                            src={faTrash}
                            width={15}
                            height={15}
                            alt="Photo"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {index !== 0 && (
                <Image
                  src={defaultIcon}
                  width={30}
                  height={30}
                  className="absolute rounded-full mt-7 right-0 p-2 border border-gray-400 cursor-pointer z-50 "
                  onClick={() => handleDeleteDocument(index)}
                  alt="close"
                />
              )}
            </div>
          ))}
          <h5 className="cursor-pointer text-headingColor " onClick={handleAddDocument}>
            {documents?.length > 1 ? text.addMoreDocument : text.addDocument}
          </h5>
          <button className="primary-button h-fit mt-4"
            onClick={handleFormSubmit}>
            {formStructure.buttonName}
          </button>
        </div>
      </div>
      {/* display rera details */}
      {projectData?.projectReraDetails?.length > 0 && (
        <MDContentSection
          title={stepRera.reraDetails}
          inlineStyle={{ textColor: 'white', bgColor: '#931602' }}
        >
          <ReraDetails
            projectData={projectData}
            deleteFunction={deleteRera}
            editfunction={editfunction}
          />
        </MDContentSection>
      )}
    </div>
  )
}

export default StepRera
