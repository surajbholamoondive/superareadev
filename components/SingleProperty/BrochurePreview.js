import React, { useState } from 'react'
import Image from 'next/image'
import { NEXT_PAGE_TEXT, PREVIOUS_PAGE_TEXT } from '@/text'

import Modal from '../popupModal/modal'

const BrochurePreview = ({ pdfUrls, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0)

  const nextPage = () => {
    if (currentPage < pdfUrls.length - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }
  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      inlineStyle={{
        modalColor: 'bg-white',
        paragraphStyles: 'text-center ',
        modalWidth: 'w-[70%]',
        modalHeight: 'h-[95%]',
        headingStyles: 'text-center text-black font-semibold text-[15px]',
      }}
    >
      <div className="flex justify-center rounded-lg ">
        <Image
          src={pdfUrls[currentPage]}
          alt="Real Estate Brochure, property Brochure"
          width={600}
          height={600}
          className="rounded-lg border border-black shadow-lg"
        />
      </div>

      <div>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={prevPage}
            disabled={currentPage <= 0}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-sm h-10"
          >
            {PREVIOUS_PAGE_TEXT}
          </button>
          <span>
            Page {currentPage + 1} of {pdfUrls.length}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage >= pdfUrls.length - 1}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-sm"
          >
            {NEXT_PAGE_TEXT}
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default BrochurePreview
