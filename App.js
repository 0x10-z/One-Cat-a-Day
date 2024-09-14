import "@expo/metro-runtime";
import { StatusBar } from "expo-status-bar";
import { NativeWindStyleSheet } from "nativewind";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Main from "./components/Main";

NativeWindStyleSheet.setOutput({
  default: "native",
});

/**
 * The main App component, which renders the entire app.
 * This component just renders a StatusBar and a Main component.
 */
export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar style="light" />
        <Main />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09f",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    /* Cuadrícula */
    backgroundImage:
      "linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)",
    backgroundSize: "100px 100px",
  },
});
