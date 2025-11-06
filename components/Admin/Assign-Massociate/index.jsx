import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getLogger } from '@/helper/logger'


import {
  CustomTabLabel,
  makeApiRequest,
  numberFormatter,
} from '@/utils/utils'
import TabContext from '@mui/lab/TabContext'
import { dayMappings } from '@/utils/utils'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import DropdownList from '../Dashboard/DropdownList'
import style from '../my-m-associates/index.module.css'
import FilterListing from './FilterListing'
import { GLOBALLY_COMMON_TEXT, ADMIN_MODULE } from '@/textV2'
const { ADMIN_ASSIGN_S_ASSOCIATE_PAGE } = ADMIN_MODULE
const { text: adminSAssociateText, routes } = ADMIN_ASSIGN_S_ASSOCIATE_PAGE
const { text } = GLOBALLY_COMMON_TEXT

const AssignMassociate = () => {
  const [value, setValue] = useState('5')
  const [lastValidValue, setLastValidValue] = useState('1')
  const [childData, setChildData] = useState(0)
  const [rejectedData, setRejectedData] = useState(0)
  const [alldata, setAllData] = useState(0)
  const [pendingData, setPendingData] = useState(0)
  const [deletedData, setDeletedData] = useState(0)
  const [clicked, setClicked] = useState(false)
  const logger = getLogger()
  const router = useRouter()
  const { query } = router;
  const { city, days } = router.query;
  const [selectedCity, setSelectedCity] = useState(city || adminSAssociateText.allCities);
  const [selectedDays, setSelectedDays] = useState(days || '90');
  const [associateclick, setAssociateclick] = useState('');


  useEffect(() => {
    if (value === undefined) {
      setValue(lastValidValue)
    } else {
      setLastValidValue(value)
    }
  }, [value, lastValidValue])
  const countData = async () => {
    const queryParams = {
      ...(selectedCity && selectedCity !== adminSAssociateText.allCities
        ? { city: selectedCity }
        : {}),
      ...(days ? { days: days } : "90")
    }
    const response = await makeApiRequest(text.getType, routes.assignAssociateCount, {
      params: queryParams
    })
    const Result = response?.data?.result || {}
    const {
      totalCountRejected,
      totalCountDeleted,
      totalCountApproved,
      totalCountPending,
      totalCountAll,
    } = Result
    setChildData(totalCountApproved)
    setRejectedData(totalCountRejected)
    setDeletedData(totalCountDeleted)
    setAllData(totalCountAll)
    setPendingData(totalCountPending)
  }
  useEffect(() => {
    countData()
  }, [clicked, query.city, query.days, associateclick])
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const handleSelectChangeCity = (value) => {
    setSelectedCity(value);
    const cityQueryParam = value === adminSAssociateText.allCities ? undefined : value;
    router.push({
      pathname: router.pathname,
      query: { ...router.query, city: cityQueryParam },
    }, undefined, { shallow: true });
  };

  const handleSelection = (value) => {
    const selectedValue = dayMappings[value];
    if (selectedValue !== undefined) {
      setSelectedDays(selectedValue);
      try {
        router.push({
          pathname: router.pathname,
          query: { ...router.query, days: selectedValue },
        });
      } catch (error) {
        logger.error(error);
      }
    }
  };
  return (
    <div className="bg-white w-[100%] rounded-lg border">
      <Box sx={{ width: '100%' }}>
        <TabContext value={value}>
          <Box sx={{ borderColor: 'divider', textTransform: 'lowercase' }}>
            <div className=" flex items-center py-2  pt-[1.5px]">
              <TabList
                variant="scrollable"
                onChange={handleChange}
                aria-label="lab API tabs example"
                className="pl-4"
                TabIndicatorProps={{
                  style: { backgroundColor: "#931602" },
                }}
              >
                <Tab
                  sx={{
                    textTransform: 'capitalize',
                    minWidth: 'auto',
                    padding: '0px',
                    margin: '0px 10px',
                  }}
                  label={`${text.allText} ${alldata > 0 ? `(${numberFormatter(alldata)})` : ''}`}
                  value="5"
                  style={{
                    color: value == "5" && "#931602",
                  }}
                />

                <Tab
                  sx={{
                    textTransform: 'capitalize',
                    minWidth: 'auto',
                    padding: '0px',
                    margin: '0px 10px',
                  }}
                  label={
                    pendingData > 0 ? (
                      <CustomTabLabel
                        text={text.pendingText}
                        count={pendingData > 0 ? `${pendingData}` : ''}
                      />
                    ) : (
                      `${text.titleCasePending}`
                    )
                  }
                  value="4"
                  style={{
                    color: value == "4" && "#931602",
                  }}
                  className={` ${style.tabPendingStyle}`}
                />
                <Tab
                  sx={{
                    textTransform: 'capitalize',
                    minWidth: 'auto',
                    padding: '0px',
                    margin: '0px 10px',
                  }}
                  label={`${adminSAssociateText.approvedListing} ${childData > 0 ? `(${childData})` : ''}`}
                  value="1"
                  style={{
                    color: value == "1" && "#931602",
                  }}
                />
                <Tab
                  sx={{
                    textTransform: 'capitalize',
                    minWidth: 'auto',
                    padding: '0px',
                    margin: '0px 10px',
                  }}
                  label={`${adminSAssociateText.rejectedLisiting} ${rejectedData > 0 ? `(${rejectedData})` : ''}`}
                  value="2"
                  style={{
                    color: value == "2" && "#931602",
                  }}
                />
                <Tab
                  sx={{
                    textTransform: 'capitalize',
                    minWidth: 'auto',
                    padding: '0px',
                    margin: '0px 10px',
                  }}
                  label={`${adminSAssociateText.deletedListing} ${deletedData > 0 ? `(${deletedData})` : ''}`}
                  value="3"
                  style={{
                    color: value == "3" && "#931602",
                  }}
                />
              </TabList>
              <div className='capitalize pr-2'>
                <DropdownList
                  handleSelectChangeCity={handleSelectChangeCity}
                  isCityDropdown={true}
                />
              </div>
              <div className='capitalize pr-5'>
                <DropdownList
                  handleSelection={handleSelection}
                  isCityDropdown={false}
                />
              </div>
            </div>
          </Box>
          <TabPanel value="1" className="pt-0">
            <FilterListing
              status={text.aprrovedText}
              clicked={clicked}
              setClicked={setClicked}
              selectedDays={days}
              selectedCity={selectedCity}
              setAssociateclick={setAssociateclick}
            />
          </TabPanel>
          <TabPanel value="2" className="pt-0">
            <FilterListing
              status={text.rejectedText}
              clicked={clicked}
              setClicked={setClicked}
              selectedDays={days}
              selectedCity={selectedCity}
              setAssociateclick={setAssociateclick}
            />
          </TabPanel>
          <TabPanel value="3" className="pt-0">
            <FilterListing
              status={text.deletedText}
              clicked={clicked}
              setClicked={setClicked}
              selectedDays={days}
              selectedCity={selectedCity}
              setAssociateclick={setAssociateclick}
            />
          </TabPanel>
          <TabPanel value="4" className="pt-0">
            <FilterListing
              status={text.pendingText}
              clicked={clicked}
              setClicked={setClicked}
              selectedDays={days}
              selectedCity={selectedCity}
              setAssociateclick={setAssociateclick}
            />
          </TabPanel>
          <TabPanel value="5" className="pt-0">
            <FilterListing
              status={text.allText}
              clicked={clicked}
              setClicked={setClicked}
              selectedDays={days}
              selectedCity={selectedCity}
              setAssociateclick={setAssociateclick}
            />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  )
}
export default AssignMassociate