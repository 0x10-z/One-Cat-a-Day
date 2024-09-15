import { StyleSheet, View } from "react-native";

export function Screen({ children }) {
  return (
    <View className="flex-1 pt-8" style={styles.container}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#0099ff",
    /* Cuadrícula */
    backgroundImage:
      "linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)",
    backgroundSize: "100px 100px",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },

  lifeSpan: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
