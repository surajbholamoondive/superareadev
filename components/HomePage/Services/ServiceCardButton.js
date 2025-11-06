import { useState } from "react";
import Styles from "./ServiceCardButton.module.css";


const ServiceCardButton = ({ buttonName, disabled }) => {

    const [loading, setLoading] = useState(false)

    return (
        <div className={Styles.serviceButton} onClick={() => setLoading(true)}>
            {disabled ?
                <button>
                    {buttonName}
                </button>
                :
                <button>
                    {loading ? "Loading..." : buttonName}
                </button>
            }
        </div>
    );
}

export default ServiceCardButton