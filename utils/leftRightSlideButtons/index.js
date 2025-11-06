import Image from 'next/image';
import leftButton from '@/assets/ButtonIcons/FeaturedSectionArrow.svg';
import Styles from './index.module.css';


const LeftSlideButton = ({ leftFunction }) => {
   
    return ( 
            <button className={`${Styles.slideButton} max-md:hidden`} onClick={leftFunction}>
                <Image src={leftButton} className='m-auto' alt='left-button'/>
            </button>
    );
}

const RightSlideButton =({ rightFunction })=>{
    return(
             <button className={`${Styles.RightSlideButton} max-md:hidden`} onClick={rightFunction}>
                <Image src={leftButton}className='m-auto' alt='right-button'/>
            </button>
    )
}
 
export default LeftSlideButton
export {RightSlideButton}