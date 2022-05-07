import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../data/Constants";
import { Button, Card, Divider, RadioButton } from "react-native-paper";
import { fetchUserData } from "../utilities/firestoreQueries";

export default function CheckoutScreen({ navigation, route }) {
  //fetch user data realtime//
  const [userData, setUserData] = useState();

  useEffect(() => {
    const unsubscribe = fetchUserData(setUserData);
    return unsubscribe;
  }, []);
  //fetch ends///

  //Destructure user data//
  const name = userData?.name;
  const phoneNumber = userData?.phoneNumber;
  const deliveryAddress = userData?.deliveryAddress;
  //get ends//

  //get total from route params//
  const { cartTotalAmount } = route?.params?.cart;
  //end//

  //payment radio state//
  const [checked, setChecked] = React.useState("PoD");
  //end//

  //place order function//
  const onPlaceOrder = () => {
    if (!phoneNumber && !deliveryAddress) {
      alert("Please add a valid contact and delivery address");
    } else if (phoneNumber && !deliveryAddress) {
      alert("Please add a valid delivery address");
    } else if (!phoneNumber && deliveryAddress) {
      alert("Please add a valid contact");
    } else {
      console.log("Place Order");
    }
  };
  //end//

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Delivery Details Section */}
        <View style={{}}>
          <View style={styles.top}>
            <Text style={styles.sectionTitle}>Delivery Details</Text>
            <Button
              mode="text"
              compact={true}
              theme={{ roundness: 20 }}
              style={{ marginLeft: 20 }}
              color={COLORS.primary}
              onPress={() => navigation.navigate("Edit Profile")}
            >
              Change
            </Button>
          </View>

          <View style={{ marginVertical: 5, alignItems: "center" }}>
            {/* Contact card */}
            <Card style={styles.card} elevation={2}>
              <View style={styles.cardContent}>
                {phoneNumber ? (
                  <>
                    <Text style={styles.label}>Contact</Text>
                    <Text style={styles.cardText}>{name} </Text>
                    <Text style={styles.cardSubtext}>{phoneNumber} </Text>
                  </>
                ) : (
                  <Text style={styles.notFound}>No Contact Found</Text>
                )}
              </View>
            </Card>
            {/* Contact card */}

            {/* Address card */}
            <Card style={styles.card} elevation={2}>
              <View style={styles.cardContent}>
                {deliveryAddress ? (
                  <>
                    <Text style={styles.label}>Address</Text>
                    <Text style={styles.cardText}>
                      {deliveryAddress?.addressLine}
                    </Text>
                    <Text style={styles.cardSubtext}>
                      {deliveryAddress?.city}
                      {" - "}
                      {deliveryAddress?.region}
                    </Text>
                  </>
                ) : (
                  <Text style={styles.notFound}>No Delivery Address Found</Text>
                )}
              </View>
            </Card>
            {/* Address card */}
          </View>
        </View>
        {/* Delivery Details Section */}

        {/* Payment Section */}
        <View style={{ marginTop: 30 }}>
          <View style={styles.top}>
            <Text style={[styles.sectionTitle, { paddingVertical: 5 }]}>
              Payment
            </Text>
          </View>

          <View style={{ marginVertical: 5, alignItems: "center" }}>
            {/* Pay on Delivery card */}
            <Card
              style={styles.card}
              elevation={2}
              onPress={() => setChecked("PoD")}
            >
              <View
                style={[
                  styles.cardContent,
                  { flexDirection: "row", alignItems: "center" },
                ]}
              >
                <RadioButton
                  value="PoD"
                  status={checked === "PoD" ? "checked" : "unchecked"}
                  onPress={() => setChecked("PoD")}
                />
                <Text style={styles.cardText}>Pay on Delivery </Text>
              </View>
            </Card>
            {/* Pay on Delivery card */}

            {/* MoMo card */}
            <Card
              style={styles.card}
              elevation={2}
              onPress={() => setChecked("MoMo")}
            >
              <View
                style={[
                  styles.cardContent,
                  { flexDirection: "row", alignItems: "center" },
                ]}
              >
                <RadioButton
                  value="MoMo"
                  status={checked === "MoMo" ? "checked" : "unchecked"}
                  onPress={() => setChecked("MoMo")}
                />
                <Text style={styles.cardText}>Mobile Money </Text>
              </View>
            </Card>
            {/* Pay on Delivery card */}
          </View>
        </View>
        {/* Payment Section */}

        {/* Total Section */}
        <View style={styles.total}>
          <View style={styles.costContainer}>
            <Text style={[styles.cost, { marginRight: "auto" }]}>Subtotal</Text>
            <Text style={styles.cost}>
              {"$"}
              {cartTotalAmount.toFixed(2)}
            </Text>
          </View>

          <View style={styles.costContainer}>
            <Text style={[styles.cost, { marginRight: "auto" }]}>
              Delivery Fee
            </Text>
            <Text
              style={[styles.cost, { color: COLORS.box, fontWeight: "bold" }]}
            >
              {"$"}
              {"3.00"}
            </Text>
          </View>

          <Divider style={{ marginVertical: 10 }} />

          <View style={styles.costContainer}>
            <Text style={[styles.cost, { marginRight: "auto" }]}>Total</Text>
            <Text
              style={[
                styles.cost,
                { color: COLORS.primary, fontWeight: "bold" },
              ]}
            >
              {"$"}
              {(cartTotalAmount - 3).toFixed(2)}
            </Text>
          </View>

          <Button
            mode="contained"
            theme={{ roundness: 25 }}
            style={{ marginVertical: 20 }}
            labelStyle={styles.button}
            color={COLORS.primary}
            onPress={onPlaceOrder}
          >
            Place Order
          </Button>
        </View>
        {/* Total Section end */}
      </ScrollView>
    </View>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
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
  notFound: {
    color: COLORS.box,
    fontSize: 14,
    marginVertical: 10,
    textAlign: "center",
  },

  //total//
  total: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 30,
  },
  costContainer: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 2,
  },
  cost: {
    color: COLORS.text,
    fontSize: 18,
  },
  button: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    padding: 2.5,
  },
});
