import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { Card } from "react-native-paper";
import { COLORS } from "../data/Constants";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import {
  fetchWishlistData,
  toggleFavorite,
} from "../utilities/firestoreQueries";

export default function ProductBox({ product }) {
  //Get use navigation hook//
  const navigation = useNavigation();
  //Hook ends//

  //Destructuring  the data//
  const { title, imageUri, price, discount, id } = product;
  //Destructuring ends//

  //fetch wishlist data realtime//
  const [wishlistData, setWishlistData] = useState();

  useEffect(() => {
    const unsubscribe = fetchWishlistData(setWishlistData);
    return unsubscribe;
  }, []);
  //fetch end//

  return (
    <Card
      style={styles.container}
      onPress={() => navigation.navigate("Details", { product: product })}
    >
      {/* Image */}
      <View style={styles.imageContainer}>
        <Card.Cover
          source={{ uri: imageUri }}
          borderRadius={bRadius}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Discount View */}
        {discount ? (
          <View style={styles.discountContainer}>
            <Text style={styles.discount}>
              {"-"}
              {(discount * 100)?.toFixed(0)}
              {"%"}
            </Text>
          </View>
        ) : null}
        {/* Discount View ends */}
      </View>
      {/* Image Ends */}

      {/* Bottom part */}
      <View style={styles.bottom}>
        <View style={styles.bottomLeft}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>
              {"$"}
              {(price - price * discount)?.toFixed(2)}
            </Text>

            {discount ? (
              <Text style={styles.priceStrike}>
                {"$"}
                {price?.toFixed(2)}
              </Text>
            ) : null}
          </View>
        </View>

        <View style={styles.bottomRight}>
          <IconButton
            icon={wishlistData?.includes(id) ? "heart" : "heart-outline"}
            size={24}
            color={COLORS.primary}
            onPress={() =>
              toggleFavorite(id)
                .then(() => console.log("toggled id is: ", id))
                .catch((error) => console.log(error))
            }
            style={{ margin: -3 }}
          />
        </View>
      </View>
      {/* Bottom part ends */}
    </Card>
  );
}

const width = (Dimensions.get("window").width - 30) / 2;
const bRadius = 5;

const styles = StyleSheet.create({
  container: {
    width,
    borderRadius: bRadius,
  },

  imageContainer: {
    backgroundColor: "white",
    padding: 5,
    borderRadius: bRadius,
  },
  image: {
    backgroundColor: "white",
  },
  discountContainer: {
    position: "absolute",
    top: "10%",
    right: "10%",
    backgroundColor: "white",
    borderRadius: 5,
    elevation: 2,
  },
  discount: {
    color: COLORS.text,
    paddingVertical: 5,
    paddingHorizontal: 7.5,
  },
  title: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: "row",
    marginBottom: 5,
  },
  price: {
    color: COLORS.text,
    fontSize: 12,
    marginRight: 5,
  },
  priceStrike: {
    color: COLORS.text,
    fontSize: 12,
    textDecorationLine: "line-through",
  },
  bottom: {
    flexDirection: "row",
    alignItems: "center",
  },
  bottomLeft: {
    marginVertical: 5,
    marginLeft: 7.5,
    marginRight: "auto",
    paddingRight: 30,
  },
  bottomRight: {
    marginHorizontal: 7.5,
  },
});
