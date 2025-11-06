import React, { useState } from "react";
import Styles from "./index.module.css";
import faqContent from "@/content/faq/index"


const MEstimate = () => {

    const [openAccordions, setOpenAccordions] = useState({});
    const toggleAccordion = (index) => {
        const updatedAccordions = { ...openAccordions };
        updatedAccordions[index] = !updatedAccordions[index];
        setOpenAccordions(updatedAccordions);
    };
    const mEstimateContent = faqContent.mEstimateContent || [];

    return (
        <div id="mestimate">
            <div >
                <div className={`my-3 flex flex-col lg:px-0`}>
                    <div className={Styles.accordianMestimate}>
                        {mEstimateContent.map((item, i) => (
                            <div key={i} className={Styles.item}>
                                <div
                                    className={Styles.titleMestimate}
                                    onClick={() => toggleAccordion(i)}
                                >
                                    <h3>{item.question}</h3>
                                    <span
                                        className={openAccordions[i] ? Styles.minus : Styles.plus}
                                    >
                                    </span>
                                </div>
                                {openAccordions[i] && (
                                    <div className={`${Styles.content} ${Styles.expanded}`}>
                                        <p>{item.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MEstimate;
