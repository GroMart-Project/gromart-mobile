import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import HeaderStyles from "../components/utilities/HeaderStyles";
import { COLORS } from "../data/Constants";
import { Searchbar } from "react-native-paper";

//firebase imports
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
      </View>
      <View style={styles.suggestions}>
        <FlatList
          data={searchedProducts.slice(0, 5)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SuggestionItem product={item}></SuggestionItem>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <Text style={{ zIndex: 0 }}>SearchScreen</Text>
    </View>
  );
}

const SuggestionItem = ({ product }) => {
  const { title } = product;
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.suggestionItem}
      onPress={() => alert(title)}
    >
      <Text style={styles.suggestionText}>{title}</Text>
    </TouchableOpacity>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  suggestions: {
    backgroundColor: "white",
    position: "absolute",
    elevation: 5,
    alignSelf: "center",
    zIndex: 100,
    top: 60,
  },
  suggestionItem: {
    width: width - 20,
  },
  suggestionText: {
    fontSize: 15,
    color: COLORS.text,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
});
