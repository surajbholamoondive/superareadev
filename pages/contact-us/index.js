import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Styles from './index.module.css';
import BackgroundImage from '../../assets/NonLoggedUserImages/backgroundImage.svg'
import emailIcon from "@/assets/social/Email.svg";
import phoneIcon from "@/assets/social/phone_call.svg";
import addressIcon from "@/assets/social/CorporateOffice.svg";
import facebookIcon from "@/assets/socialIcons/facebook.svg";
import instagramIcon from "@/assets/socialIcons/instagram.svg";
import linkedinIcon from "@/assets/socialIcons/linkedIn.svg";
import twitter from "@/assets/socialIcons/twitter.svg";
import { GLOBALLY_COMMON_TEXT, HOME_PAGE_TEXT } from "../../textV2";
import { MY_CONTACT_FORM } from "../../textV2"
import { toast } from "react-toastify";
import axios from "axios";
import ContactForm from "@/components/ContactForm/ContactForm";
const { userContactRoute } = HOME_PAGE_TEXT.routes

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isOpen, setIsOpen] = useState(true);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName.trim()) {
      return toast.error("First Name is required");
    }
    if (!formData.lastName.trim()) {
      return toast.error("Last Name is required");
    }
    if (!formData.email.trim()) {
      return toast.error("Email is required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return toast.error("Please enter a valid email address");
    }
    if (!formData.phone.trim()) {
      return toast.error("Phone number is required");
    }


    const digitsOnly = formData.phone.replace(/\D/g, "");
    if (digitsOnly.length < 10) {
      return toast.error("Please enter a valid phone number");
    }

    const formattedPhone = digitsOnly.startsWith("91") ? `+${digitsOnly}` : `+91${digitsOnly}`;

    if (!formData.message.trim()) {
      return toast.error("Message cannot be empty");
    }

    try {
      const response = await axios.post(userContactRoute, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formattedPhone,
        message: formData.message
      });

      console.log("Form submitted successfully:", response.data);


      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: ""
      });

      toast.success("Your message has been sent successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error("Error submitting form:", error);

      toast.error("Failed to submit form. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        theme: "colored"
      });
    }
  };
  const { superAreaEmail, superAreanumber, superAreaAddress,FollowUsOn } = GLOBALLY_COMMON_TEXT.text;
  const { content,contentsec, formheading, firstname, lastname, email, phoneNo, message, button, Contactnumber, CorporateOffice, subheading, heading } = MY_CONTACT_FORM.text;
  return (
    <div className="pb-4" style={{
      backgroundImage: `url(${BackgroundImage.src})`,
      backgroundSize: 'contain',
      backgroundPosition: 'center',
    }}>
      <div className="bg-white  mx-auto  w-[93%] lg:w-[93%] py-9 px-6 lg:px-9 overflow-hidden rounded-lg  ">
        <div className={Styles.myFlexContainer}>
          <div className="">
            <h1 className="text-3xl text-red-800">
              {heading} <span className="text-3xl text-bold text-red-800">{subheading}</span>
            </h1>
            <p className="text-gray-600 mt-4">
              {content}
            </p>
            <p className="text-gray-600 mt-4">
              {contentsec}
            </p>

            <div className="mt-6 space-y-5 flex flex-col">
              <div className="flex flex-col gap-2">
                <div className="flex gap-3">
                  <div>
                    <Image src={emailIcon} alt="Email icon" width={20} height={20} />
                  </div>
                  <div className="flex flex-col gap-4">
                    <h4 className="font-semibold text-red-800">{email}</h4>
                  </div>
                </div>
                <div className="flex flex-col">
                  <p className="text-gray-700">{superAreaEmail}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-3">
                  <div>
                    <Image src={phoneIcon} alt="Phone icon" width={20} height={20} />
                  </div>

                  <div className="flex flex-col gap-4">
                    <h4 className="font-semibold text-red-800">{Contactnumber}</h4>
                  </div>
                </div>
                <div className="flex flex-col">
                  <p className="text-gray-700">{superAreanumber}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-3">
                  <div>
                    <Image src={addressIcon} alt="Office icon" width={20} height={20} />
                  </div>
                  <div className="flex flex-col gap-4">
                    <h4 className="font-semibold text-red-800">{CorporateOffice}</h4>
                  </div>
                </div>
                <div className="flex flex-col">
                  <p className="text-gray-700">{superAreaAddress}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col pt-20">
              <h4 className="font-semibold text-red-800 mb-2">{FollowUsOn}</h4>
              <div className="flex gap-5">
                <Link href="https://www.facebook.com/profile.php?id=61580240940703" target="_blank">
                  <Image src={facebookIcon} width={24} height={24} alt="Facebook" />
                </Link>
                <Link href="https://x.com/Superarea_ai" target="_blank">
                  <Image src={twitter} width={24} height={24} alt="YouTube" />
                </Link>
                <Link href="https://www.instagram.com/superarea.ai" target="_blank">
                  <Image src={instagramIcon} width={24} height={24} alt="Instagram" />
                </Link>
                <Link href="#" target="_blank">
                  <Image src={linkedinIcon} width={24} height={24} alt="LinkedIn" />
                </Link>
              </div>
            </div>
          </div>
          <ContactForm handleSubmit={handleSubmit} handleChange={handleChange} formData={formData} text={formheading} isOpen={isOpen} isButton={false} style={false} />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
