import { useEffect, useState } from 'react'
import Loading from '@/pages/loading'
import { GLOBALLY_COMMON_TEXT } from '@/textV2'
import { formatNumberWithUnit } from '@/utils/utils'
import Slider from '@mui/material/Slider'
import { pieArcLabelClasses, PieChart } from '@mui/x-charts/PieChart'

import Switch from './switch'

const { rupeeSymbol } = GLOBALLY_COMMON_TEXT.symbols
const {
  calculateEmiText,
  interestRateInputText,
  emiCalculatorText,
  loanAmountText,
  interestRateText,
  loanTenureText,
  totalInterestPayableText,
  totalPaymentsText,
  principalInterestText,
  emiPerMonthText,
  breakUpOfTotalPaymentText,
  yearsText,
  monthsText,
  loanAmountInputText,
  principalText,
  interestText,
} = GLOBALLY_COMMON_TEXT.text

const StickyEmiCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(500000)
  const [loanAmountInput, setLoanAmountInput] = useState('500000')
  const [isLoanAmountFocused, setIsLoanAmountFocused] = useState(false)
  const [interestRate, setInterestRate] = useState(5)
  const [tenure, setTenure] = useState(12)
  const [isYearly, setIsYearly] = useState(true)
  const [showResults, setShowResults] = useState(false)
  const [emi, setEmi] = useState(0)
  const [totalInterest, setTotalInterest] = useState(0)
  const [totalPayment, setTotalPayment] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [calculatedPrincipal, setCalculatedPrincipal] = useState(0)

  const handleLoanAmountInputChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '')
    setLoanAmountInput(value)

    const numericValue = parseInt(value) || 0
    if (numericValue >= 500000 && numericValue <= 100000000) {
      setLoanAmount(numericValue)
    }
  }
  useEffect(() => {
    setTenure(1)
  }, [isYearly])

  const handleLoanAmountInputBlur = () => {
    const numericValue = parseInt(loanAmountInput) || 500000

    setLoanAmount(numericValue)
    setLoanAmountInput(numericValue.toString())
    setIsLoanAmountFocused(false)
  }

  const handleLoanAmountSliderChange = (e, newValue) => {
    setLoanAmount(newValue)
    setLoanAmountInput(newValue.toString())
  }

  const handleLoanAmountInputFocus = () => {
    setIsLoanAmountFocused(true)
  }

  const calculateEMI = () => {
    setIsLoading(true)
    setShowResults(true)

    const principal = parseFloat(loanAmount)
    const annualRate = parseFloat(interestRate)
    let months = parseFloat(tenure)

    if (isYearly) {
      months = months * 12
    }

    if (!principal || !annualRate || !months) {
      setIsLoading(false)
      setShowResults(false)
      return
    }

    const monthlyRate = annualRate / 12 / 100
    const emiValue =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1)
    const totalPayable = emiValue * months
    const totalInterestPayable = totalPayable - principal

    setTimeout(() => {
      setEmi(emiValue.toFixed(2))
      setTotalInterest(totalInterestPayable.toFixed(2))
      setTotalPayment(totalPayable.toFixed(2))
      setCalculatedPrincipal(principal)
      setIsLoading(false)
    }, 1000)
  }

  const loanAmountValueText = (value) => {
    return `${rupeeSymbol}${formatNumberWithUnit(value)}`
  }

  const interestRateValueText = (value) => {
    return `${value}%`
  }

  const tenureValueText = (value) => {
    return isYearly ? `${value} ${yearsText}` : `${value} ${monthsText}`
  }

  return (
    <div className=" px-0 md:px-3 lg:px-0 py-6  bg-red w-full max-w-md mt-4 flex flex-col justify-center items-center rounded-3xl border-2 shadow-sm">
      <h2 className="mb-4 text-primary">{emiCalculatorText}</h2>
      <div className="flex justify-between px-1 gap-x-2 md:gap-x-2 items-center py-2 text-primary">
        <p>{loanAmountText}</p>
        <div className="relative">
          <span className="absolute left-3 md:left-5 top-1/2 transform -translate-y-1/2 text-primary text-sm">
            {rupeeSymbol}
          </span>
          <input
            type="text"
            value={
              isLoanAmountFocused
                ? loanAmountInput
                : formatNumberWithUnit(parseInt(loanAmountInput) || 0)
            }
            onChange={handleLoanAmountInputChange}
            onFocus={handleLoanAmountInputFocus}
            onBlur={handleLoanAmountInputBlur}
            placeholder={loanAmountInputText}
            className="outline-none bg-Mscorebg py-1 rounded-3xl pl-7 sm:pl-10 md:pl-10  pr-1 w-24 lg:w-36 "
          />
        </div>
      </div>
      <div className="w-[65%] ">
        <Slider
          aria-label={loanAmountInputText}
          value={loanAmount}
          onChange={handleLoanAmountSliderChange}
          getAriaValueText={loanAmountValueText}
          valueLabelDisplay="auto"
          color="#931602"
          valueLabelFormat={loanAmountValueText}
          step={500000}
          marks
          min={500000}
          max={100000000}
          sx={{
            color: 'var(--secondary-color)',
            '& .MuiSlider-thumb': {
              backgroundColor: 'var(--secondary-color)',
            },
            '& .MuiSlider-track': {
              backgroundColor: 'var(--secondary-color)',
            },
          }}
        />
      </div>
      <div className="flex justify-between px-1 gap-x-2 lg:gap-x-6 items-center py-2">
        <p>{interestRateText}</p>
        <input
          type="text"
          value={`${interestRate}%`}
          readOnly
          className="outline-none  bg-Mscorebg py-1 rounded-3xl  pl-7 sm:pl-10 md:pl-10 text-primary pr-1 w-24 lg:w-36 "
        />
      </div>
      <div className="w-[65%]">
        <Slider
          aria-label={interestRateInputText}
          value={interestRate}
          onChange={(e, newValue) => setInterestRate(newValue)}
          getAriaValueText={interestRateValueText}
          valueLabelDisplay="auto"
          valueLabelFormat={interestRateValueText}
          step={0.25}
          color="#931602"
          marks
          min={5}
          max={20}
          sx={{
            color: 'var(--secondary-color)',
            '& .MuiSlider-thumb': {
              backgroundColor: 'var(--secondary-color)',
            },
            '& .MuiSlider-track': {
              backgroundColor: 'var(--secondary-color)',
            },
          }}
        />
      </div>
      <div className="flex justify-between px-1  items-center py-2 text-primary">
        <p className="pr-1">{loanTenureText}</p>
        <div className="flex gap-x-4 ">
          <input
            type="text"
            value={isYearly ? `${tenure} Years` : `${tenure} Months`}
            readOnly
            className="outline-none  bg-Mscorebg py-1 rounded-3xl pl-1 md:pl-4 w-16 md:w-20 lg:w-24"
          />
          <Switch isYearly={isYearly} setIsYearly={setIsYearly} />
        </div>
      </div>
      <div className="w-[65%]">
        <Slider
          aria-label="Tenure"
          value={tenure}
          onChange={(e, newValue) => setTenure(newValue)}
          getAriaValueText={tenureValueText}
          valueLabelDisplay="auto"
          valueLabelFormat={tenureValueText}
          color="#931602"
          step={isYearly ? 1 : 6}
          marks
          min={isYearly ? 1 : 12}
          max={isYearly ? 30 : 360}
          sx={{
            color: 'var(--secondary-color)',
            '& .MuiSlider-thumb': {
              backgroundColor: 'var(--secondary-color)',
            },
            '& .MuiSlider-track': {
              backgroundColor: 'var(--secondary-color)',
            },
          }}
        />
      </div>
      <button className="primary-button w-[85%] mt-4" onClick={calculateEMI}>
        {calculateEmiText}
      </button>

      {showResults && (
        <>
          {isLoading ? (
            <div className="mt-6 w-[85%] flex justify-center">
              <Loading />
            </div>
          ) : (
            <>
              <div className="bg-lightBg border border-gray-300 p-4 mt-6 mb-2 rounded-md flex justify-between w-[85%]">
                <h4 className="text-primary">{emiPerMonthText}</h4>
                <h4 className="font-bold text-primary">
                  {rupeeSymbol} {formatNumberWithUnit(parseFloat(emi))}
                </h4>
              </div>
              <div className="flex w-[85%] gap-x-2">
                <div className="bg-lightBg border border-gray-300 min-h-28 w-1/2 rounded-md flex flex-col justify-center items-center gap-y-2 p-1">
                  <h4 className="text-center text-primary">
                    {totalInterestPayableText}
                  </h4>
                  <h4 className="text-center font-bold text-primary">
                    {rupeeSymbol}{' '}
                    {formatNumberWithUnit(parseFloat(totalInterest))}
                  </h4>
                </div>
                <div className="bg-lightBg border border-gray-300 min-h-28 w-1/2 rounded-md flex flex-col justify-center items-center p-1">
                  <h4 className="text-center text-primary">
                    {totalPaymentsText}
                  </h4>
                  <p className="text-center text-primary">
                    ({principalInterestText})
                  </p>
                  <h4 className="text-center font-bold text-primary">
                    {rupeeSymbol}{' '}
                    {formatNumberWithUnit(parseFloat(totalPayment))}
                  </h4>
                </div>
              </div>
              <div className="mt-4 w-[85%]">
                <h4 className="text-center mb-2 text-primary">
                  {breakUpOfTotalPaymentText}
                </h4>

                <div className="flex flex-col items-center justify-center mt-4 ">
                  {/* Make the chart container relative so we can position elements inside it */}
                  <div className="relative w-full flex justify-center overflow-x-auto">
                    <PieChart
                      series={[
                        {
                          data: [
                            {
                              id: 0,
                              value: calculatedPrincipal,
                              color: '#D9D9D9',
                            },
                            {
                              id: 1,
                              value: parseFloat(totalInterest),
                              color: '#931602',
                            },
                          ],
                          innerRadius: 195,
                          outerRadius: 240,
                          paddingAngle: 2,
                          cornerRadius: 5,
                          arcLabel: (params) => {
                            const total =
                              calculatedPrincipal + parseFloat(totalInterest)
                            const percent = params.value / total
                            return `${(percent * 100).toFixed(0)}%`
                          },
                        },
                      ]}
                      sx={{
                        [`& .${pieArcLabelClasses.root}`]: {
                          fill: 'white',
                          fontSize: 20,
                        },
                      }}
                      margin={{ top: 20, bottom: 20, left: 20, right: 20 }}
                      width={620}
                      height={300}
                    />

                    {/* Center Legend Inside Pie */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center ">
                      <div className="flex flex-col items-center space-y-1">
                        <div className="flex items-center space-x-2">
                          <span
                            className="w-3 h-3 rounded-full inline-block"
                            style={{ backgroundColor: '#D9D9D9' }}
                          ></span>
                          <span className="text-gray-700 text-sm">
                            Principal
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <span
                            className="w-3 h-3 rounded-full inline-block"
                            style={{ backgroundColor: '#931602' }}
                          ></span>
                          <span className="text-gray-700 text-sm">
                            Interest
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default StickyEmiCalculator
