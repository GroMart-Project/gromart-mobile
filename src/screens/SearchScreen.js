import {
  Dimensions,
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
import { useIsFocused } from "@react-navigation/native";

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

  //focus listener to reset state//
  const isFocused = useIsFocused();
  useEffect(() => {
    const unsubscribe = isFocused ? setSearchKeyword("") : null;

    return unsubscribe;
  }, [isFocused]);
  //listener ends//

  //Search listener//
  const [searchedProducts, setSearchedProducts] = useState();

  useEffect(() => {
    const filteredProducts = productsData.filter(
      (product) =>
        searchKeyword &&
        (product.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          product.category.toLowerCase().includes(searchKeyword.toLowerCase()))
    );
    return setSearchedProducts(filteredProducts);
  }, [searchKeyword]);

  //listener ends//

  //Function for search//
  const onSearch = () => {
    searchKeyword &&
      navigation.navigate("SearchResult", { title: searchKeyword });
  };
  //function ends//

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "white" }}>
        <Searchbar
          placeholder="Search"
          style={{ margin: 10 }}
          theme={{ roundness: 10 }}
          onChangeText={(text) => setSearchKeyword(text)}
          value={searchKeyword}
          onSubmitEditing={onSearch}
        />
      </View>

      {/* Suggestion box */}
      <View style={styles.suggestions}>
        {searchedProducts?.slice(0, 5).map((product) => (
          <SuggestionItem
            product={product}
            setSearchKeyword={setSearchKeyword}
          />
        ))}
      </View>
      {/* Suggestion box ends */}

      <View>
        <Text style={{ zIndex: 0 }}>SearchScreen</Text>
      </View>
    </View>
  );
}

const SuggestionItem = ({ product, setSearchKeyword }) => {
  const { title } = product;
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.suggestionItem}
      onPress={() => setSearchKeyword(title)}
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
