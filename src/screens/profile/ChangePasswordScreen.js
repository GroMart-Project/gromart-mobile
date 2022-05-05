import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { COLORS } from "../../data/Constants";
import { TextInput } from "react-native-paper";
import ButtonBig from "../../components/utilities/ButtonBig";

export default function ChangePasswordScreen({ navigation }) {
  //text boxes states//
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //state end//

  // password visibility state//
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  //state ends//

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={styles.title}>Change Your Password</Text>
          <Text style={styles.subtitle}>
            Please enter your old password and the new password you want to
            change to
          </Text>
        </View>

        <View style={{ paddingTop: 10 }}>
          <TextInput
            label="Current Password"
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
          />

          <TextInput
            label="New Password"
            mode="outlined"
            secureTextEntry
            outlineColor={COLORS.box}
            activeOutlineColor={COLORS.primary}
            theme={{ roundness: 10 }}
            style={styles.input}
            onChangeText={(text) => setNewPassword(text)}
            value={newPassword}
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
            right={
              confirmPassword && (
                <TextInput.Icon
                  name={
                    newPassword == confirmPassword
                      ? "checkbox-marked-circle-outline"
                      : "alert-circle-outline"
                  }
                  color={
                    newPassword == confirmPassword ? "limegreen" : "firebrick"
                  }
                  size={26}
                  disabled={true}
                  style={{
                    opacity: 1,
                  }}
                />
              )
            }
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
