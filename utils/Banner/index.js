import Image from 'next/image';
import Styles from './index.module.css';
import defaultImage from '@/assets/topbarImage.jpg'
const BannerImage = ({name, bannerImage}) => {

    return(
        <div className='relative'>
            <Image src={bannerImage ? bannerImage : defaultImage} width={1000} height={400} alt='banner-image' className={Styles.image} 
            />
            {name &&
                <div className={Styles.name}>
                    { name }
                </div>
            }
        </div>
    )
}

export default BannerImage ;