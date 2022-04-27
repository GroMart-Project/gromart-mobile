import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhWeepiEg9mTLSXdfLl1GVLS8tnBjkJDo",
  authDomain: "gromart-307.firebaseapp.com",
  projectId: "gromart-307",
  storageBucket: "gromart-307.appspot.com",
  messagingSenderId: "249719529249",
  appId: "1:249719529249:web:350251df1889a48049a860",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Setup Authentication
const auth = getAuth();

export { auth };
