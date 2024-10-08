import { Link, Stack } from "expo-router";
import { Pressable, View, Image } from "react-native";
import { CircleInfoIcon } from "../components/Icons";
import { NativeWindStyleSheet } from "nativewind";
import { CatProvider } from "../hooks/useCatContext"; // Importa el proveedor
import { BadgeProvider } from "../hooks/useBadgeContext"; // Importa el proveedor
import Toast from "react-native-toast-message";

const Logo = require("../assets/logo.png");

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function Layout() {
  return (
    <BadgeProvider>
      <CatProvider>
        <View className="flex-1">
          <Stack
            screenOptions={{
              headerStyle: { backgroundColor: "#000", border: 0 },
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
          <Toast />
        </View>
      </CatProvider>
    </BadgeProvider>
  );
}
