import React, { createContext, useContext, useState, useEffect } from "react";
import BadgeManager from "../lib/badgesManager"; // Ruta donde esté definida la clase

const BadgeContext = createContext();
export function BadgeProvider({ children }) {
  const [badgeManager, setBadgeManager] = useState(null);
  const [badgeList, setBadgeList] = useState([]); // Lista de medallas obtenidas (objetos)

  useEffect(() => {
    const initializeBadgeManager = async () => {
      const manager = new BadgeManager();
      await manager.init(); // Inicializamos el BadgeManager
      setBadgeManager(manager);
      setBadgeList(
        // eslint-disable-next-line prettier/prettier
        manager.badges.filter((badge) => badge.obtained) // Almacenamos objetos completos
      );
    };

    initializeBadgeManager();
  }, []);

  const checkBadges = async (userCats) => {
    if (badgeManager) {
      const newBadges = await badgeManager.checkForNewBadges(userCats);
      if (newBadges.length > 0) {
        // Actualizamos la lista de medallas obtenidas con objetos completos
        setBadgeList((prevList) => [...prevList, ...newBadges]);
        // Opcional: Notificar al usuario sobre las nuevas medallas
      }
    }
  };

  return (
    <BadgeContext.Provider
      value={{ badgeList, checkBadges, badges: badgeManager?.badges || [] }}
    >
      {children}
    </BadgeContext.Provider>
  );
}

export function useBadgeContext() {
  return useContext(BadgeContext);
}
