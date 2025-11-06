import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/auth'
import { getLogger } from '@/helper/logger'
import Loading from '@/pages/loading'
import {
  ALL_PROJECTS,
  DELETED_PROJECT,
} from '@/text'
import { ADMIN_MODULE, GLOBALLY_COMMON_TEXT } from '@/textV2'
import { dayMappings, makeApiRequest } from '@/utils/utils'
import SearchIcon from '@mui/icons-material/Search'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'
import Paper from '@mui/material/Paper'
import Tab from '@mui/material/Tab'
import TextField from '@mui/material/TextField'

import Dropdown from '../Dashboard/DropdownList'
import style from '../my-m-associates/index.module.css'
import NoDataInfo from '../my-m-associates/NoDataInfo.js/index'
import ProjectsTable from './table'

const { ADMIN_PROJECT_BUILDING_PAGE } = ADMIN_MODULE
const { text } = GLOBALLY_COMMON_TEXT
const { routes, text: adminProjectBuildingText } = ADMIN_PROJECT_BUILDING_PAGE

const ProjectsBuildings = ({ Data }) => {
  const router = useRouter()
  const { query } = router
  const { city, days } = router.query
  const logger = getLogger()
  const [deleteProject, setDeleteProject] = useState(true)
  const [selectedCity, setSelectedCity] = useState(city)
  const [selectedDays, setSelectedDays] = useState(days || '90')
  const [value, setValue] = useState('All Projects')
  const [editUpdate, setEditUpdate] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [projectData, setProjectData] = useState({
    allProjects: Data.allProjects,
    deletedProjects: Data.deletedProjects,
  })
  const [filteredProjectData, setFilteredProjectData] = useState({
    allProjects: Data.allProjects,
    deletedProjects: Data.deletedProjects,
  })
  console.log("filteredProjectData", filteredProjectData)
  const [allProjectsCount, setAllProjectsCount] = useState(
    Data.allProjectsCount
  )
  const [loading, setLoading] = useState(true)
  const [deletedProjectCount, setdeletedProjectsCount] = useState(
    Data.deletedProjectsCount
  )
  const [noDataModal, setNoDataModal] = useState(false)
  const [auth, setAuth] = useAuth()

  useEffect(() => {
    fetchData()
  }, [])


  useEffect(() => {
    filterProjects('')
  }, [projectData])

  useEffect(() => {
    filterProjects(searchQuery)
  }, [searchQuery])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

const filterProjects = (queryText = searchQuery) => {
  const query = queryText.trim().toLowerCase();

  if (!query) {
    setFilteredProjectData(projectData);
    return;
  }

  const filterArray = (projects) => {
    if (!Array.isArray(projects)) return [];

    return projects.filter((project) => {
      const searchableFields = [
        project?.projectTitle,
        // project?.city,
        // project?.projectType,
        // project?.projectSubType,
        // project?.customProjectUrl,
      ];


      return searchableFields.some((field) => {
        const value = String(field || '').toLowerCase();
        return value.includes(query);
      });
    });
  };

  setFilteredProjectData({
    allProjects: filterArray(projectData.allProjects),
    deletedProjects: filterArray(projectData.deletedProjects),
  });
};

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const fetchData = async () => {
    if (auth?.token === '') {
      return
    }
    try {
      const queryParams = {
        ...(selectedCity && selectedCity !== adminProjectBuildingText.allCities
          ? { city: selectedCity }
          : {}),
        ...(days ? { days: days } : {}),
      }
      const response = await makeApiRequest(
        text.getType,
        routes.projectBuildingRoute,
        {
          params: queryParams,
        }
      )
      setProjectData(response?.data?.result)
      setAllProjectsCount(response?.data?.result?.allProjectsCount)
      setdeletedProjectsCount(response?.data?.result?.deletedProjectsCount)

      setLoading(false)
    } catch (error) {
      logger.error(error)
    }
  }

  const closeEditModal = () => {
    setNoDataModal(false)
  }

  useEffect(() => {
    fetchData()
  }, [query.days, query.city, deleteProject, editUpdate])

  const handleSelection = (value) => {
    setSearchQuery('') // reset search
    const selectedValue = dayMappings[value]
    if (selectedValue !== undefined) {
      setSelectedDays(selectedValue)
      try {
        router.push({
          pathname: router.pathname,
          query: { ...router.query, days: selectedValue },
        })
      } catch (error) {
        logger.error(error)
      }
    }
  }

  const handleSelectChangeCity = (value) => {
    setLoading(true)
    setSearchQuery('') // reset search
    if (value === adminProjectBuildingText.allCities) {
      setSelectedCity('')
    }
    setSelectedCity(value)
    const cityQueryParam =
      value === adminProjectBuildingText.allCities ? '' : value
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, city: cityQueryParam },
      },
      undefined,
      { shallow: true }
    )
  }

  const displayAllProjectsCount = searchQuery
    ? filteredProjectData.allProjects?.length || 0
    : allProjectsCount

  const displayDeletedProjectCount = searchQuery
    ? filteredProjectData.deletedProjects?.length || 0
    : deletedProjectCount

  return (
    <div>
      {!loading ? (
        <Paper className="rounded-lg border">
          <Box sx={{ width: '100%', mr: '8px', typography: 'body2' }}>
            <TabContext className={`${style.tabContext}`} value={value}>
              <Box sx={{ borderBottom: 0, borderColor: 'transparent' }}>
                <div style={{ display: 'flex', gap: '50px' }}>
                  <TabList
                    className=" ml-7 "
                    onChange={handleChange}
                    aria-label="tabs"
                    TabIndicatorProps={{
                      style: { backgroundColor: '#931602' },
                    }}
                  >
                    <Tab
                      sx={{
                        textTransform: 'capitalize',
                        padding: '12px 0px',
                      }}
                      label={`${adminProjectBuildingText.allProjects} ${displayAllProjectsCount > 0 ? `(${displayAllProjectsCount})` : ''}`}
                      value={adminProjectBuildingText.allProjects}
                      style={{
                        color: value == ALL_PROJECTS && '#931602',
                      }}
                    />
                    <div style={{ width: '20px' }} />
                    <Tab
                      sx={{
                        textTransform: 'capitalize',
                        padding: '12px 0px ',
                      }}
                      label={`${adminProjectBuildingText.deletedProjects} ${displayDeletedProjectCount > 0 ? `(${displayDeletedProjectCount})` : ''}`}
                      className={` ${style.tabPendingStyle}`}
                      value={adminProjectBuildingText.deletedProjects}
                      style={{
                        color: value == DELETED_PROJECT && '#931602',
                      }}
                    />
                  </TabList>
                  <div className="flex mt-[14px] ml-auto gap-3">
                  
                    <div>
                      <Dropdown
                        handleSelectChangeCity={handleSelectChangeCity}
                        isCityDropdown={true}
                        handleSelection={handleSelection}
                      />
                    </div>

                    <div className="mr-6">
                      <Dropdown
                        isCityDropdown={false}
                        handleSelection={handleSelection}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end w-full px-6 mt-3">
                      <TextField
                        size="small"
                        placeholder="Search projects..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          minWidth: '250px',
                          '& .MuiOutlinedInput-root': {
                            '&:hover fieldset': {
                              borderColor: '#931602',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#931602',
                            },
                          },
                        }}className="max-w-[280px] w-full transition-all duration-200"
                        
                      />
                    </div>
                <div>
                  {filteredProjectData?.allProjects?.length > 0 ? (
                    <TabPanel value="All Projects">
                      <ProjectsTable
                        projectsData={filteredProjectData?.allProjects}
                        deleteProject={deleteProject}
                        setDeleteProject={setDeleteProject}
                        setEditUpdate={setEditUpdate}
                        editUpdate={editUpdate}
                        showIcon={true}
                        isDeletedProjects={false}
                      />
                    </TabPanel>
                  ) : (
                    <TabPanel value="All Projects">
                      <div className="bg-white w-full rounded-md max-md:w-full justify-center h-[575px] flex items-center">
                        <NoDataInfo />
                      </div>
                    </TabPanel>
                  )}
                  {filteredProjectData?.deletedProjects?.length > 0 ? (
                    <TabPanel value="Deleted Projects">
                      <ProjectsTable
                        projectsData={filteredProjectData?.deletedProjects}
                        deleteProject={deleteProject}
                        setDeleteProject={setDeleteProject}
                        setEditUpdate={setEditUpdate}
                        editUpdate={editUpdate}
                        showIcon={false}
                        isDeletedProjects={true}
                      />
                    </TabPanel>
                  ) : (
                    <TabPanel value="Deleted Projects">
                      <div className="bg-white w-full rounded-md max-md:w-full justify-center h-[575px] flex items-center">
                        <NoDataInfo />
                      </div>
                    </TabPanel>
                  )}
                </div>
              </Box>
            </TabContext>
          </Box>
        </Paper>
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default ProjectsBuildings
