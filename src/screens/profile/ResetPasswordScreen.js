import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import HeaderStyles from "../../components/utilities/HeaderStyles";
import { COLORS } from "../../data/Constants";
import { TextInput } from "react-native-paper";
import ButtonBig from "../../components/utilities/ButtonBig";

export default function ResetPasswordScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={styles.title}>Reset Your Password</Text>
          <Text style={styles.subtitle}>
            Please enter your old password and the new password to reset
          </Text>
        </View>

        <View style={{ paddingTop: 10 }}>
          <TextInput
            label="Current Password"
            mode="outlined"
            outlineColor={COLORS.box}
            activeOutlineColor={COLORS.primary}
            theme={{ roundness: 10 }}
            style={styles.input}
          />

          <TextInput
            label="New Password"
            mode="outlined"
            secureTextEntry
            outlineColor={COLORS.box}
            activeOutlineColor={COLORS.primary}
            theme={{ roundness: 10 }}
            style={styles.input}
          />

          <TextInput
            label="Confirm Password"
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
        <ButtonBig
          title={"Confirm"}
          onPress={() => console.log("reset pressed")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  },
});
