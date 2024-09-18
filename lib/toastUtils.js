import Toast from "react-native-toast-message";

const showToast = (
  type,
  text1,
  text2,
  visibilityTime = 4000,
  position = "top"
) => {
  Toast.show({
    type,
    text1,
    text2,
    visibilityTime,
    position,
  });
};

export const showErrorToast = (errorMessage) => {
  showToast(
    "error",
    "Error",
    errorMessage || "Algo salió mal. Inténtalo de nuevo más tarde."
  );
};

export const showNewBadgeToast = (numberOfBadges) => {
  const badgeText =
    numberOfBadges === 1
      ? `Has obtenido ${numberOfBadges} nueva medalla: 🏅`
      : `Has obtenido ${numberOfBadges} nuevas medallas: 🏅`;

  showToast("success", "¡Felicidades!", badgeText);
};
