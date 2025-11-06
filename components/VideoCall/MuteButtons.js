import React from "react";
import { Mic, MicOff, Video, VideoOff } from "lucide-react";

const MicButton = ({ client, isAudioMuted, setIsAudioMuted }) => {
  const onMicrophoneClick = async () => {
    const mediaStream = client.current.getMediaStream();
    if (isAudioMuted) {
      await mediaStream?.unmuteAudio();
    } else {
      await mediaStream?.muteAudio();
    }
    setIsAudioMuted(client.current.getCurrentUserInfo().muted ?? true);
  };
  return (
    <button className='bg-[#00000050] hover:bg-[#00000090] h-[40px] w-[55px] rounded-full flex justify-center items-center' onClick={onMicrophoneClick} title="microphone">
      {isAudioMuted ? <MicOff color="#c1c1c1" /> : <Mic color="#c1c1c1" />}
    </button>
  );
};

const CameraButton = ({ client, isVideoMuted, setIsVideoMuted, renderVideo }) => {

  const onCameraClick = async () => {
    const mediaStream = client.current.getMediaStream();
    if (isVideoMuted) {
      await mediaStream.startVideo();
      setIsVideoMuted(false);
      await renderVideo({
        action: "Start",
        userId: client.current.getCurrentUserInfo().userId,
      });
    } else {
      await mediaStream.stopVideo();
      setIsVideoMuted(true);
      await renderVideo({
        action: "Stop",
        userId: client.current.getCurrentUserInfo().userId,
      });
    }
  };

  return (
    <button className='bg-[#00000050] h-[40px] w-[55px] rounded-full flex justify-center items-center hover:bg-[#00000090]' onClick={onCameraClick} title="camera">
      {isVideoMuted ? <VideoOff color="#c1c1c1" /> : <Video color="#c1c1c1" />}
    </button>
  );
};

export { MicButton, CameraButton };
