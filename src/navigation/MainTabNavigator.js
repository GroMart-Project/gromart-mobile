import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import CategoriesScreen from "../screens/CategoriesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../data/Constants";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Home: "home",
  Search: "search",
  Categories: "list-alt",
  Profile: "person",
};

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const iconName = TAB_ICON[route.name];

        return {
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name={iconName} size={size} color={color} />
          ),

          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.text,

          tabBarLabelStyle: {
            fontSize: 12,
            paddingBottom: 5,
          },

          tabBarStyle: {
            height: 60,
          },
        };
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Categories" component={CategoriesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
