import { StyleSheet, Text, View, Image, Animated } from "react-native";
import { useRef, useEffect } from "react";

const descriptionLorem =
  "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galerí";

export function CatCard({ cat }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: cat.url }} style={styles.image} />
      <Text style={styles.title}>{cat.breed}</Text>
      <Text style={styles.description}>
        {cat.description ? cat.description : descriptionLorem}
      </Text>
      <Text style={styles.lifeSpan}>
        Life Span: {cat.lifeSpan ? `${cat.lifeSpan} years` : "Unknown"}
      </Text>
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
      useNativeDriver: true,
    }).start();
  }, [opacity, index]);

  return (
    <Animated.View style={{ opacity }}>
      <CatCard cat={cat} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 30,
    backgroundColor: "rgba(255,255,255,0.4)",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    alignItems: "center",
    elevation: 5,
  },

  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
    textAlign: "center",
  },

  description: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },

  lifeSpan: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
