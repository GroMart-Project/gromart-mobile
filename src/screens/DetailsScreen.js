import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../data/Constants";
import { Card, IconButton, Button } from "react-native-paper";

//firebase imports
import {
  addRecentlyViewedProduct,
  fetchWishlistData,
  toggleFavorite,
} from "../utilities/firestoreQueries";

export default function DetailsScreen({ navigation, route }) {
  //Destructuring  the data from route//
  const { id, title, description, imageUri, price, discount } =
    route?.params?.product;
  //Destructuring ends//

  //mark item as recently viewed//
  useEffect(() => {
    const unsubscribe = addRecentlyViewedProduct(id)
      .then(() => console.log("RV transaction successful"))
      .catch((error) => console.log(error));
    return unsubscribe;
  }, [navigation]);

  //marker ends//

  //fetch wishlist data realtime//
  const [wishlistData, setWishlistData] = useState();

  useEffect(() => {
    const unsubscribe = fetchWishlistData(setWishlistData);
    return unsubscribe;
  }, []);
  //fetch end//

  //add to cart function//

  //function end//

  return (
    <View style={styles.container}>
      {/* Upper ScrollView */}

      {/* Scroll Section Begins */}
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Image Card */}
        <Card style={styles.card} onPress={() => null} elevation={4}>
          {/* Image */}
          <View style={styles.imageContainer}>
            <Card.Cover
              source={{ uri: imageUri }}
              borderRadius={bRadius}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          {/* Image Ends */}
        </Card>
        {/* Image Card ends */}

        {/* Title Card */}
        <Card style={styles.card} elevation={4}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
            <IconButton
              icon={wishlistData?.includes(id) ? "heart" : "heart-outline"}
              size={30}
              color={COLORS.primary}
              onPress={() =>
                toggleFavorite(id)
                  .then(() => console.log("toggled id is: ", id))
                  .catch((error) => console.log(error))
              }
              style={{ margin: -3 }}
            />
          </View>
        </Card>
        {/* Title Card end */}

        {/* Description Card */}
        <Card style={styles.card} elevation={4}>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionHead}>Description</Text>
            <Text style={styles.descriptionBody}>{description}</Text>
          </View>
        </Card>
        {/* Description Card end */}
      </ScrollView>
      {/* Scroll Section end */}

      <View style={styles.footer}>
        {/* Price Section */}
        <View style={styles.bottomSection}>
          <Text style={styles.label}>Price</Text>
          <Text style={styles.price}>
            {"$"}
            {(price - price * discount).toFixed(2)}
          </Text>
        </View>
        {/* Price Section Ends */}

        {/* Discount Section*/}
        {discount ? (
          <View style={styles.bottomSection}>
            <View style={styles.discountContainer}>
              <Text
                style={[
                  styles.discount,
                  { textDecorationLine: "line-through" },
                ]}
              >
                {"$"}
                {price?.toFixed(2)}
              </Text>
            </View>
            <View style={styles.discountContainer}>
              <Text style={styles.discount}>
                {"-"}
                {(discount * 100).toFixed(0)}
                {"%"}
              </Text>
            </View>
          </View>
        ) : null}
        {/* Discount Section */}

        {/* Button Section */}
        <View style={styles.bottomSection}>
          <Button
            mode="contained"
            theme={{ roundness: 25 }}
            labelStyle={styles.button}
            color={COLORS.primary}
            onPress={() => console.log("Add to cart")}
          >
            Add to Cart
          </Button>
        </View>
        {/* Button Section ends */}
      </View>
    </View>
  );
}

const { width } = Dimensions.get("window");
const bRadius = 10;
const discountFontSize = 13;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    paddingVertical: 10,
    alignItems: "center",
  },
  card: {
    width: width - 30,
    borderRadius: bRadius,
    marginVertical: 5,
  },
  imageContainer: {
    backgroundColor: "white",
    padding: 5,
    borderRadius: bRadius,
  },
  image: {
    backgroundColor: "white",
    height: width * 0.9,
  },
  titleContainer: {
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  title: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: "bold",
    marginRight: "auto",
    paddingRight: 35,
  },
  descriptionContainer: {
    padding: 10,
  },
  descriptionHead: {
    color: COLORS.text,
    fontSize: 18,
    marginVertical: 2,
  },
  descriptionBody: {
    color: COLORS.text,
    fontSize: 15,
    padding: 10,
    lineHeight: 24,
  },
  footer: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 70,
    paddingHorizontal: 10,
  },
  bottomSection: {
    margin: 10,
  },
  label: {
    color: COLORS.text,
    fontSize: 12,
    marginLeft: 5,
  },
  price: {
    color: COLORS.text,
    fontSize: 26,
  },
  discountContainer: {
    backgroundColor: "white",
    borderRadius: 5,
    marginBottom: 3,
    elevation: 2,
  },
  discount: {
    color: COLORS.text,
    fontSize: discountFontSize,
    textAlign: "center",
    paddingVertical: 2,
    paddingHorizontal: 7.5,
  },
  button: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    padding: 2.5,
  },
});
