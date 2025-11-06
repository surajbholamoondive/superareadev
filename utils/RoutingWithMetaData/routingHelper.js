
export default function singlePropertyAndProjectRoute(propertyDetail) {
  const {
    _id,
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
    customProjectUrl,
    slug
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

  metadataString = metadataString.replace(/\s+/g, '-').toLowerCase()

  let url = ''
  if (propertyTitle) {
    url = `${slug}`
    
  } else {
    url = `${slug}`
  }


  url = url.replace(/\/\//g, '/')

  return url.slice(1)
}
