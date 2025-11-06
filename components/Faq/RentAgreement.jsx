import React, { useState } from "react";
import Styles from "./index.module.css";
import faqContent from "@/content/faq/index";


const RentAgreement = () => {

    const [openAccordions, setOpenAccordions] = useState({});
    const toggleAccordion = (index) => {
        const updatedAccordions = { ...openAccordions };
        updatedAccordions[index] = !updatedAccordions[index];
        setOpenAccordions(updatedAccordions);
    };
    const rentAgreementContent = faqContent.rentAgreementContent || [];

    return (
        <>
            <div>
                <h2>
                     Rent Agreement
                </h2>
                <div className={Styles.wrapper}>
                    <div className={Styles.accordian}>
                        {rentAgreementContent.map((item, i) => (
                            <div key={i} className={Styles.item}>
                                <div
                                    className={Styles.title}
                                    onClick={() => toggleAccordion(i)}
                                >
                                    <h4>{item.question}</h4>
                                    <span
                                        className={openAccordions[i] ? Styles.minus : Styles.plus}
                                    >
                                    </span>
                                </div>
                                {openAccordions[i] && (
                                    <p className={`${Styles.content} ${Styles.expanded}`}>{item.answer}</p>
                                )}

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default RentAgreement;
