import { FlatList } from "react-native";
import { useEffect, useState } from "react";
import { getCatImages } from "../../lib/onecataday";
import { AnimatedCatCard } from "../../components/CatCard";
import { Screen } from "../../components/Screen";
import { LoadingIndicator } from "../../components/LoadingIndicator";

export default function MyCats() {
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
