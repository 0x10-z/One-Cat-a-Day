import { FlatList } from "react-native";
import { useEffect, useState } from "react";
import { getCatImages } from "../../lib/onecataday";
import { AnimatedCatCard } from "../../components/CatCard";
import { Screen } from "../../components/Screen";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MyCats() {
  const [cats, setCats] = useState([]);
  const [storedCatIds, setStoredCatIds] = useState([]);

  // Carga los gatos almacenados desde AsyncStorage
  useEffect(() => {
    const loadStoredCats = async () => {
      try {
        const storedCats = await AsyncStorage.getItem("savedCats");
        if (storedCats) {
          setStoredCatIds(JSON.parse(storedCats)); // Convierte el JSON a un array
        }
      } catch (error) {
        console.error("Error al cargar los gatos almacenados:", error);
      }
    };
    loadStoredCats();
  }, []);

  useEffect(() => {
    const fetchAndFilterCats = async () => {
      try {
        const fetchedCats = await getCatImages();

        // Filtra solo los gatos que coinciden con los IDs almacenados
        const filteredCats = fetchedCats.filter((cat) =>
          storedCatIds.includes(cat.id),
        );

        setCats(filteredCats);
      } catch (error) {
        console.error("Error al cargar los gatos:", error);
      }
    };

    fetchAndFilterCats();
  }, [storedCatIds]);

  return (
    <Screen>
      {cats.length === 0 ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          className="p-2"
          data={cats}
          keyExtractor={(cat) => cat.id}
          renderItem={({ item, index }) => (
            <AnimatedCatCard cat={item} index={index} />
          )}
        />
      )}
    </Screen>
  );
}
