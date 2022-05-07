import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../data/Constants";
import { Card, IconButton, Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

//firebase imports
import {
  addRecentlyViewedProduct,
  fetchWishlistData,
  toggleFavorite,
} from "../utilities/firestoreQueries";
import { addToCart, decreaseCart } from "../redux/cartSlice";

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

  //obtain cart items
  const { cartItems } = useSelector((state) => state.cart);
  //end//

  //check if item in cart
  const [itemInCart, setItemInCart] = useState();

  //filter//
  useEffect(() => {
    const cartItem = cartItems?.filter((cartItem) => cartItem.id == id);

    setItemInCart(...cartItem);
  }, [cartItems]);
  //check end//

  //cart functions//
  const dispatch = useDispatch();

  const product = {
    id,
    title,
    imageUri,
    price: parseFloat((price - price * discount).toFixed(2)),
  };

  const onAddCart = (product) => {
    dispatch(addToCart(product));
  };

  const onDecrease = (product) => {
    dispatch(decreaseCart(product));
  };

  const onIncrease = (product) => {
    dispatch(addToCart(product));
  };
  //cart functions end//

  return (
    <View style={styles.container}>
      {/* Upper ScrollView */}

      {/* Scroll Section Begins */}
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Image Card */}
        <Card
          style={styles.card}
          elevation={4}
          onPress={() =>
            navigation.navigate("Image Viewer", {
              title: title,
              imageUri: imageUri,
            })
          }
        >
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
        <Card style={styles.card} elevation={2}>
          <View style={[styles.cardContent, { flexDirection: "row" }]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{title}</Text>
            </View>

            <View>
              <IconButton
                icon={wishlistData?.includes(id) ? "heart" : "heart-outline"}
                size={30}
                color={COLORS.primary}
                onPress={() =>
                  toggleFavorite(id)
                    .then(() => console.log("toggled id is: ", id))
                    .catch((error) => console.log(error))
                }
                style={{ margin: -2 }}
              />
            </View>
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
        {itemInCart ? (
          <View style={styles.counter}>
            <IconButton
              icon={"minus"}
              size={30}
              color={COLORS.primary}
              onPress={() => onDecrease(product)}
              style={styles.icon}
            />
            <Text style={styles.quantity}>{itemInCart?.cartQuantity}</Text>
            <IconButton
              icon={"plus"}
              size={30}
              color={COLORS.primary}
              onPress={() => onIncrease(product)}
              style={styles.icon}
            />
          </View>
        ) : (
          <View style={styles.bottomSection}>
            <Button
              mode="contained"
              theme={{ roundness: 25 }}
              labelStyle={styles.button}
              color={COLORS.primary}
              // disabled={itemInCart?.length !== 0}
              onPress={() => onAddCart(product)}
            >
              Add to Cart
            </Button>
          </View>
        )}

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

  //new card
  cardContent: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  title: {
    color: COLORS.text,
    fontSize: 24,
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
    borderTopColor: "rgba(0, 0, 0, 0.05)",
    borderTopWidth: 1,
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

  //counter
  counter: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    borderColor: COLORS.box,
    borderWidth: 1,
  },
  quantity: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: "bold",
    marginHorizontal: 15,
  },
});
