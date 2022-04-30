import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import HeaderStyles from "../components/utilities/HeaderStyles";
import { COLORS } from "../data/Constants";
import { Searchbar } from "react-native-paper";

//firebase imports
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { fetchProductsData } from "../utilities/firestoreQueries";

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

  //
  useEffect(() => {
    const filteredProducts = productsData.filter(
      (product) =>
        product.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        product.category.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    console.log(filteredProducts.length);
  }, [searchKeyword]);

  //

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
        <View></View>
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
