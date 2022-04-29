import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
