import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

//Function for fetching products
export const fetchProductsData = async (setProductsData) => {
  const productsCollection = collection(db, "products");
  const productsSnapshot = await getDocs(productsCollection);

  setProductsData(productsSnapshot.docs.map((doc) => doc.data()));
};

//Function for fetching sections
export const fetchSectionsData = async (setSectionsData) => {
  const sectionsCollection = collection(db, "sections");
  const sectionsSnapshot = await getDocs(sectionsCollection);

  setSectionsData(sectionsSnapshot.docs.map((doc) => doc.data()));
};

//Function for fetching categories
export const fetchCategoriesData = async (setCategoriesData) => {
  const categoriesCollection = collection(db, "categories");
  const categoriesSnapshot = await getDocs(categoriesCollection);

  setCategoriesData(categoriesSnapshot.docs.map((doc) => doc.data()));
};
