import { StyleSheet, Image, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function HeaderImageFade({ source }) {
  return (
    <View style={styles.headContainer}>
      <Image source={source} style={styles.image} resizeMode="cover" />
      <LinearGradient
        colors={["transparent", "rgba(255,255,255,1)"]}
        style={styles.overlay}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headContainer: {
    height: 250,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
});
