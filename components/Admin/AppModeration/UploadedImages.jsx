import Image from "next/image"
import thrash from "../../../assets/moreIcon/trash.svg"
import editIcon from "../../../assets/moreIcon/Edit.svg"
import { ADMIN_MODULE } from "@/textV2"
const {ADMIN_APP_MODERATION_TAB} = ADMIN_MODULE
const {text}=ADMIN_APP_MODERATION_TAB
function UploadedImages ({carouselImages, handleEditCarouselImage, setToBeDeletedImageUrl,setOpen}){
    return(
        <div className="flex gap-y-8 gap-x-28 flex-wrap">
        {
        carouselImages.length > 0 ? (
          carouselImages.map((image, index) => (
            <div
              key={index}
              className="border border-[#b7bdc1] rounded-lg flex justify-center items-center relative p-2 w-[400px]"
            >
            <div className='flex gap-x-4 w-full'> 
                <div> 
                <div className="relative h-[130px] w-[130px] rounded-lg"> 
                <Image
                    src={image.imageUrl}
                    alt={`Uploaded Image ${index + 1}`}
                    className="rounded-lg"
                    fill
                />
                </div>
                <button
                    className="absolute top-[5px] right-10 rounded-full p-1 "
                    onClick={() => handleEditCarouselImage(image)}
                >
                    <Image
                    src={editIcon}
                    alt="thrash"
                    height={24}
                    width={24}
                    />
                </button>
                <button
                    className="absolute top-1 right-1 rounded-full p-1"
                    onClick={() => {
                        setOpen(true)
                        setToBeDeletedImageUrl(image?.imageUrl)
                    }}
                >
                    <Image
                    src={thrash}
                    alt="thrash"
                    height={24}
                    width={24}
                    />
                </button>
                </div>

                {/* section for displaying route to and outher details */}
                <div className="gap-y-4"> 
                  {image?.title && (
                    <div>
                        <p className="font-semibold">{text.imageTitle}</p>
                        <p>{image?.title}</p>
                    </div>
                  )}
                    <div>
                        <p className="font-semibold">{text.duration}</p>
                        <p>{image?.duration} {text.seconds}</p>
                    </div>
                    {image?.routeTo && (
                        <div>
                          <p className="font-semibold">{text.routeTo}</p>
                          <p>{image?.routeTo}</p>
                      </div>
                    )}
                </div>
            </div>
            </div>
          ))
        ) : (
          <span className="text-center text-gray-500">
            {text.noImageUploaded}
          </span>
        )}
        </div>
    )
}
export default UploadedImages