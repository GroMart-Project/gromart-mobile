import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../data/Constants";
import { IconButton } from "react-native-paper";

export default function CartItemBox({ data }) {
  const { title, imageUri, price, cartQuantity } = data;

  const size = Dimensions.get("window").width * 0.3;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUri }}
          style={{ width: size, height: size, borderRadius: imageRadius }}
        />
      </View>

      <View style={styles.middle}>
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.price}>
            {"$"}
            {price.toFixed(2)}
          </Text>
        </View>
        <View style={styles.counter}>
          <IconButton
            icon={"minus"}
            size={24}
            color={COLORS.primary}
            onPress={() => console.log("minus")}
            style={styles.icon}
          />
          <Text style={styles.quantity}>{cartQuantity}</Text>
          <IconButton
            icon={"plus"}
            size={24}
            color={COLORS.primary}
            onPress={() => console.log("plus")}
            style={styles.icon}
          />
        </View>
      </View>

      <IconButton
        icon={"delete-outline"}
        size={35}
        color={COLORS.primary}
        onPress={() => console.log("delete")}
      />
    </View>
  );
}

const imageRadius = 10;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    padding: 10,
  },
  imageContainer: {
    borderColor: COLORS.box,
    borderWidth: 1,
    borderRadius: imageRadius,
  },
  middle: {
    flex: 1,
    margin: 5,
  },
  title: {
    color: COLORS.text,
    fontSize: 18,
    marginRight: "auto",
    paddingRight: 35,
  },
  price: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: "bold",
    marginRight: "auto",
    paddingRight: 35,
  },
  counter: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
  },
  icon: {
    borderColor: COLORS.box,
    borderWidth: 1,
  },
  quantity: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
});
