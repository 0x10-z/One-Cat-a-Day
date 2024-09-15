import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create the context
const CatContext = createContext();

// Context provider that encapsulates global state logic and storage
export function CatProvider({ children }) {
  const [catList, setCatList] = useState([]);

  // Function to save cats to AsyncStorage
  const saveCatsToStorage = async (cats) => {
    try {
      await AsyncStorage.setItem("savedCats", JSON.stringify(cats));
    } catch (error) {
      console.error("Error saving cats to AsyncStorage", error);
    }
  };

  // Function to load cats from AsyncStorage when the app starts
  const loadCatsFromStorage = async () => {
    try {
      const storedCats = await AsyncStorage.getItem("savedCats");
      if (storedCats) {
        setCatList(JSON.parse(storedCats));
      }
    } catch (error) {
      console.error("Error loading cats from AsyncStorage", error);
    }
  };

  // Call loadCatsFromStorage when the provider mounts
  useEffect(() => {
    const fetchCats = async () => {
      await loadCatsFromStorage();
    };
    fetchCats();
  }, []);

  // Function to add a new cat to the list and store it
  const addNewCat = (newCat) => {
    if (
      !newCat ||
      catList.some((cat) => cat.id === newCat.id) // Use a unique identifier
    ) {
      console.error("The cat already exists or the value is invalid");
      return;
    }

    setCatList((prevCatList) => [...prevCatList, newCat]);
    saveCatsToStorage([...catList, newCat]);
  };

  return (
    <CatContext.Provider value={{ catList, addNewCat }}>
      {children}
    </CatContext.Provider>
  );
}

// Custom hook to use the cat context
export function useCatContext() {
  return useContext(CatContext);
}
