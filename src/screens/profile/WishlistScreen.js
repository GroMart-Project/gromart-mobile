import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import HeaderStyles from "../../components/utilities/HeaderStyles";
import VerticalProductList from "../../components/VerticalProductList";
import { COLORS } from "../../data/Constants";

//firebase imports
import {
  fetchProductsData,
  fetchWishlistData,
} from "../../utilities/firestoreQueries";

export default function WishlistScreen({ navigation }) {
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

  //fetch wishlist data realtime//
  const [wishlistData, setWishlistData] = useState();

  useEffect(() => {
    const unsubscribe = fetchWishlistData(setWishlistData);
    return unsubscribe;
  }, []);
  //fetch end//

  //Filter products using search key//
  const [wishlistProducts, setWishlistProducts] = useState();

  useEffect(() => {
    const filteredProducts = productsData?.filter(
      (product) => wishlistData && wishlistData?.includes(product.id)
    );

    return setWishlistProducts(filteredProducts);
  }, [productsData, wishlistData]);
  //filter ends//

  //loading state and listener//
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = () => {
      productsData && setLoaded(true);
    };
    return unsubscribe;
  }, [productsData]);
  //state ends//

  if (!loaded) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator size={50} animating={true} color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {wishlistProducts?.length == 0 ? (
        <View style={styles.noResultContainer}>
          <Text style={styles.noResultText}>No Items In Your Wishlist</Text>
        </View>
      ) : (
        <VerticalProductList data={wishlistProducts} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  noResultContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  noResultText: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "bold",
  },
});
