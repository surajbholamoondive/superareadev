import { useRef, useState } from 'react'
import ReceiptGenerator from './ReceiptGenerator'
import Styles from './index.module.css'
import BackgroundImage from '../../../assets/NonLoggedUserImages/backgroundImage.svg'

const RentSlipGenerator = () => {
  const divRef = useRef(null)
  const handleClick = () => {
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }
  const [formData, setFormData] = useState({
    rentedAmount: '',
    rentedAddress: '',
    LandlordName: '',
    landlordPan: '',
    startDate: '',
    endDate: '',
    tenantName: '',
    tenantMobile: '',
    emailAddress: '',
  })
  const [loading, setLoading] = useState(false)

  return (
      <section
            style={{
                backgroundImage: `url(${BackgroundImage.src})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
            }}
            className="flex flex-col justify-center items-center"
        >
            <div className={`${Styles.customSection} w-[93%] lg:w-[93%] `}>
      <div className='custom-section'>
        <ReceiptGenerator
          setFormData={setFormData}
          formData={formData}
          setLoading={setLoading}
          loading={loading}
          handleClick={handleClick}
        />


        <div ref={divRef}  >
          {loading && (
            <div className='flex justify-center items-center' ref={divRef}>
              <div
                id="receipt"
                className="md:w-[70%] lg:w-[60%] w-full p-4  border border-primary  rounded-md bg-white"
              >
                <div className="flex px-4 mx-4 items-center justify-between">
                  <div className="mt-4">
                    <h3 className="">
                      HOUSE RENT RECEIPT ({formData?.startDate})
                    </h3>
                  </div>
                  <p className=" text-black">
                    {' '}
                    Generated on SuperArea.ai
                  </p>
                </div>
                <div className="px-4 mx-4 mt-4 text-gray-500 leading-6">
                  <p>
                    Received a sum of{' '}
                    <span className=" text-black">
                      ₹ {formData?.rentedAmount}
                    </span>{' '}
                    from Mr./Mrs{' '}
                    <span className="text-gray-700">
                      {formData?.tenantName}
                    </span>{' '}
                    towards the rent of property situated <br />
                    At(Address){' '}
                    <span className="text-gray-700 underline ">
                      {formData?.rentedAddress}{' '}
                    </span>{' '}
                    <br />
                    For the period{' '}
                    <span className="text-gray-700">
                      {formData?.startDate}
                    </span>{' '}
                    to{' '}
                    <span className="text-gray-700">
                      {formData?.endDate}
                    </span>
                  </p>
                </div>
                <div className="flex justify-end m-4 pr-8 ">
                  <div className="w-[100px] h-[90px] flex justify-center border border-dashed border-black ">
                    <p className="w-20 text-center my-auto">
                      Paste <br /> ₹ 1 stamp here{' '}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between px-4 text-gray-600 mx-4 mt-6 ">
                  <div>
                    <p className="text-black">
                      DATE :
                      <span className="text-gray-700">
                        {' '}
                        {formData?.startDate}{' '}
                      </span>
                    </p>
                  </div>
                  <div className="">
                    <p>
                      <span className="text-gray-700">
                        {' '}
                        {formData?.LandlordName}{' '}
                      </span>{' '}
                      (landlord)
                    </p>
                    <p>
                      PAN{' '}
                      <span className="text-gray-700">
                        {' '}
                        {formData?.landlordPan}{' '}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      <div className="lg:mt-2 max-lg:mt-8 border border-primary rounded-lg  custom-section  w-[95%] md:w-[97%]" >
        <div className=" md:mx-14 ">
          <h2 className="text-primary">What is Rent Receipt ?</h2>
          <p className="text-gray-600 mt-3">
            A rent receipt is an invoice confirming rent paid between a renter
            and their landlord. The house owner or the landlord issues the
            yearly or monthly rent receipt to their tenant after they have
            pocketed the rental payments accrued. The rent receipts include all
            the necessary information on the transaction such as the names of
            the parties involved, the rent amount and period, and information on
            the property. A commercial or house rent receipt legitimises the
            transactions between a landlord and their tenants and is evaluated
            in court in case of disputes between tenants and homeowners. It is
            always a good idea to get online rent receipts in order to keep
            track. With the use of multiple sites, you can pay the amount
            online. These rent receipt forms can be used to submit in the
            offices for House Rent Allowance (HRA) claims too.
          </p>
        </div>
        <div className=" md:mx-14 mt-6">
          <h2 className="text-primary">
            Why it is advisable to obtain Rent Receipts?
          </h2>
          <p className="text-gray-600 mt-3">
            A salaried employee is required to submit the property or house rent
            receipts to their employer before the end of the financial year to
            avail of tax exemptions on their HRA( Housing Rent Allowance) under
            Section 10 (13A) of the Income Tax Act. With the right rent receipt
            template, it is possible to submit the document at the workplace
            with ease. <br />
            These can be weekly, yearly, or even monthly rent receipts. The
            lowest rent receipt form of the three amounts would be eligible for
            Tax exemption-
          </p>
          <ul className="text-gray-600 mt-3">
            <li>Actual HRA amount obtained from the employer</li>
            <li>
              50% of the Salary (exclusive to Delhi, Bombay, Chennai and
              Kolkata)
            </li>
            <li>40% of the Salary (Rest of India)</li>
            <li>Actual rent paid minus 10% of &apos;s remuneration.</li>
          </ul>
        </div>
        <div className=" md:mx-14 mt-6">
          <h2 className="text-primary">
            Generate Free Rent Receipts Online
          </h2>
          <p className="text-gray-600 mt-3">
            The rent receipt templates can be generated for free without any
            hassle online. The rent receipts online can be generated in a few
            easy steps. By following the steps mentioned below, you can get your
            own receipt in no time:
            <br />
          </p>
          <p className="text-gray-600 mt-3">
            <b>STEP 1 :</b>Enter necessary information on the following
          </p>
          <ol className="text-gray-600">
            <li>Rent amount paid</li>
            <li>Name of the renter and the rentee</li>
            <li>Time period for which the rent is paid</li>
          </ol>
          <br />
          <p className="text-gray-600">
            <b>STEP 2 :</b> Click on the Print Button to get it signed and stamped by
            the renter
          </p>{' '}
          <br />
          <p className="text-gray-600">
            <b>STEP 3 :</b> Submit the receipt to the HR before the end of the financial
            year to avail tax exemptions.
          </p>{' '}
          <br />
          <p className="text-gray-600">
            Before you go for finalising a template, it is a great idea to check
            rent receipt sample to understand. These samples can help you build
            the right one for both personal and professional use. You can find
            multiple rent receipt samples online.
          </p>
        </div>
      </div>
      </div>

         </div>
        </section>
  )
}
export default RentSlipGenerator
