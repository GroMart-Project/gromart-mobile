import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import ProductBox from "./ProductBox";

export default function HorizontalProductList({ data }) {
  return (
    <View
      style={{
        margin: 10,
      }}
    >
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              margin: 5,
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
