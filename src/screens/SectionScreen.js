import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import HeaderStyles from "../components/utilities/HeaderStyles";

export default function SectionScreen({ navigation, route }) {
  const { title, sectionProducts } = route.params;

  // Header Styling//
  const canGoBack = navigation.canGoBack();
  const goBack = () => navigation.goBack();
  console.log(canGoBack);
  useLayoutEffect(() => {
    navigation.setOptions(HeaderStyles(title, canGoBack, goBack));
  }, [navigation]);
  //Header Styling Ends//

  console.log(sectionProducts);
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
