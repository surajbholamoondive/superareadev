import {DAYS_AGO_TEXT, DASH, OWNER, POSTED_TEXT, TODAY, YESTERDAY} from '../../text.js'
function calculateDaysFromDate(dateString) {
  const givenDate = new Date(dateString)
  const currentDate = new Date()
  const differenceInMillis = currentDate - givenDate
  const differenceInDays = Math.floor(
    differenceInMillis / (1000 * 60 * 60 * 24)
  )
  return differenceInDays
}

export default function DateDisplay(date) {
  const daysAgo = calculateDaysFromDate(date)
  let postedDate = `${OWNER} ${DASH} ${POSTED_TEXT} ${daysAgo === 0 ? TODAY : daysAgo + 1 === 1 ? YESTERDAY : `${daysAgo + 1} ${DAYS_AGO_TEXT}`}`
  return postedDate
}
