import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import HeaderStyles from "../components/utilities/HeaderStyles";
import { COLORS } from "../data/Constants";
import ProductBox from "../components/ProductBox";

//firebase imports
import { fetchProductsData } from "../utilities/firestoreQueries";

export default function SearchResultScreen({ navigation, route }) {
  const { searchKey } = route.params;

  // Header Styling//
  useLayoutEffect(() => {
    navigation.setOptions(HeaderStyles(searchKey));
  }, [navigation]);
  //Header Styling Ends//

  //fetch data for products//
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    fetchProductsData(setProductsData).catch((error) => console.log(error));
  }, []);
  //fetch ends//

  //Filter products using search key//
  const [searchedProducts, setSearchedProducts] = useState();

  useEffect(() => {
    const filteredProducts = productsData.filter(
      (product) =>
        searchKey &&
        (product.title.toLowerCase().includes(searchKey.toLowerCase()) ||
          product.category.toLowerCase().includes(searchKey.toLowerCase()))
    );
    return setSearchedProducts(filteredProducts);
  }, [productsData]);

  //filter ends//

  return (
    <View style={styles.container}>
      <View style={{ margin: 10 }}>
        <FlatList
          data={searchedProducts}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginBottom: 10,
          }}
          renderItem={({ item }) => <ProductBox product={item} />}
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
