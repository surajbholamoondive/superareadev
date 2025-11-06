import Image from "next/image";
import Styles from "./card.module.css";

const Card = ({name, description}) => {
    return ( 
        <div className={`${Styles.card} min-w-[200px]`}>
            <div className={Styles.imageDiv}>
                <Image src={description.icon} 
                    alt="Real estate expertise, Trusted real estate agents, Customer support, Safe Payments" 
                    width={50} height={50}
                    className="absolute top-[22%] left-[24%] w-[30px] h-[30px] lg:w-[50px] lg:h-[50px]"
                />
            </div>
            <h1 className="font-semibold text-base lg:text-xl my-4 lg:my-5">{name}</h1>
            <h2 className="mb-10 text-[13px] md:text-[14px] w-[80%] m-auto text-gray-500">{description.label}</h2>
        </div>
     );
}
 
export default Card;