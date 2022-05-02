import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import HeaderStyles from "../components/utilities/HeaderStyles";
import ProductBox from "../components/ProductBox";
import { COLORS } from "../data/Constants";

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
      <View style={{ margin: 10 }}>
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginBottom: 10,
          }}
          renderItem={({ item }) => <ProductBox product={item} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
