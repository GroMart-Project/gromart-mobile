import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import HeaderStyles from "../components/utilities/HeaderStyles";
import { COLORS } from "../data/Constants";
import { Searchbar } from "react-native-paper";

//firebase imports
import { fetchProductsData } from "../utilities/firestoreQueries";
import ListEmptyIndicator from "../components/utilities/ListEmptyIndicator";

export default function SearchScreen({ navigation }) {
  // Header Styling//
  useLayoutEffect(() => {
    navigation.setOptions(HeaderStyles());
  }, [navigation]);
  //Header Styling Ends//

  //fetch data for products//
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    fetchProductsData(setProductsData).catch((error) => console.log(error));
  }, []);
  //fetch ends//

  //State for searched key//
  const [searchKeyword, setSearchKeyword] = useState("");
  //State ends//

  //Search listener//
  const [searchedProducts, setSearchedProducts] = useState();

  useEffect(() => {
    const filteredProducts = productsData.filter(
      (product) =>
        searchKeyword &&
        (product.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          product.category.toLowerCase().includes(searchKeyword.toLowerCase()))
    );
    setSearchedProducts(filteredProducts);
  }, [searchKeyword]);

  //listener ends//

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "white" }}>
        <Searchbar
          placeholder="Search"
          style={{ margin: 10 }}
          theme={{ roundness: 10 }}
          onChangeText={(text) => setSearchKeyword(text)}
          value={searchKeyword}
        />
        <View>
          <FlatList
            data={searchedProducts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Text>{item.title}</Text>}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
      <Text>SearchScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
