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
import { signInWithEmailAndPassword } from "firebase/auth";
import ActivityIndicatorModal from "../components/utilities/ActivityIndicatorModal";
import ForgotPasswordModal from "../components/ForgotPasswordModal";

function LoginScreen({ navigation }) {
  //States for inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //State end

  //State for authentication process//
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  //State ends//

  //Login function//
  const Login = () => {
    signInWithEmailAndPassword(auth, email.trim(), password)
      .then((authUser) => console.log(authUser.email))
      .catch((error) => {
        alert(error.message);
        setIsAuthenticating(false);
      });
  };
  //Login ends//

  //Function to validate text boxes//
  const onLoginPress = () => {
    if (!email) {
      alert("Please enter your e-mail");
    }
    if (email && !password) {
      alert("Please enter your password");
    }
    if (email && password) {
      Login();
      setIsAuthenticating(true);
    }
  };
  //function ends//

  // password visibility state//
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  //state ends//

  //forgot password modal visibility state//
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  //state end//

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
              source={require("../../assets/images/login_fruit.jpg")}
            />

            <View style={{ paddingHorizontal: 20 }}>
              <Text style={styles.title}>Login to GroMart</Text>
              <Text style={styles.subtitle}>
                Welcome Back! Sign In to your account to continue shopping
              </Text>
            </View>

            <View style={{ paddingTop: 10 }}>
              <TextInput
                label="Email"
                mode="outlined"
                outlineColor={COLORS.box}
                activeOutlineColor={COLORS.primary}
                theme={{ roundness: 10 }}
                style={styles.input}
                onChangeText={(text) => setEmail(text)}
                value={email}
                keyboardType="email-address"
              />

              <TextInput
                label="Password"
                mode="outlined"
                secureTextEntry={isPasswordVisible}
                right={
                  <TextInput.Icon
                    name={isPasswordVisible ? "eye" : "eye-off"}
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    forceTextInputFocus={false}
                    size={26}
                  />
                }
                outlineColor={COLORS.box}
                activeOutlineColor={COLORS.primary}
                theme={{ roundness: 10 }}
                style={styles.input}
                onChangeText={(text) => setPassword(text)}
                value={password}
                onSubmitEditing={() => onLoginPress()}
              />
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => setIsResettingPassword(true)}
            >
              <Text
                style={{
                  color: COLORS.primary,
                  textAlign: "center",
                  paddingVertical: 2.5,
                }}
              >
                Forgot Password ?
              </Text>
            </TouchableOpacity>

            <ButtonBig title={"Login"} onPress={() => onLoginPress()} />

            <View style={styles.option}>
              <Text>Dont't have an account ? </Text>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigation.replace("Register")}
              >
                <Text style={{ color: COLORS.primary }}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* forgot password modal */}
        <ForgotPasswordModal
          isVisible={isResettingPassword}
          setIsVisible={setIsResettingPassword}
        />
        {/* forgot password modal end*/}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

export default LoginScreen;

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
