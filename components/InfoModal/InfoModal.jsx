import { BTN_CANCEL, ERROR_EMAIL_INVALID, ERROR_EMAIL_REQUIRED, ERROR_FIRST_NAME_REQUIRED, ERROR_LAST_NAME_REQUIRED, ERROR_MESSAGE_REQUIRED, ERROR_PHONE_INVALID, ERROR_PHONE_REQUIRED, SYMBOL_REQUIRED, TEXT_EMAIL, TEXT_FIRST_NAME, TEXT_LAST_NAME, TEXT_MESSAGE, TEXT_OK, TEXT_PHONE_NO } from "@/text";
import { useState } from 'react';
import MDLabelAndInput from '../MDLabelAndInput';
import { toast } from "react-toastify";

const InfoModal = ({ text, isOpen, onClose, onFormSubmit, projectData , setIsBlurred }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      toast.error(ERROR_FIRST_NAME_REQUIRED);
      return false;
    }
    if (!formData.lastName.trim()) {
      toast.error(ERROR_LAST_NAME_REQUIRED);
      return false;
    }
    if (!formData.email.trim()) {
      toast.error(ERROR_EMAIL_REQUIRED);
      return false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error(ERROR_EMAIL_INVALID);
      return false;
    }
    if (!formData.phone.trim()) {
      toast.error(ERROR_PHONE_REQUIRED);
      return false;
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      toast.error(ERROR_PHONE_INVALID);
      return false;
    }
    if (!formData.message.trim()) {
      toast.error(ERROR_MESSAGE_REQUIRED);
      return false;
    }
    return true;
  };


 

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-[1000] rounded-lg">
          <div className="bg-white rounded-lg flex flex-col w-[90%] md:w-[70%] lg:w-[50%] min-w-[280px] max-w-[800px] h-auto min-h-[200px] max-h-[90vh] overflow-y-auto shadow-2xl mx-4">
            <div className="flex-1 flex flex-col p-6">
              <h2 className="px-6 text-center mb-6 leading-snug text-primary">{text}</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-primary">
                <MDLabelAndInput
                  label={TEXT_FIRST_NAME}
                  inputState={formData.firstName}
                  cssClass="!w-full h-[35px]"
                  onChangeFunction={(value) => handleInputChange('firstName', value)}
                  isRequired={true}
                />
                <MDLabelAndInput
                  label={TEXT_LAST_NAME}
                  inputState={formData.lastName}
                  cssClass="!w-full h-[35px]"
                  onChangeFunction={(value) => handleInputChange('lastName', value)}
                  isRequired={true}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <MDLabelAndInput
                  label={TEXT_EMAIL}
                  inputType="email"
                  inputState={formData.email}
                  cssClass="!w-full h-[35px]"
                  onChangeFunction={(value) => handleInputChange('email', value)}
                  isRequired={true}
                />
                <MDLabelAndInput
                  label={TEXT_PHONE_NO}
                  inputState={formData.phone}
                  cssClass="!w-full h-[35px]"
                  onChangeFunction={(value) => handleInputChange('phone', value)}
                  isRequired={true}
                />
              </div>
              <div className="mb-6">
                <label className="block mb-2">
                  {TEXT_MESSAGE} <span className="text-red-500">{SYMBOL_REQUIRED}</span>
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Your Message"
                  className="w-full min-h-[80px] p-2 border border-gray-600 rounded bg-white outline-none focus:outline-none"
                  required
                />
              </div>
              <div className="flex justify-center gap-4">
                <button
                  onClick={onClose}
                  className="bg-primary text-white px-6 py-2 rounded hover:bg-gray-400 transition-colors"
                >
                  {BTN_CANCEL}
                </button>
                <button
                  onClick={onFormSubmit}
                  className="bg-primary text-white px-6 py-2 rounded hover:bg-opacity-90 transition-colors"
                >
                  {TEXT_OK}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InfoModal;