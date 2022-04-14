import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Card } from "react-native-paper";
import { COLORS } from "../data/Constants";
import { MaterialIcons } from "@expo/vector-icons";

export default function ProductBox({ product, navigation }) {
  //Destructuring  the data//
  const { title, imageUrl, price, discount } = product;
  //Destructuring ends//
  return (
    <Card
      style={styles.container}
      onPress={() => navigation.navigate("Details")}
    >
      {/* Image */}
      <View style={styles.imageContainer}>
        <Card.Cover
          source={{ uri: imageUrl }}
          borderRadius={bRadius}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Discount View */}
        {discount ? (
          <View style={styles.discountContainer}>
            <Text style={styles.discount}>
              {"-"}
              {discount * 100}
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
              {(price - price * discount).toFixed(2)}
            </Text>

            {discount ? (
              <Text style={styles.priceStrike}>
                {"$"}
                {price.toFixed(2)}
              </Text>
            ) : null}
          </View>
        </View>

        <View style={styles.bottomRight}>
          <TouchableOpacity activeOpacity={0.5} style={styles.btn}>
            <MaterialIcons
              name="favorite-outline"
              size={24}
              color={COLORS.primary}
            />
          </TouchableOpacity>
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
  btn: {
    alignSelf: "center",
  },
});
