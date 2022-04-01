import { StyleSheet, SafeAreaView, FlatList, Dimensions } from "react-native";
import React from "react";

import SlideData from "../data/SlideData";
import Slide from "../components/Slide";

const { width, height } = Dimensions.get("window");

export default function OnboardingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={SlideData}
        renderItem={({ item }) => <Slide item={item} />}
        contentContainerStyle={styles.listContainer}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    height: height * 0.75,
  },
});
