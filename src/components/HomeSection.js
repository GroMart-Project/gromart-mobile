import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../data/Constants";
import ProductBox from "./ProductBox";
import ListEmptyIndicator from "./utilities/ListEmptyIndicator";

//Firebase imports//
import { fetchProductsData } from "../utilities/firestoreQueries";

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
      <View style={{ margin: 10 }}>
        <FlatList
          data={filteredProducts.slice(0, 2)}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginBottom: 10,
          }}
          renderItem={({ item }) => <ProductBox product={item} />}
          ListEmptyComponent={<ListEmptyIndicator padding={50} size={25} />}
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
