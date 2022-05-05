import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import CartItemBox from "../components/CartItemBox";
import { COLORS } from "../data/Constants";
import { Divider } from "react-native-paper";

export default function CartScreen() {
  //obtain cart products
  const cart = useSelector((state) => state.cart);
  //end

  return (
    <View style={styles.container}>
      <FlatList
        data={cart.cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CartItemBox data={item} />}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <Divider style={{ width: "90%", alignSelf: "center" }} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
