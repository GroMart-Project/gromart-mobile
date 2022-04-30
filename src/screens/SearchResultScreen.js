import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import HeaderStyles from "../components/utilities/HeaderStyles";

export default function SearchResultScreen() {
  // Header Styling//
  useLayoutEffect(() => {
    navigation.setOptions(HeaderStyles("result"));
  }, [navigation]);
  //Header Styling Ends//

  return (
    <View>
      <Text>SearchResultScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
