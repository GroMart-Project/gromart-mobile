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

import React from "react";
import { COLORS } from "../data/Constants";
import HeaderImageFade from "../components/utilities/HeaderImageFade";
import ButtonBig from "../components/utilities/ButtonBig";

function LoginScreen({ navigation }) {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Platform.OS != "web" ? Keyboard.dismiss() : null;
      }}
    >
      <SafeAreaView style={styles.container}>
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
              />

              <TextInput
                label="Password"
                mode="outlined"
                secureTextEntry
                outlineColor={COLORS.box}
                activeOutlineColor={COLORS.primary}
                theme={{ roundness: 10 }}
                style={styles.input}
              />
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => console.log("Forgot password pressed")}
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

            <ButtonBig
              title={"Login"}
              onPress={() => navigation.replace("Main")}
            />

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
