import { Image, ScrollView, Text, View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { Screen } from "./Screen";
import { getCatADay } from "../lib/onecataday";
import { LoadingIndicator } from "./LoadingIndicator";
import TodayCatCard from "./TodayCatCard";

export default function DailyCat() {
  const [catInfo, setCatInfo] = useState(null);

  useEffect(() => {
    getCatADay().then(setCatInfo);
  }, []); // Ejecutar solo una vez cuando el componente se monta

  return (
    <Screen>
      {catInfo === null ? (
        <LoadingIndicator />
      ) : (
        <View style={styles.prizeContainer}>
          <TodayCatCard catInfo={catInfo} />
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, // Esto asegura que el contenido del scroll ocupe todo el espacio disponible
    justifyContent: "center", // Centrar contenido verticalmente
    alignItems: "center", // Centrar contenido horizontalmente
  },
  prizeContainer: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 24,
    backgroundColor: "rgba(255, 223, 186, 0.95)", // Dorado suave para el premio
    borderRadius: 20,
    flex: 1,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10, // Sombra más marcada para efecto de tarjeta-premio
  },
  catImage: {
    width: 300,
    height: 300,
    borderRadius: 150, // Redondeado perfecto para que parezca una medalla
    borderColor: "#FFD700", // Borde dorado
    borderWidth: 6,
    marginBottom: 16,
  },
  catName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 8,
  },
  catOrigin: {
    fontStyle: "italic",
    color: "#34495e",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: "#2c3e50",
    marginVertical: 12,
  },
  attribute: {
    fontSize: 16,
    marginVertical: 4,
    color: "#2c3e50",
  },
  attributeLabel: {
    fontWeight: "bold",
  },
  backButton: {
    backgroundColor: "#e74c3c",
    padding: 12,
    borderRadius: 12,
    marginTop: 16,
    shadowColor: "#e74c3c",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
