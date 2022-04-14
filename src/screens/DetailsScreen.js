import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { COLORS } from "../data/Constants";
import HeaderStyles from "../components/utilities/HeaderStyles";

export default function DetailsScreen({ navigation }) {
  // Header Styling//
  useLayoutEffect(() => {
    navigation.setOptions(HeaderStyles());
  }, [navigation]);
  //Header Styling Ends//

  return (
    <View style={styles.container}>
      <Text>DetailsScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
