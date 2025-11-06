import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getLogger } from '@/helper/logger'


import { CustomTabLabel, makeApiRequest } from '@/utils/utils'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Box from '@mui/material/Box'
import { dayMappings } from '@/utils/utils'
import Tab from '@mui/material/Tab'
import DropdownList from '../Dashboard/DropdownList'
import style from '../my-m-associates/index.module.css'
import VerificationListing from './VerificationListing'
import { GLOBALLY_COMMON_TEXT, ADMIN_MODULE } from '@/textV2'
const { ADMIN_M_VERIFICATION_TAB } = ADMIN_MODULE
const { text: mVerificationText, routes } = ADMIN_M_VERIFICATION_TAB
const { text } = GLOBALLY_COMMON_TEXT


const allListing = () => {
  const router = useRouter()
  const { query } = router;
  const { city, days } = router.query;
  const [selectedCity, setSelectedCity] = useState(city || mVerificationText.allCities);
  const [selectedDays, setSelectedDays] = useState(days || '90');
  const [value, setValue] = useState('1')
  const [lastValidValue, setLastValidValue] = useState('1')
  const [allData, setAllData] = useState(0)
  const [unAssignedData, setUnAssignedData] = useState(0)
  const [assignedData, setAssignedData] = useState(0)
  const [pendingData, setPendingData] = useState(0)
  const [approvedData, setApprovedData] = useState(0)
  const [rejectedData, setRejectedData] = useState(0)
  const [clicked, setClicked] = useState(false)
  useEffect(() => {
    countData()
  }, [query.city, query.days])

  useEffect(() => {
    if (value === undefined) {
      setValue(lastValidValue)
    } else {
      setLastValidValue(value)
    }
  }, [query.city, query.days, value, lastValidValue])
  const countData = async () => {
    const queryParams = {
      ...(selectedCity && selectedCity !== mVerificationText.allCities
        ? { city: selectedCity }
        : 'All Cities'),
      ...(days ? { days: days } : '90'),
    };
    const response = await makeApiRequest(
      text.getType,
      routes.verificationListingCount, { params: queryParams }
    )
    const Result = response?.data?.result
    const {
      totalCountAll,
      totalCountRejected,
      totalCountApproved,
      totalCountUnAssigned,
      totalCountAssigned,
      totalCountPending,
    } = Result
    setAllData(totalCountAll)
    setUnAssignedData(totalCountUnAssigned)
    setAssignedData(totalCountAssigned)
    setApprovedData(totalCountApproved)
    setRejectedData(totalCountRejected)
    setPendingData(totalCountPending)
  }
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleSelectChangeCity = (value) => {
    setSelectedCity(value);
    const cityQueryParam = value === mVerificationText.allCities ? undefined : value;
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
  const logger = getLogger()

  return (
    <div className="bg-white h-[100%] w-[100%]  rounded-lg border">
      <Box sx={{ width: '100%' }}>
        <TabContext value={value}>
          <div className='flex justify-start items-center '>
            <Box
              sx={{
                borderColor: 'divider',
                display: 'flex',
                maxWidth: '1000px',
                width: '530px'
              }}
            >
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                variant='scrollable'
                TabIndicatorProps={{
                  style: { backgroundColor: "#931602" },
                }}
              >
                <Tab
                  sx={{ textTransform: 'capitalize', minWidth: 'auto', padding: '0px', margin: '0px 10px'  }}
                  label={`${text.allText} ${allData > 0 ? `(${allData})` : ''}`}
                  value="1"
                  style={{
                    color: value == '1' && "#931602",
                  }}

                />
                <Tab
                  sx={{ textTransform: 'capitalize', minWidth: 'auto', padding: '0px', margin: '0px 10px' }}
                  label={
                    unAssignedData > 0 ? (
                      <CustomTabLabel
                        text={mVerificationText.pendingAssignments}
                        count={unAssignedData > 0 ? unAssignedData : ''}
                      />
                    ) : (
                      `${mVerificationText.pendingAssignments}`
                    )
                  }
                  value="2"
                  className={` capitalize ${style.tabPendingStyle}`}
                  style={{
                    color: value == '2' && "#931602",
                  }}
                />

                <Tab
                  sx={{ textTransform: 'capitalize', minWidth: 'auto', padding: '0px', margin: '0px 10px' }}
                  label={`${mVerificationText.assignedListing} ${assignedData > 0 ? `(${assignedData})` : ''}`}
                  value="3"
                  style={{
                    color: value == '3' && "#931602",
                  }}

                />
                <Tab
                  sx={{ textTransform: 'capitalize', minWidth: 'auto', padding: '0px', margin: '0px 10px' }}
                  label={`${mVerificationText.verificationPending} ${pendingData > 0 ? `(${pendingData})` : ''}`}
                  value="4"
                  style={{
                    color: value == '4' && "#931602",
                  }}

                />
                <Tab
                  sx={{ textTransform: 'capitalize', minWidth: 'auto', padding: '0px', margin: '0px 10px' }}
                  label={`${mVerificationText.superVerified} ${approvedData > 0 ? `(${approvedData})` : ''}`}
                  value="5"
                  style={{
                    color: value == '5' && "#931602",
                  }}

                />
                <Tab
                  sx={{ textTransform: 'capitalize', minWidth: 'auto', padding: '0px', margin: '0px 10px' }}
                  label={`${text.rejectedText} ${rejectedData > 0 ? `(${rejectedData})` : ''}`}
                  value="6"
                  style={{
                    color: value == '6' && "#931602",
                  }}

                />
              </TabList>
            </Box>
            <div className=" flex gap-2 py-2 pr-3">
              <div className='pr-1'>
                <DropdownList
                  handleSelectChangeCity={handleSelectChangeCity}
                  isCityDropdown={true} handleSelection={handleSelection}
                />
              </div>
              <div>
                <DropdownList
                  isCityDropdown={false} handleSelection={handleSelection}
                />
              </div>
            </div>
          </div>
          <TabPanel value="1" style={{ padding: '0px' }}>
            <VerificationListing
              status={text.allText}
              clicked={clicked}
              setClicked={setClicked}
              selectedDays={days}
              selectedCity={selectedCity}
            />
          </TabPanel>
          <TabPanel value="2" style={{ padding: '0px' }}>
            <VerificationListing
              status={mVerificationText.unassigned}
              clicked={clicked}
              setClicked={setClicked}
              selectedDays={days}
              selectedCity={selectedCity}
            />
          </TabPanel>
          <TabPanel value="3" style={{ padding: '0px' }}>
            <VerificationListing
              status={mVerificationText.assigned}
              clicked={clicked}
              setClicked={setClicked}
              selectedDays={days}
              selectedCity={selectedCity}
            />
          </TabPanel>
          <TabPanel value="4" style={{ padding: '0px' }}>
            <VerificationListing
              status={text.pendingText}
              clicked={clicked}
              setClicked={setClicked}
              selectedDays={days}
              selectedCity={selectedCity}
            />
          </TabPanel>
          <TabPanel value="5" style={{ padding: '0px' }}>
            <VerificationListing
              status={text.aprrovedText}
              clicked={clicked}
              setClicked={setClicked}
              selectedDays={days}
              selectedCity={selectedCity}
            />
          </TabPanel>
          <TabPanel value="6" style={{ padding: '0px' }}>
            <VerificationListing
              status={text.rejectedText}
              clicked={clicked}
              setClicked={setClicked}
              selectedDays={days}
              selectedCity={selectedCity}
            />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  )
}
export default allListing
