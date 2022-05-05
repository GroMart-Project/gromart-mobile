import { StyleSheet, View } from "react-native";
import React from "react";
import { COLORS } from "../data/Constants";
import VerticalProductList from "../components/VerticalProductList";

export default function SectionScreen({ navigation, route }) {
  const { title, filteredProducts } = route.params;

  // console.log(title);
  return (
    <View style={styles.container}>
      <VerticalProductList data={filteredProducts} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
