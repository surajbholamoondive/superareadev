import { useState } from 'react'
import jsPDF from 'jspdf'
import { toast } from 'react-toastify'

const ReceiptGenerator = ({
  setFormData,
  formData,
  setLoading,
  loading,
  handleClick,
}) => {
  const [ischecked, setChecked] = useState(false)

  const generateRentReceipt = () => {
    const requiredFields = [
      { key: 'rentedAmount', value: 'Rented Amount' },
      { key: 'rentedAddress', value: 'Address' },
      { key: 'LandlordName', value: 'Landlord Name' },
      { key: 'startDate', value: 'Start Date' },
      { key: 'endDate', value: 'End Date' },
      { key: 'tenantName', value: 'Tenant Name' },
      { key: 'tenantMobile', value: 'Tenant Mobile Number' },
      { key: 'emailAddress', value: 'Email Address' },
    ]

    const missingFields = requiredFields.filter((field) => !formData[field.key])

    if (missingFields.length > 0) {
      toast.error(`Please fill in the following required fields`)
      return
    }

    if (!ischecked) {
      toast.error(
        'Please agree to SuperArea T&C, Privacy Policy & Cookie Policy'
      )
      return
    }
    setLoading(true)
    handleClick()
  }

  function handleCheck(e) {
    setChecked(e.target.checked)
  }

  function checkForLetters(val) {
    const isLettersOnly = /^[A-Za-z\s]+$/.test(val)
    return isLettersOnly
  }

  function checkForNumbers(val) {
    const isNumbersOnly = /^[0-9]+$/.test(val)
    return isNumbersOnly
  }

  function handleRentAmountChange(e) {
    if (checkForNumbers(e.target.value)) {
      setFormData({ ...formData, rentedAmount: e.target.value })
    } else {
      setFormData({ ...formData, rentedAmount: '' })
    }
  }
  function handleAddressChange(e) {
    setFormData({ ...formData, rentedAddress: e.target.value })
  }
  function handleLandordNameChange(e) {
    if (checkForLetters(e.target.value) || e.target.value.trim() === '') {
      setFormData({ ...formData, LandlordName: e.target.value })
    } else {
      setFormData({ ...formData, LandlordName: '' })
    }
  }
  function handleTenantNameChange(e) {
    if (checkForLetters(e.target.value) || e.target.value.trim() === '') {
      setFormData({ ...formData, tenantName: e.target.value })
    } else {
      setFormData({ ...formData, tenantName: '' })
    }
  }
  function handleTenantMobileChange(e) {
    if (checkForNumbers(e.target.value)) {
      setFormData({ ...formData, tenantMobile: e.target.value })
    } else {
      setFormData({ ...formData, tenantMobile: '' })
    }
  }
  const generateRentSlipPDF = (formData) => {
    const doc = new jsPDF()
    doc.setFontSize(12)

    doc.text(`HOUSE RENT RECEIPT (${formData?.startDate})`, 10, 50)
    doc.text('Generated on SuperArea.ai', 150, 50)

    doc.text(`Received a sum of Rs. ${formData?.rentedAmount}`, 10, 70)
    doc.text(
      `from Mr./Mrs ${formData?.tenantName} towards the rent of property situated`,
      10,
      80
    )
    doc.text(`At(Address) ${formData?.rentedAddress}`, 10, 90)
    doc.text(
      `For the period ${formData?.startDate} to ${formData?.endDate}`,
      10,
      100
    )

    doc.rect(10, 130, 40, 40)
    doc.text('Paste \n Rs 1 stamp \n here', 15, 150)

    doc.text('DATE: _________', 10, 190)
    doc.text('Signature (landlord)', 120, 190)
    doc.text('Name _____________', 10, 200)
    doc.text('PAN ______________', 120, 200)

    doc.save(`RentSlip_${formData?.startDate}.pdf`)
  }

  const downloadReceiptPDF = () => {
    if (!loading) {
      toast.error('Please generate the rent receipt first.')
      return
    }
    generateRentSlipPDF(formData)
  }

  return (
    <div className="flex justify-center items-center bg-transparent">
      <section
        className="w-full mx-2 sm:mx-4 my-8 md:border md:border-primary rounded-lg bg-white md:px-8 md:py-8"
        style={{ boxShadow: 'none' }}
      >
        <div className="flex flex-col items-center">
          <h2 className="text-primary text-2xl sm:text-3xl font-semibold mb-2 text-center">
            <span className="font-bold text-2xl">Rent Receipts</span>{' '}
            <span className="font-normal text-2xl">Generator</span>
          </h2>
        </div>
        <form
          className="w-full mt-8"
          onSubmit={(e) => {
            e.preventDefault()
            generateRentReceipt()
          }}
        >
          <div>
            <h3 className="text-primary font-semibold text-lg mb-2">
              Rental Details
            </h3>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mb-2">
              <div className="flex flex-col">
                <label
                  htmlFor="rentedAmount"
                  className="text-primary font-medium mb-1"
                >
                  Rental Amount <span className="text-primary">*</span>
                </label>
                <input
                  id="rentedAmount"
                  className="border border-primary rounded-md px-3 py-2 focus:outline-none transition text-gray-600"
                  placeholder="Rent Amount"
                  value={formData?.rentedAmount}
                  onChange={handleRentAmountChange}
                  autoComplete="off"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="rentedAddress"
                  className="text-primary font-medium mb-1"
                >
                  Rented Property Address <span className="text-primary">*</span>
                </label>
                <input
                  id="rentedAddress"
                  className="border border-primary rounded-md px-3 py-2 focus:outline-none transition text-gray-600"
                  placeholder="Rented Property Address"
                  value={formData?.rentedAddress}
                  onChange={handleAddressChange}
                  autoComplete="off"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="LandlordName"
                  className="text-primary font-medium mb-1"
                >
                  Landlord name <span className="text-primary">*</span>
                </label>
                <input
                  id="LandlordName"
                  className="border border-primary rounded-md px-3 py-2 focus:outline-none transition text-gray-600"
                  placeholder="Landlord name"
                  value={formData?.LandlordName}
                  onChange={handleLandordNameChange}
                  autoComplete="off"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="landlordPan"
                  className="text-primary font-medium mb-1"
                >
                  Landlord PAN
                </label>
                <input
                  id="landlordPan"
                  className="border border-primary rounded-md px-3 py-2 focus:outline-none transition text-gray-600"
                  placeholder="Landlord PAN (Optional)"
                  value={formData?.landlordPan}
                  onChange={(e) =>
                    setFormData({ ...formData, landlordPan: e.target.value })
                  }
                  autoComplete="off"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="startDate"
                  className="text-primary font-medium mb-1"
                >
                  Start Date <span className="text-primary">*</span>
                </label>
                <input
                  id="startDate"
                  type="date"
                  className="border border-primary rounded-md px-3 py-2 focus:outline-none transition text-gray-600"
                  value={formData?.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="endDate"
                  className="text-primary font-medium mb-1"
                >
                  End Date <span className="text-primary">*</span>
                </label>
                <input
                  id="endDate"
                  type="date"
                  className="border border-primary rounded-md px-3 py-2 focus:outline-none transition text-gray-600"
                  value={formData?.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* Tenant Details */}
          <div className="mt-6">
            <h3 className="text-primary font-semibold text-lg mb-2">
              Tenant Details
            </h3>
           <div className="grid md:grid-cols-3 grid-cols-2 gap-4 mb-2">
  {/* Tenant Name */}
  <div className="flex flex-col">
    <label
      htmlFor="tenantName"
      className="text-primary font-medium mb-1"
    >
      Tenant name <span className="text-primary">*</span>
    </label>
    <input
      id="tenantName"
      className="border border-primary rounded-md px-3 py-2 focus:outline-none transition text-gray-600"
      placeholder="Tenant name"
      value={formData?.tenantName}
      onChange={handleTenantNameChange}
      autoComplete="off"
    />
  </div>

  {/* Tenant Mobile */}
  <div className="flex flex-col">
    <label
      htmlFor="tenantMobile"
      className="text-primary font-medium mb-1"
    >
      Tenant Mobile. <span className="text-primary">*</span>
    </label>
    <input
      id="tenantMobile"
      className="border border-primary rounded-md px-3 py-2 focus:outline-none transition text-gray-600"
      placeholder="Tenant Mobile Number"
      value={formData?.tenantMobile}
      onChange={handleTenantMobileChange}
      autoComplete="off"
    />
  </div>

  {/* Email Address */}
  <div className="flex flex-col">
    <label
      htmlFor="emailAddress"
      className="text-primary font-medium mb-1"
    >
      Email to receive receipt PDF <span className="text-primary">*</span>
    </label>
    <input
      id="emailAddress"
      className="border border-primary rounded-md px-3 py-2 focus:outline-none transition text-gray-600"
      placeholder="Email to receive receipt PDF"
      value={formData?.emailAddress}
      onChange={(e) =>
        setFormData({ ...formData, emailAddress: e.target.value })
      }
      autoComplete="off"
    />
  </div>
</div>

          </div>


          <div className="flex flex-col items-center mt-4">
            <div className="flex items-center mb-4">
              <input
                className="h-4 w-4 accent-primary border-primary mr-2"
                type="checkbox"
                onChange={handleCheck}
                checked={ischecked}
                id="agree"
              />
              <label htmlFor="agree" className="text-sm my-5 text-gray-600">
                I agree to SuperArea <b>T&C</b>, <b>Privacy Policy</b> &{' '}
                <b>Cookie Policy</b>
              </label>
            </div>
            <div className="flex flex-row gap-10 w-full justify-center max-sm:flex-col max-sm:gap-2">
              <button
                type="submit"
                className="border border-primary text-primary px-8 py-2 rounded-full font-medium hover:bg-primary hover:text-white transition w-[180px] max-sm:w-full"
              >
                Generate
              </button>
              <button
                type="button"
                className="border border-primary text-primary px-8 py-2 rounded-full font-medium hover:bg-primary hover:text-white transition w-[220px] max-sm:w-full"
                onClick={downloadReceiptPDF}
              >
                Download Rent Slip
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  )
}

export default ReceiptGenerator
