import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import OnboardingScreen from "../screens/OnboardingScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";

const MainStack = createNativeStackNavigator();

export default function SignedOutStack() {
  const [isAppFistLaunch, setIsAppFistLaunch] = useState(null);

  useEffect(async () => {
    const appData = await AsyncStorage.getItem("isAppFirstLaunch");
    if (appData == null) {
      setIsAppFistLaunch(true);
      AsyncStorage.setItem("isAppFirstLaunch", "false");
    } else {
      setIsAppFistLaunch(false);
    }
  }, []);

  return (
    isAppFistLaunch !== null && (
      <NavigationContainer>
        <MainStack.Navigator
          initialRouteName="Onboarding"
          screenOptions={{
            headerShown: false,
          }}
        >
          {/* Initial Screens */}

          {isAppFistLaunch && (
            <MainStack.Screen name="Onboarding" component={OnboardingScreen} />
          )}

          <MainStack.Screen name="Login" component={LoginScreen} />

          <MainStack.Screen name="Register" component={RegisterScreen} />

          {/* Initial Screens */}
        </MainStack.Navigator>
      </NavigationContainer>
    )
  );
}
