import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import HeaderStyles from "../components/utilities/HeaderStyles";

export default function SectionScreen({ navigation, route }) {
  const { title, sectionProducts } = route.params;

  // Header Styling//
  useLayoutEffect(() => {
    navigation.setOptions(HeaderStyles(title));
  }, [navigation]);
  //Header Styling Ends//

  // console.log(title);
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
