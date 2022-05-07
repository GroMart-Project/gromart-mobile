import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { fetchOrdersData } from "../../utilities/firestoreQueries";
import OrderItemBox from "../../components/OrderItemBox";
import { Divider } from "react-native-paper";
import { COLORS } from "../../data/Constants";

export default function OrdersScreen({ navigation }) {
  //fetch orders data realtime//
  const [ordersData, setOrdersData] = useState();

  useEffect(() => {
    const unsubscribe = fetchOrdersData(setOrdersData);
    return unsubscribe;
  }, []);
  //fetch end//

  //loading state and listener//
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    ordersData && setLoaded(true);
  }, [ordersData]);
  //state ends//

  if (!loaded) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator size={50} animating={true} color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {ordersData?.length == 0 ? (
        <View style={styles.noResultContainer}>
          <Text style={styles.noResultText}>No Orders Found</Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            data={ordersData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <OrderItemBox data={item} navigation={navigation} />
            )}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => (
              <Divider style={{ width: "90%", alignSelf: "center" }} />
            )}
          />
        </View>
      )}
      {/* Orders list */}

      {/* Orders list */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  noResultContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  noResultText: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "bold",
  },
});
