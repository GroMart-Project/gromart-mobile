import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../data/Constants";

export default function DetailsScreen() {
  return (
    <View style={styles.container}>
      <Text>DetailsScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
