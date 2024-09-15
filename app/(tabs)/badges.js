import React, { useRef, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  Animated,
  TouchableOpacity,
  Easing,
} from "react-native";
import { Screen } from "../../components/Screen";
import { useBadgeContext } from "../../hooks/useBadgeContext";

// Función para dividir el array de medallas en grupos de 3
function chunkArray(array, chunkSize) {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}

const Badge = function Badge({ badge, index }) {
  const scale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 6,
      tension: 70,
      delay: index * 200,
      useNativeDriver: true,
    }).start();
  }, [scale, index]);

  // Animación al presionar la medalla
  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View key={badge.id} className="flex-1 items-center mx-2">
      <TouchableOpacity
        activeOpacity={0.8}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => {
          // Aquí puedes agregar una acción al presionar la medalla, como abrir un modal
        }}
      >
        <Animated.View
          style={{
            transform: [{ scale }],
            opacity: scale.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          }}
          className="shadow-xl rounded-lg bg-white"
        >
          <Image
            source={{
              uri: `https://raw.githubusercontent.com/0x10-z/One-Cat-a-Day/master/${badge.image}`,
            }}
            className="w-28 h-28 rounded-lg"
            resizeMode="contain"
          />
        </Animated.View>
      </TouchableOpacity>
      <Text className="text-white mt-2 text-center">{badge.title}</Text>
    </View>
  );
};

const BadgeRow = function BadgeRow({ rowIndex, badgeRow }) {
  return (
    <View key={rowIndex} className="flex-row mb-6 justify-between">
      {badgeRow.map((badge, index) => (
        <Badge key={badge.id} index={index} badge={badge} />
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

  // Ordenar las medallas por fecha de obtención o cualquier otro criterio
  const sortedBadges = badgeList.sort((a, b) => a.id - b.id);

  const badgeRows = chunkArray(sortedBadges, 3);

  return (
    <Screen>
      <ScrollView>
        <View className="p-4">
          <Text className="text-white text-center font-bold mb-8 text-2xl">
            {badgeList.length} Medallas
          </Text>
          {badgeRows.map((row, rowIndex) => (
            <BadgeRow key={rowIndex} rowIndex={rowIndex} badgeRow={row} />
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}
