import MDGoogleLocationPicker from "../MDGoogleLocationPicker/MDGoogleLocationPicker";
import Styles from "./index.module.css";
import CityDropdown from "./CityDropdown";
import { useEffect, useState } from "react";
export const CustomModal = ({
  closeModal,
  onInput,
  modalContentType,
  DATA,
  setDATA,
  setCityLongitude,
  setSelectDropdown,
  setCityLatitude,
  city,
  setCity,
  setLocality,
  setPropertyTitle,
  propertyTitle
}) => {
  const [modalInputValue, setModalInputValue] = useState("");

  useEffect(() => {
    setModalInputValue("");
  }, []);
  const handleInputChange = (e) => {
    const value = e.target.value;
    setModalInputValue(value);
    onInput(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onInput(modalInputValue);
    closeModal();
  };

  return (
    <div
      className={`${Styles.modalContainer}`}
      onClick={(e) => {
        if (e.target.className === "Modal_modalContainer__B_dwr") {
          closeModal();
        }
      }}
    >
      <div className={`${Styles.modal} `}>
        <div className="flex justify-end">
          <button onClick={() => closeModal()}> &#10060;</button>
        </div>
        {/* <form onSubmit={handleSubmit}> */}
          <div className={`${Styles.formGroup}`}>
            {modalContentType === "city" ? (
              <label>City</label>
            ) : modalContentType === "property" ? (
              <label>Location/Project Name</label>
            ) : modalContentType === "locality" ? (
              <label>Locality</label>
            ) : null}

            {modalContentType === "locality" ? (
              <input
                type="text"
                name="page"
                value={modalInputValue}
                onChange={handleInputChange}
                className="focus:outline-[#931602]"
              />
            ) : modalContentType==="property"? (
              <MDGoogleLocationPicker DATA={DATA} setDATA={setDATA} setLocality={setLocality} setPropertyTitle={setPropertyTitle} setSelectDropdown={setSelectDropdown} />
            ):modalContentType==="city" ?(
              <CityDropdown DATA={DATA} setDATA={setDATA} setCityLatitude={setCityLatitude} setCityLongitude={setCityLongitude} city={city} setCity={setCity}/>
            ):('')}
          </div>
          <button onClick={handleSubmit} className={`${Styles.btn}`}>
            Ok
          </button>
        {/* </form> */}
      </div>
    </div>
  );
};
export default CustomModal;
