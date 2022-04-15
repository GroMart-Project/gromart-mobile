import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import SafeArea from "../components/utilities/SafeArea";
import { COLORS } from "../data/Constants";
import ProfileHeader from "../components/utilities/ProfileHeader";
import { Card } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

export default function ProfileScreen() {
  return (
    <SafeArea>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          {/* Profile Header */}
          <ProfileHeader>
            <Text>Eric Ayizanga</Text>
          </ProfileHeader>
          {/* Profile Header ends */}

          <View style={styles.optionsList}>
            <Card style={styles.card} elevation={4}>
              <View style={styles.titleContainer}>
                <View>
                  <MaterialIcons name="person" size={30} color={COLORS.text} />
                </View>
                <Text style={styles.title}>Edit Profile</Text>
              </View>
            </Card>

            <Card style={styles.card} elevation={4}>
              <View style={styles.titleContainer}>
                <View>
                  <MaterialIcons name="person" size={30} color={COLORS.text} />
                </View>
                <Text style={styles.title}>Edit Profile</Text>
              </View>
            </Card>
          </View>
        </ScrollView>
      </View>
    </SafeArea>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
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
