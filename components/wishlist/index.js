import { useAuth } from '@/context/auth';
import Styles from './index.module.css';
import { useEffect } from 'react';
import { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Link from 'next/link';
import heart from "../../assets/social/heart-regular.svg"
import { getLogger } from '@/helper/logger';

const MobileWishlist = () => {

    const [auth] = useAuth();
    const [list, setList] = useState();
    const logger = getLogger();
    const color = ["rgba(1, 129, 145, 0.08)", "rgba(147, 22, 2, 0.06)", "rgba(200, 142, 32, 0.06)"]

    useEffect(() => {
        fetchWishlist();
    }, [auth]);

    const fetchWishlist = async () => {
        try {
            const { data } = await axios.get(`wishList/myWishlistList`);
            setList(data?.result?.wishList)
        } catch (err) {
            logger.log(err);
        }
    }

    return (
        <div>
            <div id="likedMenu" className={Styles.mainDiv}>
                {list ?
                    <div className='p-2'>
                        <h4 className='text-[14px] font-bold text-center mb-2 text-gray-600'>Total Liked : {list?.length}</h4>
                        {
                            list?.map((data, index) =>
                                <div className={Styles.singleList} style={{ backgroundColor: color[index % 3] }} key={index}>
                                    <Image src={data?.images
                                    [0]?.original}
                                        width={80}
                                        height={90}
                                        className='w-[70px] h-[80px] rounded-lg m-1 py-1'
                                    />
                                    <div className='flex w-[280px] justify-between'>
                                        <Link href={{ pathname: `property/ViewProperty`, query: { id: `${data._id}` } }}>
                                            <div>
                                                <h1 className='capitalize'>{data?.projectName}</h1>
                                                <h2>{data?.propertySubType} in {data?.locality}, {data?.city} </h2>
                                                <h2>{data?.plotSize} {data?.plotArea}</h2>
                                                <h5>Rs. {data?.price}</h5>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    :
                    <div className={Styles.zerolikeDiv}>
                        <Image
                            src={heart}
                            width={80}
                            height={80}
                            className={Styles.likeImageDiv}
                        />
                        <p className='font-bold text-center text-gray-500 mb-[10px]'>You liked 0 Property</p>
                    </div>
                }
            </div>
        </div>
    );
}

export default MobileWishlist;