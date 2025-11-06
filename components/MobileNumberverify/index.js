
import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Styles from "./index.module.css";
import { useAuth } from "@/context/auth";
import { useRef } from "react";
import PhoneNumberInput from "@/utils/PhoneNumerInput";
import axios from "axios";
import { toast } from "react-toastify";

// const HelloWorldModal = ({ open, onClose, otpVerified, setOTPVerified }) => {
const LoggedOutPropertyPostModal = ({ open, onClose }) => {
 const [selectedCountry, setSelectedCountry] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30); // Initial timer value in seconds
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState(false);
  const [resendButtonDisabled, setResendButtonDisabled] = useState(true);


  const [showVerifyOTP, setShowVerifyOTP] = useState(false);


  const otpInputsRef = useRef([
    { current: null },
    { current: null },
    { current: null },
    { current: null },
    { current: null },
    { current: null },
  ]);

  let timerInterval;

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  const startTimer = () => {
    setTimer(30); // Reset the timer to 60 seconds
    timerInterval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 0) {
          clearInterval(timerInterval);
          setResendButtonDisabled(false); // Enable the "Resend OTP" button
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const handleOTPChange = (index, value) => {
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    if (value === "" && index > 0) {
      otpInputsRef.current[index - 1].focus(); // Move focus to the left
    } else if (value === "" && index === 0) {
      // If the first input is empty and left arrow is pressed, do nothing or handle as needed
    } else if (index < 5) {
      otpInputsRef.current[index + 1].focus(); // Move focus to the right
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault(); // Prevent the default backspace behavior

      const newOTP = [...otp];
      newOTP[index] = ""; // Remove the digit
      setOTP(newOTP);

      if (index > 0) {
        otpInputsRef.current[index - 1].focus(); // Move focus to the left
      }
    } else if (e.key === "ArrowLeft") {
      if (index > 0) {
        otpInputsRef.current[index - 1].focus(); // Move focus to the left
      }
    } else if (e.key === "ArrowRight") {
      if (index < otp.length - 1) {
        otpInputsRef.current[index + 1].focus(); // Move focus to the right
      }
    } else if (e.key === "v" && (e.ctrlKey || e.metaKey)) {
      // Allow pasting when pressing Ctrl+V (Windows/Linux) or Command+V (Mac)
    } else if (/^\d$/.test(e.key)) {
      // Allow digits 0-9
    } else {
      e.preventDefault(); // Prevent all other key events
    }
  };

  const handlePaste = (e) => {
    e.preventDefault(); // Prevent the default paste behavior

    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData("text");

    // Ensure that the pasted data consists of exactly 6 digits
    if (/^\d{6}$/.test(pastedData)) {
      const newOTP = pastedData.split("").slice(0, 6);
      setOTP(newOTP);

      // Move focus to the last digit of the OTP
      otpInputsRef.current[5].focus();
    }
  };

  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
    // Add logic to enable the "Continue" button when the phone number is not empty.
    setIsButtonEnabled(!!value); // This line should be added.
  };

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };

  const handleVerifyOTP = async () => {
    const userID = localStorage.getItem("userID");
    
    const enteredOTP = otp.join("");

    if (enteredOTP.length !== 6) {
      toast.error("Please enter the complete OTP.");
      return;
    }

  

    const payload = {
      mobileNumber: userID,
      otp: enteredOTP,
      // userType: userType,
    };
    try {
      setLoading(true);
      // Send POST request to verify OTP
      const response = await axios.post("user/Update_MobileNumber", payload);
      if (response?.data?.responseCode === 200) {
        onClose(); // This will close the modal
        const result = response.data.result; // Extract the result field from the response
        setAuth({ ...auth, userResult: result });
        const fromLS = JSON.parse(localStorage.getItem("auth"));
        fromLS.userResult = result;
        localStorage.setItem("auth", JSON.stringify(fromLS));
        onClose(); // This will close the modal

        localStorage.removeItem("userID");
        localStorage.removeItem("userType");
        
        toast.success(response?.data?.responseMessage); // Set the login success state to true
        setLoading(false);
        
      } else {
        toast.error(response?.data?.responseMessage);
        setLoading(false);
        setTimeout(() => {
          
        }, 3000);
        throw new Error("Verification failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error(error?.response?.data?.responseMessage);

      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    const userID = localStorage.getItem("userID");
    if (!userID) {
      return;
    }

    // If the userID starts with "+91", it's a mobile number
    
    // const userID = localStorage.getItem("userID");

    const payload = {
      userID: auth?.userResult?.email, // Prepend +91 if it's not a mobile number
    };

    try {
      setLoading(true);
      // Send PUT request to resendOT
      const response = await axios.put("user/resendOTP", payload);
      if (response.data?.responseCode === 200) {
        // Clear the OTP input fields
        const newOTP = Array.from({ length: 6 }, () => "");
        setOTP(newOTP);

        // Clear the input field references
        otpInputsRef.current.forEach((inputRef) => {
          if (inputRef && inputRef.current) {
            inputRef.current.value = "";
          }
        });

        startTimer(30);
        setResendButtonDisabled(true); // Enable the "Resend OTP" button

        toast.success(response?.data?.responseMessage);
        setLoading(false);
        setTimeout(() => {
          
        }, 30000);
        
      } else {
        
        toast.error(response?.data?.responseMessage);
        setLoading(false);
        setTimeout(() => {
          
        }, 3000);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const handleButtonClick = async () => {
    let data = {};
    if (isButtonEnabled) {
      data = {
        mobileNumber: phoneNumber,
        userType: auth?.userResult?.userType,
      };
      try {
        const response = await axios.post("user/sendOTP_OnMobileNumber", data);
        if (response?.data?.responseCode == 200) {
          localStorage.setItem("userID", phoneNumber);
          localStorage.setItem("userType", auth?.userResult?.userType);
          toast.success(response?.data?.responseMessage);
          setShowVerifyOTP(true); // Set the state to show the OTP verification section
        } else {
          toast.success(response?.data?.responseMessage);
        }
      } catch (error) {
        console.error("Error:", error);
        // Handle API call errors here
      }
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      labelled="simple-modal-title"
      described="simple-modal-description"
    >
      <Box
        sx={{
          position: "absolute",

           width: {
                xs : 300, // Full width for extra-small screens (mobile)
                sm: 400, // 400px width for small screens and above
              },
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 2,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {showVerifyOTP ? ( // Render the OTP verification section if showVerifyOTP is tru
          <div className={`${Styles.moresheadings}`}>
            <div className={`max-lg:mb-4 ${Styles.Formbox2}`}>
              <div className={`mr-4 ${Styles.formContainer}`}>
                <h1 className={`text-xl max-md:text-md ${Styles.heading}`}>
                  Verify OTP
                </h1>
                <p className={`max-md:text-xs max-md:ps-2 ${Styles.slogan}`}>
                  Enter the 6 digit code you received on{" "}
                </p>
                <div className="mt-[-24px]  text-red-600">
                  <strong className="text-sm max-md:text-xs   center  ">
                    {phoneNumber}
                  </strong>
                </div>
                <div className="flex mt-8 w-[235px] -ml-3">
                  {otp.map((value, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder=""
                      className="w-1/5 ml-2 px-2 py-1 text-center"
                      style={{
                        background: "none",
                        border: "none",
                        borderBottom: "2px solid #333",
                        outline: "none",
                      }}
                      value={value}
                      onChange={(e) => handleOTPChange(index, e.target.value)}
                      onPaste={handlePaste} // Allow pasting
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      ref={(input) => (otpInputsRef.current[index] = input)}
                    />
                  ))}
                </div>

                <div className="mt-3 flex gap-20">
                  <button
                    onClick={handleResendOTP}
                    className={`text-button rounded  text-sm focus:outline-none ${
                      resendButtonDisabled ? "text-gray-500" : "text-Red-500"
                    }`} // Apply the "disabled" class when resendButtonDisabled is true
                    disabled={resendButtonDisabled}
                  >
                    Resend Otp
                  </button>

                  <div className="text-sm">
                    {timer > 0 ? `00:${timer}` : ""}
                  </div>
                </div>
                <div className={Styles.buttonContainer}>
                  <button
                    className={`px-5 ${Styles.button} bg-button text-white py-1 text-base rounded-lg mt-4 tracking-wider`}
                    onClick={handleVerifyOTP}
                    // disabled={loading}
                  >
                    {loading ? "Verifying..." : "Verify"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Render the initial section when showVerifyOTP is false
          <Box
          className="your-box-class"
            sx={{
              position: "absolute",
              width: {
                xs : 300, // Full width for extra-small screens (mobile)
                sm: 400, // 400px width for small screens and above
              },
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
            
              p: 2,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className={`flex-col ${Styles.Formbox}`}>
              <div
                className={`max-md:mt-5 mt-7 text-[25px] max-md:text-[22px] max-sm:ml-2 ${Styles.moresheadings}`}
              >
                Post your property
                <br />
                <strong>With </strong>
                <strong
                  className={`text-[24px] max-md:text-[22px] ${Styles.MORESa}`}
                >
                  MORES
                </strong>
              </div>
              <div className={`mt-6 flex-col max-md:ml-5 max-sm:ml-4 justify-center ${Styles.formfields}`}>
                <div className={`sm:ps-5 ${Styles.classss}`}>
                  <label
                    className={` max-md:mt-5 mt-6 max-md:text-xs text-base  ${Styles.MobileNumber}`}
                  >
                    Contact Details:
                  </label>

                  <div
                    className={` w-[300px] max-sm:w-[200px] max-sm:ml-5 ${Styles.Mobilefield}`}
                  >
                    <PhoneNumberInput
                      value={phoneNumber}
                      placeholder={"Enter your phone number"}
                      onChange={handlePhoneNumberChange}
                      country={selectedCountry}
                      onCountryChange={handleCountryChange}
                      className={Styles.inputField}
                    />
                  </div>
                </div>

                <div
                  className={` mt-10 w-[300px] max-md:w-[300px] ml-5 ${Styles.SubmitButtonWrapper}`}
                >
                  <button
                    id="send_otp_btn"
                    type="button"
                    className={`w-[300px]  max-sm:w-[200px] h-[44px] max-md:h-30px  ${
                      Styles.Submitbutton
                    } ${isButtonEnabled && phoneNumber ? Styles.enabled : ""}`}
                    disabled={!isButtonEnabled}
                    onClick={handleButtonClick}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default LoggedOutPropertyPostModal;
