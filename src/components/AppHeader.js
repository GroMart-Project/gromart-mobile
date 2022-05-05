import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Appbar } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../data/Constants";

export default function AppHeader({ tab }) {
  //navigation and route//
  const route = useRoute();
  const navigation = useNavigation();
  //end//

  const title = () => {
    if (route.params?.title) {
      return route.params?.title;
    }
    if (route.params?.searchKey) {
      return route.params?.searchKey;
    } else {
      return route.name;
    }
  };
  const color = COLORS.text;
  const size = 26;

  const _goBack = () => navigation.goBack();
  const _canGoBack = navigation.canGoBack() && !tab;
  const _handleCart = () => console.log("Searching");

  return (
    <Appbar.Header style={{ backgroundColor: "white" }}>
      {_canGoBack && (
        <Appbar.BackAction onPress={_goBack} color={color} size={size} />
      )}

      <Appbar.Content title={title()} titleStyle={styles.title} />

      <Appbar.Action
        icon="cart-outline"
        onPress={_handleCart}
        color={color}
        size={size}
      />
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  title: {
    color: COLORS.text,
    fontSize: 22,
  },
});
