import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import HeaderStyles from "../components/utilities/HeaderStyles";

export default function SearchScreen({ navigation }) {
  // Header Styling//
  useLayoutEffect(() => {
    navigation.setOptions(HeaderStyles);
  }, [navigation]);
  //Header Styling Ends//

  return (
    <View>
      <Text>SearchScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
