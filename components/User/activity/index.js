import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth';
import { useLike } from '@/context/LikeUnlikeCntx';
import useWindowWidth from '@/context/useWindowWidth';
import { getLogger } from '@/helper/logger';
import { fetchRecommendedData, fetchWishlistData } from '@/utils/helper';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import Activities from '@/components/Activities/Activities';
import NoDataInfo from '@/components/Admin/my-m-associates/NoDataInfo.js';
import Styles from './myActivity.module.css';
import { GLOBALLY_COMMON_TEXT } from '@/textV2';

const { wishlistedText, enquiredText, recommendedText, recentlyViewed } = GLOBALLY_COMMON_TEXT?.text
export default function activity({ Data }) {

  const windowWidth = useWindowWidth()
  const [auth] = useAuth()
  const headings = [recentlyViewed, enquiredText, wishlistedText, recommendedText]
  const [activeHeading, setActiveHeading] = useState(recentlyViewed)
  const [wishlistData, setWishlistData] = useState(Data.wishlists)
  const [viewedData, setViewedData] = useState(Data.viewed)
  const [enquiredData, setEnquiredData] = useState(Data.enquired)
  const [recommendedData, setRecommendedData] = useState(Data.recommended)
  const [isLoading, setIsLoading] = useState(false)
  const logger = getLogger()
  const [like] = useLike()
  const [value, setValue] = useState('0')
  useEffect(() => {
    setActiveHeading(recentlyViewed)
    fetchRecommendedDataHandler()
  }, [auth?.userResult?._id])
  useEffect(() => {
    fetchWishlistDataHandler()
  }, [like])
  const fetchWishlistDataHandler = async () => {
    try {
      const userId = auth?.userResult?._id
      const { filteredResults } = await fetchWishlistData(userId)
      setWishlistData(filteredResults)
    } catch (error) {
      logger.error(error)
    }
  }
  const fetchRecommendedDataHandler = async () => {
    setIsLoading(true)
    try {
      const userId = auth?.userResult?._id
      const data = await fetchRecommendedData(userId)
      setRecommendedData(data)
    } catch (error) {
      logger.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
    setActiveHeading(headings[newValue])
  }
  return (
    <div
      className={`w-full h-full border rounded-lg bg-white '}`}
    >
      <Box
        sx={{
          background: "white"
        }}>
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              textTransform: 'lowercase',
            }}
          >
            <TabList
              variant="scrollable"
              onChange={handleChange}
              aria-label="activity tabs"
              TabIndicatorProps={{
                style: { backgroundColor: '#931602' },
              }}
            >
              <Tab
                sx={{
                  textTransform: 'capitalize',
                  fontSize: '0.875rem',
                  padding: '0px',
                  marginLeft: '12px',
                }}
                label={`${recentlyViewed} (${viewedData?.length || 0})`}
                value="0"
                style={value === '0' ? { color: '#931602' } : {}}
              />
              <Tab
                sx={{
                  textTransform: 'capitalize',
                  fontSize: '0.875rem',
                  padding: '0px',
                  marginLeft: '12px',
                }}
                label={`${enquiredText} (${enquiredData?.length || 0})`}
                value="1"
                style={value === '1' ? { color: '#931602' } : {}}
              />
              <Tab
                sx={{
                  textTransform: 'capitalize',
                  fontSize: '0.875rem',
                  padding: '0px',
                  marginLeft: '12px',
                }}
                label={`${wishlistedText} (${wishlistData?.length || 0})`}
                value="2"
                style={value === '2' ? { color: '#931602' } : {}}
              />
              <Tab
                sx={{
                  textTransform: 'capitalize',
                  fontSize: '0.875rem',
                  padding: '0px',
                  marginLeft: '12px',
                }}
                label={`${recommendedText} (${recommendedData?.length || 0})`}
                value="3"
                style={value === '3' ? { color: '#931602' } : {}}
              />
            </TabList>
          </Box>
          <div className='flex justify-center'>
            <TabPanel value="0">
              <div
               className={`rounded-md max-md:w-[400px] m-auto h-[100vh] overflow-y-auto overflow-x-hidden custom-scrollbar max-sm:w-[300px] ${Styles.modalScroll} ${enquiredData?.length > 0 && 'overflow-y-scroll'}`}
              >
                {viewedData?.length > 0 ? (
                  viewedData.map((item, index) => (
                    <Activities data={item} key={index} />
                  ))
                ) : (
                  <div className="bg-white w-full rounded-md max-md:w-full justify-center h-[400px] flex items-center">
                    <NoDataInfo />
                  </div>
                )}
              </div>
            </TabPanel>
            <TabPanel value="1">
              <div
                className={`rounded-md max-md:w-[400px] m-auto h-[100vh] overflow-y-auto overflow-x-hidden custom-scrollbar max-sm:w-[300px] ${Styles.modalScroll} ${enquiredData?.length > 0 && 'overflow-y-scroll'}`}
              >
                {enquiredData?.length > 0 ? (
                  enquiredData.map((item, index) => (
                    <Activities data={item} key={index} />
                  ))
                ) : (
                  <div className="bg-white rounded-md max-md:w-full justify-center h-[400px] flex items-center">
                    <NoDataInfo />
                  </div>
                )}
              </div>
            </TabPanel>
            <TabPanel value="2">
              <div
                className={`rounded-md max-md:w-[400px] m-auto h-[100vh] overflow-y-auto overflow-x-hidden custom-scrollbar max-sm:w-[300px]  ${Styles.modalScroll} ${wishlistData?.length > 0 && 'overflow-y-scroll'}`}
              >
                {wishlistData?.length > 0 ? (
                  wishlistData.map((item, index) => (
                    <Activities data={item} key={index} />
                  ))
                ) : (
                  <div className="bg-white rounded-md max-md:w-full justify-center h-[400px] flex items-center ">
                    <NoDataInfo />
                  </div>
                )}
              </div>
            </TabPanel>
            <TabPanel value="3">
              <div
                className={`rounded-md  max-md:w-[400px] m-auto  h-[100vh] overflow-y-auto overflow-x-hidden custom-scrollbar max-sm:w-[300px]  ${Styles.modalScroll} ${recommendedData?.length > 0 && 'overflow-y-scroll'}`}
              >
                {recommendedData?.length > 0 ? (
                  recommendedData.map((item, index) => (
                    <Activities data={item} key={index} isRecommendation={true} />
                  ))
                ) : (
                  <div className="bg-white w-full rounded-md max-md:w-full justify-center h-[400px] flex items-center">
                    <NoDataInfo />
                  </div>
                )}
              </div>
            </TabPanel>
          </div>
        </TabContext>
      </Box>
    </div>
  )
}