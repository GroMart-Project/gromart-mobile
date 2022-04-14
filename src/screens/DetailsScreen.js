import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { COLORS } from "../data/Constants";
import HeaderStyles from "../components/utilities/HeaderStyles";
import { Card } from "react-native-paper";

export default function DetailsScreen({ navigation, route }) {
  //Destructuring  the data from route//
  const { title, imageUrl, price, discount } = route?.params?.product;
  //Destructuring ends//

  // Header Styling//
  useLayoutEffect(() => {
    navigation.setOptions(HeaderStyles());
  }, [navigation]);
  //Header Styling Ends//

  return (
    <View style={styles.container}>
      {/* Upper ScrollView */}

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Image Card */}
        <Card style={styles.card} onPress={() => null} elevation={4}>
          {/* Image */}
          <View style={styles.imageContainer}>
            <Card.Cover
              source={{ uri: imageUrl }}
              borderRadius={bRadius}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          {/* Image Ends */}
        </Card>
        {/* Image Card ends */}
      </ScrollView>
      <View style={styles.footer}>
        {/* Price Section */}
        <View style={{ marginRight: 10 }}>
          <Text style={styles.label}>Price</Text>
          <Text style={styles.price}>
            {"$"}
            {(price - price * discount).toFixed(2)}
          </Text>
        </View>
        {/* Price Section Ends */}

        {/* Discount Section*/}
        {discount ? (
          <View>
            <View style={styles.discountContainer}>
              <Text
                style={[
                  styles.discount,
                  { textDecorationLine: "line-through" },
                ]}
              >
                {"$"}
                {price.toFixed(2)}
              </Text>
            </View>
            <View style={styles.discountContainer}>
              <Text style={styles.discount}>
                {"-"}
                {discount * 100}
                {"%"}
              </Text>
            </View>
          </View>
        ) : null}
        {/* Discount Section */}
      </View>
    </View>
  );
}

const { width } = Dimensions.get("window");
const bRadius = 10;
const discountFontSize = 13;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    paddingVertical: 10,
    alignItems: "center",
  },
  card: {
    width: width - 30,
    borderRadius: bRadius,
    marginVertical: 5,
  },
  imageContainer: {
    backgroundColor: "white",
    padding: 5,
    borderRadius: bRadius,
  },
  image: {
    backgroundColor: "white",
    height: width * 0.9,
  },

  footer: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    height: 70,
    paddingHorizontal: 10,
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
  discountContainer: {
    backgroundColor: "white",
    borderRadius: 5,
    marginBottom: 3,
    elevation: 2,
  },
  discount: {
    color: COLORS.text,
    fontSize: discountFontSize,
    textAlign: "center",
    paddingVertical: 2,
    paddingHorizontal: 7.5,
  },
});
