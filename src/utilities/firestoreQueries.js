import { auth, db } from "../../firebase";
import {
  arrayRemove,
  collection,
  doc,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

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

//Function for fetching categories
export const fetchHistoryData = (setHistoryData) => {
  const userDoc = doc(db, "users", auth.currentUser.uid);
  return onSnapshot(userDoc, (doc) =>
    setHistoryData(doc.data().searchHistory.map((historyItem) => historyItem))
  );
};

export const deleteHistoryItem = async (key) => {
  const userDoc = doc(db, "users", auth.currentUser.uid);
  await updateDoc(userDoc, { searchHistory: arrayRemove(key) });
};
