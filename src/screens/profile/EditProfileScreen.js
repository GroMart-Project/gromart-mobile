import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import HeaderStyles from "../../components/utilities/HeaderStyles";
import { COLORS } from "../../data/Constants";
import { Card } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import EditNameModal from "../../components/EditNameModal";
import EditPhoneModal from "../../components/EditPhoneModal";

//Firebase imports
import { auth } from "../../../firebase";
import { signOut } from "firebase/auth";
import { fetchUserData } from "../../utilities/firestoreQueries";

export default function EditProfileScreen({ navigation }) {
  // Header Styling//
  useLayoutEffect(() => {
    navigation.setOptions(HeaderStyles());
  }, [navigation]);
  //Header Styling Ends//

  //fetch user data realtime//
  const [userData, setUserData] = useState();

  useEffect(() => {
    const unsubscribe = fetchUserData(setUserData);
    return unsubscribe;
  }, []);
  //fetch ends///

  //Destructure user data//
  const name = userData?.name;
  const imageUri = userData?.imageUri;
  const phoneNumber = userData?.phoneNumber;
  //get ends//

  //edit name modal visibility state//
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  //state ends//

  return (
    <View style={styles.container}>
      {/* Edit name modal */}
      <EditNameModal
        isVisible={isEditingName}
        setIsVisible={setIsEditingName}
      />
      {/* Edit name modal end*/}

      {/* Edit phone modal */}
      <EditPhoneModal
        isVisible={isEditingPhone}
        setIsVisible={setIsEditingPhone}
      />
      {/* Edit phone modal  end */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Profile Pic */}
        <Card style={styles.imageCard} elevation={4}>
          <View style={styles.imageContainer}>
            <Card.Cover
              source={{ uri: imageUri }}
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
              <Text style={styles.name}>{name} </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => setIsEditingName(true)}
              style={{ marginLeft: "auto" }}
            >
              <MaterialIcons name="edit" size={30} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </Card>
        {/* Name Card end */}

        {/* Phone card */}
        <Card style={styles.card} elevation={4}>
          <View style={styles.nameContainer}>
            <View>
              <Text style={styles.label}>Phone</Text>
              <Text style={styles.name}>
                {phoneNumber ? phoneNumber : "No Number Added"}
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => setIsEditingPhone(true)}
              style={{ marginLeft: "auto" }}
            >
              <MaterialIcons name="edit" size={30} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </Card>
        {/* Phone Card end */}
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
