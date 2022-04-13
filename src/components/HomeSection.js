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

export default function HomeSection({ data }) {
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
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity activeOpacity={0.5}>
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
          renderItem={({ item }) => <ProductBox title={item.title} />}
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
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "bold",
    marginRight: "auto",
  },
  seeText: {
    color: COLORS.primary,
    fontSize: 14,
  },
});
