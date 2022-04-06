import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OnboardingScreen from "./src/screens/OnboardingScreen";
import RegisterScreen from "./src/screens/RegisterScreen";

const MainStack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <MainStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <MainStack.Screen name="Onboarding" component={OnboardingScreen} />
        <MainStack.Screen name="Register" component={RegisterScreen} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
