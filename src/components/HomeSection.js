import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { COLORS } from "../data/Constants";
import ProductBox from "./ProductBox";
import ProductsData from "../data/ProductsData";

export default function HomeSection({ data, navigation }) {
  // Destructure props//
  const { title, products } = data;
  //Destructure props end//

  // Filter Products//
  const SectionProducts = ProductsData.filter((product) =>
    products.includes(product.id)
  );
  //Filter Products End//

  return (
    <View style={styles.container}>
      {/* Top Section */}

      <View style={styles.top}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            navigation.navigate("Section", {
              title: title,
              sectionProducts: SectionProducts,
            })
          }
        >
          <Text style={styles.seeText}>See All</Text>
        </TouchableOpacity>
      </View>

      {/* Top Section End */}

      {/* Bottom Section */}
      <View style={{ margin: 10 }}>
        <FlatList
          data={SectionProducts.slice(0, 2)}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginBottom: 10,
          }}
          renderItem={({ item }) => (
            <ProductBox product={item} navigation={navigation} />
          )}
        />
      </View>
      {/* Bottom Section End */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  top: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: "baseline",
  },
  title: {
    flex: 1,
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 20,
  },
  seeText: {
    color: COLORS.primary,
    fontSize: 14,
  },
});
