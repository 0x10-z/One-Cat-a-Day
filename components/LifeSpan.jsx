import { Text, View } from "react-native";

export function LifeSpan({ years }) {
  const getColors = () => {
    if (years < 5) {
      return "bg-red-500";
    } else if (years < 10) {
      return "bg-yellow-500";
    } else if (years < 15) {
      return "bg-orange-500";
    } else {
      return "bg-green-500";
    }
  };

  const className = getColors();
  return (
    <View
      className={`${className} w-8 h-8 rounded-full justify-center items-center`}
    >
      <Text className="text-lg font-bold text-white">
        {years ? `${years}` : "?"}
      </Text>
    </View>
  );
}
