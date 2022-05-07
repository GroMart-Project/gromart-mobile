import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import SafeArea from "../../components/utilities/SafeArea";
import { COLORS } from "../../data/Constants";
import ProfileHeader from "../../components/utilities/ProfileHeader";
import { Card } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import OptionsData from "../../data/OptionsData";
import ButtonBig from "../../components/utilities/ButtonBig";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/cartSlice";

//Firebase imports
import { auth } from "../../../firebase";
import { signOut } from "firebase/auth";
import { fetchUserData } from "../../utilities/firestoreQueries";

export default function ProfileScreen({ navigation }) {
  //clear cart function//
  const dispatch = useDispatch();

  const onClearCart = () => {
    dispatch(clearCart());
  };
  //function end//

  //Sign out function//
  const Logout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        style: "destructive",
        onPress: () => {
          signOut(auth)
            .then(() => onClearCart())
            .then(() => console.log("signed out"))
            .catch((error) => alert(error.message));
        },
      },
    ]);
  };
  //Sign out ends//

  //fetch user data realtime//
  const [userData, setUserData] = useState();

  useEffect(() => {
    const unsubscribe = fetchUserData(setUserData);
    return unsubscribe;
  }, []);
  //fetch ends///

  //destructure user data
  const name = userData?.name;
  const imageUri = userData?.imageUri;
  //get ends//

  return (
    <SafeArea>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          {/* Profile Header */}
          <ProfileHeader>
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
              </View>
            </Card>
            {/* Profile Pic end */}

            {/* Name */}
            <Text style={styles.name}>{name}</Text>
            {/* Name ends */}
          </ProfileHeader>
          {/* Profile Header ends */}

          {/* Option List */}
          <View style={styles.optionsList}>
            {OptionsData.map((option) => (
              <OptionCard
                key={option.id}
                data={option}
                navigation={navigation}
              />
            ))}
          </View>
          {/* Option list end */}
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <ButtonBig title={"Logout"} onPress={() => Logout()} />
        </View>
        {/* Footer ends */}
      </View>
    </SafeArea>
  );

  function OptionCard({ data }) {
    //Destructure Data//
    const { title, icon, route } = data;
    //Destructure ends//

    return (
      <Card
        style={styles.card}
        elevation={4}
        onPress={() => navigation.navigate(route)}
      >
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

  name: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
    margin: 10,
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
  footer: {
    paddingHorizontal: 20,
  },
});
