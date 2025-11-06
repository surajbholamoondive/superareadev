import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import BackgroundImage from '@/assets/NonLoggedUserImages/backgroundImage.svg'
import { useAuth } from '@/context/auth'
import { getLogger } from '@/helper/logger'
import {
  ADMIN_PROJECT_BUILDING,
  ADMIN_TYPE,
  AMENITIES_FILTER_HEADING,
  DEFAULT_COVER_IMAGE,
  DELETE,
  DELETE_PROJECT,
  DELETE_PROJECT_MESSAGE,
  DELETED_TEXT,
  DEVELOPER_DETAILS,
  EDIT_PROJECT,
  GET_REQ,
  IMAGE_INFO,
  LAND_AMENITIES_FILTER_HEADING,
  LOADING_TEXT,
  OVERVIEW,
  PRICE_LIST,
  PROJECT_DELETE_ROUTE,
  PROJECT_DELETED,
  PROJECT_INFORMATION,
  PROJECT_NAVBAR_MAPS,
  PROJECT_RERA_DETAILS,
  PUT_REQ,
  SITE_PLAN,
  UNIT_FLOOR_PLAN_PRICING,
  VIEW_PROJECT_ROUTE,
  WEBSITE_LINK,
} from '@/text'
import { GLOBALLY_COMMON_TEXT, HOME_PAGE_TEXT, MY_CONTACT_FORM } from '@/textV2'
import getNearbyPlaces from '@/utils/OsmNearbyHelper/OsmNearbyPlaces'
import { makeApiRequest } from '@/utils/utils'
import axios from 'axios'
import { NextSeo } from 'next-seo'
import { toast } from 'react-toastify'

// 🧩 --- DYNAMIC IMPORTS (lazy load heavy components) ---

const EditProjectModal = dynamic(() => import('@/components/Admin/EditProject'), { ssr: false })
const DeleteModal = dynamic(() => import('@/components/Agent/Listing/DeleteModal'), { ssr: false })
const AskExplore = dynamic(() => import('@/components/AskExplore'), { ssr: false })
const StandaloneContactForm = dynamic(() => import('@/components/ContactForm/StandaloneContactForm'), { ssr: false })
const FaqTemplate = dynamic(() => import('@/components/FAQTemplate/FaqTemplate'), { ssr: false })
const Featured = dynamic(() => import('@/components/Featured'), { ssr: false })
const ImagePreviewModal = dynamic(() => import('@/components/ImageUpload/ImagePreviewModal'), { ssr: false })
const MapsModal = dynamic(() => import('@/components/MapModal/MapsModal'), { ssr: false })
const MDButton = dynamic(() => import('@/components/MDButton/MDButton'), { ssr: false })
const Amenities = dynamic(() => import('@/components/SingleProperty/Amenities'), { ssr: false })
const BrochurePdf = dynamic(() => import('@/components/SingleProperty/BrochurePdf'), { ssr: false })
const ImageGridSlider = dynamic(() => import('@/components/SingleProperty/carouselslick'), { ssr: false })
const LandAmenities = dynamic(() => import('@/components/SingleProperty/LandAmenities'), { ssr: false })
const MDContentSection = dynamic(() => import('@/components/SingleProperty/MDContentSection'), { ssr: false })
const OverView = dynamic(() => import('@/components/SingleProperty/OverView'), { ssr: false })
const PropertyInformation = dynamic(() => import('@/components/SingleProperty/PropertyInformation'), { ssr: false })
const PropertyNavbar = dynamic(() => import('@/components/SingleProperty/PropertyNavigationBar'), { ssr: false })
const StickyEmiCalculator = dynamic(() => import('@/components/StickyEmiCalculator'), { ssr: false })

const { userContactRoute } = HOME_PAGE_TEXT.routes
const { formheading } = MY_CONTACT_FORM.text

// Components that can be lazy-loaded
const OsmMapWithNearby = dynamic(
  () => import('@/components/OsmMapCard/OsmMapWithNearby'),
  { ssr: false }
)
const FloorPlanPricing = dynamic(
  () => import('@/components/Detail-Section/FloorPlanPrice'),
  { ssr: false }
)
const ReraDetails = dynamic(
  () => import('@/components/Detail-Section/ReraDetail/ViewProjectRera'),
  { ssr: false }
)
const VideoSection = dynamic(
  () => import('@/components/Detail-Section/VideoSection'),
  { ssr: false }
)
const DeveloperDetail = dynamic(
  () => import('@/components/Detail-Section/DeveloperDetail'),
  { ssr: false }
)
const PropertyLabelsSection = dynamic(
  () =>
    import(
      '@/components/SingleProperty/PropertyLabelsSection/projectlabelSection'
    ),
  { ssr: false }
)
const PriceList = dynamic(
  () => import('@/components/Detail-Section/sitePlan/priceList'),
  { ssr: false }
)
const SitePlan = dynamic(
  () => import('@/components/Detail-Section/sitePlan/siteplan'),
  { ssr: false }
)
const DeveloperContact = dynamic(
  () => import('@/components/Detail-Section/DeveloperContact/DeveloperContact'),
  { ssr: false }
)

const { text } = GLOBALLY_COMMON_TEXT
const { viewText, projectText } = text
const getTokenOrIpFromCookie = (req) => {
  const token = req.cookies.token
  const ip = req.cookies.ipaddress
  return token ? token : ip
}

const index = ({
  projectData,
  _id,
  projectImages,
  projectCoverImage,
  projectVideos,
  projectDescription,
  coordinates,
  projectTitle,
  projectUnits,
  amenities,
  moresReraId,
  projectReraId,
  projectBrochurePdf,
  projectMetaTitle,
  projectMetaDescription,
  alreadySeen,
  totalViews,
}) => {
  const [auth] = useAuth()
  const { userType } = auth?.userResult || {}
  const userId = auth?.userResult?._id
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const router = useRouter()
  let { slug } = router?.query
  const logger = getLogger()
  const divRef = useRef(null)
  const osmMapRef = useRef(null)
  const [recommendProjectData, setRecommendProjectData] = useState()
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const { approvalStatus } = projectData || {}
  const [nearby, setNearby] = useState(null)
  const { sitePlanDocuments, paymentSlipDocuments } = projectData || {}

  useEffect(() => {
    const fetchData = async () => {
      try {
        const nearby = await getNearbyPlaces(coordinates[0], coordinates[1])
        setNearby(nearby)
      } catch (error) {
        logger.error(error)
      }
    }
    fetchData()
  }, [coordinates])

  if (!slug) {
    return <div>{LOADING_TEXT}</div>
  }
  const coverImage = {
    url: projectCoverImage ? projectCoverImage : `${DEFAULT_COVER_IMAGE}`,
    alt: 'Cover Image',
  }
  const rightImages = []
  projectImages?.forEach((element) => {
    rightImages.push(element)
  })

  const handleImageClick = (index) => {
    let clickedImage
    if (index === 0) {
      clickedImage = coverImage
    } else if (index > 0 && index <= rightImages.length) {
      clickedImage = rightImages[index - 1]
    } else {
      return
    }
    if (
      clickedImage &&
      clickedImage.url !== process.env.NEXT_PUBLIC_DEFAULT_IMAGE_URL
    ) {
      setSelectedImageIndex(index)
      setIsModalOpen(true)
    }
  }
  const htmlToPlainText = (html) => {
    return html?.replace(/<\/?p>|<\/?ul>|<\/?li>/g, '')
  }
  function handleAddressClick() {
    osmMapRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  function handleMapClick() {
    setModalOpen(true)
  }

  const handleClick = async() => {
    try{
      const res=await makeApiRequest(`put`,`activity/add-to-enquired-project/${_id}`)
      if (res?.data?.responseCode == 200) {
        toast.success(res?.data?.responseMessage)
      }
    }catch(err){
      logger.error("Error while generating query");
      throw err
    }
  }

  const plainDescription = htmlToPlainText(projectMetaDescription)

  const openDeleteConfirmation = () => {
    setShowDeleteConfirmation(true)
  }

  const cancelDelete = () => {
    setShowDeleteConfirmation(false)
  }

  const confirmDelete = async (projectId) => {
    try {
      await deleteProperty(projectId)
    } catch (error) {
      logger.error(error)
    }
    setShowDeleteConfirmation(false)
  }

  const deleteProperty = async (projectId) => {
    try {
      const response = await makeApiRequest(
        PUT_REQ,
        `${PROJECT_DELETE_ROUTE}/${projectId}`
      )
      toast.success(PROJECT_DELETED)
      router.push(ADMIN_PROJECT_BUILDING)
    } catch (error) {
      logger.error(error)
      throw error
    }
  }
  console.log('projectData', projectData)
  const openEditModal = async () => {
    setIsEditModalOpen(true)
  }
  const closeEditModal = () => {
    setIsEditModalOpen(false)
  }
  return (
    <div
      className="pb-1"
      style={{
        backgroundImage: `url(${BackgroundImage.src})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
      }}
    >
      <NextSeo
        title={projectMetaTitle}
        description={plainDescription}
        openGraph={{
          title: `${projectMetaTitle}`,
          description: `${plainDescription}`,
          url: WEBSITE_LINK,
          images: [
            {
              url: projectImages?.[0]?.url,
              width: 1200,
              height: 630,
              alt: `${projectMetaTitle}`,
            },
          ],
          type: 'website',
        }}
      />

      <div className="w-[95%] lg:w-[93%] custom-section ">
        <div className="flex justify-center items-center gap-2 mb-6">
          <h2 className="font-bold text-primary">{viewText}</h2>
          <h2 className="font-normal text-primary">{projectText}</h2>
        </div>

        {/* Updated Layout: 40% Left + 60% Right */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mb-8 lg:mb-12">
          {/* MOBILE: Image Slider appears FIRST (top) on mobile, Property Labels on desktop left */}
          <div className="w-full lg:w-[40%] order-2 lg:order-1">
            <PropertyLabelsSection
              propertyDetail={projectData}
              handleClick={handleClick}
            />
          </div>

          {/* MOBILE: Image Slider appears FIRST (top) on mobile, right side on desktop */}
          <div className="w-full lg:w-[60%] order-1 lg:order-2 lg:min-h-[400px]">
            <div className="h-full">
              <ImageGridSlider
                id={_id}
                coverImage={coverImage}
                rightImages={rightImages}
                localityLat={coordinates?.[0]}
                localityLng={coordinates?.[1]}
                propertyVideos={projectVideos}
                onImageClick={handleImageClick}
                onMapClick={() => handleAddressClick()}
                isProject={true}
                alreadySeen={alreadySeen}
                totalViews={totalViews}
              />
            </div>
          </div>
        </div>

        {/* Image Preview Modal */}
        <ImagePreviewModal
          isOpen={isModalOpen}
          images={[...rightImages]}
          propertyVideos={projectVideos}
          selectedIndex={selectedImageIndex}
          onClose={() => setIsModalOpen(false)}
          onNext={() =>
            setSelectedImageIndex((selectedImageIndex + 1) % rightImages.length)
          }
          onPrevious={() =>
            setSelectedImageIndex(
              (selectedImageIndex - 1 + rightImages.length) % rightImages.length
            )
          }
          onSelect={(index) => {
            setSelectedImageIndex(index)
          }}
        />

        <PropertyNavbar
          sections={PROJECT_NAVBAR_MAPS}
          projectData={projectData}
        />
        

        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-[70%]">
            {projectData?.projectReraDetails?.length > 0 && (
              <div id={PROJECT_NAVBAR_MAPS[PROJECT_RERA_DETAILS]}>
                <MDContentSection
                  title={PROJECT_RERA_DETAILS}
                  inlineStyle={{
                    textColor: 'var(--secondary-color)',
                    fontWeight: 'bold',
                  }}
                >
                  <ReraDetails projectData={projectData} />
                </MDContentSection>
              </div>
            )}

            <div id={PROJECT_NAVBAR_MAPS[PROJECT_INFORMATION]}>
              <MDContentSection
                title={PROJECT_INFORMATION}
                inlineStyle={{
                  textColor: 'var(--secondary-color)',
                  fontWeight: 'bold',
                }}
              >
                <PropertyInformation propertyDetail={projectData} />
              </MDContentSection>
            </div>

            <div id={PROJECT_NAVBAR_MAPS[OVERVIEW]}>
              <MDContentSection
                title={OVERVIEW}
                inlineStyle={{
                  textColor: 'var(--secondary-color)',
                  fontWeight: 'bold',
                }}
              >
                <OverView details={projectDescription} />
              </MDContentSection>
            </div>

            <div id={PROJECT_NAVBAR_MAPS[AMENITIES_FILTER_HEADING]}>
              {projectData?.amenities &&
                Object.keys(projectData.amenities).length > 0 && (
                  <MDContentSection
                    title={AMENITIES_FILTER_HEADING}
                    inlineStyle={{
                      textColor: 'var(--secondary-color)',
                      fontWeight: 'bold',
                    }}
                  >
                    <Amenities amenities={amenities} />
                  </MDContentSection>
                )}
            </div>

            <div id={PROJECT_NAVBAR_MAPS[AMENITIES_FILTER_HEADING]}>
              {projectData?.landAmenities?.length > 0 && (
                <MDContentSection
                  title={LAND_AMENITIES_FILTER_HEADING}
                  inlineStyle={{
                    textColor: 'var(--secondary-color)',
                    fontWeight: 'bold',
                  }}
                >
                  <LandAmenities landAmenities={projectData?.landAmenities} />
                </MDContentSection>
              )}
            </div>

            <div id={PROJECT_NAVBAR_MAPS[UNIT_FLOOR_PLAN_PRICING]}>
              <MDContentSection
                title={UNIT_FLOOR_PLAN_PRICING}
                inlineStyle={{
                  textColor: 'var(--secondary-color)',
                  fontWeight: 'bold',
                }}
              >
                <FloorPlanPricing
                  projectUnits={projectUnits}
                  projectData={projectData}
                  isShowEdit={false}
                />
              </MDContentSection>
            </div>

            {/* <div
              className={` ${divRef && 'mt-5'}`}
              ref={divRef}
              id={PROJECT_NAVBAR_MAPS[CONTACT_MORES]}
            >
              <MDContentSection
                title={CONTACT_MORES}
                inlineStyle={{
                  textColor: 'var(--secondary-color)',
                  fontWeight: 'bold',
                }}
              >
                <AgentForm id={_id} listingType={PROJECT_PROP} />
              </MDContentSection>
            </div> */}

            {projectBrochurePdf?.length > 0 && (
              <div id={PROJECT_NAVBAR_MAPS[IMAGE_INFO]}>
                <MDContentSection
                  title={IMAGE_INFO}
                  inlineStyle={{
                    textColor: 'var(--secondary-color)',
                    fontWeight: 'bold',
                  }}
                >
                  <BrochurePdf pdfUrl={projectBrochurePdf} />
                </MDContentSection>
              </div>
            )}

            {projectVideos?.[0] && (
              <div id={PROJECT_NAVBAR_MAPS["Project Video"]}>
                <MDContentSection
                  title={`${projectTitle} Video`}
                  inlineStyle={{
                    textColor: 'var(--secondary-color)',
                    fontWeight: 'bold',
                  }}
                >
                  <VideoSection projectVideo={projectVideos?.[0]} />
                </MDContentSection>
              </div>
            )}
            {paymentSlipDocuments && paymentSlipDocuments.length > 0 && (
              <div id={PROJECT_NAVBAR_MAPS[PRICE_LIST]}>
                <MDContentSection
                  title={PRICE_LIST}
                  inlineStyle={{
                    textColor: 'var(--secondary-color)',
                    fontWeight: 'bold',
                  }}
                >
                  <PriceList paymentSlipDocuments={paymentSlipDocuments} />
                </MDContentSection>
              </div>
            )}
            {sitePlanDocuments && sitePlanDocuments.length > 0 && (
              <div id={PROJECT_NAVBAR_MAPS[SITE_PLAN]}>
                <MDContentSection
                  title="Site Plan"
                  inlineStyle={{
                    textColor: 'var(--secondary-color)',
                    fontWeight: 'bold',
                  }}
                >
                  <SitePlan sitePlanDocuments={sitePlanDocuments} />
                </MDContentSection>
              </div>
            )}

            {/* Developer Information */}
            <div id={PROJECT_NAVBAR_MAPS[DEVELOPER_DETAILS]}>
              {projectData?.developerDetail && (
                <MDContentSection
                  title='Developer Detail'
                  inlineStyle={{
                    textColor: 'var(--secondary-color)',
                    fontWeight: 'bold',
                  }}
                >
                  <DeveloperDetail
                    developerData={projectData?.developerDetail}
                  />
                </MDContentSection>
              )}
            </div>
            {projectData?.developerDetail && (
              <MDContentSection
                title={'Contact Developer'}
                inlineStyle={{
                  textColor: 'var(--secondary-color)',
                  fontWeight: 'bold',
                }}
              >
                <DeveloperContact
                  developerData={projectData?.developerDetail}
                />
              </MDContentSection>
            )}
            <div
              className="md:px-7 max-md:p-[4px] my-9 h-80 md:mb-7"
              ref={osmMapRef}
              onClick={handleMapClick}
              id="map"
            >
              <OsmMapWithNearby
                height={300}
                localityLat={coordinates?.[0]}
                localityLng={coordinates?.[1]}
                nearby={nearby}
                property={projectTitle}
              />
            </div>
            {modalOpen && (
              <MapsModal
                localityLat={coordinates?.[0]}
                localityLng={coordinates?.[1]}
                nearby={nearby}
                setModalOpen={setModalOpen}
              />
            )}
            {userType === ADMIN_TYPE && (
              <div className="hidden md:flex md:justify-end my-6 mx-10">
                {approvalStatus?.status !== DELETED_TEXT && (
                  <div className="mr-5">
                    <MDButton
                      text={DELETE}
                      inlineCSS={{
                        backgroundColor: '#931602',
                        hover: true,
                        borderRadius: '5px',
                        borderStyle: '1px solid #931602',
                      }}
                      onClick={() => openDeleteConfirmation()}
                    />
                  </div>
                )}
                <DeleteModal
                  open={showDeleteConfirmation}
                  id={_id}
                  cancelDelete={cancelDelete}
                  confirmDelete={() => confirmDelete(_id)}
                  footText={DELETE_PROJECT_MESSAGE}
                  headText={DELETE_PROJECT}
                />
                <MDButton
                  text={EDIT_PROJECT}
                  inlineCSS={{
                    backgroundColor: '#ffffff',
                    hover: true,
                    borderStyle: '1px solid #931602',
                    borderRadius: '5px',
                    textColor: '#931602',
                    width: '120px',
                  }}
                  onClick={() => openEditModal()}
                />
                <EditProjectModal
                  isOpen={isEditModalOpen}
                  onClose={closeEditModal}
                  initialProjectData={projectData}
                  refresh={true}
                />
              </div>
            )}
            <div id="faqs">
              <MDContentSection
                title={`${projectTitle} FAQs`}
                inlineStyle={{ textColor: '#931602' }}
              >
                <FaqTemplate projectData={projectData} />
              </MDContentSection>
            </div>
          </div>
          <div className="w-full md:w-[30%] min-h-[100vh] md:mt-3  mt-2">
            <StickyEmiCalculator />
            <Featured />
            <AskExplore />
            <StandaloneContactForm />

            {userType === ADMIN_TYPE && (
              <div className="flex justify-end my-6 mx-10 block md:hidden">
                {approvalStatus?.status !== DELETED_TEXT && (
                  <div className="mr-5">
                    <MDButton
                      text={DELETE}
                      inlineCSS={{
                        backgroundColor: '#931602 ',
                        hover: true,
                        borderRadius: '5px',
                        borderStyle: '1px solid #931602',
                      }}
                      onClick={() => openDeleteConfirmation()}
                    />
                  </div>
                )}
                <DeleteModal
                  open={showDeleteConfirmation}
                  id={_id}
                  cancelDelete={cancelDelete}
                  confirmDelete={() => confirmDelete(_id)}
                  footText={DELETE_PROJECT_MESSAGE}
                  headText={DELETE_PROJECT}
                />
                <MDButton
                  text={EDIT_PROJECT}
                  inlineCSS={{
                    backgroundColor: '#ffffff',
                    hover: true,
                    borderStyle: '1px solid #931602',
                    borderRadius: '5px',
                    textColor: '#931602',
                    width: '120px',
                  }}
                  onClick={() => openEditModal()}
                />
                <EditProjectModal
                  isOpen={isEditModalOpen}
                  onClose={closeEditModal}
                  initialProjectData={projectData}
                  refresh={true}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <div className='custom-section'>
        {
          <div className='ml-6 '>
            <RecommendedProperties user_id={userId} project_id={_id} recommendation_type={"Project"} />
          </div>
        }
      </div> */}
    </div>
  )
}

export async function getServerSideProps({ query, req }) {
  try {
    const token = getTokenOrIpFromCookie(req)
    const cookiesToken = req.cookies.token
    const ipAddress = req.cookies.ipaddress
    const longitude = req.cookies.Longitude
    const latitude = req.cookies.Latitude
    const ipLatitude = req.cookies.ipLatitude
    const ipLongitude = req.cookies.ipLongitude
    const machineId = req.cookies.machineid
    axios.defaults.headers.common['token'] = cookiesToken
    axios.defaults.headers.common['ipaddress'] = ipAddress
    axios.defaults.headers.common['latitude'] = latitude ? latitude : ipLatitude
    axios.defaults.headers.common['longitude'] = longitude
      ? longitude
      : ipLongitude
    axios.defaults.headers.common['machineid'] = machineId
    const [response] = await Promise.all([
      makeApiRequest(
        GET_REQ,
        `${process.env.NEXT_PUBLIC_API}${VIEW_PROJECT_ROUTE}/${query.slug}`,
        token
      ),
    ])
    console.log('response', response)
    const alreadySeen = response?.data?.result?.alreadySeen ?? ''
    const totalViews = response?.data?.result?.viewersCount ?? ''
    const projectData = (await response?.data?.result?.projectResult) || {}

    const {
      _id = '',
      projectImages = [],
      projectCoverImage = '',
      projectBrochurePdf = '',
      projectVideos = [],
      projectDescription = '',
      coordinates = [],
      projectTitle = '',
      projectUnits = [],
      amenities = {},
      moresReraId = '',
      projectReraId = '',
      projectMetaTitle = '',
      projectMetaDescription = '',
      sitePlanDocuments = [],
      paymentSlipDocuments = [],
    } = projectData || {}
    return {
      props: {
        projectData,
        _id,
        projectImages,
        projectCoverImage,
        projectVideos,
        projectDescription,
        projectMetaTitle,
        projectMetaDescription,
        coordinates,
        projectTitle,
        projectUnits,
        amenities,
        moresReraId,
        projectReraId,
        projectBrochurePdf,
        alreadySeen,
        totalViews,
        sitePlanDocuments,
        paymentSlipDocuments,
      },
    }
  } catch (error) {
    console.log(error)
  }
  return { props: {} }
}

export default index
