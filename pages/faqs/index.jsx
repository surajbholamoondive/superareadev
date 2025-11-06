import React, { useState, useRef, useEffect } from 'react';
import styles from './index.module.css';
import Massociates from '@/components/Faq/M-Associates';
import Subscription from '@/components/Faq/Subscription';
import Faq from '@/components/Faq/RentReceipt';
import PostProperty from '@/components/Faq/PostProperty';
import PropertyBooking from '@/components/Faq/PropertyBooking';
import PropertyLegalServices from '@/components/Faq/PropertyLegalServices';
import EscrowService from '@/components/Faq/EscrowServices';
import RentAgreement from '@/components/Faq/RentAgreement';
import faqContent from '../../content/faq/index';
import TopBar from '@/components/SearchResultPage/TopBar/TopBar';

const Index = () => {
  const [query, setQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const scrollRef = useRef();

  const handleChange = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    const faqArray = Object.values(faqContent).flat();


    const filteredResults = faqArray.filter((item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredItems(filteredResults);
    if (typeof window !== 'undefined') {
      scrollRef.current && scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className={`${styles.faqContainer} bg-newBackground`}>
      <div className={styles.faqWrapper}>
        <div className={styles.container} ref={scrollRef}>
          <TopBar label="FAQs" />

          <div className={styles.searchbar}>
            <input
              type="text"
              value={query}
              onChange={handleChange}
              className={styles.search}
              placeholder="Search FAQs"
            />
          </div>

          {query === '' ? (
            <>
              <Faq />
              <PostProperty />
              <Subscription />
              <Massociates />
              <RentAgreement />
              <PropertyBooking />
              <EscrowService />
              {/* <Mverification /> */}
              <PropertyLegalServices />
            </>
          ) : (
            filteredItems.map((item, index) => (
              <div className={styles.wrapper}>
                <div key={index} className={styles.item}>
                  <div className={`${styles.faqtitle} ${styles.titleexpanded}`}>
                    <h4>{item.question}</h4>
                  </div>
                  <div className={`${styles.faqcontent} ${styles.contentexpanded}`}>
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>

  );
};

export default Index;
