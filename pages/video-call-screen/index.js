import React, { useEffect, useState } from "react";
import axios from "axios";
import dynamic from 'next/dynamic';
import { useAuth } from "@/context/auth";
import Unauthorized from "@/components/UnauthorizedSection/unauthorized";
import { useRouter } from "next/router";
import Image from "next/image";
import OtherProfile from "@/assets/Images/VideoCamera/OtherProfile.svg"
import FormModal from "@/components/NoticeTray/form";
import SALogo from '../../assets/logo/logo-icon.svg'
const Videocall = dynamic(() => import('@/components/VideoCall/VideoCall'), {
  ssr: false
});

const VideoCallScreen = () => {
  const route = useRouter()
  const auth = useAuth()
  if (!auth[0].userResult) {
    return <Unauthorized />
  }
  const [inSession, setInSession] = useState(false);
  const [token, setToken] = useState();
  const [data, setData] = useState();
  const userName = auth[0]?.userResult?.firstName + " " + auth[0]?.userResult?.lastName
  const sessionName = route.query.room
  const role = auth[0].userResult.userType === 'Agent' ? 1 : 0;
  const encodedData = route.query.data
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

  const handleclick = async () => {
    try {
      const response = await axios.get(`/activity/get-zoom-token/${sessionName}/${role}`);
      setToken(response?.data?.token);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    handleclick()
  }, [sessionName, role])

  return (
    <div className="py-2">
    <div className="max-2xl:px-1 w-[95%] lg:w-[90%] custom-section mx-auto rounded-lg px-2">
      <div className={inSession && "py-10 flex max-md:flex-col gap-4 mx-auto justify-between"}>
        {!inSession && <><div className="flex w-full items-center justify-center">
          <div className={` h-[400px] shadow rounded-[20px] bg-[#ffffff50] border w-[60%] max-md:w-[80%] mx-10 mt-10 flex flex-col items-center gap-3 justify-center`}>
            <Image src={OtherProfile} width={80} height={80} />{userName}
          </div>
        </div>
          <div className="flex justify-center  py-4 w-full">
            <p className="w-[45%] text-center">Initiate a live camera verification process to authenticate your property and safeguard against fraudulent activities.</p>
          </div>
        </>}

        {token && <Videocall session={sessionName} jwt={token} inSession={inSession} setInSession={setInSession} />}
        {(auth[0].userResult.userType === 'Agent' && inSession) && <div className="relative border-[#0168A250] border rounded-2xl w-[35%] max-md:w-full overflow-hidden">
          <Image className="absolute top-32 left-28 -z-30" src={SALogo} width={200} height={200} />
          <div className="bg-[#f1fafff0] overflow-y-scroll max-md:h-full h-[31.2rem] custom-scrollbar">
            <FormModal isOpen={true} DATA={data} />
          </div>
        </div>}
      </div>
    </div>
    </div>
  );
}
export default VideoCallScreen;
