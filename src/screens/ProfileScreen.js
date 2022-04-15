import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import SafeArea from "../components/utilities/SafeArea";
import { COLORS } from "../data/Constants";
import ProfileHeader from "../components/utilities/ProfileHeader";
import { Card } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import OptionsData from "../data/OptionsData";

export default function ProfileScreen() {
  return (
    <SafeArea>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          {/* Profile Header */}
          <ProfileHeader>
            {/* Profile Pic */}
            <Card style={styles.imageCard} elevation={4}>
              <View style={styles.imageContainer}>
                <Card.Cover
                  source={require("../../assets/images/register_fruit.jpg")}
                  borderRadius={bRadius}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
            </Card>
            {/* Profile Pic end */}
          </ProfileHeader>
          {/* Profile Header ends */}

          {/* Option List */}
          <View style={styles.optionsList}>
            {OptionsData.map((option) => (
              <OptionCard key={option.id} data={option} />
            ))}
          </View>
          {/* Option list end */}
        </ScrollView>
      </View>
    </SafeArea>
  );

  function OptionCard({ data }) {
    //Destructure Data//
    const { title, icon, route } = data;
    //Destructure ends//

    return (
      <Card style={styles.card} elevation={4}>
        <View style={styles.titleContainer}>
          <View>
            <MaterialIcons name={icon} size={30} color={COLORS.text} />
          </View>
          <Text style={styles.title}>{title}</Text>
        </View>
      </Card>
    );
  }
}

const { width } = Dimensions.get("window");
const bRadius = 20;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // image styles
  imageCard: {
    width: 100,
    borderRadius: bRadius,
    marginVertical: 5,
  },
  imageContainer: {
    backgroundColor: "white",
    padding: 2.5,
    borderRadius: bRadius,
  },
  image: {
    backgroundColor: "white",
    height: 100,
    borderRadius: bRadius,
  },
  //image style ends//

  optionsList: {
    alignItems: "center",
    marginTop: -30,
  },
  card: {
    width: width - 30,
    borderRadius: 10,
    marginBottom: 15,
  },
  titleContainer: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 15,
    alignItems: "center",
  },
  title: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
  },
});
