import React from 'react'
import { pdfjs } from 'react-pdf'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
const MDContentSection = ({ title, children, inlineStyle }) => {
  const { textColor, fontWeight } = inlineStyle || {}
  

  const titleStyle = {
    color: textColor,
    letterSpacing: 'wide',
    fontWeight: fontWeight,
  }

  return (
    <div className="px-3 md:px-7 mt-7 max-w-[1400px] m-auto">
    <div className="bg-white px-2 py-3 rounded-3xl border-2  shadow-sm">
        <h3 style={titleStyle} className='p-2'>{title}</h3>
        <div className='py-2' >
          {children}
        </div>
      </div>
    </div>
  )
}

export default MDContentSection