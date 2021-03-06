import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../data/Constants";
import { Chip, Searchbar } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";

//firebase imports
import {
  addHistoryItem,
  deleteHistoryItem,
  fetchHistoryData,
  fetchProductsData,
  fetchRecentlyViewedProductsData,
} from "../utilities/firestoreQueries";
import HorizontalProductList from "../components/HorizontalProductList";

export default function SearchScreen({ navigation }) {
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
    const searchTerms = searchKeyword.trim().split(" ");
    const mappedSearchTerms = searchTerms.map((term) =>
      productsData.filter((product) => {
        if (term) {
          return (
            product.title.toLowerCase().includes(term.toLowerCase()) ||
            product.category.toLowerCase().includes(term.toLowerCase())
          );
        }
      })
    );
    const filteredProducts = [...new Set(mappedSearchTerms.flat(10))];

    return setSearchedProducts(filteredProducts);
  }, [searchKeyword]);
  //listener ends//

  //Function for search//
  const onSearch = (key) => {
    if (key) {
      addHistoryItem(key)
        .then(() => console.log("transaction successful"))
        .catch((error) => console.log(error));
      navigation.navigate("SearchResult", { searchKey: key });
    }
  };
  //function ends//

  //fetch history realtime//
  const [historyData, setHistoryData] = useState();

  useEffect(() => {
    const unsubscribe = fetchHistoryData(setHistoryData);
    return unsubscribe;
  }, []);
  //fetch ends///

  //fetch recently viewed products realtime//
  const [recentlyViewedProductsData, setRecentlyViewedProductsData] =
    useState();

  useEffect(() => {
    const unsubscribe = fetchRecentlyViewedProductsData(
      setRecentlyViewedProductsData
    );
    return unsubscribe;
  }, []);
  //fetch ends///

  //Filter products using recently viewed data//
  const [recentlyViewedProductsList, setRecentlyViewedProductsList] =
    useState();

  useEffect(() => {
    const filteredProducts = productsData.filter((product) =>
      recentlyViewedProductsData?.includes(product.id)
    );
    setRecentlyViewedProductsList(filteredProducts);
  }, [productsData, recentlyViewedProductsData]);
  //filter ends//

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "white" }}>
        {/* Search box */}
        <Searchbar
          placeholder="Search"
          style={{ margin: 10 }}
          theme={{ roundness: 10 }}
          onChangeText={(text) => setSearchKeyword(text)}
          value={searchKeyword}
          onSubmitEditing={() => onSearch(searchKeyword)}
        />
      </View>
      {/* Search box ends */}

      {/* Suggestion box */}
      <View style={styles.suggestions}>
        {searchedProducts?.slice(0, 5).map((product) => (
          <SuggestionItem
            key={product.id}
            product={product}
            setSearchKeyword={setSearchKeyword}
          />
        ))}
      </View>
      {/* Suggestion box ends */}

      {/* History section */}
      {historyData && historyData?.length != 0 && (
        <View style={{ backgroundColor: "white", padding: 5 }}>
          <Text style={styles.sectionTitle}>History</Text>
          <View style={styles.historyItemList}>
            {historyData?.map((historyItem, index) => (
              <HistoryChip
                key={index}
                historyItem={historyItem}
                onSearch={onSearch}
              />
            ))}
          </View>
        </View>
      )}

      {/* History section ends*/}

      {/* Recently Viewed section */}
      {!recentlyViewedProductsData ||
      recentlyViewedProductsData?.length == 0 ? (
        <View style={{ paddingTop: historyData?.length != 0 ? 5 : 0 }}>
          <View style={{ backgroundColor: "white", paddingVertical: 10 }}>
            <Text style={styles.sectionTitle}>Recently Viewed</Text>
          </View>
          <View style={styles.noRecentViewContainer}>
            <Text style={styles.noRecentViewText}>
              No Recently Viewed Products Found
            </Text>
          </View>
        </View>
      ) : (
        <View
          style={{ flex: 1, paddingVertical: historyData?.length != 0 ? 5 : 0 }}
        >
          <View style={{ backgroundColor: "white", paddingVertical: 10 }}>
            <Text style={styles.sectionTitle}>Recently Viewed</Text>
          </View>

          {/* Bottom Section */}
          <HorizontalProductList data={recentlyViewedProductsList} />
          {/* Bottom Section End */}
        </View>
      )}

      {/* Recently Viewed section ends */}
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

const HistoryChip = ({ historyItem, onSearch }) => {
  return (
    <Chip
      icon={"clock-outline"}
      mode="outlined"
      style={styles.historyChip}
      textStyle={{
        color: COLORS.primary,
        paddingRight: 10,
      }}
      onPress={() => onSearch(historyItem)}
      onClose={() => {
        //remove History Item
        deleteHistoryItem(historyItem);
      }}
    >
      {historyItem}
    </Chip>
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
  sectionTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  historyItemList: {
    marginVertical: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  historyChip: {
    margin: 5,
  },
  noRecentViewContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 50,
  },
  noRecentViewText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "bold",
  },
});
