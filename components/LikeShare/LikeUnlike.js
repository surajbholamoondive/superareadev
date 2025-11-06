import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/auth'
import { useLike } from '@/context/LikeUnlikeCntx'
import { getLogger } from '@/helper/logger'
import { toast } from 'react-toastify'
import { makeApiRequest } from '@/utils/utils'
import filledheart from '../../assets/LikeUnlike/filledheart.svg'
import unfilledheart from '../../assets/LikeUnlike/unfilledheart.svg'
import { COMPONENTS, GLOBALLY_COMMON_TEXT } from '@/textV2'
const {text,routes}=COMPONENTS.LIKE_AND_SHARE_COMPO
const{putType,wishlistedText}=GLOBALLY_COMMON_TEXT.text
const LikeUnlike = ({ id, style, isProject, edit }) => {
  const logger = getLogger()
  const router = useRouter()
  const [auth] = useAuth()
  const [check, setCheck] = useState(false)
  const [like, setLike] = useLike()
  useEffect(() => {
    const getInitialState = async () => {
      try {
        const initialCheck = JSON.parse(
          localStorage.getItem(`wishlist-${auth?.userResult?._id}`)
        )
        setCheck(initialCheck.includes(id))
      } catch (err) {
        logger.error(err)
      }
    }
    getInitialState()
  }, [id, auth, like])
  const handleLike = async (e) => {
    e.stopPropagation()
    e.preventDefault()
    try {
      if (!auth?.userResult) {
        toast.error(text.loginNote)
        return
      }
      const { data } = await makeApiRequest(putType, `${routes.toggleWishlistedRoute}/${id}`, {
        activity: wishlistedText,
        isProject,
      });
      let localwishlist = JSON.parse(
        localStorage.getItem(`wishlist-${auth?.userResult?._id}`)
      ) ?? [];
      if (data?.result?.archivedAt === null) {
        setCheck(true)
        const updatedWishlist = [...localwishlist, id]
        localStorage.setItem(
          `wishlist-${auth?.userResult?._id}`,
          JSON.stringify(updatedWishlist)
        )
        toast.success(text.addedToWishlist)
        setLike(!like)
      } else {
        setCheck(false)
        const updatedWishlist = localwishlist.filter((item) => item !== id)
        localStorage.setItem(
          `wishlist-${auth?.userResult?._id}`,
          JSON.stringify(updatedWishlist)
        )
        toast.success(text.removedFromWishlist)
        setLike(!like)
      }
    } catch (error) {
      logger.error(error)
      toast.error('Something went wrong during Like!')
    }
  }
  return (
    <>
      {check ? (
        <div className="relative h-8 w-8">
          <Image
            className={style}
            src={filledheart}
            fill
            alt={filledheart}
            onClick={handleLike}
          />
        </div>
      ) : (
        <div className="relative h-8 w-8">
          <Image
            className={style}
            src={unfilledheart}
            fill
            alt={unfilledheart}
            onClick={!edit && handleLike}
          />
        </div>
      )}
    </>
  )
}

export default LikeUnlike
