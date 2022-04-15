import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../data/Constants";

export default function ProfileHeader({ children }) {
  return (
    <View style={styles.headContainer}>
      <Image
        source={require("../../../assets/images/profile_cover.jpg")}
        style={styles.image}
        resizeMode="cover"
      />
      <LinearGradient
        colors={["transparent", "rgba(0,153,101,0.2)", "rgba(0,153,101,0.7)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        locations={[0.0, 0.3, 1.0]}
        style={styles.overlay}
      />
      <View style={styles.overlayCentre}>{children}</View>
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
  overlayCentre: {
    position: "absolute",
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
});
