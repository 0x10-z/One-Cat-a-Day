import { FlatList, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { getCatImages } from "../../lib/onecataday";
import { AnimatedCatCard } from "../../components/CatCard";
import { Screen } from "../../components/Screen";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import { useCatContext } from "../../hooks/useCatContext"; // Importa el contexto

export default function MyCats() {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga

  const { catList } = useCatContext(); // Accede al contexto de gatos

  useEffect(() => {
    const fetchAndFilterCats = async () => {
      try {
        // Solo mostrar el loading si tenemos gatos en catList para filtrar
        if (catList.length > 0) {
          setLoading(true); // Activar el loading mientras hacemos el fetch

          // Realiza el fetch de todos los gatos
          const fetchedCats = await getCatImages();

          // Filtra los gatos que coinciden con los IDs almacenados
          const filteredCats = fetchedCats.filter((cat) =>
            catList.includes(cat.id),
          );

          setCats(filteredCats);
        } else {
          // Si no hay gatos almacenados, vaciamos la lista
          setCats([]);
        }
      } catch (error) {
        console.error("Error al cargar los gatos:", error);
      } finally {
        // Desactivar el estado de carga cuando se complete el fetch
        setLoading(false);
      }
    };

    fetchAndFilterCats();
  }, [catList]); // Ejecutar cuando el catList cambie

  return (
    <Screen>
      {loading ? (
        <LoadingIndicator />
      ) : cats.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 24, color: "#fff" }}>
            ¡Obtén tu primer gato ya! {catList.length}
          </Text>
        </View>
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
