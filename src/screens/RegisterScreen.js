import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  Platform,
  Text,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { TextInput } from "react-native-paper";

import React, { useState } from "react";
import { COLORS } from "../data/Constants";
import HeaderImageFade from "../components/utilities/HeaderImageFade";
import ButtonBig from "../components/utilities/ButtonBig";

//Firebase imports
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import ActivityIndicatorModal from "../components/utilities/ActivityIndicatorModal";

function RegisterScreen({ navigation }) {
  //States for inputs//
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //State end//

  //State for authentication process//
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  //State ends//

  //Register function//
  const Register = () => {
    createUserWithEmailAndPassword(auth, email.trim(), password)
      .then((authUser) => console.log(authUser.email))
      .catch((error) => {
        alert(error.message);
        setIsAuthenticating(false);
      });
  };
  //Register ends//

  //Function to validate text boxes//
  const onRegisterPress = () => {
    if (!name) {
      alert("Please enter your name");
    }
    if (name && !email) {
      alert("Please enter your e-mail");
    }
    if (name && email && !password) {
      alert("Please enter your password");
    }
    if (name && email && password && !confirmPassword) {
      alert("Please confirm your password");
    }
    if (
      name &&
      email &&
      password &&
      confirmPassword &&
      password != confirmPassword
    ) {
      alert("The passwords do not match");
    }
    if (
      name &&
      email &&
      password &&
      confirmPassword &&
      password === confirmPassword
    ) {
      Register();
      setIsAuthenticating(true);
    }
  };
  //function ends//

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Platform.OS != "web" ? Keyboard.dismiss() : null;
      }}
    >
      <SafeAreaView style={styles.container}>
        {/* Authenticating Activity Indicator */}
        <ActivityIndicatorModal isVisible={isAuthenticating} />
        {/* Authenticating Activity Indicator */}

        <View style={styles.page}>
          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
            <HeaderImageFade
              source={require("../../assets/images/register_fruit.jpg")}
            />

            <View style={{ paddingHorizontal: 20 }}>
              <Text style={styles.title}>Register to GroMart</Text>
              <Text style={styles.subtitle}>
                Enter your credentials to create your account
              </Text>
            </View>

            <View style={{ paddingTop: 10 }}>
              <TextInput
                label="Full Name"
                mode="outlined"
                outlineColor={COLORS.box}
                activeOutlineColor={COLORS.primary}
                theme={{ roundness: 10 }}
                style={styles.input}
                onChangeText={(text) => setName(text)}
                value={name}
              />

              <TextInput
                label="Email"
                mode="outlined"
                outlineColor={COLORS.box}
                activeOutlineColor={COLORS.primary}
                theme={{ roundness: 10 }}
                style={styles.input}
                onChangeText={(text) => setEmail(text)}
                value={email}
              />

              <TextInput
                label="Password"
                mode="outlined"
                secureTextEntry
                outlineColor={COLORS.box}
                activeOutlineColor={COLORS.primary}
                theme={{ roundness: 10 }}
                style={styles.input}
                onChangeText={(text) => setPassword(text)}
                value={password}
              />

              <TextInput
                label="Confirm Password"
                mode="outlined"
                secureTextEntry
                outlineColor={COLORS.box}
                activeOutlineColor={COLORS.primary}
                theme={{ roundness: 10 }}
                style={styles.input}
                onChangeText={(text) => setConfirmPassword(text)}
                value={confirmPassword}
              />
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <ButtonBig title={"Register"} onPress={() => onRegisterPress()} />

            <View style={styles.option}>
              <Text>Already have an account ? </Text>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigation.replace("Login")}
              >
                <Text style={{ color: COLORS.primary }}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  page: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    color: COLORS.text,
    fontSize: 27,
    fontWeight: "bold",
    marginVertical: 5,
  },
  subtitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "100",
  },
  input: {
    marginVertical: 5,
    marginHorizontal: 20,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  option: {
    paddingBottom: 10,
    justifyContent: "center",
    flexDirection: "row",
  },
});
