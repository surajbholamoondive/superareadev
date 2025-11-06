import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getLogger } from '@/helper/logger'
import { dayMappings } from '@/utils/utils'


import { makeApiRequest } from '@/utils/utils'
import Dropdown from '../Dashboard/DropdownList'
import LeadsTable from './LeadsTable'
import { GLOBALLY_COMMON_TEXT, ADMIN_MODULE } from '@/textV2'
const {text}=GLOBALLY_COMMON_TEXT
const {ADMIN_DIRECT_LEADS_PAGE}=ADMIN_MODULE
const {text:directLeadsPageText, routes}=ADMIN_DIRECT_LEADS_PAGE

const DirectLeads = () => {
  const [tableData, setTableData] = useState()
  const router = useRouter()
  const { query } = router
  const { city, days } = router.query;
  const [selectedCity, setSelectedCity] = useState(city || directLeadsPageText.allCities);
  const [selectedDays, setSelectedDays] = useState(days || '90');
  const [activityArray, setActivityArray] = useState([])
  const [loading, setLoading] = useState(true)
  const logger = getLogger()

  useEffect(() => {
    fetchLeads()
  }, [activityArray, query.city, query.days])

  const fetchLeads = async () => {
    try {
      const queryParams = {
        ...(selectedCity && selectedCity !== directLeadsPageText.allCities
          ? { city: selectedCity }
          : ''),
        ...(days ? { days: days } : {}),
      };
      setLoading(true)
      const { data } = await makeApiRequest(text.getType, routes.directLeads, {
        params: queryParams,
      })
      const { result } = data || {}
      const { allDirectLeads } = result || {}
      setTableData(allDirectLeads)
    } catch (error) {
      logger.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectChangeCity = (value) => {
    setLoading(true);
    setSelectedCity(value);
    const cityQueryParam = value === directLeadsPageText.allCities ? undefined : value;
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
  }

  return (
    <div className="bg-white px-5 rounded-lg border">
      <div className="flex justify-end pt-[13px] gap-2 ">
        <div className='pr-1'>
          {/* <Dropdown
            handleSelectChangeCity={handleSelectChangeCity} isCityDropdown={true} handleSelection={handleSelection} /> */}
        </div>
        <div >
          <Dropdown isCityDropdown={false} handleSelection={handleSelection} />
        </div>
      </div>
      <LeadsTable Leads={tableData} />
    </div>
  )
}

export default DirectLeads
