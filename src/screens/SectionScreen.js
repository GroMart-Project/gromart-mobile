import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function SectionScreen({ route }) {
  const { title, sectionProducts } = route.params;
  console.log(sectionProducts);
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
