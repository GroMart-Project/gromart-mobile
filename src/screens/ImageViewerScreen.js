import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Appbar } from "react-native-paper";

const { width } = Dimensions.get("window");

export default function ImageViewerScreen({ navigation, route }) {
  const { title, imageUri } = route.params;

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: "black" }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={title} />
      </Appbar.Header>

      <View style={{ flex: 1 }}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: imageUri }}
            style={{
              marginTop: -60,
              width: width,
              aspectRatio: 1,
            }}
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
  },
});
