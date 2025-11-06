import leftArrow from '@/assets/ButtonIcons/leftArrow.svg';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import addressIcon from '../../../assets/FooterIcons/location.svg';
import phoneIcon from '../../../assets/FooterIcons/phone.svg';
import footerContent from '@/content/Footer';
import Styles from './Footer.module.css';
import { MDLabel } from '@/components/MDLabel/MDLabel';
import { GLOBALLY_COMMON_TEXT } from '@/textV2';
import MailIcon from '@/assets/ColorChangeIcons/EmailIcon/EmailIcon';
const {contactButton}=GLOBALLY_COMMON_TEXT.buttons
const MobileFooter = () => {
    const [quickLinks, setQuickLinks] = useState(false)
    const [about, setAbout] = useState(false)
    const [contacts, setContacts] = useState(false)
    const {
        address,
        mobile,
        email,
        content } = footerContent;

    return (
        <>
            {content.map(({ heading, headContent }, index) =>
                <div className="max-w-[85vw] max-sm:text-[12px] gap-4" key={index}>
                   <div className="justify-between flex mt-7 text-[14px] font-semibold peer-checked:text-white " onClick={() => (heading === 'Quick Links' ? setQuickLinks(!quickLinks) : setAbout(!about))}>
                        <div>{heading}</div>
                        {(heading === 'Quick Links' ? quickLinks : about)
                            ?
                            <div>
                                <button className={Styles.RightSlideButton}>
                                    <Image src={leftArrow} width={18} height={18} className="m-auto rotate-90" alt='real estate left arrow image' />
                                </button>
                            </div>
                            :
                            <div>
                                <button className={Styles.RightSlideButton}>
                                    <Image src={leftArrow} width={18} height={18} className="m-auto -rotate-90" alt='Mores Property Icon, left arrow image' />
                                </button>
                            </div>
                        }
                    </div>
                    {(heading === 'Quick Links' ? quickLinks : about)
                        &&
                        headContent.map(({ name, path }, index) =>
                            <Link className="cursor-pointer block my-3" href={path} key={index}>
                                {name}
                            </Link>
                        )
                    }
                </div>
            )}
            <div className="max-w-[85vw] max-sm:text-[12px]">
                <div className="justify-between flex mt-7 text-[15px] mb-7 font-semibold peer-checked:text-white" onClick={() => setContacts(!contacts)}>
                    <div>{contactButton}</div>
                    {
                        contacts ?
                            <div>
                                <button className={Styles.RightSlideButton}>
                                    <Image src={leftArrow} width={18} height={18} className="m-auto rotate-90" alt='left arrow image' />
                                </button>
                            </div>
                            :
                            <div>
                                <button className={Styles.RightSlideButton}>
                                    <Image src={leftArrow} width={18} height={18} className="m-auto -rotate-90 " alt='left arrow image' />
                                </button>
                            </div>
                    }
                </div>
                {
                    contacts &&
                    <div className='md:w-[26%] lg:w-[30%]'>
                        <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} target='_blank' rel="noreferrer">
                            <MDLabel
                                inlineStyle={{
                                    position: 'relative',
                                        containerClass: 'absolute top-0',
                                        imgClass:'pt-[5px]',
                                        textColor: '#5f5f5f',
                                }}
                                icon={addressIcon}
                                text={address}
                            />
                        </a>
                        <a href={`mailto:${email}`} target='_blank' rel="noreferrer">
                            <MDLabel
                                icon={() => <MailIcon color="#5f5f5f" width="11" height="11" />}
                                text={email}
                                inlineStyle={{
                                    // position: 'relative',
                                    containerClass: 'my-4 relative top-[10px] items-center gap-x-2',
                                    textColor: '#5f5f5f',
                                }}
                            />
                        </a>
                        <a href={`tel:${mobile}`} target='_blank' rel="noreferrer">
                            <MDLabel
                                icon={phoneIcon}
                                text={mobile}
                                inlineStyle={{
                                    position: 'relative',
                                    containerClass: 'my-4 relative top-[10px]',
                                    imgClass:'pt-[5px]',
                                    textColor: '#5f5f5f',   
                                }}
                            />
                        </a>
                    </div>
                }
            </div>
        </>
    );
}

export default MobileFooter;