import { GET_ALL_DATA } from '@/text'
import { makeApiRequest } from '@/utils/utils'

export const fetchArticles = async () => {
  try {
    const { data } = await makeApiRequest(process.env.NEXT_PUBLIC_GET_METHOD, process.env.NEXT_PUBLIC_NEWS_ROUTE)
    const { articles } = data
    return articles
  } catch (error) {
    return []
  }
}

export const fetchAllModerationData = async () => {
  try {
    const allData = await makeApiRequest(
      process.env.NEXT_PUBLIC_GET_METHOD,
      GET_ALL_DATA
    )
    const {data} = allData || {}
    const {result} = data || {}
    return result
  } catch (error) {
    return {}
  }
};
