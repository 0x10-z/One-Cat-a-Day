import { Link } from "expo-router";
import { Image, ScrollView, Text, View, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Screen } from "../../components/Screen";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { getCatDetails } from "../../lib/onecataday";
import { LifeSpan } from "../../components/LifeSpan";
import { LoadingIndicator } from "../../components/LoadingIndicator";

export default function Detail() {
  const { catslug } = useLocalSearchParams();
  const [catInfo, setCatInfo] = useState(null);

  useEffect(() => {
    if (catslug) {
      getCatDetails(catslug).then(setCatInfo);
    }
  }, [catslug]);

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
          headerLeft: () => {},
          headerTitle: catInfo ? catInfo.name : "Loading...",
          headerRight: () => {},
        }}
      />
      <View style={styles.container}>
        {catInfo === null ? (
          <LoadingIndicator />
        ) : (
          <ScrollView>
            <View style={styles.content}>
              <Image
                className="mb-4 rounded-xl"
                source={{ uri: catInfo.url }}
                style={styles.catImage}
              />
              <Text style={styles.catName}>{catInfo.name}</Text>
              <Text style={styles.catOrigin}>{catInfo.origin}</Text>
              <LifeSpan score={catInfo.life_span} maxScore={20} />
              <Text style={styles.description}>{catInfo.description}</Text>
              <Text style={styles.attribute}>
                <Text style={styles.attributeLabel}>Peso: </Text>(
                {catInfo.weight} kg)
              </Text>
              <Text style={styles.attribute}>
                <Text style={styles.attributeLabel}>Inteligencia: </Text>
                {catInfo.intelligence}/5
              </Text>
              <Text style={styles.attribute}>
                <Text style={styles.attributeLabel}>Nivel de amor: </Text>
                {catInfo.love}/5
              </Text>
              <Text style={styles.attribute}>
                <Text style={styles.attributeLabel}>
                  Probabilidad de romper algo:{" "}
                </Text>
                {catInfo.exploding_rate}/5
              </Text>
              <Link
                href="/cats"
                className="text-white p-4 bg-red-400 rounded"
                style={styles.backButton}
              >
                Volver atrás
              </Link>
            </View>
          </ScrollView>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Esto agrega un fondo blanco semitransparente
    borderRadius: 16,
    margin: 16,
  },
  catImage: {
    width: 350,
    height: 200,
    borderRadius: 100,
    marginBottom: 16,
  },
  catName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  catOrigin: {
    fontStyle: "italic",
    color: "#666",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#444",
    marginVertical: 16,
  },
  attribute: {
    fontSize: 16,
    marginVertical: 4,
  },
  attributeLabel: {
    fontWeight: "bold",
  },
  backButton: {
    backgroundColor: "#ff5c5c",
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
});
