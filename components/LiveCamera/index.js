import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import 'font-awesome/css/font-awesome.min.css';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useData } from '@/context/data';
import {
  AGENT_ASSIGNED_LISTING_ROUTE,
  CAMERA_ACCESS_DENIED,
  GO_BACK_TO_ASSIGNED_LISTING,
  POST_TEXT,
  SAVE_VIDEO_LINK_ROUTE,
  START_RECORDING,
  STOP_RECORDING,
  SWITCH_CAMERA,
  UPLOAD_VIDEO_ROUTE,
  VIDEO_UPLOADING_DESCRIPTION,
} from '@/text';
import { makeApiRequest } from '@/utils/utils';
import axios from 'axios';
import { toast } from 'react-toastify';
import switchCam from '../../assets/ButtonIcons/camSwitch.svg';
import RecButton from '../../assets/ButtonIcons/recButton.svg';

function VideoRecorder({ propertyId }) {
  const [removeVideo, setRemoveVideo] = useState(false);
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const videoRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isRecordingCompleted, setIsRecordingCompleted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [data, setData] = useData();
  const [cameraAccess, setCameraAccess] = useState(true);
  const [isVideoUploading, setIsVideoUploading] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState('user');
  const [cameraOptions, setCameraOptions] = useState([]);
  const maxRecordingTime = 1200;
  const [savedVideoUrl, setSavedVideoUrl] = useState('');
  const router = useRouter();

  const stopRecording = () => {
    setRemoveVideo(false);
    mediaRecorderRef.current.stop();
    setIsRecording(false);
    setIsRecordingCompleted(true);
  };

  const startRecording = () => {
    setIsRecording(true);
    setTimer(0);
    setIsRecordingCompleted(false);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream);
    const chunks = [];

    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };

    mediaRecorderRef.current.onstop = () => {
      if (chunks.length > 0) {
        uploadVideo(chunks);
      }
    };

    mediaRecorderRef.current.start();
    setTimeout(() => {
      stopRecording();
    }, maxRecordingTime * 1000);
  };

  const uploadVideo = async (chunks) => {
    setIsVideoUploading(true);
    const blob = new Blob(chunks, { type: 'video/webm' });
    const videoData = new FormData();
    videoData.append('video', blob, 'video.webm');
    videoData.append('propertyId', propertyId);

    try {
      const videoURLs = await uploadBlobToAWS(videoData);
      const response = await makeApiRequest(
        POST_TEXT,
        `${SAVE_VIDEO_LINK_ROUTE}${propertyId}`,
        { liveVideoLink: videoURLs }
      );
      const s3Url = response?.data?.result;
      setSavedVideoUrl(videoURLs[0]?.url);
    } catch (error) {
      console.error('Failed to upload video to the server:', error);
    }

    setIsVideoUploading(false);
  };

  const uploadBlobToAWS = async (formData) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}${UPLOAD_VIDEO_ROUTE}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (response.data.responseCode === 200) {
        return response.data.result.map((url, index) => ({
          id: index,
          url: url,
        }));
      } else {
        console.error('Error uploading videos:', response.data.responseMessage);
        return null;
      }
    } catch (error) {
      console.error('Error uploading videos:', error);
      return null;
    }
  };

  const deleteVideo = async () => {
    const BUCKET_NAME = 'superarea-prod-s3';
    const key = savedVideoUrl?.substring(savedVideoUrl?.lastIndexOf('/') + 1);

    try {
      const response = await axios.post('user/removeLiveVideo', {
        Bucket: BUCKET_NAME,
        Key: key,
        propertyId,
      });

      setData({ ...data, boolean: false });
      toast.info(response?.data?.responseMessage);
      setRemoveVideo(true);
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  const toggleCamera = () => {
    setSelectedCamera((prev) => (prev === 'user' ? 'environment' : 'user'));
    console.log('____________', selectedCamera);
  };

  const displayRecordedVideo = (chunks) => {
    const blob = new Blob(chunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    videoRef.current.src = url;
    videoRef.current.controls = true;
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${
      remainingSeconds < 10 ? '0' : ''
    }${remainingSeconds}`;
  };

  useEffect(() => {
    if (savedVideoUrl) {
      videoRef.current.src = savedVideoUrl;
      videoRef.current.controls = true;
    } else {
      navigator.mediaDevices
        .enumerateDevices()
        .then((devices) => {
          const videoDevices = devices.filter(
            (device) => device.kind === 'videoinput'
          );
          setCameraOptions(videoDevices);

          if (videoDevices.length === 1) {
            setSelectedCamera('user');
          }
        })
        .catch(() => {
          // setCameraAccess(false);
        });
    }
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: selectedCamera } })
      .then(() => {
        setCameraAccess(true);
      })
      .catch(() => {
        // setCameraAccess(false);
      });

    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer >= maxRecordingTime) {
            stopRecording();
            return prevTimer;
          }
          return prevTimer + 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRecording, selectedCamera]);

  return (
    <div className="h-fit flex flex-col items-center justify-center w-[100%] m-auto lg:w-[50%] max-w-[600px] max-lg:mb-10">
      {isRecordingCompleted ? (
        <div className="flex w-full">
          <video
            src={savedVideoUrl}
            className={`w-[500px] h-fit m-auto rounded-md ${
              removeVideo ? 'hidden' : ''
            }`}
            controls
            autoPlay={true}
          />
        </div>
      ) : (
        <>
          {cameraAccess ? (
            <div className="relative">
              <Webcam
                audio={false}
                ref={webcamRef}
                width={400}
                height={400}
                screenshotFormat="image/jpeg"
                videoConstraints={{ facingMode: selectedCamera }}
                style={{ borderRadius: '8px', width: '85%', margin: 'auto' }}
              />
              {isRecording && (
                <div className="text-sm absolute left-16 top-3 flex">
                  <Image
                    src={RecButton}
                    width={15}
                    height={10}
                    className="mr-2"
                    alt="recording-button"
                  />
                  {formatTime(timer)}
                </div>
              )}
            </div>
          ) : (
            <p className="text-red-600 text-sm w-[350px] text-center mt-40">
              {CAMERA_ACCESS_DENIED}
            </p>
          )}
          {cameraAccess && (
            <div className="flex justify-between mt-3 w-fit">
              <button
                onClick={toggleCamera}
                className="flex text-[12px] border border-black px-5 py-2 rounded-md mt-2 mr-4"
              >
                <Image
                  src={switchCam}
                  width={15}
                  height={15}
                  alt="call end icon"
                  className="pt-[2px] mr-1"
                />
                {SWITCH_CAMERA}
              </button>
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className="text-white flex bg-[#931602] text-[12px] px-5 py-2 rounded-md mt-2"
              >
                {isRecording ? STOP_RECORDING : START_RECORDING}
              </button>
            </div>
          )}
        </>
      )}
      {isVideoUploading ? (
        <div className="text-sm py-16 text-[#931602]">
          {VIDEO_UPLOADING_DESCRIPTION}
        </div>
      ) : (
        isRecordingCompleted && (
          <button
            onClick={() => router.push(AGENT_ASSIGNED_LISTING_ROUTE)}
            className="text-sm border rounded-md border-black py-2 px-4 my-5"
          >
            {GO_BACK_TO_ASSIGNED_LISTING}
          </button>
        )
      )}
    </div>
  );
}

export default VideoRecorder;
