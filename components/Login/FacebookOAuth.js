import React from 'react'
import styles from "@/components/Login/index.module.css"; 
import FacebookLogin from 'react-facebook-login';
import { toast } from 'react-toastify';
import { FACEBOOK_OAUTH_ID } from '@/config';
import { makeApiRequest, setLocalStorageItem, useNavigateToPath } from '@/utils/utils';
import { GLOBALLY_COMMON_TEXT } from '@/textV2';
const{text,routes,symbols}=GLOBALLY_COMMON_TEXT
export default function FacebookOAuth() {

    
    const navigatePath = useNavigateToPath();
    const responseFacebook = async(response) => {
        try{
            const { email, name } = response;            
            const { data } = await makeApiRequest(text.postType,routes.socialRoute, {
              email,
              userName: name,
              images: response.picture.data.url
            });
        
            if (data?.error) {
              toast.error(data?.error);
            } else {
              
              
              setLocalStorageItem(text.authText, JSON.stringify(data.result));
              navigatePath(symbols.slash);
            }
        }catch(err){console.log(err);
        }
      }
    
  return (
    <div>
        <FacebookLogin
            appId={FACEBOOK_OAUTH_ID}
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook}           
            cssClass={styles.fbButton}        
        />
    </div>
  )
}
