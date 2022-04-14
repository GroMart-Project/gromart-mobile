import { StyleSheet, View, FlatList } from "react-native";
import React, { useLayoutEffect } from "react";
import { COLORS } from "../data/Constants";
import HomeSection from "../components/HomeSection";
import SectionsData from "../data/SectionsData";
import HeaderStyles from "../components/utilities/HeaderStyles";

export default function HomeScreen({ navigation }) {
  // Header Styling//
  useLayoutEffect(() => {
    navigation.setOptions(HeaderStyles);
  }, [navigation]);
  //Header Styling Ends//

  return (
    <View style={styles.container}>
      <FlatList
        data={SectionsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <HomeSection data={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
