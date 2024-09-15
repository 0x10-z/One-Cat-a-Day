import { View, ScrollView, Text } from "react-native";

import { Screen } from "../../components/Screen";

export default function Badges() {
  return (
    <Screen>
      <ScrollView>
        <View className="p-4">
          <Text className="text-white font-bold mb-8 text-2xl">Medallas</Text>
        </View>
      </ScrollView>
    </Screen>
  );
}
