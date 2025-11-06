import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { getLogger } from '@/helper/logger'
import { Box, Button, Modal, TextField } from '@mui/material'
import { ImCross } from 'react-icons/im'
import { toast } from 'react-toastify'
import shareicon from '../../assets/AmenitiesIcons/shareicon.svg'
import FacebookIcon from '../../assets/social/facebook.svg'
import InstagramIcon from '../../assets/social/instagram.svg'
import TwitterIcon from '../../assets/social/twitter.svg'
import WhatsappIcon from '../../assets/social/whatsapp.svg'
import { COMPONENTS } from '@/textV2'
const{LIKE_AND_SHARE_COMPO}=COMPONENTS
const {text,routes}=LIKE_AND_SHARE_COMPO
const ShareModal = ({ isOpen, handleClose, routerURL }) => {
  const logger = getLogger()
  const handleCopy = (e) => {
    e.stopPropagation()
    navigator.clipboard
      .writeText(routerURL)
      .then(() => {
        toast.success(text.urlCopied)
        handleClose()
      })
      .catch((error) => {
        logger.error(error)
      })
  }
  const handleShareWhatsApp = () => {
    const whatsappURL = `${routes.whatsappUrlRoute}${encodeURIComponent(routerURL)}`
    window.open(whatsappURL)
  }

  const handleShareTwitter = () => {
    const twitterURL = `${routes.twitterRoute}${encodeURIComponent(routerURL)}`
    window.open(twitterURL)
  }

  const handleShareFacebook = () => {
    const facebookURL = `${routes.facebookRoute}${encodeURIComponent(routerURL)}`
    window.open(facebookURL)
  }

  const handleShareInstagram = () => {
    const instagramURL = `${routes.instagramRoute}${encodeURIComponent(routerURL)}`
    window.open(instagramURL)
  }

  const crossHandler = (e) => {
    e.stopPropagation()
    handleClose()
  }

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: {
            xs: '80%', 
            sm: '460px', 
            md: '520px', 
          },
          bgcolor: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          p: 4,
        }}
      >
        <div>
          <div className="flex justify-between mb-3 font-medium">
            <p>{text.shareText}</p>
            <ImCross onClick={crossHandler} className="mt-1 cursor-pointer" />
          </div>
          <TextField
            value={routerURL}
            fullWidth
            sx={{ 
              '.MuiOutlinedInput-input': {
                padding: '8px',
              },
            }}
            InputProps={{
              endAdornment: (
                <Button variant="outlined" onClick={handleCopy}
                sx={{ 
                  fontSize: '15px', 
                  padding: '2px',
                  textTransform: 'capitalize'                   
                }}
                >
                  {text.copyText}
                </Button>
              ),
            }}
          />
          <div className="mt-4 flex justify-center">
            <Button onClick={handleShareWhatsApp}>
              <Image
                width={44}
                height={44}
                src={WhatsappIcon}
                alt="WhatsApp"
              ></Image>
              <div className="border-2 border-transparent absolute top-0 left-0 w-full h-full transition-transform duration-300 group-hover:border-green-500 group-hover:scale-105"></div>
            </Button>
            <Button onClick={handleShareFacebook}>
              <Image
                width={40}
                height={40}
                src={FacebookIcon}
                alt="FacebookIcon"
              />
            </Button>
            <Button onClick={handleShareInstagram}>
              <Image
                width={40}
                height={40}
                src={InstagramIcon}
                alt="InstagramIcon"
              />
            </Button>
            <Button onClick={handleShareTwitter}>
              <Image
                className="bg-black p-2 rounded-lg"
                width={36}
                height={36}
                src={TwitterIcon}
                alt="TwitterIcon"
              />
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  )
}

const LikeShareButtons = ({edit=false, copyCard, copyPath}) => {
  const dropdownRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const [modalOpen, setModalOpen] = useState(false)
  const [routerURL, setRouterURL] = useState('')
  const handleOpenModal = (e) => {
    e.stopPropagation()
    setRouterURL(copyCard ? copyPath : window.location.href)
    setModalOpen(true)
  }
  const handleCloseModal = () => {
    setModalOpen(false)
  }
  return (
    <div className="flex items-center">
      <div
        className=" relative h-8 w-8"
        ref={dropdownRef}
      >
        <Image src={shareicon} alt={shareicon} fill  onClick={!edit && handleOpenModal}/>
      </div>
      <ShareModal
        isOpen={modalOpen}
        handleClose={handleCloseModal}
        routerURL={routerURL}
      />
    </div>
  )
}

export default LikeShareButtons
