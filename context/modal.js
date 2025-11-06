import { useState, useContext, createContext } from 'react';

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [videoRecorded, setVideoRecorded] = useState(false);
  const [checkmarkVisible, setCheckmarkVisible] = useState(false);
  const [step2Complete, setStep2Complete] = useState(false);
  const [ step3Complete, setStep3Complete ] = useState(false);

  

  return (
    <ModalContext.Provider value={{ videoRecorded, setVideoRecorded, checkmarkVisible, setCheckmarkVisible, step2Complete, setStep2Complete , step3Complete, setStep3Complete}}>
      {children}
    </ModalContext.Provider>
  );
};

const useModal = () => useContext(ModalContext);

export {ModalProvider, useModal};