import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import HeaderStyles from "../components/utilities/HeaderStyles";
import ProductBox from "../components/ProductBox";
import { COLORS } from "../data/Constants";
import VerticalProductList from "../components/VerticalProductList";

export default function SectionScreen({ navigation, route }) {
  const { title, filteredProducts } = route.params;

  // Header Styling//
  useLayoutEffect(() => {
    navigation.setOptions(HeaderStyles(title));
  }, [navigation]);
  //Header Styling Ends//

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
