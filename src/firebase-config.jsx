/* FireStore connect */
import firebase from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";

/* Auth setup */
import { getAuth } from "firebase/auth";
import "firebase/auth";

/* 인증 정보 */
const firebaseConfig = {
  apiKey: "AIzaSyAz0UZbEnnScQYg8AtdmF6Ty6EluiV-C6I",
  authDomain: "inerane-6b7c7.firebaseapp.com",
  projectId: "inerane-6b7c7",
  storageBucket: "inerane-6b7c7.appspot.com",
  messagingSenderId: "169006059320",
  appId: "1:169006059320:web:91f2cabcf4f4d8bb2fbbcd",
  measurementId: "G-EVG3EZ17EQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();

// FireStore 초기화 : 포맷 개념이 아니라 기본적인 Setting을 해준다는 개념
// Initialize Cloud Firestore and get a ref to the service
export const db = getFirestore(app);
export default app;
