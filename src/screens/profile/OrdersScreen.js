import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../../data/Constants";
import { fetchOrdersData } from "../../utilities/firestoreQueries";

export default function OrdersScreen({ navigation }) {
  //fetch orders data realtime//
  const [ordersData, setOrdersData] = useState();

  useEffect(() => {
    const unsubscribe = fetchOrdersData(setOrdersData);
    return unsubscribe;
  }, []);
  //fetch end//

  console.log(ordersData);

  return (
    <View style={styles.container}>
      {/* Orders list */}
      <View style={{ flex: 1 }}>
        <FlatList
          data={ordersData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Text>Order</Text>}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <Divider style={{ width: "90%", alignSelf: "center" }} />
          )}
        />
      </View>
      {/* Orders list */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
