import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import CartItemBox from "../components/CartItemBox";
import { COLORS } from "../data/Constants";
import { Button, Divider } from "react-native-paper";
import { useDispatch } from "react-redux";
import { getTotals } from "../redux/cartSlice";

export default function CartScreen() {
  //obtain cart products
  const cart = useSelector((state) => state.cart);
  //end

  //calculate totals
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);
  //end

  return (
    <View style={styles.container}>
      {/* Cart list */}
      <View style={{ flex: 1 }}>
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
      {/* Cart list */}

      <View style={styles.footer}>
        {/* Price Section */}
        <View style={styles.bottomSection}>
          <Text style={styles.label}>Total Price</Text>
          <Text style={styles.price}>
            {"$"}
            {cart.cartTotalAmount?.toFixed(2)}
          </Text>
        </View>
        {/* Price Section Ends */}

        {/* Quantity Section*/}
        <View style={styles.bottomSection}>
          <Text style={styles.label}>Total Quantity</Text>
          <Text style={styles.price}>{cart.cartTotalQuantity}</Text>
        </View>
        {/* Quantity Section */}

        {/* Button Section */}
        <View style={styles.bottomSection}>
          <Button
            mode="contained"
            theme={{ roundness: 25 }}
            labelStyle={styles.button}
            color={COLORS.primary}
            onPress={() => console.log("checkout")}
          >
            Checkout
          </Button>
        </View>
        {/* Button Section ends */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  footer: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 70,
    paddingHorizontal: 10,
    borderTopColor: "rgba(0, 0, 0, 0.05)",
    borderTopWidth: 2,
  },
  bottomSection: {
    margin: 10,
    alignItems: "center",
  },
  label: {
    color: COLORS.text,
    fontSize: 12,
    marginLeft: 5,
  },
  price: {
    color: COLORS.text,
    fontSize: 26,
  },
  button: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    padding: 2.5,
  },
});
