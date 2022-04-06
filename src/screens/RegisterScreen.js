import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { TextInput } from "react-native-paper";
import React from "react";
import { COLORS } from "../data/Constants";

const { height } = Dimensions.get("window");

export default function RegisterScreen() {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={styles.headContainer}>
          <Image
            source={require("../../assets/images/register_fruit.jpg")}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.overlay} />
        </View>

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
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.btn}
          onPress={() => console.log("register pressed")}
        >
          <Text style={styles.btnText}>Register</Text>
        </TouchableOpacity>

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
    flex: 1,
  },
  headContainer: {
    height: "40%",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  body: {
    padding: 10,
  },
  footer: {
    backgroundColor: "grey",
    paddingHorizontal: 20,
    height: height * 0.2,
    justifyContent: "center",
  },
  btn: {
    backgroundColor: COLORS.primary,
    height: 70,
    marginBottom: 20,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontSize: 24,
    fontWeight: "700",
    color: "white",
  },
  option: {
    paddingBottom: 10,
    justifyContent: "center",
    flexDirection: "row",
  },
});
