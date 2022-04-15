import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SafeArea from "../components/utilities/SafeArea";
import { COLORS } from "../data/Constants";

export default function ProfileScreen() {
  return (
    <SafeArea>
      <View style={styles.container}>
        <Text>ProfileScreen</Text>
      </View>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
