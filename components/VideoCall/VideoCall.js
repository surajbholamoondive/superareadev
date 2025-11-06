import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import loader from '@/assets/Images/VideoCamera/loader.svg'
import OtherProfile from '@/assets/Images/VideoCamera/OtherProfile.svg'
import { useAuth } from '@/context/auth'
import ZoomVideo, { VideoQuality } from '@zoom/videosdk'
import { PhoneOff } from 'lucide-react'

import { Button } from './Button'
import { CameraButton, MicButton } from './MuteButtons'
import styles from './VideoCalling.module.css'

const Videocall = ({ session, jwt, inSession, setInSession }) => {
  const router = useRouter()
  const auth = useAuth()
  const userName =
    auth[0]?.userResult?.firstName + ' ' + auth[0]?.userResult?.lastName
  const client = useRef(ZoomVideo.createClient())
  const mediaStream = useRef(null)
  const [isControlVisible, setIsControlVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isVideoMuted, setIsVideoMuted] = useState(true)
  const [isAudioMuted, setIsAudioMuted] = useState(true)
  const videoContainerRef = useRef(null)
  const [cameras, setCameras] = useState()
  const [selectedCameraId, setSelectedCameraId] = useState()
  const hideControlTimeout = useRef(null)
  const [isOtherUserCameraOn, setIsOtherUserCameraOn] = useState(true)
  const [otherUserName, setOtherUserName] = useState('')

  const handleMouseMove = () => {
    setIsControlVisible(true)
    if (hideControlTimeout.current) {
      clearTimeout(hideControlTimeout.current)
    }
    hideControlTimeout.current = setTimeout(() => {
      setIsControlVisible(false)
    }, 5000) // Hide controls after 5 seconds of inactivity
  }

  useEffect(() => {
    return () => {
      if (hideControlTimeout.current) {
        clearTimeout(hideControlTimeout.current)
      }
    }
  }, [])

  useEffect(() => {
    client.current.on('peer-video-state-change', handlePeerVideoStateChange)
    return () => {
      client.current.off('peer-video-state-change', handlePeerVideoStateChange)
    }
  }, [])

  const handlePeerVideoStateChange = (payload) => {
    setIsOtherUserCameraOn(payload.action === 'Start')
  }

  useEffect(() => {
    if (inSession && mediaStream.current) {
      fetchCameras()
    }
  }, [inSession, mediaStream.current])

  const fetchCameras = async () => {
    const availableCameras = await mediaStream.current.getCameraList()
    if (!availableCameras.length > 0) {
      setTimeout(() => {
        fetchCameras() // Retry fetching cameras
      }, 1000) // Retry after 1 second
      return
    } else {
      setCameras(availableCameras)
      setSelectedCameraId(availableCameras[0].deviceId)
    }
  }

  const joinSession = async () => {
    setLoading(true)
    try {
      await client.current.init('en-US', 'Global', { patchJsMedia: true })
      client.current.on('peer-video-state-change', (payload) => {
        renderVideo(payload)
      })

      await client.current.join(session, jwt, userName)
      setInSession(true)
      mediaStream.current = client.current.getMediaStream()
      if (!mediaStream.current) {
        console.error('Failed to get mediaStream.')
        return
      }

      // Start audio and video streams
      await mediaStream.current.startAudio()
      setIsAudioMuted(mediaStream.current.isAudioMuted())
      await mediaStream.current.startVideo()
      setIsVideoMuted(!mediaStream.current.isCapturingVideo())
      renderVideo({
        action: 'Start',
        userId: client.current.getCurrentUserInfo().userId,
      })
      const participants = client.current.getAllUser()
      participants.forEach((participant) => {
        if (participant.userId !== client.current.getCurrentUserInfo().userId) {
          renderVideo({
            action: 'Start',
            userId: participant.userId,
          })
        }
      })
      const otherUser = participants.find(
        (participant) =>
          participant.userId !== client.current.getCurrentUserInfo().userId
      )
      if (otherUser) {
        setOtherUserName(otherUser.displayName || 'Other User')
      }

      // Route audio to speaker on mobile devices
      if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        await mediaStream.current.setSpeaker(true) // Explicitly route to speaker if supported
      }
    } catch (e) {
      console.error('Error in joining session or setting up media:', e)
    } finally {
      setLoading(false)
    }
  }
  const renderVideo = async (event) => {
    if (!mediaStream.current) {
      console.error('MediaStream is not initialized.')
      return
    }

    if (event.action === 'Stop') {
      const elements = await mediaStream.current.detachVideo(event.userId)
      elements.forEach((el) => {
        el.remove()
      })
    } else {
      try {
        const userVideo = await mediaStream.current.attachVideo(
          event.userId,
          VideoQuality.Video_1080P
        )
        videoContainerRef.current.appendChild(userVideo)
      } catch (error) {
        console.error(`Failed to attach video for user ${event.userId}:`, error)
      }
    }
  }

  const leaveSession = async () => {
    client.current.off('peer-video-state-change')
    await client.current.leave().catch((e) => console.log('leave error', e))

    if (auth[0].userResult.userType != 'Agent') {
      router.push('/user/listing')
    } else {
      router.push('/agent/e-verification')
    }
    // window.location.href = "/";
  }

  const switchCamera = async (deviceId) => {
    if (deviceId === selectedCameraId) return // No switch necessary
    await mediaStream.current.switchCamera(deviceId)
    setSelectedCameraId(deviceId)
  }

  return (
    <div
      className={`flex h-full w-full flex-1 flex-col   ${auth[0].userResult.userType === 'Agent' && 'md:w-[60%]'}`}
    >
      {/* <h1 className="text-center text-3xl font-bold mb-4 mt-0">
                Session: {session}
            </h1> */}
      {!inSession ? (
        <div className="w-[99vw] flex justify-center">
          <Button
            className="w-[20%] mb-6 text-white"
            onClick={joinSession}
            title="Join Session"
          >
            Join
          </Button>
        </div>
      ) : (
        <>
          <div
            onMouseMove={handleMouseMove}
            onClick={handleMouseMove}
            className="relative flex items-center justify-center"
          >
            <video-player-container
              ref={videoContainerRef}
              style={videoPlayerStyle}
            />

            {loading && (
              <div className="z-[100] absolute flex flex-col items-center justify-center w-[200px]  bg-[#797979] rounded-2xl max-md:h-[180px] h-[200px]">
                {/* <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-l-4 border-b-4 border-r-4 border-r-[#307cffce] border-[#0000001c]"></div> */}
                <Image
                  style={{ animationDuration: '3s' }}
                  className="animate-spin max-md:-mt-6 -mt-10 max-md:min-w-[200px] min-w-[280px]"
                  src={loader}
                  width={280}
                  height={280}
                />
                <p className="-mt-8 max-md:-mt-4 text-lg text-[#f1f1f1]">
                  Fetching Cameras...
                </p>
              </div>
            )}
            {!isOtherUserCameraOn && (
              <div className="absolute h-[86%] gap-4 rounded-[20px] bg-[#ffffff90] w-[90%] flex flex-col items-center justify-center">
                <Image src={OtherProfile} width={180} height={180} />
                {otherUserName}
              </div>
            )}
            {isVideoMuted && (
              <div
                className={`${styles.dummy} absolute bottom-[19%] z-[60] backdrop-blur-lg right-[6.55%] max-[540px]:h-[120px] h-[180px] shadow-md rounded-[20px] bg-[#ffffff50] w-[320px] flex flex-col items-center gap-3 justify-center`}
              >
                <Image
                  src={OtherProfile}
                  className={styles.profile}
                  width={80}
                  height={80}
                />
                {userName}
              </div>
            )}
            {isControlVisible && (
              <div className="top-[420px]  absolute flex w-full flex-col justify-around self-center">
                <div className=" mt-4 flex w-[30rem] max-md:w-[19rem] z-50 flex-1 justify-around self-center rounded-3xl p-2 filter backdrop-blur-lg bg-[#00000030]">
                  <CameraButton
                    client={client}
                    isVideoMuted={isVideoMuted}
                    setIsVideoMuted={setIsVideoMuted}
                    renderVideo={renderVideo}
                  />
                  <MicButton
                    isAudioMuted={isAudioMuted}
                    client={client}
                    setIsAudioMuted={setIsAudioMuted}
                  />
                  {cameras && selectedCameraId && (
                    <select
                      style={{
                        backgroundColor: '#00000050',
                        paddingLeft: '10px',
                        paddingRight: '10px',
                        borderRadius: '50px',
                        color: '#c1c1c1',
                      }}
                      className="hover:bg-[#00000090] focus:outline-none"
                      onChange={(e) => switchCamera(e.target.value)}
                      value={selectedCameraId}
                    >
                      {cameras.map((cam) => (
                        <option key={cam.deviceId} value={cam.deviceId}>
                          {cam.label}
                        </option>
                      ))}
                    </select>
                  )}
                  <Button
                    className="bg-[#991b1b50] h-[40px] w-[55px] rounded-full hover:bg-red-800"
                    onClick={leaveSession}
                    title="Leave Session"
                  >
                    <PhoneOff
                      className="min-h-[20px] w-[20px]"
                      color="#f1f1f1"
                    />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default Videocall

const videoPlayerStyle = {
  // height: "75vh",
  // marginTop: "1.5rem",
  // marginLeft: "3rem",
  // marginRight: "3rem",
  // borderRadius: "10px",
  overflow: 'hidden',
}
// const userName = `User-${new Date().getTime().toString().slice(8)}`;
