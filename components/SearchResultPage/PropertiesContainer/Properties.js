import React, { useEffect, useRef, useState } from 'react'
import Loading from '@/pages/loading'
import { SEARCH_RESULT_PAGE_TEXT } from '@/textV2.js'
import { numberFormatter } from '@/utils/utils'
import _debounce from 'lodash/debounce'

import NoDataInfo from '@/components/Admin/my-m-associates/NoDataInfo.js/index.js'
import SortByDropdown from '@/components/SearchResultPage/FilterSection/SortByDropdown'

const SearchBackground = "https://res.cloudinary.com/dgjhnlqjy/image/upload/v1762244343/assets/SearchFilterIcons/Background-Search-Result.svg";
import CardDiv from './CardDiv.jsx'
import Style from './Properties.module.css'

const { propertyFound, propertiesFound } = SEARCH_RESULT_PAGE_TEXT.text
const Properties = ({
  dataToFilter,
  totalPropertyCount,
  updateState,
  filterQuery,
  setFilterQuery,
  loadMoreProperties,
  appliedFilter,
  setAppliedFilter,
  nextPageAvailable,
  isSidebarVisible,
  isLoadingMain,
}) => {
  console.log('totalPropertyCount', totalPropertyCount)
  const containerRef = useRef()
  const [_, setIsScrolling] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const BUFFER_VALUE = 50

  const handleScroll = _debounce(async () => {
    const container = containerRef.current
    const isAtBottom =
      container?.scrollTop + container.clientHeight >=
      container.scrollHeight - BUFFER_VALUE

    if (isAtBottom && !isLoading && nextPageAvailable) {
      setIsLoading(true)
      try {
        await loadMoreProperties()
      } finally {
        setTimeout(() => {
          setIsLoading(false)
        }, 1500)
      }
    }
    setIsScrolling(container.scrollTop > 0)
  }, 200)

  useEffect(() => {
    const container = containerRef.current
    container.addEventListener('scroll', handleScroll)

    return () => {
      container.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  return (
    <div
      className={` rounded-2xl  lg:ml-3 bg-white`}
      style={{
        backgroundImage: `url(${SearchBackground})`,
        backgroundSize: 'contain',
        width: '100%',
      }}
    >
      <div>
        <div className="flex justify-between items-center mt-6 md:mt-0 ml-2 mr-6 md:mr-4 lg:mr-0">
          <h4 className=" text-primary">
            {totalPropertyCount && numberFormatter(totalPropertyCount)}{' '}
            {totalPropertyCount > 1 ? propertiesFound : propertyFound}
          </h4>
          <div>
            {totalPropertyCount !== 0 && (
              <div className="hidden xl:block">
                <SortByDropdown
                  tofilter={dataToFilter}
                  updateState={updateState}
                  filterQuery={filterQuery}
                  setFilterQuery={setFilterQuery}
                  appliedFilter={appliedFilter}
                  setAppliedFilter={setAppliedFilter}
                />
              </div>
            )}
          </div>
        </div>
        <div
          className={`${Style.propertiesContainer} lg:min-w-[700px] mt-0 lg:mt-2 max-sm:mt-4`}
          ref={containerRef}
          style={{
            maxHeight: '1200px',
            minHeight: '400px',
            overflowY: isSidebarVisible ? 'hidden' : 'auto',
            position: 'relative',
          }}
        >
          {isLoadingMain ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <Loading />
            </div>
          ) : dataToFilter?.length === 0 ? (
            <div className="flex justify-center max-lg:w-[700px] max-md:w-[450px] max-sm:w-[300px] items-center min-h-[400px]">
              <NoDataInfo />
            </div>
          ) : (
            dataToFilter?.map((row, index) => (
              <div key={index} className="rounded-xl mr-3 ml-1">
                <CardDiv property={row} />
              </div>
            ))
          )}

          {nextPageAvailable !== null && isLoading && <Loading />}
        </div>
      </div>
    </div>
  )
}

export default Properties
