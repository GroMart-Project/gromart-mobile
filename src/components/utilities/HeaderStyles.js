import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../data/Constants";

const HeaderStyles = (title = null, canGoBack = null, goBack = null) => {
  return {
    headerTitle: title,
    headerTitleStyle: {
      color: COLORS.text,
      fontSize: 22,
    },
    headerTintColor: COLORS.primary,
    headerLeft: () =>
      canGoBack ? (
        <TouchableOpacity
          activeOpacity={0.5}
          style={{ marginRight: 10 }}
          onPress={goBack}
        >
          <MaterialIcons
            name="chevron-left"
            size={35}
            color={COLORS.text}
            style={{ position: "relative", top: 1 }}
          />
        </TouchableOpacity>
      ) : null,
    headerRight: () => (
      <TouchableOpacity activeOpacity={0.5} style={{ marginHorizontal: 5 }}>
        <MaterialIcons name="shopping-cart" size={24} color={COLORS.text} />
      </TouchableOpacity>
    ),
  };
};

export default HeaderStyles;
