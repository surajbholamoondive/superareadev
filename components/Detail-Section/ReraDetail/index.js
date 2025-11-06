import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import faTrash from '@/assets/ImageComponent/trash.svg'
import eye from '@/assets/moreIcon/viewed.svg'
import { CONVERSION_FACTORS, DOWNLOAD, PROJECT_DOCUMENTS, VIEW } from '@/text'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import { formStructure } from '@/components/Admin/Post-Project/StepRera'
import downloadIcon from '../../../assets/AgentDashbord/download.svg'
import edit_white_icon from '../../../assets/EditIcon/edit_white_icon.svg'

const ReraDetails = ({ projectData, deleteFunction, editfunction }) => {
  const [expanded, setExpanded] = useState(false) // yahi change kiya - true se false kar diya

  const togglePoints = () => {
    setExpanded(!expanded)
  }

  const convertToSquareFeet = (value, unitType) => {
    if (!value || !unitType) return value
    const conversionFactor = CONVERSION_FACTORS[unitType]
    const convertedValue = value * conversionFactor
    return convertedValue.toFixed(2)
  }

  return (
    <div className="text-sm">
      <div onClick={togglePoints}>
        <div>
          {projectData?.projectReraDetails?.map((reraDetail, index) => (
            <Accordion
              key={index}
              sx={{ boxShadow: 'none' }}
              expanded={expanded}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
                className="relative"
              >
                <p className="text-sm ">
                  <strong>Project RERA ID: &nbsp; </strong>
                  {reraDetail.reraExternalLink ? (
                    <Link
                      href={reraDetail.reraExternalLink}
                      target="_blank"
                      className="text-black border-b border-black no-underline"
                    >
                      {reraDetail.projectReraId}
                    </Link>
                  ) : (
                    reraDetail.projectReraId
                  )}
                </p>
                <div className="flex">
                  {deleteFunction && (
                    <div
                      onClick={() => deleteFunction(index)}
                      className="absolute right-12 p-1 text-white bg-primary rounded"
                    >
                      <Image src={faTrash} width={15} height={15} alt="Photo" />
                    </div>
                  )}
                  {editfunction && (
                    <div
                      onClick={() => editfunction(index)}
                      className="absolute right-20 p-1 text-white bg-primary rounded"
                    >
                      <Image
                        src={edit_white_icon}
                        width={15}
                        height={15}
                        alt="Photo"
                      />
                    </div>
                  )}
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div
                  className={`border ${reraDetail?.projectDocuments?.some((doc) => doc.documentUrl.trim() !== '') ? 'grid md:grid-cols-2' : 'flex flex-col'} rounded-md`}
                >
                  <div>
                    <p className="font-semibold text-center border-b py-3">
                      RERA Summary
                    </p>
                    <div
                      className={`p-3 grid grid-cols-2 ${
                        reraDetail?.projectDocuments?.some(
                          (doc) => doc.documentUrl.trim() !== ''
                        )
                          ? 'lg:grid-cols-2'
                          : 'lg:grid-cols-3'
                      } gap-x-6 gap-y-4`}
                    >
                      {Object.keys(formStructure.reraDetail).map((key) => {
                        if (
                          key === 'reraExternalLink' ||
                          key === 'projectReraId'
                        )
                          return null
                        const { type, label } = formStructure.reraDetail[key]
                        const value = reraDetail[key]
                        if (!value) return null

                        const formattedValue =
                          type === 'date'
                            ? new Date(value).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })
                            : value

                        return (
                          <div key={key} className="mb-2 border-b ">
                            <strong>{label}:</strong>
                            {label == 'Total Area' ? (
                              <p className="mt-1">
                                {convertToSquareFeet(
                                  formattedValue,
                                  reraDetail?.projectTotalAreaUnit
                                )}{' '}
                                Sq.Ft.
                              </p>
                            ) : (
                              <p className="mt-1">{formattedValue} </p>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Right Column - Project Documents */}
                  {reraDetail?.projectDocuments?.some(
                    (doc) => doc.documentUrl.trim() !== ''
                  ) && (
                    <div className="border-l">
                      <p className="font-semibold text-center border-b py-3">
                        {PROJECT_DOCUMENTS}
                      </p>
                      <ul className="p-3">
                        {reraDetail?.projectDocuments.map(
                          (doc, docIndex) =>
                            doc.documentUrl.trim() !== '' && (
                              <div className=" gap-y-2 flex flex-col">
                                <p>{doc.documentName}</p>

                                <li
                                  key={docIndex}
                                  className="flex justify-between items-center "
                                >
                                  <div className="flex space-x-2">
                                    <Link
                                      href={`https://drive.google.com/viewerng/viewer?url=${doc.documentUrl}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="font-bold text-black no-underline flex items-center mr-4"
                                    >
                                      <Image
                                        src={eye}
                                        width={18}
                                        height={20}
                                        alt="View"
                                        className="mr-1"
                                      />
                                      {VIEW}
                                    </Link>
                                    <Link
                                      href={doc.documentUrl}
                                      download={
                                        doc.documentName.endsWith('.pdf')
                                          ? doc.documentName
                                          : `${doc.documentName}.pdf`
                                      }
                                      className="bg-primary text-white rounded-md capitalize w-fit h-8 px-3 flex items-center"
                                    >
                                      <Image
                                        src={downloadIcon}
                                        width={18}
                                        height={20}
                                        alt="Download"
                                      />
                                      <p className="ml-1 text-white">
                                        {DOWNLOAD}
                                      </p>
                                    </Link>
                                  </div>
                                </li>
                              </div>
                            )
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  )
}
export default ReraDetails;