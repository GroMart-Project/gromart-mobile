import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

import SlideData from "../data/SlideData";
import Slide from "../components/Slide";
import { COLORS } from "../data/Constants";

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
      <Footer />
    </SafeAreaView>
  );
}

const Footer = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  return (
    <View style={styles.footer}>
      <View style={styles.indicatorContainer}>
        {SlideData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentSlideIndex == index && { backgroundColor: COLORS.primary },
            ]}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    height: height * 0.75,
  },
  footer: {
    height: height * 0.25,
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  indicator: {
    height: 15,
    width: 15,
    borderColor: COLORS.primary,
    borderWidth: 2,
    borderRadius: 100,
    marginHorizontal: 10,
  },
  btn: {
    backgroundColor: COLORS.primary,
    height: 70,
    marginBottom: 20,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontSize: 24,
    fontWeight: "700",
    color: "white",
  },
});
