import { StyleSheet, View, TouchableOpacity, FlatList } from "react-native";
import React, { useLayoutEffect } from "react";
import { COLORS } from "../data/Constants";
import { MaterialIcons } from "@expo/vector-icons";
import HomeSection from "../components/HomeSection";
import SectionsData from "../data/SectionsData";

export default function HomeScreen({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        color: COLORS.text,
        fontSize: 22,
      },
      headerTintColor: COLORS.primary,
      headerRight: () => (
        <TouchableOpacity activeOpacity={0.5} style={{ paddingHorizontal: 10 }}>
          <MaterialIcons name="shopping-cart" size={24} color={COLORS.text} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

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
