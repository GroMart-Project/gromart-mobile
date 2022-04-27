import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useLayoutEffect } from "react";
import HeaderStyles from "../../components/utilities/HeaderStyles";
import { COLORS } from "../../data/Constants";
import { Card } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

export default function EditProfileScreen({ navigation }) {
  // Header Styling//
  useLayoutEffect(() => {
    navigation.setOptions(HeaderStyles());
  }, [navigation]);
  //Header Styling Ends//

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Profile Pic */}
        <Card style={styles.imageCard} elevation={4}>
          <View style={styles.imageContainer}>
            <Card.Cover
              source={require("../../../assets/images/register_fruit.jpg")}
              borderRadius={bRadius}
              style={styles.image}
              resizeMode="cover"
            />

            {/* Camera Button */}
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.btn}
              onPress={() => console.log("camera pressed")}
            >
              <MaterialIcons
                name="camera-alt"
                size={24}
                color={"white"}
                style={styles.icon}
              />
            </TouchableOpacity>
            {/* Camera Button End */}
          </View>
        </Card>
        {/* Profile Pic end */}

        {/* Name card */}
        <Card style={styles.card} elevation={4}>
          <View style={styles.nameContainer}>
            <View>
              <Text style={styles.label}>Name</Text>
              <Text style={styles.name}>Eric Ayizanga </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => console.log("show modal")}
              style={{ marginLeft: "auto" }}
            >
              <MaterialIcons name="edit" size={30} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </Card>
        {/* Name Card end */}
      </ScrollView>
    </View>
  );
}

const { width } = Dimensions.get("window");
const imgDimensions = 200;
const bRadius = 20;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scroll: {
    paddingVertical: 10,
    alignItems: "center",
  },

  // image styles
  imageCard: {
    width: imgDimensions,
    borderRadius: bRadius,
    margin: 15,
  },
  imageContainer: {
    backgroundColor: "white",
    padding: 2.5,
    borderRadius: bRadius,
  },
  image: {
    backgroundColor: "white",
    height: imgDimensions,
    borderRadius: bRadius,
  },
  //image style ends//

  //Button Styles//
  btn: {
    backgroundColor: COLORS.primary,
    borderColor: "white",
    borderWidth: 3,
    elevation: 4,
    borderRadius: bRadius,
    position: "absolute",
    bottom: -20,
    right: -15,
  },
  icon: {
    padding: 12,
  },
  //Button Styles ends//

  //Name styles//
  card: {
    width: width - 30,
    borderRadius: 10,
    marginTop: 30,
  },
  nameContainer: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 15,
    alignItems: "flex-end",
  },
  name: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  label: {
    color: COLORS.text,
    fontSize: 14,
  },
  //Name styles end
});