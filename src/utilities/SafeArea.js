import { StyleSheet, SafeAreaView, StatusBar } from "react-native";
import React from "react";

export default function SafeArea({ children }) {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight ? StatusBar.currentHeight : 0,
  },
});
