import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ContactForm from '../../ContactForm/ContactForm.jsx';
import { GLOBALLY_COMMON_TEXT, HOME_PAGE_TEXT } from '@/textV2';
import { MY_CONTACT_FORM } from '../../../textV2';

const { allFieldsRequired, enterValidEmail, enterValidMobile, requestRaised, sending } = HOME_PAGE_TEXT.feelFreeToConnect;
const { userContactRoute } = HOME_PAGE_TEXT.routes;
const { regexs } = GLOBALLY_COMMON_TEXT;
const { feelfree } = MY_CONTACT_FORM.text;

const FeelFreeToContact = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [load, setLoad] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   if (!formData.firstName.trim()) {
        return toast.error('First Name is required')
      }
      if (!formData.lastName.trim()) {
        return toast.error('Last Name is required')
      }
      if (!formData.email.trim()) {
        return toast.error('Email is required')
      }
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        return toast.error('Please enter a valid email address')
      }
      if (!formData.phone.trim()) {
        return toast.error('Phone number is required')
      }
  
      const digitsOnly = formData.phone.replace(/\D/g, '')
      if (digitsOnly.length < 10) {
        return toast.error('Please enter a valid phone number')
      }
  
      const formattedPhone = digitsOnly.startsWith('91')
        ? `+${digitsOnly}`
        : `+91${digitsOnly}`
  
      if (!formData.message.trim()) {
        return toast.error('Message cannot be empty')
      }
    try {
      setLoad(true);
      await axios.post(userContactRoute, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formattedPhone,
        email: formData.email,
        message: formData.message
      });
      toast.success(requestRaised);
      setLoad(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
      });
      closeModal(); 
    } catch (err) {
      console.log(err);
      setLoad(false);
      toast.error('An error occurred while submitting the form.');
    }
  };

  
  return (
    <ContactForm
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      text={feelfree}
      isOpen={true}
      style={true}
      isButton={true}
      onCancel={closeModal}
    />
  );
};

export default FeelFreeToContact;
