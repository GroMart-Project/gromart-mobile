import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { COLORS } from "../data/Constants";
import { auth } from "../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";

export default function ForgotPasswordModal({ isVisible, setIsVisible }) {
  const [email, setEmail] = useState("");

  //function to close modal//
  const onClose = () => {
    setIsVisible(false);
    setEmail("");
  };
  //function ends//

  //function to confirm reset//
  const onConfirm = () => {
    if (email) {
      resetPassword(email);
      onClose();
    }
    if (!email) {
      alert("Please enter an email");
    }
  };
  //function ends//

  return (
    <Modal
      animationType="fade"
      transparent
      statusBarTranslucent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
        <Pressable style={styles.overlay} onPress={onClose}>
          <Pressable style={styles.container}>
            <View style={styles.modalText}>
              <Text style={styles.title}>Forgot Your Password?</Text>
              <Text style={styles.subtitle}>
                Enter your email and we'll send you a link to retrieve your
                account
              </Text>
            </View>

            <TextInput
              label="Email"
              mode="outlined"
              outlineColor={"black"}
              activeOutlineColor={COLORS.primary}
              theme={{ roundness: 10 }}
              style={styles.input}
              onChangeText={(text) => setEmail(text)}
              value={email}
              keyboardType="email-address"
            />
            <View style={styles.footer}>
              <Button
                mode="outlined"
                theme={{ roundness: 20 }}
                color={COLORS.primary}
                onPress={onClose}
              >
                Cancel
              </Button>
              <Button
                mode="contained"
                theme={{ roundness: 20 }}
                style={{ marginLeft: 20 }}
                color={COLORS.primary}
                onPress={onConfirm}
              >
                Confirm
              </Button>
            </View>
          </Pressable>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const resetPassword = (email) => {
  sendPasswordResetEmail(auth, email)
    .then(() =>
      Alert.alert(
        "Check your Mail",
        "We have sent a password recovery link to the mail you entered",
        [{ text: "OK" }]
      )
    )
    .catch((error) => {
      alert(error.message);
    });
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(0,0,0,0.2)",
    flex: 1,
    justifyContent: "flex-end",
  },
  modalText: {
    marginVertical: 5,
    marginHorizontal: 20,
  },
  title: {
    color: COLORS.text,
    fontSize: 25,
    fontWeight: "bold",
    marginVertical: 5,
  },
  subtitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "100",
  },
  container: {
    backgroundColor: "white",
    paddingVertical: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  input: {
    marginVertical: 15,
    marginHorizontal: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
