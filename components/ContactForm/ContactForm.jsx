import React from "react";
import Styles from "./index.module.css"; 
import { MY_CONTACT_FORM } from "../../textV2";
import { IoCloseSharp } from "react-icons/io5";


const {
  formheading,
  firstname,
  lastname,
  email,
  phoneNo,
  message,
} = MY_CONTACT_FORM.text;

const ContactForm = ({
  formData,
  handleChange,
  handleSubmit,
  text,
  isOpen,
  style,
  isButton,
  onCancel
}) => {
  return isOpen ? (
    <>
      {style && (
        <div
          className="fixed inset-0 z-[999] bg-primary bg-opacity-40 backdrop-blur-md "
          aria-hidden="true"
        />
      )}
      <div
        className={`${Styles.form} shadow-md border-2 rounded-lg z-[999] ${
          style ? "fixed inset-0 z-[1000] ": ""
        }`}
      >
        <div className="flex justify-between">
          <h3 className={`${Styles.contact} text-center md:text-left`}>{text}</h3>
          {isButton && (
            <IoCloseSharp 
              onClick={() => onCancel()} 
              className="w-6 h-6 text-primary cursor-pointer" 
            />
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={Styles.label}>
                {firstname} <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData?.firstName || ""}
                onChange={handleChange}
                required
                className={Styles.inputField}
              />
            </div>
            <div>
              <label className={Styles.label}>
                {lastname} <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData?.lastName || ""}
                onChange={handleChange}
                required
                className={Styles.inputField}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={Styles.label}>
                {email} <span className="text-primary">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Your Email Address"
                value={formData?.email || ""}
                onChange={handleChange}
                required
                className={Styles.inputField}
              />
            </div>
            <div>
              <label className={Styles.label}>
                {phoneNo} <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData?.phone || ""}
                onChange={handleChange}
                required
                className={Styles.phoneInputField}
              />
            </div>
          </div>
          <div>
            <label className={Styles.label}>
              {message} <span className="text-primary">*</span>
            </label>
            <textarea
              name="message"
              placeholder={message}
              value={formData?.message || ""}
              onChange={handleChange}
              required
              className={`${Styles.inputField} h-28`}
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="submit"
              className={`${Styles.button}  hover:bg-primary-dark`}
            >
              Get Call Back
            </button>
          </div>
        </form>
      </div>
    </>
  ) : null;
};

export default ContactForm;
