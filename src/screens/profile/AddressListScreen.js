import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import HeaderStyles from "../../components/utilities/HeaderStyles";
import { COLORS } from "../../data/Constants";

export default function AddressListScreen({ navigation }) {
  // Header Styling//
  useLayoutEffect(() => {
    navigation.setOptions(HeaderStyles());
  }, [navigation]);
  //Header Styling Ends//

  return (
    <View style={styles.container}>
      <Text>AddressListScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
