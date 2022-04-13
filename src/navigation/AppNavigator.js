import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OnboardingScreen from "../screens/OnboardingScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import MainTabNavigator from "./MainTabNavigator";

const MainStack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <MainStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Main"
      >
        <MainStack.Screen name="Onboarding" component={OnboardingScreen} />
        <MainStack.Screen name="Register" component={RegisterScreen} />
        <MainStack.Screen name="Login" component={LoginScreen} />
        <MainStack.Screen name="Main" component={MainTabNavigator} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
