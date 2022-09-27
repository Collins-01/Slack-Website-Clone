
import { initializeApp } from 'firebase/app';
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {} from 'firebase/firestore';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCBGdTUOi-q6q-2e8F8z4IYy_Co5YHhLHg",
    authDomain: "slack-website-clone-1b1b3.firebaseapp.com",
    projectId: "slack-website-clone-1b1b3",
    storageBucket: "slack-website-clone-1b1b3.appspot.com",
    messagingSenderId: "741696964486",
    appId: "1:741696964486:web:45ecaf7ed0c05046790e07",
    measurementId: "G-8E3JP2M8W9"
  };


  const app = initializeApp(firebaseConfig);
  
  export const auth = getAuth(app);
  export const provider = new  GoogleAuthProvider();
  export const db = getFirestore(app);