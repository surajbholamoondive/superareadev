import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/auth'
import { useSocket } from '@/context/socketProvider'
import { makeApiRequest, Timer } from '@/utils/utils'
import FormModal from '@/components/NoticeTray/form'
import TopBar from '@/components/SearchResultPage/TopBar/TopBar'
import muteButton from '../../../assets/ButtonIcons/muteButton.svg'
import unmuteButton from '../../../assets/ButtonIcons/unmuteButton.svg'
import switchCam from '../../../assets/ButtonIcons/camSwitch.svg'
import phone from '../../../assets/ButtonIcons/Phone.svg'
import peer from '../../../helper/peer'
import { getLogger } from '@/helper/logger'
import axios from 'axios'
import { toast } from 'react-toastify'
import { GLOBALLY_COMMON_TEXT, SCREENS_TEXT } from '@/textV2'
const { text, routes } = SCREENS_TEXT
const { agentText, postType } = GLOBALLY_COMMON_TEXT.text
const RoomPage = () => {
  const [auth] = useAuth()
  const { userType } = auth?.userResult || {}
  const socket = useSocket()
  const [remoteSocketId, setRemoteSocketId] = useState(null)
  const [myStream, setMyStream] = useState()
  const [remoteStream, setRemoteStream] = useState()
  const [removeCallButton, setRemoveCallButton] = useState(false)
  const [removeJoinCallButton, setRemoveJoinCallButton] = useState(false)
  const [removeStartCallButton, setRemoveStartCallButton] = useState(true)
  const [closeCall, setCloseCall] = useState(false)
  const [mediaRecorder, setMediaRecorder] = useState(null)
  const [recordedChunks, setRecordedChunks] = useState([])
  const [videoUrl, setVideoUrl] = useState('')
  const [data, setData] = useState(null)
  const [callRecieved, setCallRecieved] = useState(false)
  const [cameraFacingMode, setCameraFacingMode] = useState('environment')
  const [recordingStarted, setRecordingStarted] = useState(false)
  const videoRef = useRef()
  const router = useRouter()
  const searchParams = useSearchParams()
  const encodedData = searchParams.get('verificationData')
  const propertyId = router.query.id
  const logger = getLogger()
  useEffect(() => {
    if (encodedData) {
      try {
        const decoded = decodeURIComponent(encodedData)
        const data = JSON.parse(decoded)
        setData(data)
      } catch (error) {
        console.error(error)
      }
    }
  }, [encodedData])

  const [remoteVideoUrl, setRemoteVideoUrl] = useState('')
  const [mediaRecorderLocal, setMediaRecorderLocal] = useState(null)
  const [mediaRecorderRemote, setMediaRecorderRemote] = useState(null)
  const [recordedChunksLocal, setRecordedChunksLocal] = useState([])
  const [recordedChunksRemote, setRecordedChunksRemote] = useState([])
  const [currentCameraIndex, setCurrentCameraIndex] = useState(0)
  const [userCameraIndex, setUserCameraIndex] = useState(0);
  const [agentCameraIndex, setAgentCameraIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`EMail : ${email} joined the room`)
    setRemoteSocketId(id)
  }, [])

  const handleUserCall = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: {
        facingMode: cameraFacingMode,
      },
    })
    const offer = await peer.getOffer()
    socket.emit('user:call', { to: remoteSocketId, offer })
    setMyStream(stream)
    setRemoveCallButton(true)
    setRemoveStartCallButton(false)
  }, [remoteSocketId, socket])

  const handleIncomingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from)
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
          facingMode: cameraFacingMode,
        },
      })
      const ans = await peer.getAnswer(offer)
      socket.emit('call:accepted', { to: from, ans })
      setMyStream(stream)
      startRecording()
    },
    [remoteSocketId, socket]
  )

  // const sendStreams = useCallback(() => {
  //   if (!myStream) {
  //     console.error('No stream available to send.');
  //     return;
  //   }
  //   for (const track of myStream.getTracks()) {
  //     const existingSender = peer.peer
  //       .getSenders()
  //       .find((sender) => sender.track === track)
  //       console.log("_____existing sender ===>", existingSender)
  //     if (!existingSender) {
  //       peer.peer.addTrack(track, myStream)
  //       console.log("_____ sender does not exist")
  //     }else {
  //       console.log('Sender already exists for track:', track);
  //     }
  //   }
  //   setRemoveJoinCallButton(true)
  // }, [myStream, peer.peer])

  const sendStreams = useCallback(() => {
    peer.sendStream(myStream);
    setRemoveJoinCallButton(true);
  }, [myStream, peer]);


  const handleCallAccepted = useCallback(
    async ({ from, ans }) => {
      peer.setLocalDescription(ans)
      sendStreams()
    },
    [sendStreams]
  )

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer()
    socket.emit('peer:nego:needed', { offer, to: remoteSocketId })
  }, [remoteSocketId, socket])

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer)
      socket.emit('peer:nego:done', { to: from, ans })
    },
    [socket]
  )

  const handleNegoNeedFinal = useCallback(
    async ({ ans }) => {
      await peer.setLocalDescription(ans)
      setCallRecieved(true)
      startRemoteRecording()
    },
    [socket]
  )

  useEffect(() => {
    if (peer.peer) {
      peer.peer.addEventListener('negotiationneeded', handleNegoNeeded)
      return () => {
        peer.peer.removeEventListener('negotiationneeded', handleNegoNeeded)
      }
    }
  }, [handleNegoNeeded, peer.peer])

  const handleEndCall = async () => {
    myStream.getTracks().forEach((track) => {
      track.stop()
    })

    socket.emit('call:end')
    setMyStream(null)
    setRemoteStream(null)
    setRemoteSocketId(null)
    setRemoveCallButton(false)
    setRemoveJoinCallButton(false)
    stopRecording()
    setCloseCall(true)
    if (userType !== agentText) {
      router.push(routes.screenRoute)
    }
  }

  useEffect(() => {
    if (peer.peer) {
      peer.peer.addEventListener('track', async (ev) => {
        const remoteStream = ev.streams
        setRemoteStream(remoteStream[0])
      })
    }
  }, [peer.peer, myStream])


  // useEffect(() => {
  //     return () => {
  //         if (mediaRecorder) {
  //             mediaRecorder.destroy();
  //         }
  //     };
  // }, []);

  useEffect(() => {
    socket.on('user:joined', handleUserJoined)
    socket.on('incoming:call', handleIncomingCall)
    socket.on('call:accepted', handleCallAccepted)
    socket.on('peer:nego:needed', handleNegoNeedIncomming)
    socket.on('peer:nego:final', handleNegoNeedFinal)

    return () => {
      socket.off('user:joined', handleUserJoined)
      socket.off('incoming:call', handleIncomingCall)
      socket.off('call:accepted', handleCallAccepted)
      socket.off('peer:nego:needed', handleNegoNeedIncomming)
      socket.off('peer:nego:final', handleNegoNeedFinal)
    }
  }, [
    socket,
    handleUserJoined,
    handleIncomingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ])

  useEffect(() => {
    if (recordedChunksLocal.length > 0) {
      const recordedBlobLocal = new Blob(recordedChunksLocal, {
        type: 'video/webm',
      })
      const recordedBlobUrlLocal = URL.createObjectURL(recordedBlobLocal)
      setVideoUrl(recordedBlobUrlLocal)
    }
  }, [recordedChunksLocal])

  useEffect(() => {
    if (recordedChunksRemote.length > 0) {
      const recordedBlobRemote = new Blob(recordedChunksRemote, {
        type: 'video/webm',
      })
      const recordedBlobUrlRemote = URL.createObjectURL(recordedBlobRemote)
      setRemoteVideoUrl(recordedBlobUrlRemote)
    }
  }, [recordedChunksRemote])

  const startRecording = async () => {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: cameraFacingMode,
      },
      audio: true,
    })
    const recorder = new MediaRecorder(mediaStream, { mimeType: 'video/webm' })

    recorder.ondataavailable = async (event) => {
      setRecordedChunks((prevChunks) => [...prevChunks, event.data])
    }

    recorder.start()
    setMediaRecorder(recorder)
    setMyStream(mediaStream)
  }

  useEffect(() => {
    if (remoteStream) {
      startRemoteRecording()
    }
  }, [remoteStream])

  const startRemoteRecording = async () => {
    if (!remoteStream) {
      return
    }

    const recorderRemote = new MediaRecorder(remoteStream, {
      mimeType: 'video/webm',
    })
    setRecordingStarted(true)
    recorderRemote.ondataavailable = async (event) => {
      setRecordedChunksRemote((prevChunks) => [...prevChunks, event.data])
    }

    recorderRemote.start()
    setMediaRecorderRemote(recorderRemote)
  }

  const stopRecording = () => {
    setRecordingStarted(false)
    if (mediaRecorder) {
      mediaRecorder.stop()
    }
    if (mediaRecorderRemote) {
      mediaRecorderRemote.stop()
    }
    console.log('--------record ------>', mediaRecorder)
    console.log('--------record remote------>', mediaRecorderRemote)
  }

  // const startRecording = async () => {
  //     const mediaStreamLocal = await navigator.mediaDevices.getUserMedia({
  //         video: {
  //             facingMode: cameraFacingMode,
  //         },
  //         audio: true
  //     });

  //     const mediaStreamRemote = await navigator.mediaDevices.getUserMedia({
  //         video: {
  //             facingMode: cameraFacingMode,
  //         },
  //         audio: true
  //     });

  //     const recorderLocal = new MediaRecorder(mediaStreamLocal, { mimeType: 'video/webm' });
  //     const recorderRemote = new MediaRecorder(mediaStreamRemote, { mimeType: 'video/webm' });
  //     console.log("+++++++++++++++++++++++++++", recorderLocal, recorderRemote)
  //     recorderLocal.ondataavailable = async(event) => {
  //         console.log("Recording data available (Local)", event.data);
  //         setRecordedChunksLocal((prevChunks) => [...prevChunks, event.data]);
  //     };

  //     recorderRemote.ondataavailable = async(event) => {
  //         console.log("Recording data available (Remote)", event.data);
  //         setRecordedChunksRemote((prevChunks) => [...prevChunks, event.data]);
  //     };

  //     recorderLocal.start();
  //     recorderRemote.start();

  //     setMediaRecorderLocal(recorderLocal);
  //     setMediaRecorderRemote(recorderRemote);

  //     setMyStream(mediaStreamLocal);
  // };

  // const stopRecording = () => {
  //     if (mediaRecorderLocal) {
  //         mediaRecorderLocal.stop();
  //     }
  //     if (mediaRecorderRemote) {
  //         mediaRecorderRemote.stop();
  //     }
  //     console.log("Recordings stopped");
  // };

  // useEffect(() => {
  //     if (recordedChunksLocal.length > 0) {
  //         const recordedBlobLocal = new Blob(recordedChunksLocal, { type: 'video/webm' });
  //         const recordedBlobUrlLocal = URL.createObjectURL(recordedBlobLocal);
  //         setVideoUrl(recordedBlobUrlLocal);
  //     }
  // }, [recordedChunksLocal]);

  // useEffect(() => {
  //     if (recordedChunksRemote.length > 0) {
  //         const recordedBlobRemote = new Blob(recordedChunksRemote, { type: 'video/webm' });
  //         const recordedBlobUrlRemote = URL.createObjectURL(recordedBlobRemote);
  //         setRemoteVideoUrl(recordedBlobUrlRemote);
  //     }
  // }, [recordedChunksRemote]);

  const handleCopyLink = () => {
    const room = router.query.id
    const link = `${process.env.NEXT_PUBLIC_FRONTEND_API}screens?room=${room}`
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(link)
        .then(() => alert('Link copied'))
        .catch((error) => logger.error('Error copying link:', error))
    } else {
      logger.error('Clipboard API not supported')
    }
  }

  const handleCameraFacingMode = () => {
    setCameraFacingMode((prevMode) =>
      prevMode === 'user' ? 'environment' : 'user'
    )
  }

  // const handleSwitchCamera = async () => {
  //   try {
  //     const devices = await navigator.mediaDevices.enumerateDevices()
  //     const videoDevices = devices.filter(
  //       (device) => device.kind === 'videoinput'
  //     )

  //     if (videoDevices.length < 2) {
  //       console.log('Only one camera available.')
  //       return
  //     }

  //     const currentStream = myStream
  //     if (!currentStream) {
  //       console.log('Current stream is not available.')
  //       return
  //     }

  //     // Stop the current stream to release the camera
  //     currentStream.getTracks().forEach((track) => track.stop())

  //     const nextDeviceId = videoDevices.find(
  //       (device) =>
  //         device.deviceId !==
  //         currentStream.getVideoTracks()[0].getSettings().deviceId
  //     ).deviceId

  //     const constraints = {
  //       audio: true,
  //       video: { deviceId: { exact: nextDeviceId } },
  //     }

  //     console.log('Attempting to switch camera with constraints:', constraints)
  //     const newStream = await navigator.mediaDevices.getUserMedia(constraints)
  //     console.log('new stream sets', newStream)
  //     setMyStream(newStream)
  //   } catch (error) {
  //     console.error('Error switching camera:', error)
  //   }
  // }
  // const handleSwitchCamera = async () => {
  //   try {
  //     console.log('Switching camera...  My current stream ---', myStream);

  //     if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
  //       throw new Error('getUserMedia is not supported in this browser');
  //     }

  //     const devices = await navigator.mediaDevices.enumerateDevices();
  //     console.log('Devices:', devices);

  //     const videoDevices = devices.filter(device => device.kind === 'videoinput' && device.label !== 'OBS Virtual Camera');
  //     console.log('Video devices:', videoDevices);

  //     if (videoDevices.length < 2) {
  //       console.log('Only one camera available.');
  //       toast.error("Your device has only one camera");
  //       return;
  //     }

  //     const currentStream = myStream;

  //     if (!currentStream) {
  //       console.log('Current stream is not available.');
  //       return;
  //     }

  //     currentStream.getTracks().forEach(track => track.stop());

  //     const nextCameraIndex = (currentCameraIndex + 1) % videoDevices.length;
  //     const nextDeviceId = videoDevices[nextCameraIndex].deviceId;
  //     console.log('Next device ID:', nextDeviceId);

  //     const constraints = {
  //       audio: true,
  //       video: { deviceId: { exact: nextDeviceId } },
  //     };

  //     const newStream = await navigator.mediaDevices.getUserMedia(constraints);
  //     console.log('New stream:', newStream);

  //     setMyStream(newStream);
  //     console.log('Successfully switched camera.');

  //     setCurrentCameraIndex(nextCameraIndex);

  //   } catch (error) {
  //     console.error('Error switching camera:', error);
  //   }
  // };

  // console.log("++++++++----------myStream->",myStream, "___________-remote stream---->", remoteStream)
  // const handleSwitchUserCamera = async () => {
  //   try {
  //     console.log('Switching user camera...');

  //     if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
  //       throw new Error('getUserMedia is not supported in this browser');
  //     }

  //     const devices = await navigator.mediaDevices.enumerateDevices();
  //     console.log('Devices:', devices);

  //     const videoDevices = devices.filter(device => device.kind === 'videoinput' && device.label !== 'OBS Virtual Camera');
  //     console.log('Video devices:', videoDevices);

  //     if (videoDevices.length < 2) {
  //       console.log('Only one camera available.');
  //       toast.error("Your device has only one camera");
  //       return;
  //     }

  //     const currentStream = myStream;

  //     if (!currentStream) {
  //       console.log('Current stream is not available.');
  //       return;
  //     }

  //     currentStream.getTracks().forEach(track => track.stop());

  //     const nextCameraIndex = (userCameraIndex + 1) % videoDevices.length;
  //     const nextDeviceId = videoDevices[nextCameraIndex].deviceId;
  //     console.log('Next user device ID:', nextDeviceId);

  //     const constraints = {
  //       audio: true,
  //       video: { deviceId: { exact: nextDeviceId } },
  //     };

  //     const newStream = await navigator.mediaDevices.getUserMedia(constraints);
  //     console.log('New user stream:', newStream);

  //     setMyStream(newStream);
  //     console.log('Successfully switched user camera.');
  //     sendStreams();
  //     console.log('Successfully tracks sended');

  //     setUserCameraIndex(nextCameraIndex);

  //   } catch (error) {
  //     console.error('Error switching user camera:', error);
  //   }
  // };

  // const handleSwitchAgentCamera = async () => {
  //   try {
  //     console.log('Switching agent camera...');

  //     if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
  //       throw new Error('getUserMedia is not supported in this browser');
  //     }

  //     const devices = await navigator.mediaDevices.enumerateDevices();
  //     console.log('Devices:', devices);

  //     const videoDevices = devices.filter(device => device.kind === 'videoinput' && device.label !== 'OBS Virtual Camera');
  //     console.log('Video devices:', videoDevices);

  //     if (videoDevices.length < 2) {
  //       console.log('Only one camera available.');
  //       toast.error("Your device has only one camera");
  //       return;
  //     }

  //     const currentStream = myStream;

  //     if (!currentStream) {
  //       console.log('Current stream is not available.');
  //       return;
  //     }

  //     currentStream.getTracks().forEach(track => track.stop());

  //     const nextCameraIndex = (agentCameraIndex + 1) % videoDevices.length;
  //     const nextDeviceId = videoDevices[nextCameraIndex].deviceId;
  //     console.log('Next agent device ID:', nextDeviceId);

  //     const constraints = {
  //       audio: true,
  //       video: { deviceId: { exact: nextDeviceId } },
  //     };

  //     const newStream = await navigator.mediaDevices.getUserMedia(constraints);
  //     console.log('New agent stream:', newStream);

  //     setMyStream(newStream);
  //     console.log('Successfully switched agent camera.');

  //     sendStreams();
  //     console.log('Successfully tracks sended');

  //     setAgentCameraIndex(nextCameraIndex);

  //   } catch (error) {
  //     console.error('Error switching agent camera:', error);
  //   }
  // };

  //   const handleSwitchCamera = async () => {
  //     try {
  //         console.log('Switching camera...');
  //         const devices = await navigator.mediaDevices.enumerateDevices();
  //         const videoDevices = devices.filter(
  //             (device) => device.kind === 'videoinput'
  //             && device.label !== 'OBS Virtual Camera'
  //         );

  //         if (videoDevices.length < 2) {
  //             console.log('Only one camera available.');
  //             toast.error("Your device has only one camera");
  //             return;
  //         }

  //         const nextCameraIndex = (currentCameraIndex + 1) % videoDevices.length;
  //         const nextDeviceId = videoDevices[nextCameraIndex].deviceId;
  //         console.log('Next camera device ID:', nextDeviceId);

  //         const constraints = {
  //             audio: true,
  //             video: { deviceId: { exact: nextDeviceId } },
  //         };
  //         console.log('my stream : ', myStream);
  //         // Stop the current stream before switching
  //         if (myStream) {
  //           console.log('next entered here : ', constraints);
  //             myStream.getTracks().forEach(track => track.stop());
  //         }

  //         const newStream = await navigator.mediaDevices.getUserMedia(constraints);
  //         setMyStream(newStream);

  //         setCurrentCameraIndex(nextCameraIndex);
  //         console.log(' new stream is : ', newStream);
  //         // Send updated stream tracks to the remote peer
  //         if (peer) {
  //           console.log(' send new stream ');
  //           peer.sendStream(newStream);
  //         } else {
  //           console.warn('Peer service not available.');
  //         }
  //     } catch (error) {
  //         console.error('Error switching camera:', error);
  //     }
  // };

  const handleSwitchCamera = async () => {
    try {
      console.log('Switching camera...');
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(
        (device) => device.kind === 'videoinput' && device.label !== 'OBS Virtual Camera'
      );
      console.log('Video devices', videoDevices);
      if (videoDevices.length < 2) {
        console.log('Only one camera available.');
        toast.error("Your device has only one camera");
        return;
      }

      const nextCameraIndex = (currentCameraIndex + 1) % videoDevices.length;
      const nextDeviceId = videoDevices[nextCameraIndex].deviceId;
      const currDeviceId = videoDevices[currentCameraIndex].deviceId;
      console.log('Curr camera device ID:', currDeviceId);
      console.log('Next camera device ID:', nextDeviceId);

      const constraints = {
        audio: true,
        video: { deviceId: { exact: nextDeviceId } },
      };

      console.log('Stopping current stream...old value', myStream);
      if (myStream) {
        console.log('tracks: ', myStream.getTracks());
        myStream.getTracks().forEach(track => {
          track.stop();
          track.enabled = false;
        });
        setMyStream(null);
        console.log("after null my stream", myStream);
      }
      await new Promise(resolve => setTimeout(resolve, 3000));
      console.log("my stream after timeout", myStream);
      let newStream;
      try {
        console.log("Getting new stream, currently value is", myStream);
        console.log("cam mode 1:", cameraFacingMode)
        handleCameraFacingMode();
        console.log("cam mode 2:", cameraFacingMode)
        const newConstraints = {
          audio: true,
          video: { deviceId: { exact: nextDeviceId }, facingMode: cameraFacingMode },
        };
        newStream = await navigator.mediaDevices.getUserMedia(newConstraints);
      } catch (error) {
        console.error('Error accessing new video source:', error);
        if (error.name === 'NotReadableError') {
          toast.error('Could not start video source. Make sure no other application is using the camera.');
        } else {
          toast.error(`Error accessing camera: ${error.message}`);
        }
      }
      console.log('new Stream', newStream);
      setMyStream(newStream);

      const senders = peer.peer.getSenders();
      console.log("senders:", senders)
      const videoSender = senders.find(sender => sender.track.kind === 'video');
      if (videoSender) {
        console.log("Entered video sender")
        videoSender.replaceTrack(newStream.getVideoTracks()[0]);
        console.log("Inside video sender")
      }
      setCurrentCameraIndex(nextCameraIndex);
      console.log('New stream:', newStream);

      if (peer) {
        console.log('Sending new stream');
        peer.sendStream(newStream);
        console.log("sent to peer")
      } else {
        console.warn('Peer service not available.');
      }

      // Trigger renegotiation if needed
      peer.peer.addEventListener('negotiationneeded', async () => {
        try {
          const offer = await peer.getOffer();
          socket.emit('peer:nego:needed', { offer, to: remoteSocketId });
        } catch (negotiationError) {
          console.error('Error during renegotiation:', negotiationError);
        }
      });

    } catch (error) {
      console.error('Error switching camera:', error);
    }
  };


  useEffect(() => {
    uploadVideo()
  }, [remoteVideoUrl])

  const uploadVideo = async () => {
    try {
      axios.defaults.baseURL = null;
      const { data } = await axios.get(remoteVideoUrl, { responseType: 'blob' })
      const videoURLs = await uploadBlobToAWS(data);
      if (videoURLs[0]) {
        const res = await makeApiRequest(postType, `${routes.saveVedioLink}${propertyId}`, { liveVideoLink: videoURLs[0] })
      }
    } catch (err) {
      logger.error("Error - ", err)
    }
  }

  const uploadBlobToAWS = async (blobData) => {
    try {
      const formData = new FormData();
      formData.append('video', blobData);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}${routes.uploadAwsVedioRoute}`,
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

  const handleMute = () => {
    setIsMuted(prevState => {
      const newState = !prevState;
      if (myStream) {
        myStream.getAudioTracks().forEach(track => {
          track.enabled = !newState;
        });
      }
      return newState;
    });
  }

  return (
    <div className="text-center">
      <TopBar label={text.liveVedioCall} />
      <div className='lg:flex'>
        <div className={`${userType === agentText ? 'lg:w-[50%]' : 'w-[95%]'} my-4 mx-2 h-fit`}>
          {!closeCall && (
            <>
              <div>
                {!remoteSocketId && (
                  <p className="text-gray-500 mt-12">{text.emptyRoom}</p>
                )}
              </div>
              {!remoteSocketId && (
                <div className="my-[80px]">
                  <button
                    className="bg-[#931602] text-white py-2 px-5 rounded-md"
                    onClick={handleCopyLink}
                  >
                    {text.copyLink}
                  </button>
                </div>
              )}
            </>
          )}
          {myStream && !removeJoinCallButton && (
            <button
              onClick={sendStreams}
              className="text-white bg-blue-500 px-9 py-2 rounded-md mt-7 mr-9"
            >
              {text.joinCallText}
            </button>
          )}

          {removeStartCallButton &&
            remoteSocketId &&
            !myStream &&
            !callRecieved && (
              <button
                className="text-white bg-green-500 px-9 py-2 rounded-md mt-[15%]"
                onClick={handleUserCall}
              >
                {text.startCall}
              </button>
            )}
          {myStream && (
            <div
              className={`relative md:w-[650px] lg:max-w-[700px] m-auto h-[60vh]  ${remoteStream && "md:mt-[120px]"} ${myStream ? 'mb-24' : 'mb-48'}`}
            >
              <div className="absolute z-10 right-0 bottom-0">
                {myStream && (
                  <video
                    autoPlay
                    muted
                    width="140px"
                    height="200px"
                    className=" rounded-tl-md border border-[#931602] max-h-[200px]"
                    ref={(ref) => {
                      if (ref) ref.srcObject = myStream
                    }}
                  >
                    {text.vedioNotSupported}
                  </video>
                )}
              </div>
              {myStream && (
                <div className="absolute bottom-0 right-0 mt-12 w-[100%] bg-gray-300">
                  <Timer recordingStarted={recordingStarted} />
                  {remoteStream ? (
                    <video
                      autoPlay
                      width="100%"
                      height="60vh"
                      className=" border border-[#931602] rounded-sm h-[400px]"
                      ref={(ref) => {
                        if (ref) ref.srcObject = remoteStream
                      }}
                    >
                      {text.remoteVedio}
                    </video>
                  ) : (
                    <video
                      autoPlay
                      width="100%"
                      height="60vh"
                      className=" border border-[#931602] object-fill max-md:w-[100%] max-sm:h-[300px] h-[400px]"                    >
                      {text.remoteVedio}
                    </video>
                  )}
                </div>
              )}

              {myStream && (
                <button
                  // onClick={userType === agentText ? handleSwitchAgentCamera : handleSwitchUserCamera}
                  onClick={handleSwitchCamera}
                  className="flex text-[12px] border border-black px-5 py-2 absolute -bottom-[55px] left-[6vw] rounded-md mt-16"
                >
                  <Image
                    src={switchCam}
                    width={15}
                    height={15}
                    alt="call end icon"
                    className="pt-[2px] mr-1"
                  />
                  {text.switchCamera}
                </button>
              )}
              {myStream && (
                <button
                  onClick={handleEndCall}
                  className="text-white flex bg-[#931602] text-[12px] px-5 py-2 absolute -bottom-[55px] right-[8vw] rounded-md mt-16"
                >
                  <Image
                    src={phone}
                    width={15}
                    height={15}
                    alt="call end icon"
                    className="mr-1 pt-[1px]"
                  />
                  {text.endCallText}
                </button>
              )}
              {myStream &&
                <div>
                  <button className="font-bold absolute bottom-1" onClick={handleMute}>
                    {isMuted ?
                      <Image
                        src={muteButton}
                        width={30}
                        height={20}
                        alt='Mute Button'
                      />
                      :
                      <Image
                        src={unmuteButton}
                        width={30}
                        height={20}
                        alt='Mute Button'
                      />
                    }
                  </button>
                </div>}
            </div>
          )}
        </div>
        {userType === agentText && data?.postedBy?._id !== auth?.userResult?._id && (
          <div className="bg-white lg:w-[50%] md:w-[80%] md:m-auto h-fit rounded-lg my-4 mx-2">
            <FormModal isOpen={true} DATA={data} />
          </div>
        )}
      </div>
    </div>
  )
}
export default RoomPage
