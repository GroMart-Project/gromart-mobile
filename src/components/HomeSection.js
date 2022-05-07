import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../data/Constants";

//Firebase imports//
import { fetchProductsData } from "../utilities/firestoreQueries";
import HorizontalProductList from "./HorizontalProductList";

export default function HomeSection({ data, navigation }) {
  // Destructure props//
  const { title, sectionProducts } = data;
  //Destructure props end//

  //fetch data for products//
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    fetchProductsData(setProductsData).catch((error) => console.log(error));
  }, []);

  //fetch ends//

  // Filter Products//
  const filteredProducts = productsData.filter((product) =>
    sectionProducts?.includes(product?.id)
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
              filteredProducts: filteredProducts,
            })
          }
        >
          <Text style={styles.seeText}>See All</Text>
        </TouchableOpacity>
      </View>

      {/* Top Section End */}

      {/* Bottom Section */}
      <HorizontalProductList data={filteredProducts.slice(0, 4)} />
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
