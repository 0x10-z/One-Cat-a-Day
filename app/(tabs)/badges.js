import React from "react";
import { View, ScrollView, Text, Image } from "react-native";
import { Screen } from "../../components/Screen";
import { useBadgeContext } from "../../hooks/useBadgeContext"; // Importa el proveedor

// Función para dividir el array de medallas en grupos de 4
function chunkArray(array, chunkSize) {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}

const Badge = function Badge({ rowIndex, badgeRow }) {
  return (
    <View key={rowIndex} className="flex-row mb-6 justify-between">
      {/* Recorremos cada medalla dentro de la fila */}
      {badgeRow.map((badge) => (
        <View key={badge.id} className="flex-1 items-center mx-2">
          <View className="shadow-lg">
            <Image
              source={badge.image}
              className="w-28 h-28 rounded-lg"
              resizeMode="contain"
            />
          </View>
          <Text className="text-white mt-2 text-center">{badge.title}</Text>
        </View>
      ))}
      {/* Si la última fila tiene menos de 3 medallas, agregamos vistas vacías para mantener el diseño */}
      {badgeRow.length < 3 &&
        Array.from({ length: 3 - badgeRow.length }).map((_, index) => (
          <View key={`empty-${index}`} className="flex-1 mx-2" />
        ))}
    </View>
  );
};

export default function Badges() {
  const { badgeList } = useBadgeContext();

  const badgeRows = chunkArray(badgeList, 3);

  return (
    <Screen>
      <ScrollView>
        <View className="p-4">
          <Text className="text-white text-center font-bold mb-8 text-2xl">
            Medallas {badgeList.length}
          </Text>
          {badgeRows.map((row, rowIndex) => (
            <Badge key={rowIndex} rowIndex={rowIndex} badgeRow={row} />
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}
