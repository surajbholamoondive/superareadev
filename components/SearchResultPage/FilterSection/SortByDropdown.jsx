import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ArrowIcon from '@/assets/ButtonIcons/downArrow.svg'
import { GLOBALLY_COMMON_TEXT, SEARCH_RESULT_PAGE_TEXT } from '@/textV2'

import MDSelectDropdown from '@/components/MDSelectDropdown/MDSelectDropdown'

const { text } = GLOBALLY_COMMON_TEXT
const { newestText, priceHighToLow, priceLowToHigh, sortBy } =
  SEARCH_RESULT_PAGE_TEXT.text
function SortByDropdown(props) {
  const [selectedValue, setSelectedValue] = useState(newestText)
  // text.recommendedText
  const [sortByValue, setSortByValue] = useState('')
  const router = useRouter()
  const { query } = router

  const updateQueryParams = (newParams) => {
    const updatedQuery = {
      ...router.query,
      ...newParams,
    }
    Object.keys(updatedQuery).forEach((key) => {
      if (updatedQuery[key] === '') {
        delete updatedQuery[key]
      }
    })

    router.push(
      {
        pathname: router.pathname,
        query: updatedQuery,
      },
      undefined,
      { shallow: true }
    )
  }

  useEffect(() => {
    if (query?.sortBy === '') {
      setSelectedValue(sortBy)
    } else if (query?.sortBy === 'price_asc') {
      setSelectedValue(priceLowToHigh)
    } else if (query?.sortBy === 'price_desc') {
      setSelectedValue(priceHighToLow)
    } else if (query?.sortBy === 'newest') {
      setSelectedValue(newestText)
    } else if (query?.sortBy === 'recommended') {
      setSelectedValue(text.recommendedText)
    }
  }, [query?.sortBy])

  const handleOptionChange = (value) => {
    setSelectedValue(value)
    if (value === sortBy) {
      updateQueryParams({
        ...query,
        sortBy: '',
      })
    }
    if (value === priceLowToHigh) {
      updateQueryParams({
        ...query,
        sortBy: 'price_asc',
      })
    } else if (value === priceHighToLow) {
      updateQueryParams({
        ...query,
        sortBy: 'price_desc',
      })
    } else if (value === newestText) {
      updateQueryParams({
        ...query,
        sortBy: 'newest',
      })
    } else if (value === text.recommendedText) {
      updateQueryParams({
        ...query,
        sortBy: 'recommended',
      })
    }
  }
  const values = [priceLowToHigh, priceHighToLow, newestText]
  // text.recommendedText
  return (
    <>
      <div className="hidden md:block md:mr-6 md:max-w-[1024px]:hidden">
        <MDSelectDropdown
          inlineCSS={{
            width: '10rem',
            height: '45px',
            fontWeight: '900',
            borderRadius: '0.375rem',
          }}
          values={values}
          icon={ArrowIcon}
          byDefaultText={selectedValue}
          setSelectedValue={setSelectedValue}
          iconSize={'20px'}
          onClick={handleOptionChange}
        />
      </div>
      <div className="inline-block md:hidden w-[100px] text-primary">
        <MDSelectDropdown
          inlineCSS={{
            width: '100em',
            height: '45px',
            fontWeight: '900',
            borderRadius: '0.375rem',
          }}
          values={values}
          icon={ArrowIcon}
          byDefaultText={selectedValue}
          setSelectedValue={setSelectedValue}
          iconSize={'20px'}
          onClick={handleOptionChange}
        />
      </div>
    </>
  )
}

export default SortByDropdown
