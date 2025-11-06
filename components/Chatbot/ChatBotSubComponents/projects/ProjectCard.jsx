import React, { useState, useEffect } from 'react';
import HomePage from '../../../../assets/homePageImage.jpg';
import { formatNumberWithUnit } from '@/utils/utils';
import { useRouter } from 'next/router';
import superAreaLogo from './../../../../assets/chatbot/superAreaLogo.svg';
import { useAuth } from '@/context/auth';
import crossIcon from '../.././../../assets/ButtonIcons/crossIcon.svg'
import Image from 'next/image';
import locationIcon from '@/assets/location.svg';
import noida from '../../../../assets/Images/OurLocation/noida.jpg';
import delhi from '../../../../assets/Images/OurLocation/Delhi.jpg';
import mumbai from '../../../../assets/Images/OurLocation/Mumbai.jpg';
import kolkata from '../../../../assets/Images/OurLocation/Kolkata.jpg';
import hyderabad from '../../../../assets/Images/OurLocation/Hyderabadd.jpg';
import lucknow from '../../../../assets/Images/OurLocation/Lucknow.jpg';
import Styles from '../../index.module.css';
import axios from 'axios'
import { toast } from 'react-toastify'
import { GLOBALLY_COMMON_TEXT, HOME_PAGE_TEXT } from '@/textV2'
import PhoneNumberInput from '@/utils/PhoneNumerInput'
const { allFieldsRequired, emailAddressText, enterValidEmail, firstNameText, lastNameText,  messageText, enterValidMobile, phoneNumberText, requestRaised, sendMessage, sending } = HOME_PAGE_TEXT.feelFreeToConnect
const { userContactRoute } = HOME_PAGE_TEXT.routes
const { textKeyword } = HOME_PAGE_TEXT.text
const { regexs, text } = GLOBALLY_COMMON_TEXT

const cityImageMap = {
  noida,
  delhi,
  mumbai,
  kolkata,
  hyderabad,
  lucknow,
};

function ProjectCard({ project, showMoreProperty }) {
  const [showModal, setShowModal] = useState(false);
  const [auth, setAuth] = useAuth()
  const { userResult } = auth || {}
  const [isBlurred, setIsBlurred] = useState(false);
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const [email, setEmail] = useState('')
  const [load, setLoad] = useState(false)
  const [city, setCity] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [message, setMessage] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)
  console.log('userResult', userResult);
  useEffect(() => {
    if (userResult) {
      setFirstName(`${userResult?.firstName}` || '')
      setLastName(`${userResult?.lastName}` || '')
      setEmail(userResult?.email || '');
      setPhoneNumber(userResult?.mobileNumber || '');
      setCity(userResult?.city || '');
      setMessage(`I would like to know more about ${project?.projectTitle || project?.propertyTitle || 'this property'}`);
    }
  }, [userResult, project]);

  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value)
  }
  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption)
  }
  const router = useRouter();
  if (project?.isWebResult) {
    const cityName = project.city?.toLowerCase();
    if (cityName && cityImageMap[cityName]) {
      project.propertyImage = cityImageMap[cityName];
    }
  }

  const imageUrl = project?.projectImage || project?.propertyImage || HomePage.src;


  const handleClick = () => {
    if (project?.isWebResult) {
      setShowModal(true);
    }
    else if (project?.projectUrl) {
      window.open(`/project-view/${project.projectUrl}`, '_blank');
    } else if (project?.propertyUrl) {
      window.open(`/property-view/${project.propertyUrl}`, '_blank');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!firstName || !city || !phoneNumber || !email || !message) {
        toast.error(allFieldsRequired)
        return
      }
      const emailRegex = regexs.emailRegex
      if (!emailRegex.test(email)) {
        toast.error(enterValidEmail)
        return
      }
      const regex = regexs.mobileRegex
      if (!regex.test(phoneNumber)) {
        toast.error(enterValidMobile)
        return
      }
      setLoad(true)
      await axios.post(userContactRoute, {
        firstName: firstName,
        lastName: lastName,
        email,
        phone: phoneNumber,
        message,
      })
      toast.success(requestRaised)
      setShowModal(false)
      setLoad(false)
      setFirstName('')
      setLastName('')
      setCity('')
      setEmail('')
      setPhoneNumber('')
      setMessage('')
    } catch (err) {
      setLoad(false)
      toast.error('An error occurred while submitting the form.')
    }
  }

  const amenityNameMapping = {
    Gymnasium: 'Gymnasium',
    school: 'School',
    Lift: 'Lift',
    FireFightingSystems: 'Fire Fighting Systems',
    wifi: 'WiFi',
    Security: 'Security',
    CCTV: 'CCTV',
    KidsPool: 'Kids Pool',
    BadmintonCourt: 'Badminton Court',
    TennisCourt: 'Tennis Court',
    Football: 'Football Ground',
    SquashCourt: 'Squash Court',
    Cricket: 'Cricket',
    Volleyball: 'Volleyball',
    MeditationArea: 'Meditation Area',
    Basketball: 'Basketball Court',
    Jogging: 'Jogging',
    PowerBackup: 'Power Backup',
    TableTennis: 'Table Tennis',
    park: 'Park',
    table: 'Table',
    sofa: 'Sofa',
    tv: 'TV',
    bathtub: 'Bathtub',
    garden: 'Garden',
    carParking: 'Car Parking',
    KidsPlayArea: 'Kids Play Area',
    IntercomFacility: 'Intercom Facility',
    WaterSupply: 'Water Supply',
    SwimmingPool: 'Swimming Pool',
    spaAndMassage: 'Spa And Massage',
    SportCourt: 'Sport Court',
    Theatre: 'Theatre',
    Cafeteria: 'Cafeteria',
    WasteDisposal: 'Waste Disposal',
    PartyLawn: 'Party Lawn',
    ClubHouse: 'Club House',
    BanquetHall: 'Banquet Hall',
    RainWaterHarvesting: 'Rain Water Harvesting',
    VastuCompliant: 'Vastu Compliant',
    SolarWaterHeating: 'Solar Water Heating',
    CommonSocietyOffice: 'Common Society Office',
    MultipurposeHall: 'Multipurpose Hall',
    SkatingRing: 'Skating Ring',
    IndoorGames: 'Indoor Games',
    ShoppingCenter: 'Shopping Center',
    Amphitheatre: 'Amphitheatre',
    GolfCourse: 'Golf Course',
    Library: 'Library',
    Lobby: 'Lobby',
    VideoDoorPhones: 'Video Door Phones',
    Temple: 'Temple',
    Gazeebo: 'Gazeebo',
  }

  return (
    <>
      <div
        className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg hover:-translate-y-1 transition-transform duration-200 cursor-pointer"
        onClick={handleClick}
      >
        <div className="flex flex-col md:flex-row">
          <div className="md:w-[250px] h-[150px] md:h-[225px] p-2">
            <Image
              src={imageUrl}
              alt={project?.projectTitle || project?.propertyTitle}
              width={250}
              height={150}
              className="w-full h-full object-cover rounded-2xl md:rounded-2xl"
            />
          </div>

          <div className="flex-1 p-4 bg-white rounded-b-2xl md:rounded-bl-none md:rounded-r-2xl">
            <p className="text-sm text-gray-500 mb-1">
              {project?.projectType || project?.propertyType} -{' '}
              {project?.projectSubType || project?.propertySubType}
            </p>

            <h3 className="text-xl font-semibold text-[#931602] mb-1">
              {project?.projectTitle || project?.propertyTitle}
            </h3>

            <p className="text-sm text-gray-600 flex items-center mb-2">
              <span className="mr-1">
                <Image
                  src={locationIcon.src}
                  alt="location icon"
                  width={16}
                  height={16}
                />
              </span>
              {project?.locality ? `${project.locality}, ` : ''}
              {project?.city || 'N/A'}
            </p>

            <p className="text-lg font-bold text-[#931602] mb-3">
              {project.salePrice
                ? `₹${formatNumberWithUnit(project.salePrice, false)}`
                : 'Contact for Price'}
            </p>



            {project.amenities && project.amenities.length > 0 && (
              <div>
                <p className="text-sm font-medium text-gray-600">Key Amenities :</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {!project.isWebResult ? (project.amenities.slice(0, 3).map((amenity, i) => (
                    <span
                      key={i}
                      className="bg-[#fceaea] text-[#931602] text-xs px-2 py-1 rounded-full"
                    >
                      {amenityNameMapping[amenity]}
                    </span>
                  ))) : (project.amenities.slice(0, 3).map((amenity, i) => (
                    <span
                      key={i}
                      className="bg-[#fceaea] text-[#931602] text-xs px-2 py-1 rounded-full"
                    >
                      {amenity}
                    </span>
                  )))}
                  {/* {project.amenities.length > 3 && (
                    <span className="text-[#931602] text-xs mt-[3px]">
                      +{project.amenities.length - 3} more
                    </span>
                  )} */}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex justify-center items-center p-4">
          <div className={`relative bg-white shadow-xl p-6 md:max-w-3xl  ${Styles.servicesComponent} relative`}>
            <Image src={superAreaLogo} height={400} className="mb-6 pointer-events-none absolute -right-28 -top-10 opacity-10 z-[100px]" />
            {/* Close Button */}
            <div className="absolute top-[11px] right-[11px] w-[35px] h-[35px] max-sm:w-[32px] max-sm:h-[32px] p-2 rounded-full bg-white outline outline-1 outline-black">
              <Image src={crossIcon} alt="Close" onClick={() => setShowModal(false)} className="cursor-pointer" />
            </div>

            {/* Modal Heading */}
            <div className="md:px-6 text-center">
              <h2 className="text-xl font-semibold text-[#931602] mb-1">Contact Us for this Enquiry</h2>
            </div>

            {/* FORM inside the modal */}
            <form className="mt-4 max-md:mt-0" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-x-6 gap-y-5 max-lg:justify-center md:w-[95%] mx-auto mt-4">
                <div className="mt-5 max-md:mt-3 md:mt-0">
                  <h4 className={`${Styles.fieldName}`}>
                    {firstNameText}
                    <span className="text-red-500 ml-1 mt-1">*</span>
                  </h4>
                  <input
                    type={textKeyword}
                    className={Styles.inputField}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="mt-5 max-md:mt-3 md:mt-0">
                  <h4 className={`${Styles.fieldName}`}>
                    {lastNameText}
                    <span className="text-red-500 ml-1 mt-1">*</span>
                  </h4>
                  <input
                    type={textKeyword}
                    className={Styles.inputField}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
                <div className="mt-5 max-md:mt-2 md:mt-0 md:my-2 max-sm:mt-0">
                  <h4 className={Styles.fieldName}>
                    {phoneNumberText}
                    <span className="text-red-500 ml-1 mt-1">*</span>
                  </h4>
                  <PhoneNumberInput
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    country={selectedCountry}
                    onCountryChange={handleCountryChange}
                    className={`${Styles.inputField} flex items-center justify-start`}
                  />
                </div>
                <div className="mt-5 max-md:mt-2 md:mt-0 md:my-2 max-sm:mt-2">
                  <h4 className={Styles.fieldName}>
                    {emailAddressText} <span className="text-red-500 ml-1 mt-1">*</span>
                  </h4>
                  <input
                    type={text.emailText}
                    className={Styles.inputField}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mt-5 max-md:mt-3 md:mt-0 md:my-2  max-sm:mt-0">
                  <h4 className={Styles.fieldName}>
                    {text.cityText}
                    <span className="text-red-500 ml-1 mt-1">*</span>
                  </h4>
                  <input
                    type={textKeyword}
                    className={`${Styles.inputField}`}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Conditional Message Display */}
              <div className="flex justify-center flex-col mt-5 md:ml-6">
                <div className="max-w-[600px]">

                  {!userResult ? (
                    <textarea
                      rows={3}
                      cols={35}
                      className={Styles.textArea}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  ) : (
                    <div className="text-sm text-gray-700 mt-2">
                      <span className="font-semibold">Note:</span> Your enquiry is about <span className="text-[#931602] font-medium">{project?.projectTitle || project?.propertyTitle}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center mt-6">
                <button className={Styles.button}>
                  {load ? sending : "Send the Enquiry"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


    </>
  );
}

export default ProjectCard;
