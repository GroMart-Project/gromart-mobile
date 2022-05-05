import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../data/Constants";

export default function OrdersScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>OrdersScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
