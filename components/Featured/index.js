import { FEATURED_SUPER_AREA } from '@/content/FeaturedSuperArea/featuredSuperArea'
import Link from 'next/link'
import React from 'react'
import { GLOBALLY_COMMON_TEXT } from '@/textV2'
const { contactSuperAreaText, whatMakesSuperAreaSmarterText } = GLOBALLY_COMMON_TEXT.text;

const Featured = () => {
    return (
        <div
            className="py-6  bg-white w-full max-w-md  mt-4 flex flex-col justify-center items-center rounded-3xl border-2  shadow-sm"

        >
            <h2 className="mb-4 text-primary text-center">{whatMakesSuperAreaSmarterText}</h2>
            <div className='flex flex-col gap-4 px-4'>
                {FEATURED_SUPER_AREA.map((item, index) => (
                    <div key={index}>
                        <h5 className='text-primary'>{item.title}</h5>
                        <p className='text-sm tracking-wide'>{item.description}</p>
                        <Link href={item.link} className='text-primary text-xs'>Know More </Link>
                    </div>
                ))}
            </div>

            <div className="mt-6 z-10">
                <Link href="/contact-us" passHref>
                    <button className="border border-primary text-primary px-10 py-3 rounded-full text-sm hover:bg-primary hover:text-white transition-all duration-300">
                        {contactSuperAreaText}
                    </button>
                </Link>
            </div>

        </div>
    )
}

export default Featured