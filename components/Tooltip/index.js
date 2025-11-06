// TooltipComponent.js
import React from 'react';
import styles from './index.module.css'; 
import InfoIcon from '../../assets/moreIcon/info-circle.svg'; 
import Image from 'next/image';

    const TooltipComponent = ({ tooltipText }) => {
    return (
        <div className={styles.tooltipContainer}>
            <Image
                src={InfoIcon}
                className={styles.infoIcon}
                alt="Information Icon"
                width={14}
                height={14}
            />
            <div className={`${styles.tooltipText} w-[200px] max-sm:max-w-[100px]`}>{tooltipText}</div>
        </div>
    );
};

export default TooltipComponent;
