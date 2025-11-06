import FacebookOAuth from "@/components/Login/FacebookOAuth";
import GoogleOAuth from "@/components/Login/GoogleOAuth";

const SocialOAuth = () => {
  return (
    <div >
      <GoogleOAuth />
      <FacebookOAuth />
    </div>
  );
};

export default SocialOAuth;
