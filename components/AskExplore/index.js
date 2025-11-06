import React from 'react'
import Image from 'next/image'
const askExplore = "https://res.cloudinary.com/dgjhnlqjy/image/upload/v1762244401/assets/Images/ProjectView/askExplore.svg";
import Link from 'next/link'
import { GLOBALLY_COMMON_TEXT } from '@/textV2'
const { exploreMoreText } = GLOBALLY_COMMON_TEXT.text;
const AskExplore = () => {
    return (
        <div className=" mt-4 relative h-[500px] rounded-3xl border-2  shadow-sm overflow-hidden flex flex-col justify-between p-6 bg-white max-w-md">
            <div>
                <h2 className=" text-primary mb-4 leading-tight text-left">
                    Ask. Explore.<br />Discover.
                </h2    >
                <p className=" text-left text-headingColor leading-relaxed mb-2">
                    It doesn’t blink. It doesn’t sleep.<br />
                    It’s not just another tool — it thinks, responds, and helps you explore real estate like never before. One step in, and everything starts to align: locations, prices, hidden gems, everything related to the real estate world, all revealed in seconds.
                </p>
            </div>
            <div className="absolute right-0 bottom-0 h-full flex items-end justify-end pointer-events-none">
                <Image
                    src={askExplore}
                    alt="askExplore"
                    width={200}
                    height={200}
                    className="object-contain"
                    priority
                />
            </div>
            <div className="mt-6 z-10">
                <Link href="/chatbot" passHref>
                    <button className="border border-primary text-primary px-6 py-3 rounded-full text-sm hover:bg-primary hover:text-white transition-all duration-300">
                        {exploreMoreText}
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default AskExplore