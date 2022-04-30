import { StyleSheet, View, FlatList } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { COLORS } from "../data/Constants";
import HomeSection from "../components/HomeSection";
import HeaderStyles from "../components/utilities/HeaderStyles";

//Firebase imports//
import { fetchSectionsData } from "../utilities/firestoreQueries";

export default function HomeScreen({ navigation }) {
  // Header Styling//
  useLayoutEffect(() => {
    navigation.setOptions(HeaderStyles());
  }, [navigation]);
  //Header Styling Ends//

  //fetch data for sections//
  const [sectionsData, setSectionsData] = useState([]);

  useEffect(() => {
    fetchSectionsData(setSectionsData).catch((error) => console.log(error));
  }, []);

  //fetch ends//

  return (
    <View style={styles.container}>
      <FlatList
        data={sectionsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HomeSection data={item} navigation={navigation} />
        )}
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
