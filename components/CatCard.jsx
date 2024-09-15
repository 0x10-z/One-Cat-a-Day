import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  Pressable,
} from "react-native";
import { useRef, useEffect } from "react";
import { LifeSpan } from "./LifeSpan";
import { Link } from "expo-router";
import { styled } from "nativewind";
import { WeightScaleIcon, BrainIcon, LoveIcon, BombIcon } from "./Icons";
const StyledPressable = styled(Pressable);

export function CatCard({ cat }) {
  return (
    <Link href={`/cats/${cat.id}`} asChild>
      <StyledPressable className="active:opacity-80 active:border-white/50 mb-2">
        <View style={styles.cardContainer} key={cat.id}>
          <Image source={{ uri: cat.url }} style={styles.image} />
          <View style={styles.infoContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.name}>
                #{cat.listPosition} {cat.name}
              </Text>
              <LifeSpan years={cat.lifeSpan} />
            </View>
            <Text style={styles.description}>
              {cat.description
                ? cat.description.slice(0, 100)
                : "No hay descripción"}
            </Text>
            {/* Iconos con atributos */}
            <View
              className="flex-row justify-between text-center items-center px-2"
              style={styles.attributesContainer}
            >
              {/* Peso */}
              <View style={styles.attribute}>
                <WeightScaleIcon className="text-gray-700 text-base mx-1" />
              </View>

              {/* Inteligente */}
              <View style={styles.attribute}>
                <BrainIcon className="text-gray-700 text-base mx-1" />
              </View>

              {/* Amor */}
              <View style={styles.attribute}>
                <LoveIcon className="text-gray-700 text-base mx-1" />
              </View>

              {/* Travieso */}
              <View style={styles.attribute}>
                <BombIcon className="text-gray-700 text-base mx-1" />
              </View>
            </View>
          </View>
        </View>
      </StyledPressable>
    </Link>
  );
}

export function AnimatedCatCard({ cat, index }) {
  const opacity = useRef(new Animated.Value(0.0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 250,
      delay: index * 100,
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
    flexDirection: "row", // Mantiene la imagen y la info en fila
    marginBottom: 16,
    backgroundColor: "rgba(255,255,255,0.4)",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    alignItems: "flex-start", // Cambia a "flex-start" para alinear al inicio verticalmente
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 10,
    marginRight: 12, // Asegura un margen entre la imagen y el texto
  },
  infoContainer: {
    flexShrink: 1, // Permite que el contenido de texto ocupe solo el espacio necesario
    flex: 1, // Asegura que el contenido de texto ocupe todo el espacio disponible
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap", // En caso de que el nombre sea largo
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
  attributesContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    marginBottom: 2,
  },
  attribute: {
    flexDirection: "column",
    alignItems: "center",
  },
  attributeText: {
    marginTop: 0,
    fontSize: 16,
    color: "#333",
  },
});
