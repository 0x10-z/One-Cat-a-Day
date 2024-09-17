import AsyncStorage from "@react-native-async-storage/async-storage";

async function fetchBadges() {
  try {
    const response = await fetch(
      // eslint-disable-next-line prettier/prettier
      "https://raw.githubusercontent.com/0x10-z/One-Cat-a-Day/master/lib/all_badges.json"
    );

    if (!response.ok) {
      throw new Error(`Error al cargar las medallas: ${response.statusText}`);
    }

    const badges = await response.json();

    // Aseguramos que cada medalla tenga la propiedad 'obtained' inicializada a false
    const initializedBadges = badges.map((badge) => ({
      ...badge,
      obtained: badge.obtained || false,
    }));

    return initializedBadges;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default class BadgeManager {
  constructor() {
    this.badges = [];
  }

  // Método asíncrono para inicializar las medallas
  async init() {
    // Cargar medallas desde el JSON
    this.badges = await fetchBadges();

    // Cargar medallas obtenidas desde AsyncStorage
    const storedBadgeIds = await this.loadObtainedBadges();

    // Actualizar el estado de las medallas obtenidas
    this.badges = this.badges.map((badge) => ({
      ...badge,
      obtained: storedBadgeIds.includes(badge.id),
    }));
  }

  // Método para comprobar y otorgar nuevas medallas
  async checkForNewBadges(userCats) {
    let newBadges = [];
    console.log(this.badges);
    for (let badge of this.badges) {
      // Si la medalla no ha sido obtenida, comprobamos si se cumple el criterio
      if (!badge.obtained && this.meetsCriteria(badge.criteria, userCats)) {
        badge.obtained = true; // Marcamos la medalla como obtenida
        newBadges.push(badge); // Añadimos la medalla a la lista de nuevas medallas obtenidas
      }
    }

    if (newBadges.length > 0) {
      // Guardar el estado actualizado de las medallas obtenidas
      await this.saveObtainedBadges();
    }

    return newBadges; // Devolvemos las nuevas medallas obtenidas
  }

  // Método para comprobar si se cumple el criterio de una medalla
  meetsCriteria(criteria, userCats) {
    if (criteria.type === "total_cats") {
      // Criterio por número total de gatos obtenidos
      return userCats.length >= criteria.number;
    }
    if (criteria.type === "specific_cat") {
      // Criterio por obtener un gato específico
      return userCats.some(
        // eslint-disable-next-line prettier/prettier
        (cat) => cat === criteria.catId || cat.id === criteria.catId
      );
    }
    if (criteria.type === "day_of_week") {
      // Criterio por obtener un gato en un día de la semana específico
      return userCats.some((cat) => {
        const obtainedDate = new Date(cat.obtainedAt); // Suponemos que cada gato tiene una fecha 'obtainedAt'
        const dayOfWeek = obtainedDate.getDay(); // 0 es domingo, 1 es lunes, ..., 6 es sábado
        return dayOfWeek === criteria.dayOfWeek;
      });
    }
    if (criteria.type === "date_range") {
      // Nuevo criterio: obtener un gato entre dos fechas
      const startDate = new Date(criteria.startDate);
      const endDate = new Date(criteria.endDate);
      return userCats.some((cat) => {
        const obtainedDate = new Date(cat.obtainedAt);
        return obtainedDate >= startDate && obtainedDate <= endDate;
      });
    }

    return false; // Si el criterio no coincide con ninguno conocido
  }

  // Método para guardar las medallas obtenidas en AsyncStorage
  async saveObtainedBadges() {
    const obtainedBadgeIds = this.badges
      .filter((badge) => badge.obtained)
      .map((badge) => badge.id);

    try {
      await AsyncStorage.setItem(
        "obtainedBadges",
        // eslint-disable-next-line prettier/prettier
        JSON.stringify(obtainedBadgeIds)
      );
    } catch (error) {
      console.error("Error al guardar las medallas obtenidas:", error);
    }
  }

  // Método para cargar las medallas obtenidas desde AsyncStorage
  async loadObtainedBadges() {
    try {
      const storedBadgeIds = await AsyncStorage.getItem("obtainedBadges");
      return storedBadgeIds ? JSON.parse(storedBadgeIds) : [];
    } catch (error) {
      console.error("Error al cargar las medallas obtenidas:", error);
      return [];
    }
  }
}
