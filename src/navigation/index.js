import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import SignedOutStack from "./SignedOutStack";
import SignedInStack from "./SignedInStack";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { hideSplash, setLoggedIn } from "../redux/userSlice";

export default function Navigation() {
  //obtain user
  const user = useSelector((state) => state.user);
  //end

  //Function for user handler//
  const userHandler = (user) =>
    // user ? setCurrentUser(user) : setCurrentUser(null);
    {
      if (user) {
        dispatch(setLoggedIn(true));
      } else {
        dispatch(setLoggedIn(false));
      }
    };
  //function ends//

  //Check auth state changed//
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => userHandler(user));
    return unsubscribe;
  }, []);

  //Check ends//

  console.log(user.loggedIn);

  //
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hideSplash());
  }, [user]);
  //

  return (
    <>
      {user.loggedIn ? <SignedInStack /> : <SignedOutStack />}
      <StatusBar style="auto" />
    </>
  );
}
