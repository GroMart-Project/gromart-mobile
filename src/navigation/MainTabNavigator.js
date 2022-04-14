import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../data/Constants";
import HomeNavigator from "./HomeNavigator";
import SearchNavigator from "./SearchNavigator";
import CategoriesNavigator from "./CategoriesNavigator";
import ProfileNavigator from "./ProfileNavigator";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  HomeStack: "home",
  SearchStack: "search",
  CategoriesStack: "list-alt",
  ProfileStack: "person",
};

const TAB_NAME = {
  HomeStack: "Home",
  SearchStack: "Search",
  CategoriesStack: "Categories",
  ProfileStack: "Profile",
};

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const iconName = TAB_ICON[route.name];
        const label = TAB_NAME[route.name];

        return {
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name={iconName} size={size} color={color} />
          ),

          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.text,

          tabBarLabelStyle: {
            fontSize: 12,
          },

          tabBarStyle: {
            height: 60,
          },
          tabBarItemStyle: {
            marginVertical: 8,
          },
          tabBarLabel: label,

          //Header Visibility//
          headerShown: false,
          //Header Visibility Ends//
        };
      }}
    >
      <Tab.Screen name="HomeStack" component={HomeNavigator} />
      <Tab.Screen name="SearchStack" component={SearchNavigator} />
      <Tab.Screen name="CategoriesStack" component={CategoriesNavigator} />
      <Tab.Screen name="ProfileStack" component={ProfileNavigator} />
    </Tab.Navigator>
  );
}
