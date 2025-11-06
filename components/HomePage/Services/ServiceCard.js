import Link from "next/link";
import Styles from "./ServiceCard.module.css";
import ServiceCardButton from "./ServiceCardButton";
import Image from "next/image";

const ServiceCard = ({ name, description }) => {
    return (
        <div className={`${Styles.card} hover:bg-[#9316021A]`}>
            <h3 className={Styles.heading}>
                {name}
            </h3>
            <ul className={Styles.unorderedList}>
                {description.points.map((point, index) => <li className={Styles.listItem} key={index}>{point}</li>)}
            </ul>
            <div>
                {description?.path ?
                    <Link href={description.path}>
                        <ServiceCardButton buttonName={description.buttonName} />
                    </Link>
                    :
                    <ServiceCardButton buttonName={description.buttonName} disabled="true" />
                }
                <div className={Styles.iconDiv} >
                            
                    <div className={Styles.imgIconDiv} style={{marginRight:"8px"}}>
                        <Image
                            src={description.iconFile}
                            alt="Picture of the author"
                            width={57}
                            height={58}
                            className="serviceIcon"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ServiceCard;