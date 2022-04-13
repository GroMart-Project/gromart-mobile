import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import { COLORS } from "../data/Constants";
import { MaterialIcons } from "@expo/vector-icons";

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
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
