

import { AuthProvider } from "../context/auth.js";
import { ModalProvider } from '@/context/modal.js';
import dynamic from 'next/dynamic'; 
import "@fontsource/roboto";
import "@fontsource/raleway";
import "@fontsource/inter";
import "../styles/globals.css";


const Navbar = dynamic(() => import("@/components/Common/Navbar/Navbar"), {
  ssr: true, 
});

const ChatBot = dynamic(() => import('@/components/Chatbot'), {
  ssr: false, 
});

const Footer = dynamic(() => import("@/components/Common/Footer/Footer"), {
  ssr: true,
});

const ContactButton = dynamic(() => import('@/components/HomePage/FeelFreeToContact/ContactButton.js'), {
  ssr: false,
});

const AcceptCookies = dynamic(() => import("@/components/PrivacyProtection/AcceptCookies.js"), {
  ssr: false,
});

import 'animate.css/animate.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DataProvider } from "@/context/data.js";
import { LikeProvider } from "@/context/LikeUnlikeCntx.js";
import ErrorBoundary from "./ErrorBoundary.js";
import { SocketProvider } from "@/context/socketProvider.js";
import { NotificationProvider } from "@/context/notificationContext.js"
import BackgroundImage from '../assets/NonLoggedUserImages/backgroundImage.svg'

function MyApp({ Component, pageProps }) {

  
  return (
    <ErrorBoundary>
      <ModalProvider>
        <AuthProvider>
          <DataProvider>
    <SocketProvider>
              <NotificationProvider>
                <LikeProvider>
                  <ContactButton />
                <AcceptCookies />
                  <div style={{
                    backgroundImage: `url(${BackgroundImage.src})`,
                    backgroundPosition: 'center',
                  }}>
                    <Navbar />
                    <Component {...pageProps} />
                    <div className="max-md:hidden">
                      <ChatBot />
                    </div>
                    <Footer />
                  </div>
                </LikeProvider>
              </NotificationProvider>
            </SocketProvider>
          </DataProvider>
          <ToastContainer theme="light" position="top-right" style={{ zIndex: 1000000 }} />
        </AuthProvider>
      </ModalProvider>
    </ErrorBoundary>
  );
}

export default MyApp;