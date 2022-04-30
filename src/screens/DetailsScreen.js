import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { COLORS } from "../data/Constants";
import HeaderStyles from "../components/utilities/HeaderStyles";
import { Card } from "react-native-paper";
import ButtonSmall from "../components/utilities/ButtonSmall";
import { MaterialIcons } from "@expo/vector-icons";

export default function DetailsScreen({ navigation, route }) {
  //Destructuring  the data from route//
  const { title, description, imageUri, price, discount } =
    route?.params?.product;
  //Destructuring ends//

  // Header Styling//
  useLayoutEffect(() => {
    navigation.setOptions(HeaderStyles());
  }, [navigation]);
  //Header Styling Ends//

  return (
    <View style={styles.container}>
      {/* Upper ScrollView */}

      {/* Scroll Section Begins */}
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Image Card */}
        <Card style={styles.card} onPress={() => null} elevation={4}>
          {/* Image */}
          <View style={styles.imageContainer}>
            <Card.Cover
              source={{ uri: imageUri }}
              borderRadius={bRadius}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          {/* Image Ends */}
        </Card>
        {/* Image Card ends */}

        {/* Title Card */}
        <Card style={styles.card} elevation={4}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity activeOpacity={0.5}>
              <MaterialIcons
                name="favorite-outline"
                size={30}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>
        </Card>
        {/* Title Card end */}

        {/* Description Card */}
        <Card style={styles.card} elevation={4}>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionHead}>Description</Text>
            <Text style={styles.descriptionBody}>{description}</Text>
          </View>
        </Card>
        {/* Description Card end */}
      </ScrollView>
      {/* Scroll Section end */}

      <View style={styles.footer}>
        {/* Price Section */}
        <View style={styles.bottomSection}>
          <Text style={styles.label}>Price</Text>
          <Text style={styles.price}>
            {"$"}
            {(price - price * discount).toFixed(2)}
          </Text>
        </View>
        {/* Price Section Ends */}

        {/* Discount Section*/}
        {discount ? (
          <View style={styles.bottomSection}>
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
                {(discount * 100).toFixed(0)}
                {"%"}
              </Text>
            </View>
          </View>
        ) : null}
        {/* Discount Section */}

        {/* Button Section */}
        <View style={styles.bottomSection}>
          <ButtonSmall
            title={"Add to Cart"}
            onPress={() => console.log("Add to cart pressed")}
          />
        </View>
        {/* Button Section ends */}
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
  titleContainer: {
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  title: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: "bold",
    marginRight: "auto",
    paddingRight: 35,
  },
  descriptionContainer: {
    padding: 10,
  },
  descriptionHead: {
    color: COLORS.text,
    fontSize: 18,
    marginVertical: 2,
  },
  descriptionBody: {
    color: COLORS.text,
    fontSize: 15,
    padding: 10,
    lineHeight: 24,
  },
  footer: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 70,
    paddingHorizontal: 10,
  },
  bottomSection: {
    margin: 10,
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
