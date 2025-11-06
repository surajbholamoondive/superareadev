import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

const firebaseConfigObj = {
  apiKey: "AIzaSyBKQnF11wlutkK3O9zwfBA70DHIPxIT5mg",
  authDomain: "superarea-c52e6.firebaseapp.com",
  projectId: "superarea-c52e6",
  storageBucket: "superarea-c52e6.firebasestorage.app",
  messagingSenderId: "886404114542",
  appId: "1:886404114542:web:abfc0b5e33fa0dfd751e7f",
  measurementId: "G-0ZS5D9Z8CX"
};


let app ;
let messaging=null;

try{
    if(typeof window !=='undefined'){
        app=initializeApp(firebaseConfigObj)
        messaging=getMessaging(app)
    }    
}catch(err){
    console.error("Erro in src/firebase")
}

export {app,messaging}