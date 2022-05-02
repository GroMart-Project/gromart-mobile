import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../data/Constants";
import { Button } from "react-native-paper";
import { updateUserImage } from "../utilities/firestoreQueries";
import { auth } from "../../firebase";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export default function EditProfilePicModal({ image, setImage }) {
  //function to close modal
  const onClose = () => {
    setImage(null);
  };
  //function ends//

  //function to upload image to fb storage
  const uploadImage = async () => {
    const uri = image;
    const childPath = `users/${auth?.currentUser?.uid}`;

    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, childPath);

    const task = uploadBytesResumable(storageRef, blob);

    const taskProgress = (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
    };

    const taskError = (error) => {
      console.log(error);
    };

    const taskCompleted = () => {
      getDownloadURL(task.snapshot.ref)
        .then((downloadUrl) => updateUserImage(downloadUrl))
        .then(() => setImage(null))
        .catch((error) => console.log(error));
    };

    task.on("state_changed", taskProgress, taskError, taskCompleted);

    // console.log(blob);
  };
  //function ends

  return (
    <Modal
      animationType="fade"
      transparent
      statusBarTranslucent={true}
      visible={image ? true : false}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
        <Pressable style={styles.overlay} onPress={onClose}>
          <Pressable style={styles.container}>
            <Text style={styles.modalText}>Upload Image...</Text>

            <View style={styles.imageContainer}>
              <Image
                source={{ uri: image }}
                style={{ aspectRatio: 1, height: 200, borderRadius: 10 }}
              />
            </View>

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
                onPress={uploadImage}
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
  imageContainer: {
    marginVertical: 5,
    alignItems: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
