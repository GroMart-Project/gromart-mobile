import { Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../data/Constants";

const HeaderStyles = (title = null, navigation = null) => {
  return {
    headerTitle: title,
    headerTitleStyle: {
      color: COLORS.text,
      fontSize: 22,
    },
    headerTintColor: COLORS.text,
    headerRight: () => (
      <TouchableOpacity activeOpacity={0.5} style={{ marginHorizontal: 5 }}>
        <MaterialIcons name="shopping-cart" size={24} color={COLORS.text} />
      </TouchableOpacity>
    ),
  };
};

export default HeaderStyles;
