import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../data/Constants";
import { TouchableRipple } from "react-native-paper";

export default function OrderItemBox({ data, navigation }) {
  //destructure data//
  const { orderItems, id, placedOn, orderStatus } = data;
  //end//

  //destructure first item//
  const { imageUri, title } = orderItems[0];
  //end//

  return (
    <TouchableRipple
      rippleColor="rgba(0, 153, 101, .2)"
      style={styles.container}
      onPress={() => navigation.navigate("Order Details", { data: data })}
    >
      <>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: imageUri }}
            style={{ width: size, height: size, borderRadius: imageRadius }}
          />
        </View>

        <View style={styles.middle}>
          <View style={{ flex: 1, justifyContent: "space-between" }}>
            <View>
              <Text style={styles.title} numberOfLines={1}>
                {orderItems?.length == 1
                  ? title
                  : `${title} & ${orderItems?.length - 1} more`}
              </Text>
              <Text style={styles.subtitle}>
                {"Order "}
                {id}
              </Text>
            </View>

            <View>
              <View style={styles.statusBox}>
                <Text style={styles.statusText}>
                  {orderStatus.toUpperCase()}
                </Text>
              </View>
              <Text style={styles.subtitle}>
                {"On "}
                {placedOn.toDate().toLocaleDateString()}
              </Text>
            </View>
          </View>
        </View>
      </>
    </TouchableRipple>
  );
}

//get width
const size = Dimensions.get("window").width * 0.3;
const imageRadius = 10;
//end//

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    padding: 10,
  },
  imageContainer: {
    borderColor: COLORS.box,
    borderWidth: 1,
    borderRadius: imageRadius,
  },
  middle: {
    flex: 1,
    margin: 5,
    marginLeft: 10,
  },
  title: {
    color: COLORS.text,
    fontSize: 18,
  },
  subtitle: {
    color: COLORS.text,
    fontSize: 14,
  },

  //status
  statusBox: {
    backgroundColor: COLORS.primary,
    marginRight: "auto",
    borderRadius: 5,
  },
  statusText: {
    color: "white",
    fontSize: 14,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
});
