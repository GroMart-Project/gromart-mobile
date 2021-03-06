import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../../data/Constants";
import { Card, IconButton } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import EditNameModal from "../../components/EditNameModal";
import EditPhoneModal from "../../components/EditPhoneModal";
import * as ImagePicker from "expo-image-picker";

//Firebase imports
import { fetchUserData } from "../../utilities/firestoreQueries";
import EditProfilePicModal from "../../components/EditProfilePicModal";
import EditAddressModal from "../../components/EditAddressModal";

export default function EditProfileScreen({ navigation }) {
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
  const deliveryAddress = userData?.deliveryAddress;
  //get ends//

  //edit name modal visibility state//
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  //state ends//

  //state and function to pick image
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result?.uri);
    }
  };
  //function ends//

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

      {/* Edit phone modal */}
      <EditProfilePicModal image={image} setImage={setImage} />
      {/* Edit phone modal  end */}

      {/* Edit address modal */}
      <EditAddressModal
        isVisible={isEditingAddress}
        setIsVisible={setIsEditingAddress}
      />
      {/* Edit address modal end*/}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Profile Pic */}
        <Card
          style={styles.imageCard}
          elevation={4}
          onPress={() =>
            navigation.navigate("Image Viewer", {
              title: name,
              imageUri: imageUri,
            })
          }
        >
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
              onPress={pickImage}
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

            <View style={{ marginLeft: "auto" }}>
              <IconButton
                icon={"pencil"}
                size={30}
                color={COLORS.primary}
                onPress={() => setIsEditingName(true)}
                style={{ margin: -5 }}
              />
            </View>
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
            <View style={{ marginLeft: "auto" }}>
              <IconButton
                icon={"pencil"}
                size={30}
                color={COLORS.primary}
                onPress={() => setIsEditingPhone(true)}
                style={{ margin: -5 }}
              />
            </View>
          </View>
        </Card>
        {/* Phone Card end */}

        {/* Address card */}
        <Card style={styles.card} elevation={4}>
          <View style={styles.nameContainer}>
            <View>
              <Text style={styles.label}>Address</Text>

              {deliveryAddress ? (
                <View>
                  <Text style={styles.name}>{deliveryAddress.addressLine}</Text>
                  <Text style={[styles.name, { fontSize: 12 }]}>
                    {deliveryAddress.city}
                    {" - "}
                    {deliveryAddress.region}
                  </Text>
                </View>
              ) : (
                <Text style={styles.name}>No Address Added</Text>
              )}
            </View>
            <View style={{ marginLeft: "auto" }}>
              <IconButton
                icon={"pencil"}
                size={30}
                color={COLORS.primary}
                onPress={() => setIsEditingAddress(true)}
                style={{ margin: -5 }}
              />
            </View>
          </View>
        </Card>
        {/* Address Card end */}
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
    marginBottom: 40,
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

  //Card styles//
  card: {
    width: width - 30,
    borderRadius: 10,
    marginVertical: 5,
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
