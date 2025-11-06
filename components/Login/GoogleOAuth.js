import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { makeApiRequest, setLocalStorageItem, useNavigateToPath } from "@/utils/utils";
import { GLOBALLY_COMMON_TEXT } from "@/textV2";
const {text,routes,symbols}=GLOBALLY_COMMON_TEXT
export default function GoogleOAuth() {
  const navigatePath = useNavigateToPath();
  const handleGoogleLogin = async (ProfileData) => {
    try {
      const { email, name, picture } = ProfileData;
      const { data } = await makeApiRequest(text.postType,routes.socialRoute, {
        email,
        userName: name,
        images: picture,
      });
      if (data?.error) {
        toast.error(data?.error);
      } else {
       
      
        setLocalStorageItem(text.authText, JSON.stringify(data.result));
        navigatePath(symbols.slash);
      }
    } catch (err) {console.log(err);}
  };
  return (
    <div>
      <GoogleLogin
        onSuccess={() => {
          const decoderData = '//jwt_decode(credentialResponse.credential);'
          handleGoogleLogin(decoderData);
        }}
        onError={() => {}}
        useOneTap
        width={295}
        logo_alignment="center"
      />
    </div>
  );
}
