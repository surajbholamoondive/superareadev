import React from 'react'
import useWindowWidth from '@/context/useWindowWidth'
export default function RentPayment() {
  const windowWidth = useWindowWidth()
  return (
    <div>
      <div className="flex justify-center">
        <div className={`mt-8 m-5 ${windowWidth > 1024 ? `w-[900px]` : `w-[100%]`}`}>Coming Soon</div>
      </div>
    </div>
  )
}
