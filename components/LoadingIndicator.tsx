import { StyleSheet, ActivityIndicator } from "react-native";

export function LoadingIndicator() {
  return (
    <ActivityIndicator
      style={styles.loaderContainer}
      color={"#fff"}
      size="large"
    />
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
