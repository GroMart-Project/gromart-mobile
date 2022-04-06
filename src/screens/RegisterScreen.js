import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { TextInput } from "react-native-paper";

import React from "react";
import { COLORS } from "../data/Constants";
import HeaderImageFade from "../components/utilities/HeaderImageFade";
import ButtonBig from "../components/utilities/ButtonBig";

const { height } = Dimensions.get("window");

export default function RegisterScreen() {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <HeaderImageFade
          source={require("../../assets/images/register_fruit.jpg")}
        />

        <View style={styles.body}>
          <Text>Register to GroMart</Text>
          <Text>Enter your credentials to create your account</Text>

          <TextInput
            label="Full Name"
            mode="outlined"
            outlineColor={COLORS.box}
            activeOutlineColor={COLORS.primary}
          />

          <TextInput
            label="Email"
            mode="outlined"
            outlineColor={COLORS.box}
            activeOutlineColor={COLORS.primary}
          />

          <TextInput
            label="Password"
            mode="outlined"
            secureTextEntry
            outlineColor={COLORS.box}
            activeOutlineColor={COLORS.primary}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <ButtonBig
          title={"Register"}
          onPress={() => console.log("Register pressed")}
        />

        <View style={styles.option}>
          <Text>Already have an account ? </Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => console.log("login pressed")}
          >
            <Text style={{ color: COLORS.primary }}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  body: {
    padding: 10,
  },
  footer: {
    paddingHorizontal: 20,
    height: height * 0.2,
    justifyContent: "center",
  },
  option: {
    paddingBottom: 10,
    justifyContent: "center",
    flexDirection: "row",
  },
});
