import React, { useEffect, useState } from 'react'

import { COMPONENTS, GLOBALLY_COMMON_TEXT } from '@/textV2'
import { ValidateCustomURL } from '@/utils/utils'

import MDLabelAndInput from '@/components/MDLabelAndInput'
import OpenGraphPreviewCard from '@/components/OpenGraphPreviewCard'
import TooltipComponent from '@/components/Tooltip'

const { POST_PROJECT_COMPO } = COMPONENTS
const { text } = GLOBALLY_COMMON_TEXT
const { stepProjectSEO, routes } = POST_PROJECT_COMPO

export default function ProjectSEO({ projectData, setProjectData }) {
  const [isAuto, setIsAuto] = useState(false)
  const [customUrlError, setCustomUrlError] = useState('')

  const extractTextBetweenPTags = (htmlString) => {
    const pTextMatches = htmlString?.match(/<p>(.*?)<\/p>/g)
    const pTexts = pTextMatches
      ? pTextMatches.map((p) => p.replace(/<\/?p>/g, ''))
      : []
    const joinedText = pTexts.join(' ')
    return joinedText.slice(0, 170)
  }

  function urlGenerator(propertyDetail) {
    const {
      propertyType,
      projectType,
      city,
      propertyTitle,
      projectTitle,
      propertySize,
      locality,
      projectSubType,
      propertySubType,
      propertyAreaUnit,
    } = propertyDetail || {}

    let metadataString = ''

    if (propertyTitle) metadataString += `${propertyTitle}-`
    if (projectTitle) metadataString += `${projectTitle}-`
    if (propertyType) metadataString += `${propertyType}-`
    if (projectType) metadataString += `${projectType}-`
    if (propertySize) metadataString += `${propertySize}-`
    if (propertyAreaUnit) metadataString += `${propertyAreaUnit}-`
    if (city) metadataString += `${city}-`
    if (locality) metadataString += `${locality}-`
    if (propertySubType) metadataString += `${propertySubType}-`
    if (projectSubType) metadataString += `${projectSubType}-`

    metadataString = metadataString.replace(/-$/, '')
    metadataString = metadataString.replace(/[^a-zA-Z0-9\s-]/g, '')
    metadataString = metadataString.replace(/\s+/g, '-')
    metadataString = metadataString.replace(/--+/g, '-')

    let url = ''
    if (propertyTitle) {
      url = `${metadataString}`
    } else {
      url = `${metadataString}`
    }

    url = url.replace(/\/\//g, '/')

    return url
  }
  const customURL = urlGenerator(projectData)
  useEffect(() => {
    let descriptionData = extractTextBetweenPTags(
      projectData?.projectDescription
    )
    try {
      if (
        !projectData?.projectMetaTitle ||
        !projectData?.projectMetaDescription
      ) {
        setProjectData((prevData) => ({
          ...prevData,
          projectMetaTitle: prevData.projectMetaTitle || prevData.projectTitle,
          projectMetaDescription:
            prevData.projectMetaDescription || descriptionData,
          customProjectUrl: prevData.customProjectUrl || customURL,
        }))
      }
    } catch (error) {
      console.error(error)
    }
  }, [projectData?.projectDescription])

  const handleProjectDataChange = (keyName, value) => {
    if (keyName === 'customProjectUrl') {
      const validationError = ValidateCustomURL(value)
      setCustomUrlError(validationError || '')
    }

    setProjectData({
      ...projectData,
      [keyName]: value,
    })
  }
  const handleKeyDown = (e) => {
    const invalidChars = /[^a-zA-Z0-9-]/g
    if (invalidChars.test(e.key)) {
      e.preventDefault()
    }
  }
  return (
    <div className="px-7 py-2">
      <div>
        <MDLabelAndInput
          label={stepProjectSEO.projectMetaTitleHeading}
          labelClass="text-headingColor"
          inputState={projectData?.projectMetaTitle}
          cssClass="w-[600px] h-[38px]"
          maxLength={70}
          tooltipText={stepProjectSEO.projectMetaTitleTooltip}
          onChangeFunction={(value) =>
            handleProjectDataChange('projectMetaTitle', value)
          }
          isRequired={false}
        />
        <div className="mt-4">
          <div className="flex">
            <p className="mb-2 text-[1rem] text-headingColor">
              {stepProjectSEO.metaDescriptionHeading}
            </p>
            <div>
              <TooltipComponent
                tooltipText={stepProjectSEO.projectMetaDescTooltip}
              />
            </div>
          </div>
          <textarea
            type="text"
            value={projectData?.projectMetaDescription}
            onChange={(e) =>
              handleProjectDataChange('projectMetaDescription', e.target.value)
            }
            maxLength={170}
            className="border border-black p-1 pt-1.5 rounded-md w-[90%] h-20 focus:outline-none focus:border-headingColor resize-none"
          />
        </div>
        <div className="mt-4">
          <div className="flex">
            <p className="mb-2 text-[1rem]">
              {stepProjectSEO.customUrlHeading}
            </p>
          </div>

          <textarea
            type="text"
            value={projectData?.customProjectUrl}
            onChange={(e) =>
              handleProjectDataChange('customProjectUrl', e.target.value)
            }
            maxLength={120}
            onKeyDown={handleKeyDown}
            className={`border p-1 pt-1.5 rounded-md w-[90%] h-20 focus:outline-none  resize-none  border-headingColor`}
          />

          {customUrlError && (
            <p className="text-primary mt-2">{customUrlError}</p>
          )}

          <div>
            <p className="my-2 text-[1rem]">{stepProjectSEO.currentUrl}</p>
            <p className="text-primary underline">
              {`${stepProjectSEO.superAreaUrl}${routes.projectViewPath}/`}
              {projectData?.customProjectUrl ? (
                <strong>{projectData.customProjectUrl}</strong>
              ) : (
                <strong>{stepProjectSEO.customURLHere}</strong>
              )}
              {`/${stepProjectSEO.customId}`}
            </p>
          </div>

          <div className="mt-5">
            <p className="mb-2 text-[1rem]">
              {stepProjectSEO.openGraphPreview}
            </p>
            <OpenGraphPreviewCard
              title={projectData?.projectMetaTitle}
              description={projectData?.projectMetaDescription}
              image={
                projectData?.projectImages?.[0]?.url &&
                projectData?.projectImages[0]?.url
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}
