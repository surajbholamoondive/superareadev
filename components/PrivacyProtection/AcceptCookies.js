import React, { useState, useEffect } from 'react';
import style from './index.module.css';
import Cookies from 'js-cookie';


import grayCookie from "../../assets/cookies/grayCookie.svg"
import whitecookie from '../../assets/cookies/white-cookie.svg'
import Image from 'next/image';
import { GLOBALLY_COMMON_TEXT, HOME_PAGE_TEXT } from '@/textV2';
const {text}=HOME_PAGE_TEXT
const AcceptCookies = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const cookiesInfo = Cookies.get("Cookies");
        setShow(cookiesInfo === undefined);
    }, []);

    const handleAccept = () => {
        Cookies.set("Cookies", true, { expires: 365 });
        setShow(false);
    };

    const handleReject = () => {
        Cookies.set("Cookies", false, { expires: 365 });
        setShow(false);
    };

    if (!show) {
        return null;
    }

    return (
        <div className={`${style.cookieConsentContainer} w-[1200px] mx-auto items-center`}>
            <div className='flex max-w-[800px] flex-col sm:flex-row max-sm:mb-5 items-center'>
                <div className='rounded-full h-[40px] w-[40px] flex justify-center items-center mr-3'>
                    <Image src={grayCookie} height={25} width={25} alt='cookie' />
                </div>
                <p className='text-center sm:text-left'>
                    {text.cookiesText}
                    <a
                        href="/privacy-policy"
                        className='text-primary underline cursor-pointer'
                    >
                        {GLOBALLY_COMMON_TEXT.text.privacyPolicyText}
                    </a>.
                </p>
            </div>

            <div className='flex justify-center sm:justify-start items-center gap-2 mt-2'>
                <button
                    className='px-4 py-2 text-[13px] bg-primary rounded-lg text-white flex items-center gap-1'
                    onClick={handleAccept}
                >
                    <Image src={whitecookie} height={18} width={18} alt='cookie' />{text.acceptCookies}
                </button>
                <button
                    className='px-4 py-2 text-[13px] rounded-lg bg-white text-black border border-black'
                    onClick={handleReject}
                >
                    {text.declineCookies}
                </button>
            </div>
        </div>

    );
};

export default AcceptCookies;