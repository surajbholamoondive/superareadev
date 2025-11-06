import React, { useEffect, useState } from 'react'
import NoDataInfo from '../Admin/my-m-associates/NoDataInfo.js'
import DeleteModal from '../Agent/Listing/DeleteModal'
import ListingDeatails from './ListingDetails'
import { USER_MODULE } from '@/textV2.js'
const { deleteText, deleteFinalText } = USER_MODULE?.USER_MY_LISTING_PAGE?.text

const Listing = ({
  properties,
  handleWishlisted,
  handleDelete,
  handleEdit,
  handleEnquired,
  EditPage,
  isModalOpen,
  setIsModalOpen,
  propertyToEdit,
  type,
  confirmDelete,
  cancelDelete,
  showDeleteConfirmation,
  data,
}) => {
  const [sortBy, setSortBy] = useState('sort_by')
  const [list, setList] = useState(properties)
  const [noData, setNoData] = useState(true)
  useEffect(() => {
    setList(properties)
  }, [properties])
  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    // <div
    //   className={`h-[100vh] overflow-y-scroll overflow-x-hidden custom-scrollbar bg-white rounded-lg px-3 border-2 border-primary`}
    // >
    <div>
      {/* <div
        className="font-poppins text-2xl text-black"
        style={{ color: 'var(--secondary-color)' }}
      >
        <span style={{ fontWeight: '900', fontSize: '1.5rem' }}>
          my
        </span>{' '}
        <span style={{ fontSize: '1.5rem' }}>
          Listings
        </span>
      </div> */}
      
      <div>

        {list?.length > 0 ? (
          <>
            {list?.map((property, index) => (
              <div key={property._id} className=" m-auto">
                <ListingDeatails
                  property={property}
                  index={index}
                  handleWishlisted={handleWishlisted}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                  handleEnquired={handleEnquired}
                  EditPage={EditPage}
                  isModalOpen={isModalOpen}
                  propertyToEdit={propertyToEdit}
                  type={type}
                  handleCloseModal={handleCloseModal}
                />
                <DeleteModal
                  id={property._id}
                  open={showDeleteConfirmation}
                  confirmDelete={() => confirmDelete(index)}
                  cancelDelete={cancelDelete}
                  footText={deleteFinalText}
                  headText={deleteText}
                />
              </div>
            ))}
          </>
        ) : (
          <div className="bg-white w-full rounded-md max-md:w-full justify-center h-[500px] flex items-center ">
            <NoDataInfo />
          </div>
        )}
      </div>
    </div>

  )
}

export default Listing
