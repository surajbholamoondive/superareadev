import React, { Component } from "react";
import Image from 'next/image';
import Link from 'next/link';
import error from '@/assets/Images/error/error-img.svg'
import Styles from "@/pages/error.module.css"
import { makeApiRequest } from "@/utils/utils";
import { getLogger } from "@/helper/logger";
import { GLOBALLY_COMMON_TEXT, OTHER_PAGES_TEXT } from "@/textV2";
const {errorPage,}=OTHER_PAGES_TEXT
const {text,symbols,routes}=GLOBALLY_COMMON_TEXT
const logger = getLogger()
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            networkError: false
        };
    }

    static getDerivedStateFromError(error) {
        return { error: error };
    }

    componentDidCatch(error, errorInfo) {
        if (error.message === errorPage.networkError) {
            this.setState({ networkError: true });
        } else {
            const payload = {
                bugTitle: this.state.error.message,
                bugDetails: JSON.stringify(errorInfo),
                page: window.location.href,
                bugStatus: errorPage.autoCapture
            };
            makeApiRequest(text.postType, routes.userBugReport, payload)
                .then(response => {
                    return response
                })
                .catch(err => {
                    logger.error("Error sending bug report:", err);
                });
        }
    }
    render() {
        if (this.state.error) {
            return (
                <div>
                    {this.state.networkError ? (
                        <div>
                            <p>{errorPage.networkError}</p>
                        </div>
                    ) : (
                        <div className='flex items-center justify-center wrapper'>
                            <div className={`pb-[2%] ${Styles.errorcontainer}`}>
                                <div className='flex flex-col md:flex-row h-fit w-full gap-2'>
                                    {/* Image Section */}
                                    <div className='w-full md:w-[50%] h-auto'>
                                        <Image
                                            height={680}
                                            width={100}
                                            src={error}
                                            alt='error'
                                            className='w-full'
                                        />
                                    </div>
                                    {/* Content Section */}
                                    <div className='flex flex-col w-full md:w-[50%] py-[50px] md:py-[100px] justify-center'>
                                        <h1 className='text-[35px]'>{errorPage.oopsText}</h1>
                                        <h1 className='text-[35px]'>{errorPage.somethingWentWrong}</h1>
                                        <div className='bg-black h-[3px] w-[90%] mb-4'></div>
                                        <div>
                                            <p className={Styles.text}>{errorPage.defaultError}</p>
                                        </div>

                                        {/* Buttons Section */}
                                        <div className='flex flex-col md:flex-row items-center gap-4 mt-4'>
                                            <Link href={symbols.slash} onClick={() => window.location('/')}>
                                                <button
                                                    style={{ backgroundColor: '#931602', border: '#931602 solid black' }}
                                                    className={`h-fit ${Styles.btn}`}
                                                >
                                                    {errorPage.backToHome}
                                                </button>
                                            </Link>
                                            <button
                                                style={{ backgroundColor: 'white', color: 'black', border: '1.5px solid black' }}
                                                className={`py-[18px] ${Styles.btn}`}
                                                onClick={() => window.location.reload()}
                                            >
                                                {errorPage.reloadText}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )}
                </div>
            );
        }
        return this.props.children;
    }
}
export default ErrorBoundary;
