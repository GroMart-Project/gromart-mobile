import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import SafeArea from "../components/utilities/SafeArea";

import SlideData from "../data/SlideData";
import Slide from "../components/Slide";
import { COLORS } from "../data/Constants";
import ButtonBig from "../components/utilities/ButtonBig";

//Get window height
const { width, height } = Dimensions.get("window");

export default function OnboardingScreen({ navigation }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  //Function to update page index state
  const updateCurrentSlideIndex = (e) => {
    const currentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(currentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  //Footer component tree
  const Footer = () => {
    return (
      <View style={styles.footer}>
        <View style={styles.indicatorContainer}>
          {SlideData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor: COLORS.primary,
                },
              ]}
            />
          ))}
        </View>
        <ButtonBig
          title={"Get Started"}
          onPress={() => navigation.replace("Register")}
        />
      </View>
    );
  };

  //Onboarding screen main component tree
  return (
    <SafeArea>
      <FlatList
        data={SlideData}
        renderItem={({ item }) => <Slide item={item} />}
        contentContainerStyle={styles.listContainer}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={updateCurrentSlideIndex}
      />
      <Footer />
    </SafeArea>
  );
}

const styles = StyleSheet.create({
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
