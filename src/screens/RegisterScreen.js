import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import SafeArea from "../utilities/SafeArea";

export default function RegisterScreen() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <SafeArea>
        <Text>RegisterScreen</Text>
      </SafeArea>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({});
