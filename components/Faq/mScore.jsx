import React, { useState } from "react";
import Styles from "./index.module.css";
import faqContent from "@/content/faq/index"


const Mscore = () => {

    const [openAccordions, setOpenAccordions] = useState({});
    const toggleAccordion = (index) => {
        const updatedAccordions = { ...openAccordions };
        updatedAccordions[index] = !updatedAccordions[index];
        setOpenAccordions(updatedAccordions);
    };
    const mScoreContent = faqContent.mScoreContent || [];

    return (
        <div id="mscore">
            <div>
                <div className={Styles.wrapperMestimate}>
                    <div className='w-full'>
                        {mScoreContent.map((item, i) => (
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
                                    <div className={`${Styles.content} ${Styles.expanded}`}><p>{item.answer}</p></div>
                                )}

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mscore;
