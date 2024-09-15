import { StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { getCatImages } from "../lib/onecataday";
import { AnimatedCatCard } from "./CatCard";
import { Screen } from "./Screen";
import { LoadingIndicator } from "./LoadingIndicator";

export default function Main() {
  const [cats, setCats] = useState([]);
  useEffect(() => {
    getCatImages().then((fetchedCats) => {
      setCats(fetchedCats);
    });
  }, []);

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#09f",
    /* Cuadrícula */
    backgroundImage:
      "linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)",
    backgroundSize: "100px 100px",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },

  lifeSpan: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
