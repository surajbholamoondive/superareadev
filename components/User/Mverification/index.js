import { useState } from "react";
import Left from "./Left"
import Right from "./Right"
import Styles from "./rightsection.module.css";
import { useRouter } from "next/router";


const Mverification = () => {

    const router = useRouter();
    const propertyId = router.query.propertyId;
    const [formData, setFormData] = useState({
        rentedAmount: "",
        rentedAddress: "",
        LandlordName: "",
        landlordPan: "",
        startDate: "",
        endDate: "",
        tenantName: "",
        tenantMobile: "",
        emailAddress: "",
    });
    const [loading, setLoading] = useState(false)

    return (
        <div >
            <div className={`flex ${Styles.rs} `}>
                <div className="max-lg:hidden w-1/2"><Left /></div>
                <div className="max-lg:flex w-1/2 max-lg:justify-center max-lg:w-full ">
                    <Right setFormData={setFormData} formData={formData} setLoading={setLoading} loading={loading} propertyId={propertyId} /></div>
            </div>

        </div>

    )
}
export default Mverification