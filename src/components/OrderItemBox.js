import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../data/Constants";

export default function OrderItemBox({ data }) {
  //destructure data//
  const { orderItems, id, placedOn, orderStatus } = data;
  //end//

  //destructure first item//
  const { imageUri, title } = orderItems[0];
  //end//

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUri }}
          style={{ width: size, height: size, borderRadius: imageRadius }}
        />
      </View>

      <View style={styles.middle}>
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View>
            <Text style={styles.title}>
              {orderItems?.length == 1
                ? title
                : `${title} & ${orderItems?.length} more`}
            </Text>
            <Text style={styles.subtitle}>
              {"Order "}
              {id}
            </Text>
          </View>

          <View>
            <View style={styles.statusBox}>
              <Text style={styles.statusText}>{orderStatus.toUpperCase()}</Text>
            </View>
            <Text style={styles.subtitle}>
              {"On "}
              {placedOn.toDate().toLocaleDateString()}
            </Text>
          </View>
        </View>
      </View>
    </View>
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
    paddingRight: 35,
  },
  subtitle: {
    color: COLORS.text,
    fontSize: 14,
    paddingRight: 35,
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
