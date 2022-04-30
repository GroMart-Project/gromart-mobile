import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import HeaderStyles from "../components/utilities/HeaderStyles";
import { COLORS } from "../data/Constants";
import { Searchbar } from "react-native-paper";

export default function SearchScreen({ navigation }) {
  // Header Styling//
  useLayoutEffect(() => {
    navigation.setOptions(HeaderStyles());
  }, [navigation]);
  //Header Styling Ends//

  //State for searched products//
  const [searchedProducts, setSearchedProducts] = useState();
  //State ends//

  //Function for searching//
  const Search = async (searchKeyword) => {};
  //function ends//

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "white" }}>
        <Searchbar
          placeholder="Search"
          style={{ margin: 10 }}
          theme={{ roundness: 10 }}
        />
        <View></View>
      </View>
      <Text>SearchScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
