import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Appbar, Badge } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../data/Constants";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getTotals } from "../redux/cartSlice";

export default function AppHeader({ tab }) {
  //navigation and route//
  const route = useRoute();
  const navigation = useNavigation();
  //end//

  //obtain cart reducer
  const cart = useSelector((state) => state.cart);
  //end

  //cart functions//
  const dispatch = useDispatch();

  const onClearCart = () => {
    dispatch(clearCart());
  };
  //function end//

  //calculate totals
  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);
  //end

  const title = () => {
    if (route.params?.title) {
      return route.params?.title;
    }
    if (route.params?.searchKey) {
      return route.params?.searchKey;
    } else {
      return route.name;
    }
  };
  const color = COLORS.text;
  const size = 26;

  const _goBack = () => navigation.goBack();
  const _canGoBack = navigation.canGoBack() && !tab;
  const _handleCart = () => navigation.navigate("Cart");

  const cartIcon = (
    <View>
      <Appbar.Action
        icon="cart-outline"
        onPress={_handleCart}
        color={color}
        size={size}
      />
      <Badge size={16} visible={cart.cartTotalQuantity} style={styles.badge}>
        {cart.cartTotalQuantity}
      </Badge>
    </View>
  );

  const clearIcon = (
    <Appbar.Action
      icon="delete-sweep-outline"
      onPress={onClearCart}
      color={color}
      size={size}
    />
  );

  //icon selector
  const icon = () => {
    if (route.name == "Cart") {
      return clearIcon;
    }
    if (route.name == "Checkout") {
      return null;
    } else {
      return cartIcon;
    }
  };

  return (
    <Appbar.Header style={{ backgroundColor: "white" }}>
      {_canGoBack && (
        <Appbar.BackAction onPress={_goBack} color={color} size={size} />
      )}

      <Appbar.Content title={title()} titleStyle={styles.title} />

      {icon()}
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  title: {
    color: COLORS.text,
    fontSize: 22,
  },
  badge: {
    backgroundColor: COLORS.primary,
    position: "absolute",
    top: 6,
    right: 9,
    fontSize: 12,
  },
});
