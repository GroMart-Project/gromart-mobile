import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React from "react";
import { COLORS } from "../data/Constants";

const { width } = Dimensions.get("window");

export default function Slide({ item }) {
  return (
    <View style={styles.container}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width,
    justifyContent: "center",
  },
  image: {
    height: "60%",
    width: "90%",
  },
  title: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "100",
    textAlign: "center",
    lineHeight: 23,
    maxWidth: "70%",
    marginTop: 10,
  },
});
