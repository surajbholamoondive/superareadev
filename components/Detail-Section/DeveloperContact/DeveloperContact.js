import React from 'react'

const DeveloperContact = ({ developerData }) => {
  const developerName =
    developerData?.developerName || developerData?.name || 'Developer'

  // Hardcoded contact details as requested
  const contactPhone = '12345678910'
  const contactEmail = 'developer@example.com'
  const contactAddress = 'Sector 152, Noida, Uttar Pradesh'

  if (!developerData) {
    return null
  }

  return (
    <div>
      <div className="rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {developerName}
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-primary font-medium min-w-[60px]">
              Phone :
            </span>
            <span className="text-gray-700">{contactPhone}</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-primary font-medium min-w-[60px]">
              Email :
            </span>
            <span className="text-gray-700">{contactEmail}</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-primary font-medium min-w-[60px]">
              Address :
            </span>
            <span className="text-gray-700">{contactAddress}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeveloperContact
