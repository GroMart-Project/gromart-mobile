import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import SignedOutStack from "./SignedOutStack";
import SignedInStack from "./SignedInStack";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Navigation() {
  //Current user logged in state//
  const [currentUser, setCurrentUser] = useState(null);
  //state ends//

  //Function for user handler//
  const userHandler = (user) =>
    user ? setCurrentUser(user) : setCurrentUser(null);
  //function ends//

  //Check auth state changed//
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => userHandler(user));
    return unsubscribe;
  }, []);

  //Check ends//

  console.log(currentUser?.email);

  return (
    <>
      {currentUser ? <SignedInStack /> : <SignedOutStack />}
      <StatusBar style="auto" />
    </>
  );
}
