import { Link } from "expo-router";
import { Image, ScrollView, Text, View, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Screen } from "../../components/Screen";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { getCatDetails } from "../../lib/onecataday";
import { LifeSpan } from "../../components/LifeSpan";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import {
  WeightScaleIcon,
  BrainIcon,
  LoveIcon,
  BombIcon,
} from "../../components/Icons";

// Componente para representar los atributos del gato
function AttributeCard({ icon, label, value }) {
  return (
    <View className="p-1" style={{ width: "48%" }}>
      <View className="flex-row items-center bg-white p-4 rounded-lg shadow">
        <View className="mr-3 text-blue-500">{icon}</View>
        <View>
          <Text className="text-xs text-gray-500">{label}</Text>
          <Text className="font-bold text-gray-700">{value}</Text>
        </View>
      </View>
    </View>
  );
}

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
          headerTitle: catInfo ? catInfo.name : "Loading...",
        }}
      />
      <View style={styles.container}>
        {catInfo === null ? (
          <LoadingIndicator />
        ) : (
          <ScrollView>
            <View style={styles.content}>
              <View className="flex-row items-start py-2">
                <Text className="text-left text-xl font-bold text-gray-800 mr-4 justify-center">
                  #{catInfo.listPosition} {catInfo.name}
                </Text>
                <LifeSpan years={catInfo.lifeSpan} />
              </View>

              <Image source={{ uri: catInfo.url }} style={styles.catImage} />
              <Text style={styles.description}>{catInfo.description}</Text>

              <View style={styles.attributesContainer}>
                <AttributeCard
                  icon={<WeightScaleIcon style={styles.icon} />}
                  label="Peso"
                  value={`${catInfo.weight} kg`}
                />
                <AttributeCard
                  icon={<BrainIcon style={styles.icon} />}
                  label="Inteligencia"
                  value={`${catInfo.intelligence}/5`}
                />
                <AttributeCard
                  icon={<LoveIcon style={styles.icon} />}
                  label="Amor"
                  value={`${catInfo.love}/5`}
                />
                <AttributeCard
                  icon={<BombIcon style={styles.icon} />}
                  label="Temperamento"
                  value={`${catInfo.exploding_rate}/5`}
                />
              </View>
              <Link href="/cats" style={styles.backButton}>
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
  content: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 16,
    margin: 16,
  },
  catImage: {
    width: 300,
    height: 200,
    borderRadius: 16,
    marginBottom: 16,
  },
  catName: {
    fontSize: 16,
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
  attributesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  attributeCard: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    margin: 4,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  attributeLabel: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  attributeValue: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  icon: {
    width: 24,
    height: 24,
    fontSize: 24,
    marginBottom: 4,
    color: "#09f",
  },
  backButton: {
    backgroundColor: "#ff5c5c",
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    textAlign: "center",
    color: "white",
  },
});
