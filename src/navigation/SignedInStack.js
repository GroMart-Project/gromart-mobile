import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainTabNavigator from "./MainTabNavigator";
import SectionScreen from "../screens/SectionScreen";
import DetailsScreen from "../screens/DetailsScreen";
import EditProfileScreen from "../screens/profile/EditProfileScreen";
import OrdersScreen from "../screens/profile/OrdersScreen";
import WishlistScreen from "../screens/profile/WishlistScreen";
import ResetPasswordScreen from "../screens/profile/ResetPasswordScreen";
import SearchResultScreen from "../screens/SearchResultScreen";

const MainStack = createNativeStackNavigator();

export default function SignedInStack() {
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Main">
        {/* Initial Screens */}
        <MainStack.Group
          screenOptions={{
            headerShown: false,
          }}
        >
          <MainStack.Screen name="Main" component={MainTabNavigator} />
        </MainStack.Group>
        {/* Initial Screens */}

        {/* Screens from bottom tab screens */}
        <MainStack.Screen name="Section" component={SectionScreen} />
        <MainStack.Screen name="Details" component={DetailsScreen} />
        <MainStack.Screen name="SearchResult" component={SearchResultScreen} />
        {/* Screen from bottom tab screens */}

        {/* Screens from profile screen */}
        <MainStack.Screen name="Edit Profile" component={EditProfileScreen} />
        <MainStack.Screen name="Orders" component={OrdersScreen} />
        <MainStack.Screen name="Wishlist" component={WishlistScreen} />
        <MainStack.Screen
          name="Reset Password"
          component={ResetPasswordScreen}
        />
        {/* Screen from profile screen */}
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
