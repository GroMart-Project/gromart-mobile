import {
  KeyboardAvoidingView,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { TextInput, Button } from "react-native-paper";
import { COLORS } from "../data/Constants";
import { updatePhone } from "../utilities/firestoreQueries";

export default function EditPhoneModal({ isVisible, setIsVisible }) {
  const [newPhone, setNewPhone] = useState("");

  //function to close modal
  const onClose = () => {
    setIsVisible(false), setNewPhone("");
  };
  //function ends//

  const onConfirm = () => {
    if (newPhone?.length < 10) {
      alert("Phone number should be 10 digits");
    } else {
      updatePhone(newPhone);
      onClose();
    }
  };

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
            <Text style={styles.modalText}>Edit Phone...</Text>
            <TextInput
              label="New Phone Number"
              mode="outlined"
              outlineColor={"black"}
              activeOutlineColor={COLORS.primary}
              theme={{ roundness: 10 }}
              style={styles.input}
              onChangeText={(text) => setNewPhone(text)}
              value={newPhone}
              keyboardType="numeric"
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
