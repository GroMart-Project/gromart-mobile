import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function SectionScreen({ route }) {
  const { title } = route.params;
  return (
    <View>
      <Text>SectionScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
