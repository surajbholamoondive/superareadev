import { useEffect, useState } from 'react'
import { Box, Tab, Tabs } from '@mui/material'

const PROJECT_NAVBAR_MAPS = {
  'RERA Details': 'projectReraDetails',
  Amenities: 'amenities',
  'Land Amenities': 'landAmenities',
  'Brochure Information': 'projectBrochurePdf',
  'Project Video': 'projectVideos',
  'Developer Detail': 'developerDetail',
  'Site Plan':"sitePlanDocuments",
  'Price List':"paymentSlipDocuments",
  'Overview':"projectDescription",
}

const PropertyNavbar = ({ sections, projectData }) => {

  const [activeSection, setActiveSection] = useState(Object.keys(sections)[0])

  useEffect(() => {
    const handleScroll = () => {
      const sectionOffsets = Object.keys(sections).map((title) => {
        const el = document.getElementById(sections[title])
        return { id: sections[title], offsetTop: el?.offsetTop - 150 ?? 0 }
      })

      const currentSection = sectionOffsets
        .reverse()
        .find((section) => window.pageYOffset >= section.offsetTop - 10)

      setActiveSection(currentSection?.id ?? Object.keys(sections)[0])
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  const handleClick = (id) => {
    setActiveSection(id)
    const element = document.getElementById(id)
    if (element) {
      const offsetTop = element.offsetTop
      const scrollPosition = offsetTop - 100

      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth',
      })

      setActiveSection(id)
    }
  }

  const filteredSections = Object.keys(sections).filter((title) => {
    const sectionKeyInMap = PROJECT_NAVBAR_MAPS[title]
    const hasData = projectData[sectionKeyInMap]
    if (!hasData) {
      return true
    }

    if (Array.isArray(hasData)) {
      return hasData.length > 0
    } else if (typeof hasData === 'string') {
      return hasData.trim().length > 0
    } else {
      return !!hasData
    }
  })


  const filterData=[]

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        margin: 'auto',
        backgroundColor: '#F4F4F4',
        borderBottom: '1px solid #003E711A',
      }}
    >
      <Tabs
        value={filteredSections.indexOf(activeSection)}
        variant="scrollable"
        scrollButtons="auto"
        textColor="var(--secondary-color)"
        backgroundColor= "black"
        sx={{
          '& .MuiTabs-indicator': {
            backgroundColor: 'var(--secondary-color)',
          },
        }}
      >
        {filteredSections.map((title, index) => (
          <Tab
            key={index}
            label={title}
            onClick={(e) => {
              e.preventDefault()
              handleClick(sections[title])
            }}
            sx={{
              textTransform: 'none',
              color:
                activeSection === sections[title]
                  ? 'var(--secondary-color)'
                  : 'text.primary',
              borderBottom:
                activeSection === sections[title]
                  ? '2px solid var(--secondary-color)'
                  : '',
              '&:hover': {
                color: 'var(--secondary-color)',
              },
              paddingLeft: '30px',
              left: '30px'
            }}
          />
        ))}
      </Tabs>
    </Box>
  )
}

export default PropertyNavbar
