import React, { useRef, useState } from 'react'
import InputValue from '@/utils/InputValue/index'
import { toast } from 'react-toastify'

import BackgroundImage from '../../../assets/NonLoggedUserImages/backgroundImage.svg'
import Styles from './index.module.css'

const RentAgreement = () => {
  const [city, setCity] = useState('')
  const [agreementDate, setAgreementDate] = useState('')
  const pdfDivRef = useRef(null)

  // Ensure page starts at top when component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const [ltitle, setLTitle] = useState('')
  const [lname, setLname] = useState('')
  const [lParentName, setLParentName] = useState('')
  const [lMob, setLMob] = useState('')
  const [lEmail, setLEmail] = useState('')
  const [lPan, setLPan] = useState('')
  const [lAdhaar, setLAdhaar] = useState('')
  const [lAddress, setLAddress] = useState('')
  const [rtitle, setRTitle] = useState('')
  const [rname, setRname] = useState('')
  const [rParentName, setRParentName] = useState('')
  const [rMob, setRMob] = useState('')
  const [rEmail, setREmail] = useState('')
  const [rPan, setRPan] = useState('')
  const [rAdhaar, setRAdhaar] = useState('')
  const [rAddress, setRAddress] = useState('')
  const [buildingType, setBuildingType] = useState('')
  const [area, setArea] = useState('')
  const [propertyType, setPropertyType] = useState('')
  const [areaType, setAreaType] = useState('')
  const [pinCode, setPinCode] = useState('')
  const [locality, setLocality] = useState('')
  const [buildingName, setBuildingName] = useState('')
  const [floorNumber, setFloorNumber] = useState('')
  const [houseNumber, setHouseNumber] = useState('')
  const [propertyCity, setPropertyCity] = useState('')
  const [completeAddress, setCompleteAddress] = useState('')
  const [rent, setRent] = useState()
  const [rentPeriod, setRentPeriod] = useState()
  const [startDate, setStartDate] = useState()
  const [maintenanceType, setMaintenanceType] = useState()
  const [paymentDate, setPaymentDate] = useState()
  const [securityDeposit, setSecurityDeposit] = useState()
  const [noticePeriod, setNoticePeriod] = useState()
  const [lockinPeriod, setLockInPeriod] = useState()
  const [rentInc, setRentInc] = useState()
  const [assets, setAssets] = useState({
    AC: 0,
    'Air Cooler': 0,
    Almirah: 0,
    Bulb: 0,
    Bed: 0,
    Chair: 0,
    Curtain: 0,
    Cupboard: 0,
    'Electric Geyser': 0,
    Fan: 0,
    'Gas Geyser': 0,
    Refrigerator: 0,
    Sofa: 0,
    Table: 0,
    Tubelight: 0,
    Television: 0,
    'Washing Machine': 0,
    'Water Cooler': 0,
  })

  const [addAmenity, setAddAmenity] = useState('')

  const [loading, setLoading] = useState(true)
  const [downloading] = useState(false)
  const handleDownload = async () => {
    window.print()
  }

  const handleAgreement = () => {
    setLoading(false)
    window.scrollTo(0, 0)
  }

  return (
    <section
      style={{
        backgroundImage: `url(${BackgroundImage.src})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
      }}
      className="flex flex-col justify-center items-center"
      tabIndex="-1"
    >
      <div className={`${Styles.customSection} w-[93%] lg:w-[93%] `}>
        <div className="text-center items-center custom-section ">
          {loading ? (
            <div className=" border-0 md:border-2 md:border-primary rounded-lg">
              <div className="flex justify-center items-center mt-9">
                <div className="flex items-center gap-2">
                  <h1 className="font-bold text-primary">Rent</h1>
                  <h1 className="font-[100] text-primary ">Agreement</h1>
                </div>
              </div>

              <h2 className={Styles.paragraph}>
                Create rent agreement form in a{' '}
                <span className="text-primary text-2xl font-bold">
                  Easy Free Way !!!
                </span>
              </h2>

              <div className={Styles.Details}>
                <div className={Styles.summary}>Enter City and Date</div>
                <div className={`${Styles.innerSummary}`}>
                  <div>
                    <h4>City</h4>
                    <InputValue
                      value={city}
                      setValue={setCity}
                      placeholder="Enter City name"
                      className={Styles.InputValue}
                    />
                  </div>
                  <div>
                    <h4>Agreement Date</h4>
                    <InputValue
                      value={agreementDate}
                      setValue={setAgreementDate}
                      placeholder="Enter Date"
                      type="date"
                      className={Styles.InputValue}
                    />
                  </div>
                </div>
              </div>
              <div className={Styles.Details}>
                <div className={Styles.summary}>Landlord Details</div>
                <div className={`${Styles.innerSummary}`}>
                  <div>
                    <h4>Title</h4>
                    <InputValue
                      value={ltitle}
                      setValue={setLTitle}
                      placeholder="Mr/Mrs/Miss"
                      className={Styles.InputValue}
                    />
                  </div>
                  <div>
                    <h4>Name</h4>
                    <InputValue
                      value={lname}
                      setValue={setLname}
                      placeholder="Enter Name"
                      className={Styles.InputValue}
                    />
                  </div>
                  <div>
                    <h4>Parent Name</h4>
                    <InputValue
                      value={lParentName}
                      setValue={setLParentName}
                      placeholder="Enter Parent Name"
                      className={Styles.InputValue}
                    />
                  </div>
                  <div>
                    <h4>Mobile Number</h4>
                    <InputValue
                      value={lMob}
                      setValue={(value) => {
                        const numericValue = value.replace(/\D/g, '')
                        setLMob(numericValue)
                      }}
                      placeholder="Enter Mobile Number"
                      className={Styles.InputValue}
                      type="tel"
                      onKeyPress={(e) => {
                        if (!/[0-9]/.test(e.key)) {
                          e.preventDefault()
                        }
                      }}
                    />
                  </div>
                  <div>
                    <h4>Email</h4>
                    <InputValue
                      value={lEmail}
                      setValue={setLEmail}
                      placeholder="Enter Email"
                      className={Styles.InputValue}
                    />
                  </div>
                  <div>
                    <h4>Pan Card</h4>
                    <InputValue
                      value={lPan}
                      setValue={setLPan}
                      placeholder="Enter Pan Number"
                      className={Styles.InputValue}
                    />
                  </div>
                  <div>
                    <h4>Adhaar</h4>
                    <InputValue
                      value={lAdhaar}
                      setValue={setLAdhaar}
                      placeholder="Enter Adhaar Number"
                      className={Styles.InputValue}
                    />
                  </div>
                  <div>
                    <h4>Full Address</h4>
                    <InputValue
                      value={lAddress}
                      setValue={setLAddress}
                      placeholder="Enter Address"
                      className={Styles.InputValue}
                    />
                  </div>
                </div>
              </div>
              <div className={Styles.Details}>
                <div className={Styles.summary}>Renter Details</div>
                <div
                  className={`flex justify-between flex-wrap ${Styles.innerSummary}`}
                >
                  <div>
                    <h4>Title</h4>
                    <InputValue
                      value={rtitle}
                      setValue={setRTitle}
                      placeholder="Mr/Mrs/Miss"
                      className={Styles.InputValue}
                    />
                  </div>
                  <div>
                    <h4>Name</h4>
                    <InputValue
                      value={rname}
                      setValue={setRname}
                      placeholder="Enter Name"
                      className={Styles.InputValue}
                    />
                  </div>
                  <div>
                    <h4>Parent Name</h4>
                    <InputValue
                      value={rParentName}
                      setValue={setRParentName}
                      placeholder="Enter Parent Name"
                      className={Styles.InputValue}
                    />
                  </div>
                  <div>
                    <h4>Mobile Number</h4>
                    <InputValue
                      value={lMob}
                      setValue={(value) => {
                        const numericValue = value.replace(/\D/g, '')
                        setLMob(numericValue)
                      }}
                      placeholder="Enter Mobile Number"
                      className={Styles.InputValue}
                      type="tel"
                      onKeyPress={(e) => {
                        // Prevent non-numeric characters
                        if (!/[0-9]/.test(e.key)) {
                          e.preventDefault()
                        }
                      }}
                    />
                  </div>
                  <div>
                    <h4>Email</h4>
                    <InputValue
                      value={rEmail}
                      setValue={setREmail}
                      placeholder="Enter Email"
                      className={Styles.InputValue}
                    />
                  </div>
                  <div>
                    <h4>Pan Card</h4>
                    <InputValue
                      value={rPan}
                      setValue={setRPan}
                      placeholder="Enter Pan Number"
                      className={Styles.InputValue}
                    />
                  </div>
                  <div>
                    <h4>Adhaar</h4>
                    <InputValue
                      value={rAdhaar}
                      setValue={setRAdhaar}
                      placeholder="Enter Adhaar Number"
                      className={Styles.InputValue}
                    />
                  </div>
                  <div>
                    <h4>Full Address</h4>
                    <InputValue
                      value={rAddress}
                      setValue={setRAddress}
                      placeholder="Enter Address"
                      className={Styles.InputValue}
                    />
                  </div>
                </div>
              </div>
              <div className={`relative ${Styles.Details}`}>
                <div className={Styles.summary}>Amenity Details</div>
                <div>
                  <div className={`grid grid-cols-1 md:grid-cols-2 gap-4`}>
                    {Object.keys(assets).map((asset, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between px-5 py-2  rounded"
                      >
                        <div className="font-medium">{asset}</div>
                        <div className="flex items-center gap-2 ">
                          <button
                            className="px-2 py-1 bg-viewedBackground border border-primary rounded"
                            onClick={() =>
                              assets[asset] !== 0 &&
                              setAssets({
                                ...assets,
                                [asset]: assets[asset] - 1,
                              })
                            }
                          >
                            -
                          </button>
                          <h4 className="mx-2">{assets[asset]}</h4>
                          <button
                            className="px-2 py-1 bg-viewedBackground border border-primary rounded"
                            onClick={() =>
                              setAssets({
                                ...assets,
                                [asset]: assets[asset] + 1,
                              })
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex py-5 mb-12 justify-center">
                      <InputValue
                        value={addAmenity}
                        setValue={setAddAmenity}
                        placeholder="Enter Amenity Name"
                        className={Styles.AmenityValue}
                      />
                      <button
                        className={Styles.addAmenityButton}
                        onClick={() => {
                          const amenityName = addAmenity.trim()

                          if (amenityName === '') {
                            toast.error('Please enter an amenity name')
                            return
                          }

                          if (assets.hasOwnProperty(amenityName)) {
                            setAddAmenity('')
                            toast.error('Amenity already added!')
                            return
                          }

                          setAssets({ ...assets, [amenityName]: 0 })
                          setAddAmenity('')
                          toast.success('Amenity added successfully!')
                        }}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className={Styles.Details}>
                <div className={Styles.summary}>Property Details</div>
                <div
                  className={`flex justify-between flex-wrap ${Styles.innerSummary}`}
                >
                  <div>
                    <h4>Building Type</h4>
                    <InputValue
                      placeholder="Residential/Commercial"
                      value={buildingType}
                      setValue={setBuildingType}
                      className={Styles.InputValue}
                    />
                  </div>

                  <div>
                    <h4>Property Type</h4>
                    <InputValue
                      placeholder="Villa/office/apartment"
                      value={propertyType}
                      setValue={setPropertyType}
                      className={Styles.InputValue}
                    />
                  </div>

                  <div>
                    <h4>Area Type</h4>
                    <InputValue
                      placeholder="Carpet area / plot area"
                      value={areaType}
                      setValue={setAreaType}
                      className={Styles.InputValue}
                    />
                  </div>

                  <div>
                    <h4>Area</h4>
                    <InputValue
                      type="number"
                      placeholder="in sqft"
                      value={area}
                      setValue={setArea}
                      className={Styles.InputValue}
                    />
                  </div>

                  <div>
                    <h4>Pin code</h4>
                    <InputValue
                      type="number"
                      placeholder="Enter Pin Code"
                      value={pinCode}
                      setValue={setPinCode}
                      className={Styles.InputValue}
                    />
                  </div>

                  <div>
                    <h4>Locality</h4>
                    <InputValue
                      placeholder="locality"
                      value={locality}
                      setValue={setLocality}
                      className={Styles.InputValue}
                    />
                  </div>

                  <div>
                    <h4>Building Name</h4>
                    <InputValue
                      placeholder="Building Name"
                      value={buildingName}
                      setValue={setBuildingName}
                      className={Styles.InputValue}
                    />
                  </div>

                  <div>
                    <h4>Floor Number</h4>
                    <InputValue
                      type="number"
                      placeholder="Floor Number"
                      value={floorNumber}
                      setValue={setFloorNumber}
                      className={Styles.InputValue}
                    />
                  </div>

                  <div>
                    <h4>House Number</h4>
                    <InputValue
                      placeholder="House Number"
                      value={houseNumber}
                      setValue={setHouseNumber}
                      className={Styles.InputValue}
                    />
                  </div>

                  <div>
                    <h4>City Name</h4>
                    <InputValue
                      placeholder="City"
                      value={propertyCity}
                      setValue={setPropertyCity}
                      className={Styles.InputValue}
                    />
                  </div>

                  <div>
                    <h4>Complete Address</h4>
                    <InputValue
                      placeholder="Address"
                      value={completeAddress}
                      setValue={setCompleteAddress}
                      className={Styles.InputValue}
                    />
                  </div>
                </div>
              </div>
              <div className={Styles.Details}>
                <div className={Styles.summary}>Rent Details</div>
                <div
                  className={`flex justify-between flex-wrap ${Styles.innerSummary}`}
                >
                  <div>
                    <h4>Agreement Period</h4>
                    <InputValue
                      placeholder="In months"
                      value={rentPeriod}
                      setValue={setRentPeriod}
                      type="Number"
                      className={Styles.InputValue}
                    />
                  </div>

                  <div>
                    <h4>Start date</h4>
                    <InputValue
                      placeholder="Date"
                      value={startDate}
                      setValue={setStartDate}
                      type="date"
                      className={Styles.InputValue}
                    />
                  </div>

                  <div>
                    <h4>Rent in Rs.</h4>
                    <InputValue
                      placeholder="Rs."
                      value={rent}
                      setValue={setRent}
                      type="Number"
                      className={Styles.InputValue}
                    />
                  </div>

                  <div>
                    <h4>Maintenance Type</h4>
                    <InputValue
                      placeholder="With/Without"
                      value={maintenanceType}
                      setValue={setMaintenanceType}
                      className={Styles.InputValue}
                    />
                  </div>

                  <div>
                    <h4>Rent Payment date</h4>
                    <InputValue
                      placeholder="date"
                      value={paymentDate}
                      setValue={setPaymentDate}
                      type="date"
                      className={Styles.InputValue}
                    />
                  </div>

                  <div>
                    <h4>Rent Increment</h4>
                    <InputValue
                      type="number"
                      placeholder="rent increment in %"
                      value={rentInc}
                      setValue={setRentInc}
                      className={Styles.InputValue}
                    />
                  </div>

                  <div>
                    <h4>Security Deposit</h4>
                    <InputValue
                      placeholder="Security Deposit"
                      value={securityDeposit}
                      setValue={setSecurityDeposit}
                      type="Number"
                      className={Styles.InputValue}
                    />
                  </div>

                  <div>
                    <h4>Notice Period</h4>
                    <InputValue
                      placeholder="in Days"
                      value={noticePeriod}
                      setValue={setNoticePeriod}
                      type="Number"
                      className={Styles.InputValue}
                    />
                  </div>

                  <div>
                    <h4>Lock In Period</h4>
                    <InputValue
                      placeholder="in days"
                      value={lockinPeriod}
                      setValue={setLockInPeriod}
                      type="Number"
                      className={Styles.InputValue}
                    />
                  </div>
                </div>
              </div>
              <button className={Styles.button} onClick={handleAgreement}>
                Create
              </button>
            </div>
          ) : (
            <div className="pdf-section">
              <div className="flex justify-center">
                <button
                  className={Styles.functionButton}
                  onClick={() => setLoading(true)}
                >
                  Edit Again
                </button>
                <button
                  className={Styles.functionButton}
                  onClick={handleDownload}
                >
                  {downloading ? 'Wait...' : 'Download'}
                </button>
              </div>

              <div className={Styles.pdfDiv} ref={pdfDivRef}>
                <h1 className=" underline mb-7">Rent Agreement</h1>
                <h4 className=" mb-5">
                  This Lease Deed/Rent Agreement is executed at {city} on day,{' '}
                  {agreementDate}.
                </h4>
                <p className="font-semibold">BETWEEN</p>
                <p className="mb-5">
                  {ltitle} {lname}, S/O {lParentName} , having contact number{' '}
                  {lMob}, Email id {lEmail}, PAN {lPan}, UID (ADHAAR NO.):{' '}
                  {lAdhaar}, residing at {lAddress}.
                </p>
                <p className="font-semibold">AND</p>
                <p className="mb-5">
                  {rtitle} {rname}, S/O {rParentName} , having contact number{' '}
                  {rMob}, Email id {rEmail}, PAN {rPan}, UID (ADHAAR NO.):{' '}
                  {rAdhaar}, residing at {rAddress}.
                </p>

                <p className="mb-5">
                  For the purpose hereof, the Lessor and Lessee are referred to
                  collectively as the Parties and individually the Party as the
                  context may require.
                </p>

                <p className="mb-5">
                  Whereas the Lessor is the lawful owner in possession of the{' '}
                  {propertyType} unit of {areaType} {area} Sq.Ft. bearing House
                  No.{houseNumber} , situated on the Floor No {floorNumber} ,
                  Building known as {buildingName} , Address 1:{' '}
                  {completeAddress},{pinCode} , Locality: {locality} , City:{' '}
                  {propertyCity} ,{pinCode} . The expression Lessor and Lessee
                  shall mean and include their respective heirs, successors,
                  representatives, and assignees.
                </p>
                <p className="mb-5">
                  Whereas on the request of the Lessee, the Lessor has agreed to
                  let out the Demised Premises to the LESSEE, and the LESSEE has
                  agreed to take it on rent for a period of {rentPeriod}{' '}
                  Month(s) w.e.f. {startDate} for its bonafide Residential use.
                  Whereas the LESSOR has represented that the Demised Premises
                  is free from all encumbrances and the LESSOR has a clean and
                  unrestricted right to the Demised Premises. Whereas the Lessor
                  and Lessee both represented that they are legally competent to
                  enter into this Lease Agreement on the terms and conditions
                  contained herein.
                </p>

                <p className="mb-5 font-semibold">
                  Now, these present witnesses as under:
                </p>
                <ol className={`mb-5 ${Styles.Lines}`}>
                  <li>
                    That the second party shall pay the monthly rent of Rs{' '}
                    {rent} in respect of the Demised Premises located at
                    2354,12,chood,mamura,Noida,201301 .
                  </li>

                  <li>
                    The rent shall be paid per month in advance through advance
                    rental on or before the {paymentDate} th day of each English
                    calendar month. In case of TDS deduction, the Lessee shall
                    furnish the TDS certificate to the Lessor at the end of each
                    calendar quarter well within time so as to enable the Lessor
                    to file his income tax return within the stipulated
                    timeframe. Each of the parties will bear the consequences
                    for any non-compliance on account of the tax liability of
                    its part.
                  </li>

                  <li>
                    That after the expiry of the Lease term, monthly rent shall
                    be increased at the escalation of {rentInc} % or at mutually
                    agreed by both parties at the time of renewal in the
                    discussion as per prevailing market conditions.
                  </li>

                  <li>
                    That the second party has deposited a sum of Rs{' '}
                    {securityDeposit} as interest free refundable security
                    deposit, which will be refunded (Interest Free) at the time
                    of vacating the Demised Premises after deducting any
                    outstanding rent, electricity, water, sewerage and
                    maintenance charges, bills, etc., if any, which are payable
                    by the Lessee at the time of vacating the Demised Premises.
                    Lessee shall have the right to adjust all the dues including
                    but not limited to rent, maintenance, electricity, water,
                    sewerage, etc. of the notice period from the Refundable
                    Security deposit.
                  </li>

                  <li>
                    The notice period to be served by either party would be of{' '}
                    {noticePeriod} Day(s). Either the LESSOR or the LESSEE may
                    terminate this agreement without assigning any reasons
                    whatsoever by giving one month advance notice to the other
                    party.
                  </li>

                  <li>
                    The Lessor will ensure that all outstanding bills/ charges
                    on the above said demised premises on account of
                    electricity, water, and any other incidentals prior to the
                    start of lease from are settled and paid
                  </li>

                  <li>
                    Lock in period: Both the parties have agreed to set a
                    lock-in period of {lockinPeriod} Month(s) during which
                    neither the Lessor shall ask the Lessee to vacate the
                    premises, nor the Lessee shall vacate the premises on
                    his/her own during the Lock-in period. In spite of this
                    mandatory clause, if the Lessee leaves the premises for
                    whatsoever reason, he shall pay to the Lessor license fee
                    for the remaining lock-in period at the rate of License Fees
                    agreed upon in the Agreement. On the other hand, Lessor
                    shall compensate the Lessee for loss and inconvenience
                    caused to the Lessee if he has been asked to vacate the
                    premises.
                  </li>

                  <li>
                    It is further agreed between the parties that in case of any
                    dispute the Noida court shall have the exclusive
                    jurisdiction over the disputes.
                  </li>

                  <li>
                    That the electricity and water charges after the start of
                    the lease will be paid timely and regularly every month by
                    the Lessee as per actual bills provided by the service
                    provider. A copy of the payment receipts will be provided by
                    the Lessee to the Lessor on demand. In the unlikely instance
                    that the connection/s for electricity or water is
                    disconnected due to non- payment or negligence of the
                    LESSEE, the charges to restoring such connections shall be
                    borne fully by the LESSEE and if not paid the same can be
                    deducted from the security deposit provided to the Lessor.
                  </li>

                  <li>
                    That the Lessor shall hand over the Premises to the Lessee
                    in a habitable condition. The detailed list of items
                    provided as part of this lease is enumerated as ANNEXURE 1
                    to this Deed.
                  </li>

                  <li>
                    That in case any damage is caused by the LESSEE to the
                    aforesaid premises, fixtures, fittings, etc.(except normal
                    wear and tear), the LESSEE shall be liable to make good the
                    same to ensure that those is restored in the same condition
                    as they were at the time of signing of this lease other than
                    the changes made by the LESSEE with the consent of the
                    LESSOR. In case of LESSEE fails to do so, LESSOR shall be
                    entitled to deduct the costs of doing the same from the
                    interest free security deposit.
                  </li>

                  <li>
                    That the Second Party shall have no right, to make any
                    addition, alteration in the Demised Premises except
                    furnishings. The Lessor shall not be liable to pay any
                    charges against the expenses incurred by the Lessee for any
                    additional furnishing at the Demised Premises.
                  </li>

                  <li>
                    That the Second Party shall have no right to sub-let the
                    whole or part of Demised Premises to any other person or
                    entity at any time. Further, The Lessor or his authorized
                    representative has the right to visit the Demised Premises
                    on any working day during business hours after taking the
                    Lessee permission.
                  </li>

                  <li>
                    That the Demised Premises shall be used by the Lessee in a
                    cordial and civilized manner without causing any nuisance or
                    disturbance to the other occupants of the building complex.
                    The Lessee shall use the Demised Premises for its bonafide
                    legal purposes and shall not do or cause any actions or
                    activities of illegal, immoral, unsocial nature in the
                    Demised Premises and will not create any nuisance to the
                    neighborhood in any manner whatsoever.
                  </li>

                  <li>
                    That day-to-day repair such as fuses, leakage of water taps,
                    replacement of defective MCBs, Bulbs, Tube lights, Tube
                    light Fittings, connecting sanitary pipes, doors, door
                    locks, etc. shall be borne by the Lessee at its own costs.
                    However, major repairs such as leakage from the wall
                    ceiling, etc. would be rectified by the Lessor on the
                    request of Lessee.
                  </li>

                  <li>
                    That in case the Lessee defaults in payment of rent for any
                    month or commits any breach of any of the terms and
                    conditions of this deed, the LESSOR shall be entitled to get
                    back the possession of the Demised Premises after providing
                    reasonable notice to the Lessee.
                  </li>

                  <li>
                    That the Lessee shall make sure that all the payments shall
                    have been made on regular basis by them to the Service
                    Providers or Government Authorities on account of any
                    services utilized by them or taxes/levies demanded by or
                    payable to Government Authorities on account of their
                    transactions. The Lessee shall be liable at all times even
                    after vacation of the Demised Premises for dues if any
                    arising of the tenure of occupation of the Lessee which is
                    liable to be paid by the Lessee.
                  </li>

                  <li>
                    That after the expiry of this Lease Deed, if the LESSOR does
                    not wish to renew it or to continue further, the Lessee is
                    bound to vacate the Demised Premises immediately upon expiry
                    of the lease to the Lessor in all good faith and handover
                    the peaceful possession to the Lessor failing which the
                    Lessee will pay damages at the rate of double the monthly
                    rent as stipulated in this Deed.
                  </li>

                  <li>
                    That the Lessor/ his authorized agents shall acknowledge and
                    give valid & duly stamped receipts as and when requested by
                    the LESSEE as conclusive proof of rent payments on demand
                    from the Lessee
                  </li>

                  <li>
                    This Deed shall be governed by and interpreted in accordance
                    with the laws of India. All disputes, differences,
                    disagreements, controversies or claims arising out of or in
                    connection with this Deed, including the validity, effect,
                    and interpretation thereof, shall, at the request of either
                    party, be referred to the sole arbitrator mutually appointed
                    by both the parties, who shall conduct the arbitration
                    proceedings in English and in accordance with the provisions
                    of the Arbitration and Conciliation Act, 1996, or any
                    amendment or statutory modification or replacement or
                    substitution thereof, Any award made by the arbitrator shall
                    be final and binding on the Parties. The cost and expenses
                    of the arbitration proceedings, including fees of the
                    arbitrators, shall be borne equally by the Parties. The
                    venue of arbitration shall be as mutually decided by the
                    parties.
                  </li>

                  <li>
                    Without any prejudice to a Party other rights and claims
                    under this Lease or otherwise, if one party breaches any of
                    its representations, obligations, warranties, covenants or
                    undertakings or violates any provision hereunder, it shall
                    indemnify and keep the other Party and/or service providers
                    harmless against all direct damages and costs suffered or
                    borne by it or them thereby including but not limited to
                    costs incurred in defending all claims/actions, or
                    proceedings that may arise or may be otherwise necessary to
                    ensure exclusive, quiet and peaceful access, occupation and
                    use of the Leased Premises in accordance with this Deed.
                    Without prejudice to other rights enjoyed by either Party
                    (non- defaulting Party) under the Deed and Applicable Laws,
                    the other Party (Defaulting Party) shall be responsible for
                    and will indemnify against all claims, demands, suits,
                    proceedings, judgments, direct damage, and relevant costs
                    that the non-defaulting Party may suffer or incur in
                    connection with loss of life and/or personal injury to the
                    occupants of the Leased Premises and/or damage to the
                    Building if the same arise from any wrongful/negligent act
                    or omission of the defaulting Party.
                  </li>

                  <li>
                    Force Majeure: If the whole or any part of the Demised
                    Premises shall at any time during the term of the lease be
                    destroyed or damaged due to any force majeure circumstances
                    including storm, tempest, flood, Act of God, an act of
                    terrorism, war or any other irresistible force or the Lessee
                    is deprived of the use of the Demised Premises for reasons
                    not attributable to the Lessee, the Lessor hereby undertakes
                    to restore the Demised Premises as expeditiously as possible
                    or, as the case may be, to remove the impediment in its use
                    and occupation as expeditiously as possible. Notwithstanding
                    the foregoing, upon the happening of any such event as
                    aforesaid, the Lessee shall not be liable to pay Lease Rent
                    during the period the Lessee is deprived of the use of the
                    Demised Premises or any part thereof. The Lessee shall also
                    have the option to terminate the Lease after the event by
                    giving one month notice and without payment of any rent in
                    lieu thereof and without incurring any liability to pay any
                    other amount whatsoever to the Lessor.
                  </li>

                  <li>
                    Notice: Any notice or communication to be addressed by one
                    party to the other shall be in writing and shall be served
                    at the addresses as given hereinabove by registered post
                    with AID or at such other addresses as may be notified in
                    writing by one party to another. Any change in such address
                    shall be promptly notified to the other party in writing.
                  </li>

                  <li>
                    This Lease Agreement constitutes the entire agreement
                    concerning the subject matter hereof between the Lessor and
                    the Lessee and supersedes any prior representations or
                    agreements, whether written or oral between the Lessor and
                    Lessee. No modification or amendment of this Agreement or
                    waiver of any of its provisions shall be binding upon the
                    parties hereto unless made in writing and duly signed by
                    both Parties.
                  </li>
                </ol>

                <h1 className="mb-5 font-bold">ANNEXURE </h1>
                <p className="mb-5">
                  Items provided by the LESSOR at the time of execution of Lease
                  Deed between the LESSOR and the LESSEE are as follows:
                </p>

                {Object.keys(assets).map((asset) => {
                  if (assets[asset] > 0) {
                    return (
                      <div
                        key={asset}
                        className="flex justify-between w-80 m-auto"
                      >
                        <div className="mb-5">{asset}</div>
                        <div className="mb-5">{assets[asset]}</div>
                      </div>
                    )
                  }
                  return null
                })}

                <div className="flex  my-24 justify-evenly">
                  <div className="m-5">
                    <div>----------------------</div>
                    <div>Lessor Sign</div>
                    <div className="mt-3">Date : &nbsp; / &nbsp; /&nbsp;</div>
                  </div>
                  <div className="m-5">
                    <div>----------------------</div>
                    <div>Lessee Sign</div>
                    <div className="mt-3">Date : &nbsp; / &nbsp; /&nbsp;</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default RentAgreement
