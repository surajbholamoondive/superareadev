import React, { useState, useEffect } from "react";
import MoresLogo from "@/components/Common/MoresLogo";
import PhoneNumberInput from "@/utils/PhoneNumerInput";
import styles from "@/pages/login/LoginUser.module.css";
import { toast } from "react-toastify";
import Link from "next/link";
import RightSideImage from '@/pages/register/assets/left-side-image.svg'

import { useData } from "@/context/data";
import { useRouter } from "next/router";
import {
  getLocalStorageItem,
  makeApiRequest,
  setLocalStorageItem,
  useNavigateToPath,
} from "@/utils/utils";
import useWindowWidth from "@/context/useWindowWidth";
import Loading from "../loading";
import Half from '@/pages/register/assets/half.svg'

// import RightSideImage from "@/components/Login/RightSideImage";
import { GLOBALLY_COMMON_TEXT, REGISTERATION_TEXT } from "@/textV2";
const { loadingText, postType, agentText, individualText } = GLOBALLY_COMMON_TEXT.text
const { loginRoute } = GLOBALLY_COMMON_TEXT.routes
const { mobileRegex } = GLOBALLY_COMMON_TEXT.regexs
const { text, routes } = REGISTERATION_TEXT
const RegisterUser = () => {
  const navigatePath = useNavigateToPath();
  const [data, setData] = useData();
  const windowWidth = useWindowWidth();
  const [mobileNumber, setMobileNumber] = useState();
  const [login, setLogin] = useState(false);
  const [FormDATA, setFormDATA] = useState({
    mobileNumber: mobileNumber,
  });
  const [showBackground, setShowBackground] = useState(true)

  const [otpSuccess, setOtpSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Individual");
  const router = useRouter();

  useEffect(() => {
    const { type, value } = data;
    if (type === text.phoneText && value) {
      setMobileNumber(value);
      setFormDATA({
        ...FormDATA,
        mobileNumber: value,
      });
    } else {
      setFormDATA({
        ...FormDATA,
        mobileNumber: "",
      });
    }
  }, [data]);

  useEffect(() => {
    const isUserLoggedIn = 'true' === getLocalStorageItem(text.isLoginText);
    const isAdminLoggedIn = 'true' === getLocalStorageItem(text.isAdminLogin);
    if (isAdminLoggedIn || isUserLoggedIn) {
      setLogin(false);
    }
    if (!isAdminLoggedIn && !isUserLoggedIn) {
      setLogin(true);
    }
    if (isUserLoggedIn || isAdminLoggedIn) {
      router.push(routes.route404);
    }
  }, []);

  const handleCountryChange = (selectedOption) => {
    setFormDATA({
      ...FormDATA,
      countryCode: selectedOption,
    });
  };

  const handlePhoneNumberChange = (value) => {
    setMobileNumber(value);
    setFormDATA({
      ...FormDATA,
      mobileNumber: value,
    });
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    if (mobileNumber === "") {
      toast.error(text.invalidInput);
      return;
    }

    const regex = mobileRegex;
    if (!regex.test(mobileNumber)) {
      toast.error(text.enterValidMobileNumber);
      return;
    }
    try {
      setLoading(true);
      
      const payload = {
        ...FormDATA,
        mobileNumber,
        userType: selectedRole,
      };
      const response = await makeApiRequest(
        postType,
        routes.userRegisterRoute,
        payload
      );
      const { responseCode } = response?.data || {};
      const { responseMessage } = response?.data || {};
      if (responseCode === 200) {
        setLocalStorageItem(text.mobileNumber, mobileNumber);
        setLocalStorageItem("userType", selectedRole);
        setLocalStorageItem(text.isLoginText, false);
        setLocalStorageItem(text.isPostingProperty, false);
        setOtpSuccess(true);
        toast.success(responseMessage);
        const query = {
          source: "register",
        };
        navigatePath(routes.otpVerifyRoute, query);
      } else {
        toast.error(responseMessage);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error?.code);
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setShowBackground(window.innerWidth >= 1000)
    }

    handleResize() // Initial check
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])




  return (
    login ? (
   <div className="bg-primary p-0 sm:p-10">
        <div className="h-screen custom-section relative"
          style={{
            backgroundImage: showBackground ? `url(${RightSideImage.src})` : `url(${Half.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}>

          <div className='px-36 md:px-0'>
            <MoresLogo />
          </div>

          <div className="flex flex-col justify-center items-center lg:flex lg:flex-row sm:px-20 relative h-full">
            <div className="flex items-center justify-center lg:w-[45%] md:w-[40%] lg:ml-auto">
              <div className={styles.leftContent}>
                <div className={`${styles.formWrapper}`}>
                  <div className={styles.parent}>
                    <h2 className={`${styles.labels}`}>{text.registerText}</h2>

                    <div className={`${styles.buttonContainer}`}>
                      <div className="flex justify-start"></div>
                      <button
                        className={`py-2 px-6 rounded-l-full w-56 mt-3 ${selectedRole === individualText
                          ? 'bg-primary text-white'
                          : 'bg-lightRedBg text-primaryText'
                          }`}
                        onClick={() => setSelectedRole(individualText)}
                      >
                        {individualText}
                      </button>
                      <button
                        className={`py-2 px-6 rounded-r-full w-56 mt-3 ${selectedRole === agentText
                          ? 'bg-primary text-white'
                          : 'bg-lightRedBg text-primaryText'
                          }`}
                        onClick={() => setSelectedRole(agentText)}
                      >
                        {agentText}
                      </button>
                    </div>

                    <div className={`${styles.labels} `}>
                      <p className="mt-5 leading-5">
                        {text.enterMobileNumber}
                      </p>
                    </div>
                    <div className={styles.formContainer}>
                      <form onSubmit={handleRegister} className="mb-5 ">
                        <div>
                          <div className={`border-2 border-primary rounded-full ${styles.mobileContainer}`}>
                            <PhoneNumberInput
                              dropdownStyle={{ width: '500px' }}
                              className={styles.inputMobileField}
                              value={mobileNumber}
                              country={FormDATA?.countryCode}
                              onChange={handlePhoneNumberChange}
                              onCountryChange={handleCountryChange}
                            />
                          </div>
                        </div>
                        <button
                          className={`${styles.button}  py-2 rounded-sm !mt-10 `}
                          disabled={loading}
                          style={{ backgroundColor: 'white', color: '#931602', border: '2px solid #931602', width: '100%', borderRadius: '28px' }}
                        >
                          {loading ? loadingText : text.registerText}
                        </button>
                        <div className="flex justify-between mt-4">
                          <p>{text.alreadyRegister}</p>
                          <Link
                            href={loginRoute}
                            className="text-primary underline-none cursor-pointer"
                            onClick={() => {
                              setData('')
                            }}
                          >
                            {text.loginText}
                          </Link>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <Loading />
    )
  );
};

export default RegisterUser;