import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { BombIcon, BrainIcon, LoveIcon, WeightScaleIcon } from "./Icons";
import { useCatContext } from "../hooks/useCatContext"; // Importa el contexto
import { useBadgeContext } from "../hooks/useBadgeContext"; // Importa el contexto
import { getCatGif } from "../lib/onecataday";
import { showErrorToast, showNewBadgeToast } from "../lib/toastUtils";

export default function TodayCatCard({ newCatInfo }) {
  const [loading, setLoading] = useState(false);
  const [hasSavedCat, setHasSavedCat] = useState(false); // Estado para saber si el gato ya ha sido guardado
  const [timeRemaining, setTimeRemaining] = useState("");
  const [animationType, setAnimationType] = useState("pulse"); // Animación inicial
  const [catGif, setCatGif] = useState(null);

  const { catList, addNewCat } = useCatContext(); // Accede a la función para agregar gatos
  const { checkBadges } = useBadgeContext();

  useEffect(() => {
    // Cargar los IDs de los gatos guardados y comprobar si el ID de hoy ya está guardado
    const checkSavedCat = async () => {
      try {
        const savedCats = catList;
        // Comprobar si el ID del gato de hoy ya está guardado
        if (savedCats.includes(newCatInfo.id)) {
          setHasSavedCat(true);
        }
      } catch (error) {
        showErrorToast("Error al cargar los gatos guardados:" + error);
      }
    };

    checkSavedCat();
  }, [catList, newCatInfo.id]);

  useEffect(() => {
    // When user logins, check for new badges
    checkBadges(catList);

    getCatGif().then((gif) => {
      setCatGif(gif);
    });

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
    // eslint-disable-next-line no-undef
    const intervalId = setInterval(calculateTimeRemaining, 1000);

    // Limpia el intervalo cuando el componente se desmonta
    // eslint-disable-next-line no-undef
    return () => clearInterval(intervalId);
  }, []);

  const handleGetCard = async () => {
    setLoading(true);

    setAnimationType("bounceOut");

    // Después de la animación, guarda el gato y cambia el estado
    // eslint-disable-next-line no-undef
    setTimeout(async () => {
      try {
        // Solo guardar si el gato aún no ha sido guardado
        addNewCat(newCatInfo.id);

        setHasSavedCat(true);
      } catch (error) {
        showErrorToast("Error al guardar el gato:" + error);
      }

      setLoading(false);
      const numberOfBudges = await checkBadges([...catList, newCatInfo]);
      if (numberOfBudges > 0) {
        showNewBadgeToast(numberOfBudges);
      }
    }, 1200); // El tiempo debe coincidir con la duración de la animación
  };

  return (
    <>
      {/* Mostrar mensaje si el gato ya ha sido guardado */}
      {hasSavedCat ? (
        <View style={styles.cardContainer}>
          <Animatable.View
            animation={"pulse"}
            iterationCount="infinite"
            duration={1500}
            style={styles.centeredGifContainer} // Nuevo estilo para centrar el GIF
          >
            {catGif ? (
              <Image
                source={{ uri: catGif }}
                style={styles.catGif} // Usamos un estilo definido en lugar de inline
              />
            ) : (
              <ActivityIndicator />
            )}
            <Text style={styles.savedMessage}>
              ¡Wow! Ya atrapaste el gato de hoy.
            </Text>
            <Text style={styles.savedMessage}>
              🐾 Vuelve mañana para más travesuras. 😺
            </Text>
          </Animatable.View>
          <Text style={styles.countdownText}>
            Próximo gato en: {timeRemaining}
          </Text>
        </View>
      ) : (
        <Animatable.View
          animation={animationType} // Aplicar la animación basada en el estado
          iterationCount="infinite"
          duration={1500}
          style={styles.card}>
          <Text className="absolute right-5 top-3 text-gray-700 text-3xl font-bold">
            #{newCatInfo.listPosition}
          </Text>

          {/* Imagen del gato */}
          <Image
            source={{ uri: newCatInfo.url }}
            style={styles.catImage}
            resizeMode="cover"
          />

          {/* Nombre del gato */}
          <Text style={styles.catName}>{newCatInfo.name}</Text>

          {/* Descripción del gato */}
          <Text style={styles.description}>{newCatInfo.origin}</Text>

          {/* Iconos con atributos */}
          <View className="flex-row" style={styles.attributesContainer}>
            {/* Peso */}
            <View style={styles.attribute}>
              <WeightScaleIcon className="text-gray-700" />
              <Text style={styles.attributeText}>{newCatInfo.weight} kg</Text>
            </View>

            {/* Inteligente */}
            <View style={styles.attribute}>
              <BrainIcon className="text-gray-700" />
              <Text style={styles.attributeText}>
                {newCatInfo.intelligence}/5
              </Text>
            </View>

            {/* Amor */}
            <View style={styles.attribute}>
              <LoveIcon className="text-gray-700" />
              <Text style={styles.attributeText}>{newCatInfo.love}/5</Text>
            </View>

            {/* Travieso */}
            <View style={styles.attribute}>
              <BombIcon className="text-gray-700" />
              <Text style={styles.attributeText}>
                {newCatInfo.exploding_rate}/5
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.button, loading ? styles.buttonLoading : {}]}
            onPress={handleGetCard}
            disabled={loading}>
            <Text style={styles.buttonText}>
              {loading ? "Cargando..." : "Conseguir tarjeta"}
            </Text>
          </TouchableOpacity>
        </Animatable.View>
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
  cardContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1, // Asegura que ocupe todo el espacio
  },
  centeredGifContainer: {
    alignItems: "center", // Centra horizontalmente
    justifyContent: "center", // Centra verticalmente
    flex: 1,
  },
  catGif: {
    width: 200,
    height: 200,
    borderRadius: 12, // Opcional si quieres bordes redondeados en el gif
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
