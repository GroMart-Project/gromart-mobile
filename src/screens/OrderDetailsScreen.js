import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { COLORS } from "../data/Constants";
import { Card, Divider } from "react-native-paper";

export default function OrderDetailsScreen({ route }) {
  //destructure data//
  const {
    id,
    orderItems,
    placedOn,
    orderTotalQuantity,
    orderTotalAmount,
    orderStatus,
    paymentMethod,
    deliveryAddress,
    deliveryFee,
  } = route.params?.data;
  //end//

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Order info Section */}
        <View>
          <View style={styles.top}>
            <Text style={[styles.sectionTitle, {}]}>Order Information</Text>
          </View>

          <View style={{ marginVertical: 5 }}>
            {/* Order info card */}
            <Card style={styles.card} elevation={2}>
              <View style={styles.cardContent}>
                <Text style={[styles.cardText, { marginLeft: 5 }]}>
                  {"Order "}
                  {id}
                </Text>
                <Text style={styles.cardSubtext}>
                  {"Placed on"} {placedOn.toDate().toLocaleDateString()}
                </Text>
                <Text style={styles.cardSubtext}>
                  {"No. of items: "}
                  {orderTotalQuantity}
                </Text>
                <Text style={styles.cardSubtext}>
                  {"Total: $"}
                  {(orderTotalAmount + deliveryFee).toFixed(2)}
                </Text>
              </View>
            </Card>
            {/* Order info card */}
          </View>
        </View>
        {/* Order info Section */}

        {/* items Section */}
        <View style={styles.section}>
          <View style={styles.top}>
            <Text style={[styles.sectionTitle, {}]}>Items in Your Order</Text>
            <View style={styles.statusBox}>
              <Text style={styles.statusText}>{orderStatus.toUpperCase()}</Text>
            </View>
          </View>

          <View style={{ marginVertical: 5 }}>
            {/* order items card */}
            {orderItems.map((item) => (
              <OrderItem orderItem={item}></OrderItem>
            ))}
            {/* order items card */}
          </View>
        </View>
        {/* items Section */}

        {/* Payment Section */}
        <View style={styles.section}>
          <View style={styles.top}>
            <Text style={[styles.sectionTitle, {}]}>Payment</Text>
          </View>

          <View style={{ marginVertical: 5 }}>
            {/* payment method card */}
            <Card style={styles.card} elevation={2}>
              <View style={styles.cardContent}>
                <Text style={styles.label}>Payment Method</Text>
                <Text style={[styles.cardText, { marginTop: 5 }]}>
                  {paymentMethod}
                </Text>
              </View>
            </Card>
            {/* payment method card */}

            {/* payment details card */}
            <Card style={styles.card} elevation={2}>
              <View style={styles.cardContent}>
                <Text style={styles.label}>Payment Details</Text>

                <View style={{ marginHorizontal: 10, marginTop: 5 }}>
                  <View style={styles.costContainer}>
                    <Text style={[styles.title, { marginRight: "auto" }]}>
                      Items Total
                    </Text>
                    <Text style={styles.title}>
                      {"$"}
                      {orderTotalAmount.toFixed(2)}
                    </Text>
                  </View>

                  <View style={styles.costContainer}>
                    <Text style={[styles.title, { marginRight: "auto" }]}>
                      Delivery Fee
                    </Text>
                    <Text
                      style={[
                        styles.title,
                        { color: COLORS.box, fontWeight: "bold" },
                      ]}
                    >
                      {"$"}
                      {deliveryFee.toFixed(2)}
                    </Text>
                  </View>

                  <Divider style={{ marginVertical: 10 }} />

                  <View style={styles.costContainer}>
                    <Text style={[styles.title, { marginRight: "auto" }]}>
                      Total
                    </Text>
                    <Text
                      style={[
                        styles.title,
                        { color: COLORS.primary, fontWeight: "bold" },
                      ]}
                    >
                      {"$"}
                      {(orderTotalAmount + deliveryFee).toFixed(2)}
                    </Text>
                  </View>
                </View>
              </View>
            </Card>
            {/* payment details card */}
          </View>
        </View>
        {/* Payment Section */}

        {/* Delivery Section */}
        <View style={styles.section}>
          <View style={styles.top}>
            <Text style={[styles.sectionTitle, {}]}>Delivery Details</Text>
          </View>

          <View style={{ marginVertical: 5 }}>
            {/* address card */}
            <Card style={styles.card} elevation={2}>
              <View style={styles.cardContent}>
                <Text style={styles.label}>Address</Text>
                <Text style={[styles.cardText, { marginTop: 5 }]}>
                  {deliveryAddress?.addressLine}
                </Text>
                <Text style={styles.cardSubtext}>
                  {deliveryAddress?.city}
                  {" - "}
                  {deliveryAddress?.region}
                </Text>
              </View>
            </Card>
            {/* address card */}
          </View>
        </View>
        {/* Delivery Section */}
      </ScrollView>
    </View>
  );
}

//get width
const { width } = Dimensions.get("window");
const size = width * 0.25;
const imageRadius = 10;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    alignItems: "center",
  },
  section: {
    marginTop: 20,
  },
  top: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "bold",
    marginRight: "auto",
    paddingVertical: 5,
  },

  //card
  card: {
    width: width - 20,
    borderRadius: 10,
    marginVertical: 5,
  },
  cardContent: {
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  label: {
    color: COLORS.text,
    fontSize: 12,
  },
  cardText: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  cardSubtext: {
    color: COLORS.text,
    fontSize: 14,
    marginHorizontal: 10,
  },

  //items card
  imageContainer: {
    borderColor: COLORS.box,
    borderWidth: 1,
    borderRadius: imageRadius,
  },
  middle: {
    flex: 1,
    margin: 2.5,
    marginLeft: 10,
  },
  title: {
    color: COLORS.text,
    fontSize: 18,
  },
  subtitle: {
    color: COLORS.text,
    fontSize: 14,
  },
  subtext: {
    color: COLORS.text,
    fontSize: 12,
  },

  //status
  statusBox: {
    backgroundColor: COLORS.primary,
    borderRadius: 5,
  },
  statusText: {
    color: "white",
    fontSize: 14,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },

  //cost
  costContainer: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 2,
  },
});

const OrderItem = ({ orderItem }) => {
  return (
    <Card style={styles.card} elevation={2}>
      <View
        style={[
          styles.cardContent,
          {
            flexDirection: "row",
            alignItems: "center",
          },
        ]}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: orderItem.imageUri,
            }}
            style={{
              width: size,
              height: size,
              borderRadius: imageRadius,
            }}
          />
        </View>

        <View style={styles.middle}>
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={styles.title}>{orderItem.title}</Text>
            </View>

            <View>
              <Text style={styles.subtext}>
                {"Quantity: "}
                {orderItem.cartQuantity}
              </Text>
              <Text style={styles.subtext}>
                {"Unit Price: "}
                {orderItem.price.toFixed(2)}
              </Text>
              <Text style={styles.subtext}>
                {"Total Price: $"}
                {(orderItem.price * orderItem.cartQuantity).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Card>
  );
};
