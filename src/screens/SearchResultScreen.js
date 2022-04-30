import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import HeaderStyles from "../components/utilities/HeaderStyles";
import { COLORS } from "../data/Constants";

export default function SearchResultScreen({ navigation, route }) {
  const { title } = route.params;

  // Header Styling//
  useLayoutEffect(() => {
    navigation.setOptions(HeaderStyles(title));
  }, [navigation]);
  //Header Styling Ends//

  return (
    <View style={styles.container}>
      <Text>SearchResultScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
