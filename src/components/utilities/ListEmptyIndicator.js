import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import React from "react";
import { COLORS } from "../../data/Constants";

const { height, width } = Dimensions.get("window");

export default function ListEmptyIndicator({
  padding = "tab",
  size,
  subtract = 0,
}) {
  let paddingHeight;
  let paddingWidth;

  if (padding == "tab") {
    paddingHeight = height / 2 - (60 + size / 2) - subtract;
  } else if (padding == "full") {
    paddingHeight = height / 2 - size / 2 - subtract;
  } else if (padding == "horizontal") {
    paddingWidth = width / 2 - size / 2 - subtract;
  } else {
    paddingHeight = padding;
  }

  return (
    <View
      style={{
        flex: 1,
        paddingVertical: paddingHeight,
        paddingHorizontal: paddingWidth,
      }}
    >
      <ActivityIndicator size={size} animating={true} color={COLORS.primary} />
    </View>
  );
}
