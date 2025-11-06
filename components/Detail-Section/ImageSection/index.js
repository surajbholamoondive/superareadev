import useWindowWidth from "@/context/useWindowWidth";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
const ImageGalleryComponent = ({ Projectimages }) => {
    const windowWidth = useWindowWidth();
    const galleryImages = Projectimages.map(image => ({
        original: image.url,
        thumbnail: image.url,
        description: image.name,
    }));
    return (
        <div>
            {windowWidth >= 1317 ? (
                <div className="ml-56 w-[65%] h-[80%] p-5 rounded-lg  ">
                    <ReactImageGallery  items={galleryImages}
                    />
                </div>
            ) :
                (
                    <div className=" h-[80%]  rounded-lg ">
                        <ReactImageGallery items={galleryImages} />
                    </div>
                )
            }
        </div>
    )
}
export default ImageGalleryComponent
