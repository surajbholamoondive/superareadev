"use client";
import Styles from './index.module.css';
import 'animate.css/animate.css';
import { useData } from '@/context/data';
import { useEffect } from 'react';

const Index = () => {
    const [data, setData] = useData();
   useEffect(()=>{
    const FromLocalStorage = localStorage.getItem("News");
    if(FromLocalStorage){
    setData(JSON.parse(FromLocalStorage));
    }

   }, [])
    return (
        <div className='animate__animated animate__fadeInRight box-border'>
            <div className='bg-white w-[60%] m-auto my-5 pb-9 relative ' style={{borderRadius: '8px'}}>
                <img src={data?.urlToImage ? data?.urlToImage : "https://images.pexels.com/photos/1481105/pexels-photo-1481105.jpeg?auto=compress&cs=tinysrgb&w=600"} width={500} height={300} alt='image' className='w-[60vw] h-[50vh] m-auto' style={{borderRadius: '4px'}}/>
                <div className="text-[12px] w-fit absolute mr-4 mt-2 right-0 font-normal text-gray-500">Published on {data?.publishedAt?.replace('T', " ").replace('Z', " ")}</div>
                <div className='w-[90%] m-auto'>
                    
                    <h1 className={Styles.jobheading}>{data?.title}</h1>                    
                    
                    <p className={Styles.jobParagraph}>{data?.description ? data?.description : "The United Arab Emirates (UAE) is mulling an investment of up to $50 billion in India, its second-largest trading partner, as part of a broader strategy to tap into the world's fastest-growing major economy. As reported by Bloomberg, provisional commitments from the UAE may be disclosed early next year."}</p>
                    <p className={Styles.jobParagraph}>{data?.content}</p>
                    <div className="text-[12px] w-fit mr-4 mt-4"><span className='text-black-500 font-bold mb-7'>Source - </span> <a href={data?.url} target='_blank' className='underline' rel="noreferrer"> {data?.source?.name?.replace('T', " ").replace('Z', " ")}</a></div>
                </div>
            </div>
        </div> 
    );
}
 
export default Index;


