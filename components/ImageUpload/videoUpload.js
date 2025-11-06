import React, { useState } from 'react';
import PropTypes from 'prop-types';
import faTrash from '@/assets/ImageComponent/trash.svg'
import Image from 'next/image';
import Styles from './backround.module.css'
import { COMPONENTS } from '@/textV2';
import { toast } from 'react-toastify';
const { maxSize, vedioIsUploaded, vedioSizeLimit, maxSizeVedio } = COMPONENTS.POST_PROPERTY_COMPO.stepFourText
import Loading from '@/pages/loading';


const VideoUploader = ({
    onFileSelect,
    videoURLs = [],
    deleteVideo,
    isUploadDisabled = false,
    loading,
    icon,
    key,
    Text,
    Heading,
    textColor = "primary",
    textSize = "0.875rem",
    textAlign = "start",
    width = "120px",
    buttonLabel = "Attach Video",
    buttonColor = "#931602"
}) => {

    const handleUploadedvideoDelete = (index, url) => {
        deleteVideo(index, url);
    };

    const [previewVideos, setPreviewVideos] = useState([]);


    const inlineStyle = {
        backgroundColor: buttonColor,
        width: width,
        height: '33px',
        textAlign: 'center',
        fontSize: '0.875rem',
        color: 'rgb(255, 255, 255)',
        padding: '7px 7px',
        borderRadius: '0.25rem',
        cursor: 'pointer',
    };

    const handleDisabledClick = () => {
        if (isUploadDisabled) {
            toast.error(vedioIsUploaded);
        }
    };

    const handleChange = (e) => {
        const newFiles = Array.from(e.target.files);
        const sizeExceeded = newFiles.some(file => file.size > 35 * 1024 * 1024); // 35MB
        if (sizeExceeded) {
            toast.error(vedioSizeLimit);
            return;
        }
        const newPreviewVideos = newFiles.map(file => URL.createObjectURL(file));
        setPreviewVideos([...previewVideos, ...newPreviewVideos]);
        onFileSelect(newFiles);
    };

    return (
        <>
            <div className={`flex items-center gap-4 bg-nearbySelectedBackground border-[1px] border-primary rounded-3xl md:w-[600px] p-4 max-md:p-2 max-md:px-2 mb-3 ${Styles.dashed}`}>
               <div className={`flex gap-4 p-0 sm:p-4 w-[100%] flex-col sm:flex-row ${Styles.parent}`}>
                    <div className="max-md:flex max-md:justify-between max-md:items-center max-md:gap-4">
                        {icon}
                        <div className="w-[100px] max-sm:mr-1  h-8 lg:px-2 py-2 bg-nearbySelectedBackground rounded justify-center items-start ml-9 inline-flex md:hidden max-md:mx-auto">
                            <div className=" lg:text-center text-primary text-[0.625rem] font-bold leading-normal">{maxSize}</div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 justify-start'>
                        <div className='flex justify-between'>
                            <div className='text-left'>
                                <h4 className='font-bold text-primary mb-2'>{Heading}</h4>
                                <p className={`h-[55px] break-keep text-${textColor} text-${textSize}  text-${textAlign}  font-normal leading-[128%] tracking-[0.14px]`}>
                                    {Text}
                                </p>
                            </div>
                            <div className="w-[12.2rem] px-2 h-8 py-2 md:px-0 bg-nearbySelectedBackground rounded justify-center inline-flex items-start max-md:hidden">
                                <div className="text-center text-primary font-bold leading-normal text-[0.625rem]">{maxSizeVedio}</div>
                            </div>
                        </div>
                        <label
                            style={inlineStyle}
                            className="max-[480px]:mt-12"
                            onClick={handleDisabledClick}
                        >
                            {buttonLabel}
                            <input
                                type="file"
                                className="hidden"
                                onChange={handleChange}
                                key={key}
                                multiple
                                accept="video/mp4,video/x-m4v,video/*"
                                disabled={isUploadDisabled}
                            />
                        </label>
                    </div>
                </div>
            </div>
            <div className="flex">
                {loading && (
                    <div className="loader-container">
                        <Loading />
                    </div>
                )}
                {videoURLs.map((videoURL, index) => (
                    <div key={`uploaded_${index}`} className="space-y-2">
                        <video className='rounded-md' controls width="350" height="180">
                            <source src={videoURL.url} type="video/mp4" />
                        </video>
                        <button onClick={() => handleUploadedvideoDelete(index, videoURL.url)}
                            className=" px-0.5 w-6 h-6 bg-black bg-opacity-60 rounded-full border backdrop-blur-sm"
                        >
                            <Image
                                src={faTrash}
                                alt={` Photo ${index}`}

                            />
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
};

VideoUploader.propTypes = {
    onFileSelect: PropTypes.func.isRequired,
    onFileRemove: PropTypes.func.isRequired,
    videoURLs: PropTypes.array,
    deleteVideo: PropTypes.func,
    isUploadDisabled: PropTypes.bool,
    icon: PropTypes.element,
    Text: PropTypes.string,
    backgroundColor: PropTypes.string,
    textColor: PropTypes.string,
    textSize: PropTypes.string,
    textAlign: PropTypes.string,
    width: PropTypes.string,
    buttonColor: PropTypes.string,
};

export default VideoUploader;


