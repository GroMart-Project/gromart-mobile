import { StyleSheet, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../data/Constants";
import HomeSection from "../components/HomeSection";
import ListEmptyIndicator from "../components/utilities/ListEmptyIndicator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { loadProducts } from "../redux/cartSlice";

//Firebase imports//
import { fetchSectionsData } from "../utilities/firestoreQueries";

export default function HomeScreen({ navigation }) {
  //load cart from async storage
  const dispatch = useDispatch();

  useEffect(() => {
    AsyncStorage.getItem("cartItems").then((data) => {
      const parsed = JSON.parse(data);
      dispatch(loadProducts(parsed));
    });
  }, []);
  //fetch ends//

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
        ListEmptyComponent={<ListEmptyIndicator padding="tab" size={50} />}
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
