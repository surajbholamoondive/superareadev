import { useEffect, useState } from 'react'
import Loading from '@/pages/loading'
import { GLOBALLY_COMMON_TEXT } from '@/textV2'
import { formatNumberWithUnit } from '@/utils/utils'
import Slider from '@mui/material/Slider'
import { pieArcLabelClasses, PieChart } from '@mui/x-charts/PieChart'

import BackgroundImage from '../../../assets/NonLoggedUserImages/backgroundImage.svg'
import styles from './emicalculator.module.css'
import Switch from './Switch'

const StickyEmiCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(50000)
  const [interestRate, setInterestRate] = useState(5)
  const [tenure, setTenure] = useState(12)
  const [isYearly, setIsYearly] = useState(true)
  const [showResults, setShowResults] = useState(false)
  const [emi, setEmi] = useState(0)
  const [totalInterest, setTotalInterest] = useState(0)
  const [totalPayment, setTotalPayment] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [calculatedPrincipal, setCalculatedPrincipal] = useState(0)
  const { symbols } = GLOBALLY_COMMON_TEXT
  const [isLoanAmountFocused, setIsLoanAmountFocused] = useState(false)
  const [loanAmountInput, setLoanAmountInput] = useState('50000')

  const [isInterestRateFocused, setIsInterestRateFocused] = useState(false)
  const [interestRateInput, setInterestRateInput] = useState(
    String(interestRate)
  )
  useEffect(() => {
    calculateEMI(true)
  }, [loanAmount, interestRate, tenure, isYearly])

  const MAX_LOAN_AMOUNT = 100000000

  const handleLoanAmountInputChange = (e) => {
    let value = e.target.value
    if (/^\d*$/.test(value)) {
      let numericValue = Number(value)
      if (numericValue > MAX_LOAN_AMOUNT) {
        numericValue = MAX_LOAN_AMOUNT
        value = String(MAX_LOAN_AMOUNT)
      }

      setLoanAmountInput(value)
      setLoanAmount(numericValue)
    }
  }

  const handleLoanAmountInputFocus = () => {
    setIsLoanAmountFocused(true)
  }

  const calculateEMI = (isInitialLoad = false) => {
    const principal = parseFloat(loanAmount)
    const annualRate = parseFloat(interestRate)
    let months = parseFloat(tenure)

    if (isYearly) {
      months = months * 12
    }

    if (!principal || !annualRate || !months) {
      setEmi(0)
      setTotalInterest(0)
      setTotalPayment(0)
      setCalculatedPrincipal(0)
      setIsLoading(false)
      return
    }

    const monthlyRate = annualRate / 12 / 100
    const emiValue =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1)

    const roundedEmi = Math.round(emiValue * 100) / 100
    const totalPayable = roundedEmi * months
    const totalInterestPayable = totalPayable - principal

    const updateValues = () => {
      setEmi(roundedEmi)
      setTotalInterest(Math.round(totalInterestPayable * 100) / 100)
      setTotalPayment(Math.round(totalPayable * 100) / 100)

      setCalculatedPrincipal(principal)
      setIsLoading(false)
      setShowResults(true)
    }

    if (isInitialLoad) {
      updateValues()
    } else {
      setTimeout(updateValues, 1000)
    }
  }

  const loanAmountValueText = (value) => {
    return `${symbols.rupeeSymbol} ${formatNumberWithUnit(value)}`
  }

  const interestRateValueText = (value) => {
    return `${value}%`
  }

  const tenureValueText = (value) => {
    return isYearly ? `${value} Years` : `${value} Months`
  }

  const handleCalculate = () => {
    setIsLoading(true)
    setShowResults(true)
    calculateEMI(false)
  }
  useEffect(() => {
    if (isYearly) {
      setTenure(Math.min(30, Math.max(1, Math.round(tenure / 12))))
    } else {
      setTenure(Math.min(360, Math.max(12, tenure * 12)))
    }
  }, [isYearly])

  const handleInterestRateInputChange = (e) => {
    const value = e.target.value
    if (/^\d*\.?\d*$/.test(value)) {
      setInterestRateInput(value)
    }
  }

  const handleInterestRateBlur = () => {
    setIsInterestRateFocused(false)

    let numericValue = parseFloat(interestRateInput)
    if (isNaN(numericValue)) {
      numericValue = interestRate
    }

    numericValue = Math.min(20, Math.max(5, numericValue))

    setInterestRate(numericValue)
    setInterestRateInput(String(numericValue))
  }

  const numberToWords = (num) => {
    const a = [
      '',
      'One',
      'Two',
      'Three',
      'Four',
      'Five',
      'Six',
      'Seven',
      'Eight',
      'Nine',
      'Ten',
      'Eleven',
      'Twelve',
      'Thirteen',
      'Fourteen',
      'Fifteen',
      'Sixteen',
      'Seventeen',
      'Eighteen',
      'Nineteen',
    ]
    const b = [
      '',
      '',
      'Twenty',
      'Thirty',
      'Forty',
      'Fifty',
      'Sixty',
      'Seventy',
      'Eighty',
      'Ninety',
    ]

    const inWords = (n) => {
      if (n < 20) return a[n]
      if (n < 100)
        return b[Math.floor(n / 10)] + (n % 10 ? ' ' + a[n % 10] : '')
      if (n < 1000)
        return (
          a[Math.floor(n / 100)] +
          ' Hundred' +
          (n % 100 ? ' ' + inWords(n % 100) : '')
        )
      if (n < 100000)
        return (
          inWords(Math.floor(n / 1000)) +
          ' Thousand' +
          (n % 1000 ? ' ' + inWords(n % 1000) : '')
        )
      if (n < 10000000)
        return (
          inWords(Math.floor(n / 100000)) +
          ' Lakh' +
          (n % 100000 ? ' ' + inWords(n % 100000) : '')
        )
      return (
        inWords(Math.floor(n / 10000000)) +
        ' Crore' +
        (n % 10000000 ? ' ' + inWords(n % 10000000) : '')
      )
    }

    if (num === 0) return 'Zero Rupees'
    return inWords(num) + ' Rupees'
  }

  return (
    <section
      style={{
        backgroundImage: `url(${BackgroundImage.src})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
      }}
      className="flex flex-col justify-center items-center"
    >
      <div className="custom-section w-[93%] lg:w-[93%] ">
        <div className="border-0 md:border-2 md:border-primary rounded-md lg:p-6 p-4">
          <h1 className="text-center text-primary font-thin whitespace-nowrap  mb-10">
            <span className="text-primary text-[2.5rem] font-black">EMI</span>{" "}
            <span className="text-[2.5rem]">Calculator</span>
          </h1>

          <div
            className="flex flex-col justify-center items-center lg:flex-row lg:items-center gap-0 sm:gap-2 lg:gap-[5rem] my-3 
"
          >
            <div className="w-full lg:w-[40%]">
              <div className="flex flex-col sm:flex-row justify-between px-1 gap-x-5 items-start sm:items-center py-2">
                <h4 className="text-sm sm:text-base">
                  Loan Amount ({symbols.rupeeSymbol})
                </h4>
                <div className="flex flex-col justify-between items-start md:items-end w-[80%]">
                  <input
                    type="text"
                    value={
                      isLoanAmountFocused
                        ? loanAmountInput
                        : formatNumberWithUnit(parseInt(loanAmountInput) || 0)
                    }
                    onChange={handleLoanAmountInputChange}
                    onFocus={handleLoanAmountInputFocus}
                    onBlur={() => {
                      setIsLoanAmountFocused(false)
                      if (!loanAmountInput) {
                        setLoanAmountInput(String(loanAmount))
                      }
                    }}
                    className="outline-none bg-Mscorebg text-center text-primary text-lg font-black rounded-3xl py-1 w-fit mt-1 sm:mt-0"
                  />
                  <span className="text-sm text-gray-600 mt-1 h-[2rem]">
                    {loanAmountInput &&
                      numberToWords(parseInt(loanAmountInput) || 0)}
                  </span>
                </div>
              </div>
              <div className="px-2">
                <Slider
                  aria-label="Loan Amount"
                  value={loanAmount}
                  onChange={(e, newValue) => {
                    setLoanAmount(newValue)
                    setLoanAmountInput(String(newValue))
                  }}
                  getAriaValueText={loanAmountValueText}
                  valueLabelDisplay="auto"
                  valueLabelFormat={loanAmountValueText}
                  step={50000}
                  marks
                  min={50000}
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
              <div className="flex flex-col sm:flex-row justify-between px-1 gap-x-6 items-start sm:items-center py-2">
                <h4 className="text-sm sm:text-base">Interest Rate (%)</h4>
                <input
                  type="text"
                  value={
                    isInterestRateFocused
                      ? interestRateInput
                      : `${interestRate}%`
                  }
                  onChange={handleInterestRateInputChange}
                  onFocus={() => setIsInterestRateFocused(true)}
                  onBlur={handleInterestRateBlur}
                  className="outline-none bg-Mscorebg text-center text-primary text-lg font-black rounded-3xl py-1 w-20 mt-1 sm:mt-0"
                />
              </div>
              <div className="px-2">
                <Slider
                  aria-label="Interest Rate"
                  value={interestRate}
                  onChange={(e, newValue) => {
                    setInterestRate(newValue)
                    setInterestRateInput(String(newValue))
                  }}
                  getAriaValueText={interestRateValueText}
                  valueLabelDisplay="auto"
                  valueLabelFormat={interestRateValueText}
                  step={0.25}
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
              <div className="flex flex-col sm:flex-row  justify-between px-1 gap-x-14 items-start sm:items-center py-2">
                <h4 className="text-sm sm:text-base">Loan Tenure</h4>
                <div className="flex gap-x-4 mt-1 sm:mt-0">
                  <input
                    type="text"
                    value={isYearly ? `${tenure} Years` : `${tenure} Months`}
                    readOnly
                    className="outline-none bg-Mscorebg text-center text-primary text-lg font-black rounded-3xl py-1 w-[70%]"
                  />
                  <Switch isYearly={isYearly} setIsYearly={setIsYearly} />
                </div>
              </div>
              <div className="px-2">
                <Slider
                  aria-label="Tenure"
                  value={tenure}
                  onChange={(e, newValue) => setTenure(newValue)}
                  getAriaValueText={tenureValueText}
                  valueLabelDisplay="auto"
                  valueLabelFormat={tenureValueText}
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
              <div className="flex justify-center sm:justify-center px-2 mt-4">
                <button
                  className="border-2 border-primary rounded-3xl px-5 py-2 text-xl text-primary hover:bg-primary hover:text-white w-full"
                  onClick={handleCalculate}
                >
                  Calculate
                </button>
              </div>
            </div>
            <div className="w-full lg:w-[40%] flex items-center justify-center max-lg:mt-8">
              {showResults && (
                <>
                  {isLoading ? (
                    <div className="mt-6 w-full sm:w-[85%] flex justify-center">
                      <Loading />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center mt-4">
                      <div
                        className={`${styles.chartWrapper} relative flex justify-center items-center w-full m-auto`}
                      >
                        <PieChart
                          series={[
                            {
                              data: [
                                {
                                  id: 0,
                                  value: calculatedPrincipal,
                                  // label: 'Principal',
                                  color: '#D9D9D9',
                                },
                                {
                                  id: 1,
                                  value: parseFloat(totalInterest),
                                  // label: 'Interest',
                                  color: '#931602',
                                },
                              ],
                              innerRadius: window.innerWidth < 640 ? 60 : 160,
                              outerRadius: window.innerWidth < 640 ? 100 : 120,
                              paddingAngle: 2,
                              cornerRadius: 5,
                              arcLabel: (params) => {
                                const total =
                                  calculatedPrincipal +
                                  parseFloat(totalInterest)
                                const percent = params.value / total
                                return `${(percent * 100).toFixed(0)}%`
                              },
                            },
                          ]}
                          sx={{
                            [`& .${pieArcLabelClasses.root}`]: {
                              fill: 'white',
                              fontSize: 15,
                            },
                          }}
                          margin={{ top: 20, bottom: 20, left: 20, right: 20 }}
                        ></PieChart>
                      </div>
                      <div className="absolute text-center -translate-y-10">
                        <div className="flex flex-col items-start space-y-2">
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
                      <div className="flex flex-col w-fit text-left max-md:m-auto ml-10  ">
                        <div className="min-h-20 sm:min-h-28 rounded-md flex gap-x-4 items-center p-1">
                          <h3 className="text-sm sm:text-base">EMI/month :</h3>
                          <h3 className="font-bold text-primary text-sm sm:text-base">
                            {symbols.rupeeSymbol} {parseFloat(emi)}
                          </h3>
                        </div>
                        <div>
                          <div className="min-h-20 sm:min-h-28 rounded-md flex gap-x-4 items-center p-1">
                            <h3 className="text-sm sm:text-base">
                              Total interest payable :
                            </h3>
                            <h3 className="text-primary font-bold text-sm sm:text-base">
                              {symbols.rupeeSymbol} {parseFloat(totalInterest)}
                            </h3>
                          </div>
                          <div className="min-h-20 sm:min-h-28 rounded-md flex flex-nowrap gap-x-2 items-center p-1 overflow-x-auto">
                            <h3 className="text-sm sm:text-base whitespace-nowrap">
                              Total (Principal + Interest) :
                            </h3>
                            <h3 className="font-bold text-primary text-sm sm:text-base whitespace-nowrap">
                              {symbols.rupeeSymbol} {parseFloat(totalPayment)}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StickyEmiCalculator
