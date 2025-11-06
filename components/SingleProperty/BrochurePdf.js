import React, { useEffect, useRef, useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import Image from 'next/image'
import { DOWNLOAD, LOADING, LOGIN_TOASTER, NEXT_PAGE, PREVIEW_BROCHURE, PREVIOUS_PAGE, REDIRECT, ROOT_LOGIN_ROUTE } from '@/text'
import HTMLFlipBook from 'react-pageflip'
import BrochurePreview from './BrochurePreview'
import { getLogger } from '@/helper/logger'
import  download from "@/assets/AgentDashbord/download.svg"
import { useAuth } from '@/context/auth'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { setLocalStorageItem } from '@/utils/utils'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
const BrochurePdf = ({ pdfUrl }) => {
  const logger = getLogger()
  const flipBookRef = useRef(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [pageImages, setPageImages] = useState([])
  const [showPreview, setShowPreview] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [auth,setAuth]=useAuth()
  const route=useRouter()
  const renderPageToImage = (pageNum, pdf) => {
    return new Promise(async (resolve) => {
      const page = await pdf.getPage(pageNum)
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      const viewport = page.getViewport({ scale: 0.5 })
      canvas.height = viewport.height
      canvas.width = viewport.width
      page.render({ canvasContext: context, viewport }).promise.then(() => {
        resolve(canvas.toDataURL())
      })
    })
  }
  useEffect(() => {
    if (pdfUrl) {
      setIsLoading(true)
      const loadingTask = pdfjs.getDocument({ url: pdfUrl })
      loadingTask.promise
        .then(async (pdf) => {
          setTotalPages(pdf.numPages)
          const imageUrls = []
          for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const imageUrl = await renderPageToImage(pageNum, pdf)
            imageUrls.push(imageUrl)
          }
          setPageImages(imageUrls)
          setIsLoading(false)
        })
        .catch((error) => {
          logger.error( error)
        })
    }
  }, [pdfUrl])

  const handlePreviewClick = () => setShowPreview(true)
  const handleClosePreview = () => setShowPreview(false)
 
  const goToPrevPage = () => {
    if (flipBookRef.current && flipBookRef.current.pageFlip()) {
      flipBookRef.current.pageFlip().flipPrev()
      setCurrentPage(flipBookRef.current.pageFlip().getCurrentPageIndex())
    }
  }

  const goToNextPage = () => {
    if (flipBookRef.current && flipBookRef.current.pageFlip()) {
      flipBookRef.current.pageFlip().flipNext()
      setCurrentPage(flipBookRef.current.pageFlip().getCurrentPageIndex())
    }
  }
  const updateCurrentPage = () => {
    if (flipBookRef.current && flipBookRef.current.pageFlip()) {
      setCurrentPage(flipBookRef.current.pageFlip().getCurrentPageIndex())
    }
  }
  const handleDownloadPdf = () => {
    if(auth?.token != null){
    const link = document.createElement('a')
    link.href = pdfUrl
    link.download = 'Brochure.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  else {
    setTimeout(() => {
      toast.error(LOGIN_TOASTER)
    }, 1000)
    setLocalStorageItem(REDIRECT, route.asPath)
    route.push(ROOT_LOGIN_ROUTE)
  }}

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center">{LOADING}</div>
      ) : (
        <div className="py-5">
          <div className="flex justify-center">
            <div className="border-opacity-55 border border-black rounded-lg overflow-hidden bg-white">
              <HTMLFlipBook
                width={600}
                height={400}
                ref={flipBookRef}
                onFlip={updateCurrentPage}
              >
                {pageImages.map((image, index) => (
                  <div key={index} className="h-full">
                    <Image
                      src={image}
                      alt={`Page ${index + 1}`}
                      style={{ width: '100%', height: '100%' }}
                      fill
                    />
                  </div>
                ))}
              </HTMLFlipBook>
            </div>
          </div>

          <div className="mt-8 gap-4 flex flex-col items-center sm:flex-row sm:justify-center">
            <div className="flex items-center gap-4">
              <button
                onClick={goToPrevPage}
                disabled={currentPage <= 0}
                className="bg-primary h-11 text-white px-4 py-2 rounded shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <FaArrowLeft className="mr-2" />
                <span className="hidden sm:inline">{PREVIOUS_PAGE}</span>
              </button>
              <p className="text-black py-2 px-4 h-11 shadow flex items-center">
                {currentPage + 1} of {totalPages}
              </p>
              <button
                onClick={goToNextPage}
                disabled={currentPage >= totalPages - 1}
                className="bg-primary h-11 text-white px-4 py-2 rounded shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <span className="hidden sm:inline">{NEXT_PAGE}</span>
                <FaArrowRight className="ml-2" />
              </button>
            </div>
            {showPreview && (
              <BrochurePreview
                pdfUrls={pageImages}
                onClose={handleClosePreview}
              />
            )}
            {!showPreview && (
              <button
                onClick={handlePreviewClick}
                className="bg-primary h-11 text-white px-4 py-2 rounded shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {PREVIEW_BROCHURE}
              </button>
            )}
           
            <div onClick={handleDownloadPdf} className="bg-primary h-11 text-white px-4 py-2 rounded shadow flex items-center gap-1">
              <Image src={download} width={18} height={18}/>
            <button >{DOWNLOAD}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BrochurePdf
