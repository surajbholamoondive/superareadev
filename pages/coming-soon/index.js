import servicesBackground from '../../assets/NonLoggedUserImages/comingSoon.png'
import Rocket from '../../assets/NonLoggedUserImages/rocket.gif'
import Image from 'next/image'
const comingSoon= ()=>{
    return(
        <section className="relative h-[110vh] 2xl:h-[100vh] max-md:h-[92vh] max-h-[935px] flex justify-center items-center"
        >
                <div className="py-8 mb-9 w-[70%] max-md:w-full rounded-xl border border-[#9316024d] flex flex-col items-center justify-center bg-[#FFFDFD]">
                    <div className='w-[75%]'>
                     <div className='mb-4'>
                        <Image
                            src={Rocket}
                            width={200}
                            height={200}
                            className="mx-auto"
                        />
                    </div>
                    <div>
                        <h1 className="2xl:text-6xl text-center md:text-5xl font-bold leading-10">WE ARE CREATING</h1>
                        <h1 className='text-primary text-[3rem] md:text-5xl 2xl:text-6xl font-bold w-full my-3 text-center'>SOMETHING AMAZING</h1>
                    </div>
                    </div>
                    <div
                    className='w-full h-[100px]'
                           style={{
                            backgroundImage:`url(${servicesBackground?.src})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >

                    </div>
                </div>  
        </section>
    )
}
export default comingSoon