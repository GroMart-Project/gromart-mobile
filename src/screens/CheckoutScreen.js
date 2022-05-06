import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../data/Constants";
import { Button, Card } from "react-native-paper";
import { fetchUserData } from "../utilities/firestoreQueries";

export default function CheckoutScreen({ navigation }) {
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

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
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
});
