import { useEffect, useState } from 'react'
import { getLogger } from '@/helper/logger'
import Loading from '@/pages/loading'
import { ADMIN_MODULE, GLOBALLY_COMMON_TEXT } from '@/textV2'
import { makeApiRequest } from '@/utils/utils'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { Box, Paper, Tab } from '@mui/material'

import OurNewsBlog from '@/components/HomePage/OurNewsBlog'

import EditWebLink from './EditWebLink'
import Testimonial from './Testimonial'

const { text } = GLOBALLY_COMMON_TEXT
const { ADMIN_WEBSITE_MODERATION_TAB } = ADMIN_MODULE
const { routes } = ADMIN_WEBSITE_MODERATION_TAB

const WebsiteModeration = () => {
  const [value, setValue] = useState('WebSite Configuration')
  const [modData, setModData] = useState({})
  const [testimonials, setTestimonials] = useState([])
  const [blogs, setBlogs] = useState([])
  const [webLink, setWebLink] = useState()
  const logger = getLogger()
  const [loading, setLoading] = useState(true)
  console.log('mod data', blogs)
  const fetchAllModerations = async () => {
    try {
      const allData = await makeApiRequest(text.getType, routes.moderationData)
      setModData(allData?.data?.result)
      setLoading(false)
      console.log('allData', allData)
    } catch (error) {
      logger.error(error)
    }
  }

        console.log('modData--------', modData)

  useEffect(() => {
    fetchAllModerations()
  }, [])
  useEffect(() => {
    setTestimonials(modData?.testimonial)
    setBlogs(modData?.blog)
    setWebLink(modData?.websiteDescription)
  }, [modData])
  if (loading) {
    return <Loading />
  }
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <Paper className="w-100% mr-4 rounded-lg border">
      <Box>
        <TabContext className="ml-[24px] rounded-lg" value={value}>
          <TabList
            style={{
              marginLeft: '20px',
              overflowX: 'auto',
              whiteSpace: 'nowrap',
              flexGrow: 1,
            }}
            onChange={handleChange}
            aria-label="tabs"
            TabIndicatorProps={{
              style: { backgroundColor: '#931602' },
            }}
          >
            <Tab
              label={'Website Configuration'}
              value="WebSite Configuration"
              style={{
                textTransform: 'none',
                marginRight: '20px',
                padding: '0px',
                color: value == 'WebSite Configuration' && '#931602',
              }}
            />
            <Tab
              label={'Website Meta SEO'}
              value="Website Meta SEO"
              style={{
                textTransform: 'none',
                marginRight: '-1px',
                padding: '0px',
                color: value == 'Website Meta SEO' && '#931602',
              }}
            />
          </TabList>

          <TabPanel value="Website Meta SEO">
            {loading ? (
              <Loading />
            ) : (
              <div className="-mt-10">
                <EditWebLink webLink={webLink} setWebLink={setWebLink} />
              </div>
            )}
          </TabPanel>
          <div className="w-full bg-white rounded-lg mb-20">
            <TabPanel value="WebSite Configuration">
              {loading ? (
                <Loading />
              ) : (
                <div className="-mt-8">
                  <Testimonial
                    testimonials={testimonials}
                    setTestimonials={setTestimonials}
                  />
                </div>
              )}
            </TabPanel>

            <TabPanel value="WebSite Configuration">
              {loading ? (
                <Loading />
              ) : (
                <div>
                  <OurNewsBlog blogs={blogs} setBlogs={setBlogs} />
                </div>
              )}
            </TabPanel>
          </div>
        </TabContext>
      </Box>
    </Paper>
  )
}
export default WebsiteModeration
