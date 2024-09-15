import { Link, Stack } from "expo-router";
import { Pressable, View, Image } from "react-native";
import { CircleInfoIcon } from "../components/Icons";
import { NativeWindStyleSheet } from "nativewind";
import { CatProvider } from "../hooks/useCatContext"; // Importa el proveedor

const Logo = require("../assets/logo.png");

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function Layout() {
  return (
    <CatProvider>
      <View className="flex-1">
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: "#000" },
            headerTintColor: "gray",
            headerTitle: "One Cat a Day",
            headerTitleStyle: {
              fontWeight: "bold",
              color: "#fff",
              fontSize: 30,
            },

            headerLeft: () => (
              <Image
                source={Logo}
                className="rounded-3xl"
                style={{ width: 50, height: 50, marginLeft: 10 }}
              />
            ),
            headerRight: () => (
              <Link asChild href="/about" style={{ marginRight: 10 }}>
                <Pressable>
                  <CircleInfoIcon />
                </Pressable>
              </Link>
            ),
          }}
        />
      </View>
    </CatProvider>
  );
}
