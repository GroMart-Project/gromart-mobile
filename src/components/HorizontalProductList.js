import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import ProductBox from "./ProductBox";

export default function HorizontalProductList({ data }) {
  return (
    <View
      style={{
        marginHorizontal: 10,
      }}
    >
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              marginVertical: 5,
              marginHorizontal: 10,
            }}
          >
            <ProductBox product={item} />
          </View>
        )}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
    </View>
  );
}

const styles = StyleSheet.create({});
