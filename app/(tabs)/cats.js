import { FlatList, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { getCatImages } from "../../lib/onecataday";
import { AnimatedCatCard } from "../../components/CatCard";
import { Screen } from "../../components/Screen";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MyCats() {
  const [cats, setCats] = useState([]);
  const [storedCatIds, setStoredCatIds] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga

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
      } finally {
        setLoading(false); // Desactiva el estado de carga cuando se complete el fetch
      }
    };

    fetchAndFilterCats();
  }, [storedCatIds]);

  return (
    <Screen>
      {loading ? ( // Si está cargando, muestra el indicador
        <LoadingIndicator />
      ) : cats.length === 0 ? ( // Si no hay gatos después de cargar
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 24, color: "#fff" }}>
            ¡Obtén tu primer gato ya!
          </Text>
        </View>
      ) : (
        // Muestra la lista si hay gatos
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
