import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import ProductBox from "./ProductBox";
import ListEmptyIndicator from "./utilities/ListEmptyIndicator";

export default function VerticalProductList({
  data,
  emptyComponent = false,
  padding,
  size,
  subtract,
}) {
  return (
    <View
      style={{
        margin: 10,
        flex: 1,
      }}
    >
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 10,
        }}
        renderItem={({ item }) => <ProductBox product={item} />}
        ListEmptyComponent={
          emptyComponent ? (
            <ListEmptyIndicator
              padding={padding}
              size={size}
              subtract={subtract}
            />
          ) : null
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
