import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { getCatImages } from "../lib/onecataday";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AnimatedCatCard, CatCard } from "./CatCard";
import { Logo } from "./Logo";

export default function Main() {
  const [cats, setCats] = useState([]);
  const insets = useSafeAreaInsets();
  useEffect(() => {
    getCatImages().then((fetchedCats) => {
      setCats(fetchedCats);
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <View
        style={{
          marginLeft: 10,
          marginBottom: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Logo style={{ width: 50, height: 50 }} />
        <Text
          style={{
            marginLeft: 10,
            fontWeight: "bold",
            color: "#fff",
            fontSize: 36,
          }}
        >
          One Cat a Day
        </Text>
      </View>

      {cats.length === 0 ? (
        <ActivityIndicator
          style={styles.loaderContainer}
          color={"#fff"}
          size={100}
        />
      ) : (
        <FlatList
          data={cats}
          keyExtractor={(cat) => cat.id}
          renderItem={({ item, index }) => (
            <AnimatedCatCard cat={item} index={index} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
