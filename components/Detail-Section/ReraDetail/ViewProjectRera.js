import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import eye from '@/assets/moreIcon/viewed.svg'
import { DOWNLOAD, PROJECT_DOCUMENTS, VIEW } from '@/text'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import { formStructure } from '@/components/Admin/Post-Project/StepRera'

import downloadIcon from '../../../assets/AgentDashbord/download.svg'

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return dateString
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const ReraDetails = ({ projectData }) => {
  const [expandedIndex, setExpandedIndex] = useState(null)

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <div className="text-sm">
      {projectData?.projectReraDetails?.map((reraDetail, index) => {
        const hasDocuments = reraDetail?.projectDocuments?.some(
          (doc) => doc.documentUrl.trim() !== ''
        )

        return (
          <div
            key={index}
            className=" rounded-3xl border border-gray-100 overflow-hidden mb-4"
          >
            {/* Header */}
            <div
              className="px-4 py-3 border-b flex justify-between items-center cursor-pointer flex-wrap gap-2 sm:gap-4"
              onClick={() => toggleExpand(index)}
            >
              <p className="text-gray-800 text-sm sm:text-base">
                Project RERA ID{' '}
                <span className="font-bold text-gray-950">
                  {reraDetail.projectReraId}
                </span>
              </p>

              <div className="flex items-center gap-2 sm:gap-4">
                <ExpandMoreIcon
                  className={`transition-transform text-primary duration-300 ${
                    expandedIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </div>

            {expandedIndex === index && (
              <div
                className={`grid ${
                  hasDocuments ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'
                }`}
              >
                {/* Left Section */}
                <div className="p-4 sm:p-6">
                  <div
                    className={`grid gap-y-6 gap-x-6 ${
                      hasDocuments
                        ? 'grid-cols-1 sm:grid-cols-2'
                        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                    }`}
                  >
                    {Object.keys(formStructure.reraDetail).map((key) => {
                      if (key === 'reraExternalLink' || key === 'projectReraId')
                        return null

                      const { type, label } = formStructure.reraDetail[key]
                      const value = reraDetail[key]
                      if (!value) return null

                      const formattedValue =
                        type === 'date' ? formatDate(value) : value

                      return (
                        <div
                          key={key}
                          className="text-center border-b border-dotted border-newBackground pb-2"
                        >
                          <p className="font-semibold text-primary text-sm sm:text-base">
                            {formattedValue}
                          </p>
                          <p className="text-gray-600 text-xs mt-1">{label}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Right Section */}
                {hasDocuments && (
                  <div className="p-4 sm:p-6 border-t md:border-t-0 md:border-l border-dotted border-newBackground">
                    <p className="font-semibold mb-3 sm:mb-4 text-primary text-sm sm:text-base">
                      {PROJECT_DOCUMENTS}
                    </p>
                    {reraDetail?.projectDocuments.map(
                      (doc, docIndex) =>
                        doc.documentUrl.trim() !== '' && (
                          <div key={docIndex} className="mb-3 sm:mb-4">
                            <p className="text-primary font-semibold text-sm sm:text-base mb-2">
                              {doc.documentName}
                            </p>
                            <div className="flex flex-wrap items-center justify-between">
                              <Link
                                href={`https://drive.google.com/viewerng/viewer?url=${doc.documentUrl}`}
                                target="_blank"
                                className="flex items-center text-gray-700 no-underline text-xs sm:text-sm"
                              >
                                <Image
                                  src={eye}
                                  width={18}
                                  height={18}
                                  alt="View"
                                />
                                <span className="ml-1">{VIEW}</span>
                              </Link>

                              <Link
                                href={doc.documentUrl}
                                download
                                className="bg-primary text-white rounded-full px-3 py-1 flex items-center text-xs sm:text-sm"
                              >
                                <Image
                                  src={downloadIcon}
                                  width={16}
                                  height={16}
                                  alt="Download"
                                />
                                <span className="ml-1">{DOWNLOAD}</span>
                              </Link>
                            </div>
                          </div>
                        )
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default ReraDetails








