import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { makeApiRequest, numberFormatter, dayMappings, sortByDate } from '@/utils/utils';
import Dropdown from './DropdownList';
import { getLogger } from "../../../helper/logger";
import Tile from './Tiles';
import { TOTAL_ENQUIRED, TOTAL_WISHLISTED, TOTAL_VIEWED } from '@/text';
import LeadsTable from "../DirectLeads/LeadsTable";
import { colors, RESIDENTIAL_FOR_SALE, LISTINGS_FOR_SALE, PROPERTIES_FOR_RENT, COMMERCIAL_FOR_SALE, VERIFIED_USERS, M_ASSOCIATES, ACTIVE_PROPERTIES, ACTIVE_PROJECT, ADMIN_DASHBOARD, GET_REQ, ADMIN_DIRECT_LEADS_ROUTE, All_CITIES, VIEW_ALL } from '@/text';
import Massociates from './M-Associates';
import CommonLineChart from './Graph/activeUsers';
import LeadsLineChart from './Graph/leads';
import Loading from '@/pages/loading';
import { mapDataToDisplayDaysMonth, mapDataToDisplayFullDate } from '@/utils/helper';
import { ADMIN_MODULE } from '@/textV2';
const { headings } = ADMIN_MODULE?.ADMIN_DASHBOARD_PAGE
import { GLOBALLY_COMMON_TEXT } from '@/textV2';
const { text } = GLOBALLY_COMMON_TEXT

const Dashboard = ({ Data }) => {
    const logger = getLogger();
    const router = useRouter();
    const { query } = router;
    const [activitiesData, setActivitiesData] = useState(Data);
    const [activityArray, setActivityArray] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedActivities, setSelectedActivities] = useState({
        wishlisted: true,
        enquired: true,
        viewed: false,
    });
    const { city, days } = router.query;
    const [selectedCity, setSelectedCity] = useState(city || All_CITIES);
    const [selectedDays, setSelectedDays] = useState(days || '90');
    const activeUsersdata = activitiesData?.activeUsers || [];
    const leadsData = activitiesData?.activeLeads || [];
    const sortedLeadsData = sortByDate(leadsData);
    const sortedData = sortByDate(activeUsersdata);
    const leadsDataMap = mapDataToDisplayDaysMonth(sortedLeadsData);
    const leadsDataMapYear = mapDataToDisplayFullDate(sortedLeadsData);
    const activeUserData = mapDataToDisplayDaysMonth(sortedData);
    const activeUserDataYear = mapDataToDisplayFullDate(sortedData);
    const activity = [TOTAL_WISHLISTED, TOTAL_ENQUIRED, TOTAL_VIEWED];

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const queryParams = {
                    ...(selectedCity && selectedCity !== All_CITIES ? { city: selectedCity } : {}),
                    ...(days ? { days: days } : "All"),
                    ...(activityArray.length > 0 ? { activity: activityArray } : {}),
                };
                const response = await makeApiRequest(GET_REQ, ADMIN_DASHBOARD, { params: queryParams });
                setActivitiesData(response?.data?.result);
            } catch (error) {
                logger.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [query.city, query.days, activityArray]);

    const handleClick = () => {
        let path = ADMIN_DIRECT_LEADS_ROUTE;
        if (city || days) {
            path += `?city=${city}&days=${days}`;
        }
        router.push(path);
    };

    const handleSelectChangeCity = (value) => {
        setLoading(true);
        setSelectedCity(value);
        const cityQueryParam = value === All_CITIES ? '' : value;
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

    const handleCheckboxChange = (activity) => (event) => {
        const newState = {
            ...selectedActivities,
            [activity]: event.target.checked,
        };
        const updatedArray = Object.keys(newState).filter((key) => newState[key]);
        setActivityArray(updatedArray);
        const newQuery = {
            ...router.query,
            activity: updatedArray.length > 0 ? updatedArray.join(',') : undefined,
        };
        router.push({ pathname: router.pathname, query: newQuery }, undefined, { shallow: true });
        setSelectedActivities(newState);
    };

    if (loading) {
        return <Loading />;
    }

    const keysToFilter = ['activeProject', 'activeProperty', 'mAssociates', 'verifiedUser', 'commercialForSale', 'propertyForRent', 'listingForSale', 'residentialForSale'];
    const keyDisplayNames = {
        activeProject: ACTIVE_PROJECT,
        activeProperty: ACTIVE_PROPERTIES,
        mAssociates: M_ASSOCIATES,
        verifiedUser: VERIFIED_USERS,
        commercialForSale: COMMERCIAL_FOR_SALE,
        propertyForRent: PROPERTIES_FOR_RENT,
        listingForSale: LISTINGS_FOR_SALE,
        residentialForSale: RESIDENTIAL_FOR_SALE,
    };

    const filteredData = activitiesData
        ? Object?.entries(activitiesData)
            .filter(([key]) => keysToFilter?.includes(key))
            .map(([key, value], index) => ({
                key: keyDisplayNames[key] || key,
                value: numberFormatter(value),
                backgroundColor: colors[index],
            }))
        : [];

    return (
        <div>
            <div className="bg-white w-full h-fit rounded-lg border mb-8">
                <div className='flex justify-end gap-[13px] p-3 mr-[12px]'>
                    <div>
                        <Dropdown handleSelectChangeCity={handleSelectChangeCity} isCityDropdown={true} />
                    </div>
                    <div>
                        <Dropdown isCityDropdown={false} handleSelection={handleSelection} />
                    </div>
                </div>
                <div className='flex flex-wrap gap-[32px] justify-center my-1 rounded'>
                    {filteredData.map(({ key, value, backgroundColor }) => (
                        <Tile key={key} title={key} count={value} backgroundColor={backgroundColor} />
                    ))}
                </div>
                <div className='flex flex-col border-2 border-primary w-[93%] items-center mt-8 ml-[35px] rounded-xl'>
                    <div className='whitespace-nowrap text-center mt-3'>
                        <h3> {headings.dailyActiveUsers} {activeUserDataYear.length > 0 && `(${activeUserDataYear[0]} to ${activeUserDataYear[activeUserDataYear.length - 1]})`}</h3>
                    </div>
                    <div className='mb-8'>
                        {activeUsersdata && (
                            <CommonLineChart data={activeUserData} sortedData={sortedData} yDataKeys={["count"]} />
                        )}
                    </div>
                </div>
                {activitiesData?.mAssociatesTable?.length > 0 &&
                    <div >
                        <Massociates data={activitiesData?.mAssociatesTable} />
                    </div>}
                {leadsData && (
                    <div className='text-center border-2 border-primary w-[93%] rounded-xl flex-wrap py-2 pb-4 mt-8 ml-[33px] mr-14'>
                        <div className='whitespace-nowrap font-extrabold mr-3'>
                            <h3 className='capitalize'>{text.leadsText} {leadsDataMapYear.length > 0 && `(${leadsDataMapYear[0]} to ${leadsDataMapYear[leadsDataMapYear.length - 1]})`}</h3></div>
               <div className='w-[100%] flex items-center justify-center'>
                            <LeadsLineChart data={leadsDataMap} yDataKeys={activity} sortedData={sortedLeadsData} />
                        </div>
                        <div className="flex justify-center mb-1 mt-4">
                            <div className='flex' >
                                <input
                                    type="checkbox"
                                    className='w-6 ml-5'
                                    checked={selectedActivities.wishlisted}
                                    onChange={handleCheckboxChange('wishlisted')}
                                />
                                <p className='capitalize'>{text.wishlistedText}</p>
                            </div>
                            <div className='flex' >
                                <input
                                    type="checkbox"
                                    className="ml-5 w-6"
                                    checked={selectedActivities.enquired}
                                    onChange={handleCheckboxChange('enquired')}
                                />
                                <p className='capitalize'>{text.enquiredText}</p>
                            </div>
                            <div className='flex'>
                                <input
                                    type="checkbox"
                                    className="ml-5 w-6"
                                    checked={selectedActivities.viewed}
                                    onChange={handleCheckboxChange('viewed')}
                                />
                                <p className='capitalize'> {text.viewedText} </p>
                            </div>
                        </div>
                    </div>
                )}
                {activitiesData?.directLeads?.length > 0 && <div className="rounded-lg mx-9 ">
                    <div className='flex mt-6 items-center justify-between'>
                        <h2 className='font-bold text-primary'>{headings.recentDirectLeads}</h2>
                        <p className='underline cursor-pointer text-primary ' onClick={handleClick}>{VIEW_ALL}</p>
                    </div>
                    <div className='pb-16'>
                        <LeadsTable Leads={activitiesData?.directLeads} recentOnly="true" />
                    </div>
                </div>}
            </div>
        </div>
    );
};

export default Dashboard;

