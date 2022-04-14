import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OnboardingScreen from "../screens/OnboardingScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import MainTabNavigator from "./MainTabNavigator";
import SectionScreen from "../screens/SectionScreen";

const MainStack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Main">
        {/* Initial Screens */}
        <MainStack.Group
          screenOptions={{
            headerShown: false,
          }}
        >
          <MainStack.Screen name="Onboarding" component={OnboardingScreen} />
          <MainStack.Screen name="Register" component={RegisterScreen} />
          <MainStack.Screen name="Login" component={LoginScreen} />
          <MainStack.Screen name="Main" component={MainTabNavigator} />
        </MainStack.Group>
        {/* Initial Screens */}

        {/* Tabs from bottom tab screens */}
        <MainStack.Screen name="Section" component={SectionScreen} />
        {/* Tabs from bottom tab screens */}
      </MainStack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
