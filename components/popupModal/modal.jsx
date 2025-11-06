import React from 'react'
import Image from 'next/image'
import design from '@/components/Agent/Listing/index.module.css'
import defaultIcon from '../../assets/userDashboard/close.svg'
const Modal = ({
  onClose,
  children,
  heading,
  paragraphs,
  closeIcon = defaultIcon,
  isOpen,
  inlineStyle,
  showCloseIcon = true,
  isShow
}) => {
  const {
    bgColor = 'bg-newBackground  bg-opacity-50',
    modalColor = 'bg-white ',
    paragraphStyles = 'text-center ',
    modalWidth = 'w-[80%]',
    modalHeight = 'h-[90%]',
    childrenPaddings = 'p-9',
    headingStyles = 'text-center text-black font-semibold text-[15px]',
  } = inlineStyle || {}

  const styles = {
    overlayBgColor: bgColor,
    modalBgColor: modalColor,
    paragraphStyle: paragraphStyles,
    width: modalWidth,
    height: modalHeight,
    headingStyle: headingStyles,
    childrenPadding: childrenPaddings,
  }
  if (!isOpen) return null

  return (
   <div
  className={`fixed inset-0 ${styles.overlayBgColor} flex justify-center items-center z-[9999]`}
>
  <div
    className={`relative sm:rounded-lg overflow-y-auto overflow-x-hidden z-50 ${styles.modalBgColor} ${styles.width} ${styles.height} ${design.customScroll} pt-10`}
  >
    {!isShow && showCloseIcon && (
      <div className="absolute top-15 right-3 p-2 z-9999">
        <Image
          src={closeIcon}
          width={30}
          height={30}
          className="rounded-full p-2 border border-gray-400 cursor-pointer z-50"
          onClick={onClose}
          alt="close"
        />
      </div>
    )}
    {heading && (
      <h2 className={`${styles.headingStyle} ${styles.childrenPadding} mt-2`}>
        {heading}
      </h2>
    )}
    {paragraphs?.map((paragraph, index) => (
      <p
        key={index}
        className={`${styles.paragraphStyle} ${styles.childrenPadding}`}
      >
        {paragraph}
      </p>
    ))}
    <div className={`${styles.childrenPadding}`}>{children}</div>
  </div>
</div>

  )
}
export default Modal
