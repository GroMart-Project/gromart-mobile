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
import { updateName } from "../utilities/firestoreQueries";
import { auth } from "../../firebase";

//firebase imports

export default function EditNameModal({ isVisible, setIsVisible }) {
  const [newName, setNewName] = useState("");

  //function to close modal
  const onClose = () => {
    setIsVisible(false), setNewName("");
  };
  //function ends//

  console.log(auth.currentUser.displayName);

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
            <Text style={styles.modalText}>Edit Name...</Text>
            <TextInput
              label="New Name"
              mode="outlined"
              outlineColor={"black"}
              activeOutlineColor={COLORS.primary}
              theme={{ roundness: 10 }}
              style={styles.input}
              onChangeText={(text) => setNewName(text)}
              value={newName}
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
                  updateName(newName);
                  onClose();
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
