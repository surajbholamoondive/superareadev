import { useState } from "react";
import Image from "next/image";
import SelfVeriify from "../../../assets/M-verification/SELFVERIFY.png";
import Liveicon from "../../../assets/M-verification/livevideo.webp";

import Nearmeicon from "../../../assets/SearchBoxIcon/nearme.svg";
import Camera from "../../../assets/M-verification/Camera.jpg";
import Mverify from "../../../components/myListing/Mverify";
import { useRouter } from "next/router";

const Right = ({ propertyId }) => {
  const [isMverifyOpen, setMverifyOpen] = useState(false);

  const router = useRouter();

  const handleStartVerification = () => {
    setMverifyOpen(true);
  };

  const handleMverifyClose = () => {
    setMverifyOpen(false);
  };

  const SkipClose = () => {
    router.push("/user/listing");
  };

  return (
    <section className={` ps-6  flex justify-center lg:shadow-xl rounded-md`}>
      <div className="pb-40 w-fit mt-20">
        <div>
          <div className=" flex justify-center">
            <Image
              src={SelfVeriify}
              alt="icon"
              width={50}
              height={50}
              className="bg-cyan-400 p-2 rounded-full"
            />
          </div>
        </div>

        <div className="h-fit text-sm">
          <h1 className="text-2xl ">
            Follow these steps for successful verification
          </h1>
        </div>

        <div>
          <div className=" flex mt-16 text-2xl gap-5">
            <Image src={Nearmeicon} alt="icon" width={40} height={40} />
            <h1>You are inside the property</h1>
          </div>
          <div className="text-xs">
            <p className="mt-1 ml-16">
              This will help you verify the location correctly.
            </p>
          </div>
        </div>

        <div>
          <div className=" flex mt-16 text-2xl gap-5  ">
            <Image src={Liveicon} alt="icon" width={40} height={40} />
            <h1 className="mt-1">Record one live video of your property</h1>
          </div>
          <div className="text-xs">
            <p className="mt-1 ml-16">As mention is the posting from.</p>
          </div>
        </div>

        <div>
          <div className=" flex mt-16 text-2xl gap-5  ">
            <Image src={Camera} alt="icon" width={40} height={40} />
            <h1 className="mt-1">Please upload the AdharCard image</h1>
          </div>
          <div className="text-xs">
            <p className="mt-1 ml-16">must have owners adhar card.</p>
          </div>
        </div>

        <div className="flex justify-evenly mt-14 max-sm:w-[350px] max-sm:flex max-sm:justify-evenly">
          <div>
            <button
              className="bg-primary p-4 rounded-md text-sm max-sm:p-2 max-sm:w-[150px] text-white tracking-wide"
              onClick={handleStartVerification}
            >
              Start Verification
            </button>
          </div>

          <div>
            <button
              className="bg-primary p-4 rounded-md text-sm max-sm:p-2  max-sm:w-[150px] text-white tracking-wide"
              onClick={SkipClose}
            >
              Skip
            </button>
          </div>

          {isMverifyOpen && (
            <Mverify
              isOpen={isMverifyOpen}
              onClose={handleMverifyClose}
              propertyId={propertyId}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Right;
