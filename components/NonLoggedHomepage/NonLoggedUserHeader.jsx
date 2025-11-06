import PlayStoreIcon from '../../assets/NonLoggedUserImages/PlayStore.svg'
import AppStoreIcon from '../../assets/NonLoggedUserImages/AppStore.svg'
import HeroImage from '../../assets/NonLoggedUserImages/HeroImage.png'
const HeroBackground = "https://res.cloudinary.com/dgjhnlqjy/image/upload/v1762244322/assets/NonLoggedUserImages/HeroBackground.png";
import Image from 'next/image'
import { NON_LOGGED_USER_TEXT } from '@/textV2'
const { text } = NON_LOGGED_USER_TEXT
const NonLoggedUserHeader = () => {

    return (
        <div
            className="relative h-[110vh] 2xl:h-[90vh] max-md:h-[94vh] max-h-[600px] w-[93%] lg:w-[93%]  overflow-hidden border-none m-auto px-5 rounded-xl "
            style={{
                backgroundImage: `url(${HeroBackground})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: 'white',
            }}
        >
            <div className="absolute inset-0 ">
                <div className="relative pb-0 flex flex-col max-md:pt-[10%] justify-center items-center w-full h-full bg-transparent ">
                    <h1 className="text-center font-thin text-primary text-3xl md:text-4xl pt-4 ">{text.findYour}
                        <span className='text-primary text-3xl md:text-4xl   font-black' > {text.perfectSpace}</span></h1>
                    <h1 className="text-center font-thin text-3xl md:text-4xl text-primary leading-loose">{text.poweredBy}
                        <span className='text-primary text-4xl  font-black'> {text.ai}</span></h1>

                    <div className="flex  gap-4 2xl:gap-6 mt-6 max-md:mb-10 2xl:mt-8">
                        <Image src={AppStoreIcon} width={130} className=" w-[100px] 2xl:w-[140px]" alt='underline' />
                        <Image src={PlayStoreIcon} width={130} className=" w-[100px] 2xl:w-[140px]" alt='underline' />
                    </div>
                    <h3 className='text-primary mt-4 font-semibold 2xl:mt-6'>{text.comingSoon}</h3>
                    <div className='h-full w-full flex justify-center'>
                        <Image src={HeroImage} className="max-md:hidden w-[42%] h-[50%] 2xl:h-[65%] absolute -bottom-3" alt='underline' />
                    </div>
                    <div className='h-full w-full flex justify-center'>
                        <Image src={HeroImage} width={270} height={270} className="md:hidden max-sm:w-[70%] w-[50%] z-0" alt='underline' />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default NonLoggedUserHeader