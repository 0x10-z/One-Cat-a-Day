import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { BombIcon, BrainIcon, LoveIcon, WeightScaleIcon } from "./Icons";

export default function TodayCatCard({ catInfo }) {
  const [loading, setLoading] = useState(false);
  const [hasSavedCat, setHasSavedCat] = useState(false); // Estado para saber si el gato ya ha sido guardado
  const rotateAnim = useRef(new Animated.Value(0)).current; // Valor inicial para la rotación
  const shakeAnim = useRef(new Animated.Value(0)).current; // Valor para el temblor
  const [timeRemaining, setTimeRemaining] = useState("");

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const tomorrow = new Date();
      tomorrow.setHours(24, 0, 0, 0); // Establece la hora a la medianoche de mañana

      const diff = tomorrow - now; // Diferencia en milisegundos

      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
    };

    // Calcula el tiempo restante inmediatamente
    calculateTimeRemaining();

    // Actualiza el tiempo restante cada segundo
    const intervalId = setInterval(calculateTimeRemaining, 1000);

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Animación divertida con vibraciones y pausas
    Animated.loop(
      Animated.sequence([
        // Vibración rápida y corta
        Animated.timing(shakeAnim, {
          toValue: 1,
          duration: 100,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -1,
          duration: 100,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        // Pausa breve
        Animated.delay(150),
        // Vibración más larga y más fuerte
        Animated.timing(shakeAnim, {
          toValue: 1.5,
          duration: 300,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -1.5,
          duration: 300,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        // Pausa más larga
        Animated.delay(300),
        // Vibración ligera y rápida
        Animated.timing(shakeAnim, {
          toValue: 0.5,
          duration: 150,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -0.5,
          duration: 150,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        // Pausa
        Animated.delay(200),
      ])
    ).start();
  }, []);

  const handleGetCard = () => {
    setLoading(true);

    // Animación de rotación en 3D al conseguir la tarjeta
    Animated.timing(rotateAnim, {
      toValue: 1, // Valor final de la rotación
      duration: 1200,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      setHasSavedCat(true); // Marcar que el gato ha sido guardado
      setLoading(false);
    });
  };

  // Interpolación para la rotación 3D
  const rotateY = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  // Interpolación para el temblor
  const translateX = shakeAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: [-2, 2], // Moverse 2px a la izquierda y derecha
  });

  return (
    <>
      {/* Mostrar mensaje si el gato ya ha sido guardado */}
      {hasSavedCat ? (
        <View style={styles.centeredContainer}>
          <Text style={styles.savedMessage}>
            "¡Wow! Ya atrapaste el gato de hoy. 🐾 Vuelve mañana para más
            travesuras. 😺"
          </Text>
          <Text style={styles.countdownText}>
            {" "}
            Próximo gato en: {timeRemaining}
          </Text>
        </View>
      ) : (
        <Animated.View
          style={[styles.card, { transform: [{ translateX }, { rotateY }] }]}
        >
          <Text className="absolute right-5 top-3 text-gray-700 text-3xl font-bold">
            #3
          </Text>

          {/* Imagen del gato */}
          <Image
            source={{ uri: catInfo.image.url }}
            style={styles.catImage}
            resizeMode="cover"
          />

          {/* Nombre del gato */}
          <Text style={styles.catName}>{catInfo.name}</Text>

          {/* Descripción del gato */}
          <Text style={styles.description}>{catInfo.origin}</Text>

          {/* Iconos con atributos */}
          <View className="flex-row" style={styles.attributesContainer}>
            {/* Peso */}
            <View style={styles.attribute}>
              <WeightScaleIcon className="text-gray-700" />
              <Text style={styles.attributeText}>
                {catInfo.weight.metric} kg
              </Text>
            </View>

            {/* Inteligente */}
            <View style={styles.attribute}>
              <BrainIcon className="text-gray-700" />
              <Text style={styles.attributeText}>{catInfo.intelligence}/5</Text>
            </View>

            {/* Amor */}
            <View style={styles.attribute}>
              <LoveIcon className="text-gray-700" />
              <Text style={styles.attributeText}>
                {catInfo.affection_level}/5
              </Text>
            </View>

            {/* Travieso */}
            <View style={styles.attribute}>
              <BombIcon className="text-gray-700" />
              <Text style={styles.attributeText}>{catInfo.social_needs}/5</Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.button, loading ? styles.buttonLoading : {}]}
            onPress={handleGetCard}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Cargando..." : "Conseguir tarjeta"}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  savedMessage: {
    color: "#333",
    fontSize: 32,
    fontStyle: "italic",
    textAlign: "center",
  },
  countdownText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 16,
    textAlign: "center",
  },
  card: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  catImage: {
    width: 250,
    height: 250,
    borderRadius: 12,
    marginBottom: 16,
    marginTop: 42,
  },
  catName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 16,
  },
  attributesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 16,
  },
  attribute: {
    flexDirection: "column",
    alignItems: "center",
  },
  attributeText: {
    marginTop: 4,
    fontSize: 14,
    color: "#333",
  },
  button: {
    backgroundColor: "#ff5c5c",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonLoading: {
    backgroundColor: "#ffb5b5", // Cambiar color cuando está en estado de carga
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
