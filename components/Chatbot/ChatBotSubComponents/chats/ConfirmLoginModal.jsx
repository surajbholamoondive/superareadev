import React from "react";
import styles from "../../index.module.css";
import Link from "next/link";
import Image from "next/image";
import superAreaLogo from './../../../../assets/chatbot/superAreaLogo.svg';

const ConfirmLoginModal = ({ open, message, onCancel }) => {
    if (!open) return null;

    return (
        <div className={`  ${styles.modalOverlay} bg-primary bg-opacity-50`}>
            <div className={`${styles.modalContent} relative overflow-hidden`}>
                {/* Close button */}
                <Image src={superAreaLogo} height={400} className="mb-6 pointer-events-none absolute -right-28 -top-10 opacity-10 z-[100px]" />

                <button
                    onClick={onCancel}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors"
                >
                    ✕
                </button>

                {/* Content container */}
                <div className="flex flex-col items-center text-center py-8 px-6">
                    {/* Red SuperArea icon */}
                    <Image src={superAreaLogo} className="mb-6 pointer-events-none " />
                    {/* Welcome text */}
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                        Welcome to SuperArea.ai
                    </h2>

                    {/* Login prompt */}
                    <p className="text-gray-700 mb-8 text-md">
                        Log in with your <span className="text-red-600 text-[16px] font-semibold">SuperArea</span> account to continue
                    </p>

                    {/* Buttons */}
                    <div className="flex gap-4 w-full max-w-sm">
                        <Link href={`${process.env.NEXT_PUBLIC_FRONTEND_API}/login`} >
                            <button className="w-[150px] px-6 py-3 bg-white border-2 border-red-600 text-red-600 rounded-full font-medium hover:bg-red-50 transition-colors">
                                Log in
                            </button>
                        </Link>
                        <Link href={`${process.env.NEXT_PUBLIC_FRONTEND_API}/register`} >
                            <button
                                onClick={onCancel}
                                className=" py-3 px-6 w-[150px] bg-white border-2 border-red-600 text-red-600 rounded-full font-medium hover:bg-red-50 transition-colors"
                            >
                                Sign up
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmLoginModal;