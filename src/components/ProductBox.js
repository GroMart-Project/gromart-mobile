import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import { Card } from "react-native-paper";

export default function ProductBox({ title }) {
  return (
    <Card style={styles.container}>
      <Text style={{ padding: 10, textAlign: "center" }}>{title}</Text>
    </Card>
  );
}

const width = (Dimensions.get("window").width - 30) / 2;

const styles = StyleSheet.create({
  container: {
    width,
  },
});
