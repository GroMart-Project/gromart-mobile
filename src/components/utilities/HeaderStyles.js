import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../data/Constants";

export default {
  headerTitleStyle: {
    color: COLORS.text,
    fontSize: 22,
  },
  headerTintColor: COLORS.primary,
  headerRight: () => (
    <TouchableOpacity activeOpacity={0.5} style={{ paddingHorizontal: 5 }}>
      <MaterialIcons name="shopping-cart" size={24} color={COLORS.text} />
    </TouchableOpacity>
  ),
};
