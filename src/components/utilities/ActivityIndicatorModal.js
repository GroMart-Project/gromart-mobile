import { ActivityIndicator, Modal, StyleSheet, View } from "react-native";
import React from "react";
import { COLORS } from "../../data/Constants";

export default function ActivityIndicatorModal({ isVisible }) {
  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        statusBarTranslucent={true}
        visible={isVisible}
        onRequestClose={() => console.log("modal request close")}
      >
        <View style={styles.container}>
          <ActivityIndicator
            size="large"
            animating={true}
            color={COLORS.primary}
          />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
});
