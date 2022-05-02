import {
  KeyboardAvoidingView,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import { COLORS } from "../data/Constants";
import { Button } from "react-native-paper";

export default function EditAddressModal({ isVisible, setIsVisible }) {
  const [newAddress, setNewAddress] = useState("");

  //function to close modal
  const onClose = () => {
    setIsVisible(false), setNewAddress("");
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
            <Text style={styles.modalText}>Edit Delivery Address...</Text>
            <TextInput
              label="New Address"
              mode="outlined"
              outlineColor={"black"}
              activeOutlineColor={COLORS.primary}
              theme={{ roundness: 10 }}
              style={styles.input}
              onChangeText={(text) => setNewAddress(text)}
              value={newAddress}
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
                onPress={() => {
                  console.log("confirm");
                }}
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

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(0,0,0,0.2)",
    flex: 1,
    justifyContent: "flex-end",
  },
  modalText: {
    color: COLORS.text,
    marginLeft: 15,
    marginVertical: 5,
    fontSize: 16,
  },
  container: {
    backgroundColor: "white",
    paddingVertical: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  input: {
    marginVertical: 5,
    marginHorizontal: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
