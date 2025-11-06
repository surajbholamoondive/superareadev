import React from 'react'
import Modal from '@/components/popupModal/modal'


import { GLOBALLY_COMMON_TEXT } from '@/textV2'

const { text } = GLOBALLY_COMMON_TEXT


const LogoutConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            inlineStyle={{
                modalColor: 'bg-white',
                modalWidth: 'w-[400px]',
                modalHeight: 'h-[150px]',
                childrenPaddings: 'p-6',
                headingStyles: 'text-center text-black font-semibold text-[18px] mb-4',
            }}
            showCloseIcon={false}
        >
            <div className="flex flex-col justify-center items-center text-center h-full">
                <p className="text-gray-700 mb-6 ">
                    {text.logoutText}
                </p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        {text.noText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-6 py-2 bg-primary text-white rounded-md  transition-colors"
                    >
                        {text.yesText}
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default LogoutConfirmationModal 