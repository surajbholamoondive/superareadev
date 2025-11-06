import { POST_TEXT, PROPERTY_LIST_ROUTE } from '@/text'
import { makeApiRequest } from '@/utils/utils'

export const fetchListings = async () => {
  try {
    const listings = await makeApiRequest(
      POST_TEXT,
      PROPERTY_LIST_ROUTE
    )
    const {data} = listings || {}
    const {result} = data || {}
    return result
  } catch (error) {
    return {}
  }
};
