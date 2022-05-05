import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import HeaderStyles from "../components/utilities/HeaderStyles";
import { COLORS } from "../data/Constants";
import ListEmptyIndicator from "../components/utilities/ListEmptyIndicator";

//Firebase imports//
import {
  fetchCategoriesData,
  fetchProductsData,
} from "../utilities/firestoreQueries";
import ProductBox from "../components/ProductBox";
import VerticalProductList from "../components/VerticalProductList";

export default function CategoriesScreen({ navigation }) {
  //fetch data for categories//
  const [categoriesData, setCategoriesData] = useState();

  useEffect(() => {
    fetchCategoriesData(setCategoriesData).catch((error) => console.log(error));
  }, []);

  //fetch ends//

  //fetch data for products//
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    fetchProductsData(setProductsData).catch((error) => console.log(error));
  }, []);

  //fetch ends//

  //State for active category//
  const [activeCategory, setActiveCategory] = useState(0);
  //state ends//

  // Filter Products//
  const filteredProducts =
    categoriesData &&
    productsData.filter(
      (product) => product.category == categoriesData[activeCategory]?.name
    );
  //Filter Products End//

  return (
    <View style={styles.container}>
      {/* Categories List */}
      <View>
        <FlatList
          data={categoriesData}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <CategoriesButton
              name={item.name}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              index={index}
            />
          )}
          ListEmptyComponent={
            <ListEmptyIndicator padding="horizontal" size={25} />
          }
          showsHorizontalScrollIndicator={false}
          horizontal
          style={styles.categoriesList}
        />
      </View>
      {/* Categories List ends*/}

      {/* Bottom Section */}
      <VerticalProductList
        data={filteredProducts}
        emptyComponent={true}
        padding={"tab"}
        size={50}
        subtract={70}
      />
      {/* Bottom Section End */}
    </View>
  );
}

//Categories List component//
const CategoriesButton = ({
  name,
  activeCategory,
  setActiveCategory,
  index,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[
        styles.btnBox,
        {
          backgroundColor: activeCategory == index ? COLORS.primary : "white",
          borderColor: activeCategory == index ? "black" : COLORS.box,
        },
      ]}
      onPress={() => setActiveCategory(index)}
    >
      <Text
        style={[
          styles.btnText,
          { color: activeCategory == index ? "white" : COLORS.text },
        ]}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
};
//Components ends//

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  categoriesList: {
    marginVertical: 20,
  },
  btnBox: {
    paddingHorizontal: 15,
    paddingVertical: 7.5,
    marginHorizontal: 7.5,
    borderWidth: 1,
    borderRadius: 10,
  },
  btnText: {
    fontSize: 16,
  },
});
