import React, { useRef, useEffect, useState } from 'react';
import styles from './index.module.css';

const Marquee = ({ text, speed = 5 }) => {
    const marqueeRef = useRef(null);
    const [contentWidth, setContentWidth] = useState(0);

    useEffect(() => {
        if (marqueeRef.current) {
            setContentWidth(marqueeRef.current.scrollWidth);
        }
    }, [text]);
    const duration = contentWidth / speed;
    return (
        <div className={styles.marqueeOuter}>
            <div
                className={styles.marqueeInner}
                style={{
                    animationDuration: `${duration}s`,
                }}>
                <div className={styles.marqueeContent} ref={marqueeRef}>
                    {text}&nbsp;&nbsp;&nbsp;
                </div>
                <div className={styles.marqueeContent}>
                    {text}&nbsp;&nbsp;&nbsp;
                </div>
                <div className={styles.marqueeContent} ref={marqueeRef}>
                    {text}&nbsp;&nbsp;&nbsp;
                </div>
                <div className={styles.marqueeContent}>
                    {text}&nbsp;&nbsp;&nbsp;
                </div>
                <div className={styles.marqueeContent} ref={marqueeRef}>
                    {text}&nbsp;&nbsp;&nbsp;
                </div>
                <div className={styles.marqueeContent}>
                    {text}&nbsp;&nbsp;&nbsp;
                </div>
                <div className={styles.marqueeContent} ref={marqueeRef}>
                    {text}&nbsp;&nbsp;&nbsp;
                </div>
                <div className={styles.marqueeContent}>
                    {text}&nbsp;&nbsp;&nbsp;
                </div> <div className={styles.marqueeContent} ref={marqueeRef}>
                    {text}&nbsp;&nbsp;&nbsp;
                </div>
                <div className={styles.marqueeContent}>
                    {text}&nbsp;&nbsp;&nbsp;
                </div> <div className={styles.marqueeContent} ref={marqueeRef}>
                    {text}&nbsp;&nbsp;&nbsp;
                </div>
                <div className={styles.marqueeContent}>
                    {text}&nbsp;&nbsp;&nbsp;
                </div> <div className={styles.marqueeContent} ref={marqueeRef}>
                    {text}&nbsp;&nbsp;&nbsp;
                </div>
                <div className={styles.marqueeContent}>
                    {text}&nbsp;&nbsp;&nbsp;
                </div> <div className={styles.marqueeContent} ref={marqueeRef}>
                    {text}&nbsp;&nbsp;&nbsp;
                </div>
                <div className={styles.marqueeContent}>
                    {text}&nbsp;&nbsp;&nbsp;
                </div> <div className={styles.marqueeContent} ref={marqueeRef}>
                    {text}&nbsp;&nbsp;&nbsp;
                </div>
                <div className={styles.marqueeContent}>
                    {text}&nbsp;&nbsp;&nbsp;
                </div> <div className={styles.marqueeContent} ref={marqueeRef}>
                    {text}&nbsp;&nbsp;&nbsp;
                </div>
                <div className={styles.marqueeContent}>
                    {text}&nbsp;&nbsp;&nbsp;
                </div> <div className={styles.marqueeContent} ref={marqueeRef}>
                    {text}&nbsp;&nbsp;&nbsp;
                </div>
                <div className={styles.marqueeContent}>
                    {text}&nbsp;&nbsp;&nbsp;
                </div> <div className={styles.marqueeContent} ref={marqueeRef}>
                    {text}&nbsp;&nbsp;&nbsp;
                </div>
                <div className={styles.marqueeContent}>
                    {text}&nbsp;&nbsp;&nbsp;
                </div> <div className={styles.marqueeContent} ref={marqueeRef}>
                    {text}&nbsp;&nbsp;&nbsp;
                </div>
                <div className={styles.marqueeContent}>
                    {text}&nbsp;&nbsp;&nbsp;
                </div>
            </div>
        </div>
    );
};

export default Marquee;