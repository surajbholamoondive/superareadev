import React, { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Download, RotateCw } from 'lucide-react'
import { Document, Page, pdfjs } from 'react-pdf'

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

const PriceList = ({ paymentSlipDocuments = [] }) => {
  const [currentDocIndex, setCurrentDocIndex] = useState(0)
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [containerWidth, setContainerWidth] = useState(800)

  useEffect(() => {
    const updateWidth = () => {
      if (typeof window !== 'undefined') {
        setContainerWidth(Math.min(window.innerWidth * 0.65, 900))
      }
    }

    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])
  const currentDocument = paymentSlipDocuments[currentDocIndex]
  // Reset loading state when document changes
  useEffect(() => {
    if (currentDocument?.url) {
      setLoading(true)
      setError(null)
    }
  }, [currentDocIndex, currentDocument?.url])

  // Helper function to determine file type
  const getFileType = (url) => {
    if (!url) return 'unknown'
    const extension = url.toLowerCase().split('.').pop()
    if (['pdf'].includes(extension)) return 'pdf'
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension))
      return 'image'
    return 'unknown'
  }
  const currentFileType = getFileType(currentDocument?.url)
  if (!paymentSlipDocuments || paymentSlipDocuments.length === 0) {
    return null
  }

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
    setPageNumber(1)
    setLoading(false)
    setError(null)
  }

  const onDocumentLoadError = (error) => {
    setLoading(false)
    setError('Failed to load PDF document')
    console.error('PDF loading error:', error)
  }

  const onImageLoad = () => {
    setLoading(false)
    setError(null)
    setNumPages(1) // Images have only 1 "page"
    setPageNumber(1)
  }

  const onImageError = () => {
    setLoading(false)
    setError('Failed to load image')
  }

  const goToPrevPage = () => {
    setPageNumber((prev) => Math.max(1, prev - 1))
  }

  const goToNextPage = () => {
    setPageNumber((prev) => Math.min(numPages, prev + 1))
  }

  const rotate = () => {
    setRotation((prev) => (prev + 90) % 360)
  }

  const downloadFile = () => {
    const link = document.createElement('a')
    link.href = currentDocument.url
    link.download =
      currentDocument.name ||
      `price-list.${currentFileType === 'pdf' ? 'pdf' : 'jpg'}`
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const switchDocument = (index) => {
    if (index !== currentDocIndex) {
      setCurrentDocIndex(index)
      setPageNumber(1)
      setRotation(0)
      setLoading(true)
      setError(null)
      setNumPages(null)
    }
  }

  // responsive updates only
  const renderContent = () => {
    if (currentFileType === 'image') {
      return (
        <div className="flex justify-center items-center bg-gray-100 min-h-[40vh] md:min-h-[500px] max-h-[80vh] p-2 md:p-4 overflow-hidden">
          <div className="w-full flex justify-center">
            <img
              src={currentDocument?.url}
              alt={currentDocument?.name || 'Price List Image'}
              onLoad={onImageLoad}
              onError={onImageError}
              className="shadow-lg max-h-[75vh] max-w-full object-contain"
              style={{
                transform: `rotate(${rotation}deg)`,
                display: loading ? 'none' : 'block',
              }}
            />
            {loading && (
              <div className="flex items-center justify-center min-h-[40vh] md:min-h-[500px]">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-newBackground mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading Image...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )
    }

    if (currentFileType === 'pdf') {
      return (
        <div className="flex justify-center items-center bg-gray-100 p-2 sm:p-4 overflow-hidden">
          <div
            className="flex justify-center items-center overflow-hidden"
            style={{
              height: '400px', // Fixed height like in SitePlan
              maxHeight: '500px',
            }}
          >
            {loading && (
              <div className="flex items-center justify-center h-[400px]">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-newBackground mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading PDF...</p>
                </div>
              </div>
            )}
            <Document
              file={currentDocument?.url}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading=""
              error=""
            >
              <Page
                key={`page_${currentDocIndex}_${pageNumber}_${rotation}`}
                pageNumber={pageNumber}
                height={400} // Use height instead of width - this is the key fix!
                rotate={rotation}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="shadow-lg"
                style={{ display: loading ? 'none' : 'block' }}
              />
            </Document>
          </div>
        </div>
      )
    }

    return (
      <div className="flex items-center justify-center min-h-[40vh] md:min-h-[500px]">
        <div className="text-center">
          <p className="text-red-600 mb-4">Unsupported file type</p>
          <button
            onClick={downloadFile}
            className="px-4 py-2 bg-newBackground text-white rounded hover:bg-newBackground transition-colors"
          >
            Download File
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-white rounded-lg shadow-md overflow-hidden">
      {/* Controls */}
      <div className="bg-gray-50 p-3 border-b">
        {/* Document Switcher - Always at top if multiple documents */}
        {paymentSlipDocuments.length > 1 && (
          <div className="flex justify-center mb-3">
            <div className="flex gap-2 flex-wrap">
              {paymentSlipDocuments.map((doc, index) => (
                <button
                  key={index}
                  onClick={() => switchDocument(index)}
                  className={`px-4 py-1.5 text-md rounded-2xl transition-colors ${
                    index === currentDocIndex
                      ? 'bg-newBackground text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Doc {index + 1}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Fixed height controls container to prevent flickering */}
        <div className="flex flex-wrap items-center justify-between gap-2 min-h-[40px]">
          <div className="flex items-center gap-2">
            {currentFileType === 'pdf' && (
              <>
                <button
                  onClick={goToPrevPage}
                  disabled={pageNumber <= 1}
                  className="p-2 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Previous Page"
                >
                  <ChevronLeft size={18} />
                </button>

                <span className="text-sm font-medium px-2">
                  Page {pageNumber} of {numPages || '?'}
                </span>

                <button
                  onClick={goToNextPage}
                  disabled={pageNumber >= numPages}
                  className="p-2 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Next Page"
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={rotate}
              className="p-2 rounded hover:bg-gray-200"
              title="Rotate"
            >
              <RotateCw size={16} />
            </button>

            <button
              onClick={downloadFile}
              className="p-2 rounded hover:bg-gray-200 ml-1"
              title="Download File"
            >
              <Download size={16} />
            </button>
          </div>
        </div>
      </div>
      {/* File Viewer */}
      <div className="relative bg-gray-100">
        {error && (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={downloadFile}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Download File
              </button>
            </div>
          </div>
        )}

        {!error && renderContent()}
      </div>
    </div>
  )
}

export default PriceList
