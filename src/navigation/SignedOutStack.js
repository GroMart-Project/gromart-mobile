import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OnboardingScreen from "../screens/OnboardingScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";

const MainStack = createNativeStackNavigator();

export default function SignedOutStack() {
  return (
    <NavigationContainer>
      <MainStack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* Initial Screens */}

        <MainStack.Screen name="Onboarding" component={OnboardingScreen} />
        <MainStack.Screen name="Register" component={RegisterScreen} />
        <MainStack.Screen name="Login" component={LoginScreen} />
        {/* Initial Screens */}
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
