import { auth, db } from "../../firebase";
import {
  arrayRemove,
  collection,
  doc,
  getDocs,
  onSnapshot,
  runTransaction,
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

//Function for fetching search  history
export const fetchHistoryData = (setHistoryData) => {
  const userDoc = doc(db, "users", auth.currentUser.uid);
  return onSnapshot(userDoc, (doc) =>
    setHistoryData(doc.data()?.searchHistory?.map((historyItem) => historyItem))
  );
};

//Function for deleting history item
export const deleteHistoryItem = async (key) => {
  const userDoc = doc(db, "users", auth.currentUser.uid);
  await updateDoc(userDoc, { searchHistory: arrayRemove(key) });
};

//Transaction  Function for updating search history
export const addHistoryItem = async (key) => {
  const userDocRef = doc(db, "users", auth.currentUser.uid);
  await runTransaction(db, async (transaction) => {
    const userDoc = await transaction.get(userDocRef);
    if (!userDoc.exists()) {
      throw "Document does not exist!";
    } else if (!userDoc.data()?.searchHistory) {
      transaction.update(userDocRef, { searchHistory: [key] });
    } else if (userDoc.data()?.searchHistory?.length < 5) {
      const newSearchHistory = userDoc.data()?.searchHistory;
      if (!newSearchHistory?.includes(key)) {
        newSearchHistory?.push(key);
        transaction.update(userDocRef, { searchHistory: newSearchHistory });
      }
    } else {
      const newSearchHistory = userDoc.data()?.searchHistory;
      if (!newSearchHistory?.includes(key)) {
        newSearchHistory?.shift();
        newSearchHistory?.push(key);
        transaction.update(userDocRef, { searchHistory: newSearchHistory });
      }
    }
  });
};

//Function for fetching recently viewed products//
export const fetchRecentlyViewedProductsData = (
  setRecentlyViewedProductsData
) => {
  const userDoc = doc(db, "users", auth.currentUser.uid);
  return onSnapshot(userDoc, (doc) =>
    setRecentlyViewedProductsData(
      doc.data()?.recentlyViewedProducts?.map((productId) => productId)
    )
  );
};

//Transaction  Function for updating recently viewed products
export const addRecentlyViewedProduct = async (key) => {
  const userDocRef = doc(db, "users", auth.currentUser.uid);
  await runTransaction(db, async (transaction) => {
    const userDoc = await transaction.get(userDocRef);
    if (!userDoc.exists()) {
      throw "Document does not exist!";
    } else if (!userDoc.data()?.recentlyViewedProducts) {
      transaction.update(userDocRef, { recentlyViewedProducts: [key] });
    } else if (userDoc.data()?.recentlyViewedProducts?.length < 5) {
      const newRecentlyViewedProducts = userDoc.data()?.recentlyViewedProducts;
      if (!newRecentlyViewedProducts?.includes(key)) {
        newRecentlyViewedProducts?.push(key);
        transaction.update(userDocRef, {
          recentlyViewedProducts: newRecentlyViewedProducts,
        });
      }
    } else {
      const newRecentlyViewedProducts = userDoc.data()?.recentlyViewedProducts;
      if (!newRecentlyViewedProducts?.includes(key)) {
        newRecentlyViewedProducts?.shift();
        newRecentlyViewedProducts?.push(key);
        transaction.update(userDocRef, {
          recentlyViewedProducts: newRecentlyViewedProducts,
        });
      }
    }
  });
};

//Function for fetching search  history
export const fetchUserData = (setUserData) => {
  const userDoc = doc(db, "users", auth.currentUser.uid);
  return onSnapshot(userDoc, (doc) => setUserData(doc?.data()));
};
