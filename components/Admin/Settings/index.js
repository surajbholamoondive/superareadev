import { useState } from 'react'
import Image from 'next/image'
import { getLogger } from '@/helper/logger'


import { makeApiRequest } from '@/utils/utils'
import { toast } from 'react-toastify'
import MDLabelAndInput from '@/components/MDLabelAndInput'
import viewHideLight from '../../../assets/EditIcon/View_hide_light.svg'
import viewLight from '../../../assets/EditIcon/View_light.svg'
import { GLOBALLY_COMMON_TEXT, ADMIN_MODULE } from '@/textV2'
const {text}=GLOBALLY_COMMON_TEXT
const {ADMIN_SETTINGS_TAB} = ADMIN_MODULE
const {text:settingText, routes}=ADMIN_SETTINGS_TAB

const Settings = () => {
  const [changePassword, setChangePassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [wrongConfirmPassword, setWrongConfirmPassword] = useState(false)
  const logger = getLogger()
  const [showCurrentPassword, setShowCurrentPassword] = useState(true)
  const [showNewPassword, setShowNewPassword] = useState(true)
  const [showConfirmPassword, setShowConfirmPassword] = useState(true)
  const [toggleCurrentPassword, setToggleCurrentPassword] = useState(false)
  const [toggleNewPassword, setToggleNewPassword] = useState(false)
  const [toggleConfirmPassword, setToggleConfirmPassword] = useState(false)

  const handlePasswordChange = async () => {
    try {
      if (newPassword !== confirmPassword) {
        setWrongConfirmPassword(true)
        return
      }
      const body = {
        currentPassword,
        newPassword,
      }
      const { data } = await makeApiRequest(
        text.postType,
        routes.changePassword,
        body
      )
      const { responseCode, responseMessage } = data || {}
      if (responseCode === 200) {
        toast.success(responseMessage)
        setChangePassword(false)
      } else {
        toast.error(responseMessage)
      }
    } catch (err) {
      logger.error(err)
    }
  }
  const handleCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword)
    setToggleCurrentPassword(!toggleCurrentPassword)
  }
  const handleNewPassword = () => {
    setShowNewPassword(!showNewPassword)
    setToggleNewPassword(!toggleNewPassword)
  }
  const handleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
    setToggleConfirmPassword(!toggleConfirmPassword)
  }
  return (
    <div className="bg-white rounded-lg border h-fit p-2">
      <div className="bg-white px-3 rounded-lg">
        <div className="flex justify-between w-full">
          <h4 className="pt-2 h-fit">{settingText.password}</h4>
          {changePassword ? (
            <button
              className="text-white bg-[#931602] w-[6rem] px-5 py-2 rounded-md"
              onClick={handlePasswordChange}
            >
              {settingText.reset}
            </button>
          ) : (
            <button
              className="text-white bg-primary px-5 py-2 rounded-md"
              onClick={() => setChangePassword(true)}
            >
              {settingText.change}
            </button>
          )}
        </div>
        {changePassword && (
          <div className="border-t-2 mt-4 p-4">
            <div className="flex relative">
              <MDLabelAndInput
                label={settingText.currentPassword}
                labelClass="!mb-0"
                inputType={showCurrentPassword ? 'password' : 'text'}
                onChangeFunction={setCurrentPassword}
                inputValue={currentPassword}
                cssClass="w-[60%] py-1"
              />
              <button
                className="ml-2 focus:outline-none absolute top-[55%] left-[32%]"
                onClick={handleCurrentPassword}
              >
                <Image
                  src={toggleCurrentPassword ? viewLight : viewHideLight}
                  width={20}
                  height={20}
                  alt="Toggle Current Password Visibility"
                />
              </button>
            </div>
            <div className="my-3">
              <div className="flex relative">
                <MDLabelAndInput
                  label={settingText.newPassword}
                  labelClass="!mb-0"
                  inputType={showNewPassword ? 'password' : 'text'}
                  onChangeFunction={setNewPassword}
                  inputValue={newPassword}
                  cssClass="w-[60%] py-1"
                />
                <button
                  className="ml-2 focus:outline-none absolute top-[55%] left-[32%]"
                  onClick={handleNewPassword}
                >
                  <Image
                    src={toggleNewPassword ? viewLight : viewHideLight}
                    width={20}
                    height={20}
                    alt="Toggle Current Password Visibility"
                  />
                </button>
              </div>
            </div>
            <div className="flex relative">
              <MDLabelAndInput
                label={settingText.confirmPassword}
                labelClass="!mb-0"
                inputType={showConfirmPassword ? 'password' : 'text'}
                inputValue={confirmPassword}
                onChangeFunction={(value) => {
                  setConfirmPassword(value)
                  setWrongConfirmPassword(false)
                }}
                cssClass={`w-[60%] py-1 ${
                  wrongConfirmPassword ? 'border-red-500' : ' border-black'
                }`}
              />
              <button
                className="ml-2 focus:outline-none absolute top-[55%] left-[32%]"
                onClick={handleConfirmPassword}
              >
                <Image
                  src={toggleConfirmPassword ? viewLight : viewHideLight}
                  width={20}
                  height={20}
                  alt="Toggle Current Password Visibility"
                />
              </button>              
            </div>
            {wrongConfirmPassword && (
              <span className="text-red-600 ml-1">
                {settingText.confirmPassword}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
export default Settings
