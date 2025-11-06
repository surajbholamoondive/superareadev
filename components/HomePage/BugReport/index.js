import Styles from "./index.module.css";
import { useState } from "react";
import crossIcon from "../../../assets/ButtonIcons/crossIcon.svg";
import Image from "next/image";
import handleApiResponse from "@/helper/errorHandler";
import { makeApiRequest } from "@/utils/utils";
import ImageUploader from "@/components/ImageUpload/Upload";
import { getLogger } from "@/helper/logger";
import { toast } from 'react-toastify';
import { GLOBALLY_COMMON_TEXT, HOME_PAGE_TEXT } from "@/textV2";
const{text,routes}=HOME_PAGE_TEXT
const{textKeyword,reportingText,reportErrorText,bugPlaceholderText,titleText,descriptionText,internalServerError,bugReportText,fillRequiredFields}=text
const {bugReportRoute,awsUserImageRoute,awsUserRemoveImageRoute}=routes
const {submitButton}=GLOBALLY_COMMON_TEXT.buttons
const{postType}=GLOBALLY_COMMON_TEXT.text
const{superAreaBucket}=GLOBALLY_COMMON_TEXT.routes
const BugReport = ({ closeModal }) => {
  const [bugForm, setBugForm] = useState({ page: window.location.href, bugStatus: bugReportText })
  const [load, setLoad] = useState(false);
  const [photoURLs, setPhotoURLs] = useState([]);
  const logger = getLogger();
  const { bugDetails, bugTitle } = bugForm
  const handleSubmit = async (e) => {
    try {
      if (!bugDetails || !bugTitle) {
        return toast.error(fillRequiredFields)
      }
      e.preventDefault();
      setLoad(true);
      const data = await makeApiRequest(postType, bugReportRoute, bugForm);
      if (!data) {
        throw new Error(internalServerError);
      } else {
        closeModal()
      }
      return handleApiResponse(data, true)
    } catch (error) {
      logger.error(error);
    }
  };
  const handlePhotoSelect = async (e) => {
    const formData = new FormData();
    e.forEach((file, index) => {
      formData.append(`images[${index}]`, file);
    });
    try {
      const response = await makeApiRequest(postType, awsUserImageRoute, formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
      const newPhotoUrls = response.data.result?.imageUrls;
      if (!newPhotoUrls) {
        throw new Error(internalServerError)
      }
      else {
        const newImage = [...photoURLs, { url: newPhotoUrls[0] }]
        setPhotoURLs(newImage);
        setBugForm({
          ...bugForm,
          virtualProof: newImage
        })
        return handleApiResponse(response, true)
      }
    } catch (error) {
      logger.error(error);
    }
  };
  const deletePhoto = async (index, url, setUpload) => {
    try {
      const key = url?.substring(url.lastIndexOf("/") + 1);
      const response = await makeApiRequest(postType, awsUserRemoveImageRoute, {
        Bucket: superAreaBucket,
        Key: key,
      })
      if (response.status === 200) {
        const updatedPhotoURLs = photoURLs.filter(
          (_, photoIndex) => photoIndex !== index
        );
        setPhotoURLs(updatedPhotoURLs);
        setPhotoURLs(updatedPhotoURLs);
        setBugForm({
          ...bugForm,
          virtualProof: updatedPhotoURLs
        })
        setUpload(false)
        return handleApiResponse(response, true)
      } else {
        setTimeout(() => {
        }, 3000);
      }
    } catch (error) {
      logger.error(error);
      setTimeout(() => {
      }, 3000);
    }
  };
  return (
    <div className={Styles.servicesComponent}>
      <div className="flex justify-start w-[100%]">
        <div>
          <h2
            className={` ${Styles.heading}`}
          >
            {reportErrorText}
          </h2>
          <p className={`${Styles.paragraph}`}>
            {bugPlaceholderText}
          </p>
        </div>
        <div className="absolute top-3 right-3 cursor-pointer">
          <Image width={20} height={20} src={crossIcon} onClick={closeModal} />
        </div>
      </div>
      <div className="mt-4">
        <div className="w-[95%] flex justify-between flex-wrap">
          <div className="flex flex-wrap gap-3 w-[98.5%] justify-between">
            <div>
              <h4 className={Styles.fieldName}>{titleText}<span className="text-red-500 ml-1 mt-1"> *</span></h4>
              <input
                type={textKeyword}
                className={Styles.inputField}
                value={bugTitle}
                onChange={(e) => setBugForm({
                  ...bugForm,
                  bugTitle: e.target.value
                })}
              />
            </div>
            <div className="lg:pt-9 md:pt-9">
              <ImageUploader
                onFileSelect={handlePhotoSelect}
                photoURLs={photoURLs}
                deletePhoto={deletePhoto}
                onlyButton="true"
              />
            </div>
          </div>
        </div>
        <div className=" w-[95%]">
          <h4 className={`${Styles.fieldName}`}>{descriptionText}<span className="text-red-500 ml-1 mt-1">*</span></h4>
          <textarea
            rows={6}
            cols={55}
            className={Styles.textArea}
            value={bugDetails}
            onChange={(e) => setBugForm({
              ...bugForm,
              bugDetails: e.target.value
            })}
          />
        </div>
        <div onClick={handleSubmit} className="text-center mb-4 mt-5">
          <button className={Styles.button}>
            {load ? reportingText : submitButton}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BugReport;