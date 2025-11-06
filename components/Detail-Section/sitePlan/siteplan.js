import React, { useEffect, useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Download,
  RotateCw,
} from 'lucide-react'
import { Document, Page, pdfjs } from 'react-pdf'

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

const SitePlan = ({ sitePlanDocuments = [] }) => {
  const [currentDocIndex, setCurrentDocIndex] = useState(0)
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
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
  const currentDocument = sitePlanDocuments[currentDocIndex]
  useEffect(() => {
    if (currentDocument?.url) {
      setLoading(true)
      setError(null)
    }
  }, [currentDocIndex, currentDocument?.url])

  if (!sitePlanDocuments || sitePlanDocuments.length === 0) {
    return null
  }

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

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const downloadFile = () => {
    const link = document.createElement('a')
    link.href = currentDocument.url
    link.download =
      currentDocument.name ||
      `site-plan.${currentFileType === 'pdf' ? 'pdf' : 'jpg'}`
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

const renderPDFContent = () => (
  <div className="relative bg-gray-100">
    {error && (
      <div className="flex items-center justify-center h-64 sm:h-80 md:h-96">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={downloadFile}
            className="px-3 sm:px-4 py-2 bg-newBackground text-white rounded hover:bg-newBackground transition-colors text-sm sm:text-base"
          >
            Download File
          </button>
        </div>
      </div>
    )}

    {!error && (
      <div
        className={`flex justify-center items-center p-2 sm:p-4 overflow-hidden h-[350px] sm:h-[500px] md:h-[600px]`}
      >
        <div className="w-full flex justify-center">
          {currentFileType === 'image' ? (
            <>
              {loading && (
                <div className="flex items-center justify-center h-[300px] sm:h-[400px] md:h-[500px]">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-newBackground mx-auto mb-4"></div>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Loading Image...
                    </p>
                  </div>
                </div>
              )}
              <img
                src={currentDocument?.url}
                alt={currentDocument?.name || 'Price List Image'}
                onLoad={onImageLoad}
                onError={onImageError}
                className={`shadow-lg object-contain max-w-full max-h-[300px] sm:max-h-[450px] md:max-h-[550px]`}
                style={{
                  transform: `rotate(${rotation}deg)`,
                  display: loading ? 'none' : 'block',
                }}
              />
            </>
          ) : currentFileType === 'pdf' ? (
            <>
              {loading && (
                <div className="flex items-center justify-center h-[300px] sm:h-[400px] md:h-[500px]">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-newBackground mx-auto mb-4"></div>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Loading PDF...
                    </p>
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
                  height={400}
                  rotate={rotation}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  className="shadow-lg"
                  style={{ display: loading ? 'none' : 'block' }}
                />
              </Document>
            </>
          ) : (
            <div className="text-center">
              <p className="text-red-600 mb-4">Unsupported file type</p>
              <button
                onClick={downloadFile}
                className="px-3 sm:px-4 py-2 bg-newBackground text-white rounded hover:bg-newBackground transition-colors text-sm sm:text-base"
              >
                Download File
              </button>
            </div>
          )}
        </div>
      </div>
    )}
  </div>
)
  const controls = (
    <div className="bg-gray-50 p-2 sm:p-3 border-b">
      {/* Document Switcher */}
      {sitePlanDocuments.length > 1 && (
        <div className="flex justify-center mb-2">
          <div className="flex gap-2 flex-wrap">
            {sitePlanDocuments.map((doc, index) => (
              <button
                key={index}
                onClick={() => switchDocument(index)}
                className={`px-3 sm:px-4 py-1.5 text-sm sm:text-md rounded-2xl transition-colors ${
                  index === currentDocIndex
                    ? 'bg-newBackground text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Plan {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 min-h-[40px]">
        <div className="flex items-center gap-2">
          {currentFileType === 'pdf' && (
            <>
              <button
                onClick={goToPrevPage}
                disabled={pageNumber <= 1}
                className="p-1.5 sm:p-2 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Previous Page"
              >
                <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
              </button>

              <span className="text-xs sm:text-sm font-medium px-1 sm:px-2">
                Page {pageNumber} of {numPages || '?'}
              </span>

              <button
                onClick={goToNextPage}
                disabled={pageNumber >= numPages}
                className="p-1.5 sm:p-2 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Next Page"
              >
                <ChevronRight size={16} className="sm:w-5 sm:h-5" />
              </button>
            </>
          )}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={rotate}
            className="p-1.5 sm:p-2 rounded hover:bg-gray-200"
            title="Rotate"
          >
            <RotateCw size={14} className="sm:w-4 sm:h-4" />
          </button>
          <button
            onClick={downloadFile}
            className="p-1.5 sm:p-2 rounded hover:bg-gray-200 ml-1"
            title="Download File"
          >
            <Download size={14} className="sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="w-full md:w-[90%] lg:w-[70%] max-w-[900px] mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      {controls}
      {renderPDFContent()}
    </div>
  )
}

export default SitePlan
