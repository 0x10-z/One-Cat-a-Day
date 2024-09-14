import { StyleSheet, Text, View, Image, Animated } from "react-native";
import { useRef, useEffect } from "react";
import { LifeSpan } from "./LifeSpan";

const descriptionLorem =
  "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galerí";

export function CatCard({ cat }) {
  return (
    <View style={styles.cardContainer} key={cat.id}>
      <Image source={{ uri: cat.url }} style={styles.image} />
      <View style={styles.infoContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.name}>{cat.name}</Text>
          <LifeSpan years={cat.lifeSpan} />
        </View>
        <Text style={styles.description}>
          {cat.description
            ? cat.description.slice(0, 100)
            : descriptionLorem.slice(0, 100)}
        </Text>
      </View>
    </View>
  );
}

export function AnimatedCatCard({ cat, index }) {
  const opacity = useRef(new Animated.Value(0.0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 250,
      delay: index * 250,
      useNativeDriver: false,
    }).start();
  }, [opacity, index]);

  return (
    <Animated.View style={{ opacity }}>
      <CatCard cat={cat} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "rgba(255,255,255,0.4)",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 10,
  },
  infoContainer: {
    flexShrink: 1,
    marginLeft: 12,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginRight: 8,
  },
  description: {
    marginTop: 8,
    fontSize: 16,
    color: "#eee",
  },
});
