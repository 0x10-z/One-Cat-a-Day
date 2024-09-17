const CAT_API_URL =
  "https://raw.githubusercontent.com/0x10-z/One-Cat-a-Day/master/scrap/cataas.json";

// Función común para obtener la lista de gatos
async function fetchCatList() {
  const rawData = await fetch(CAT_API_URL);
  return await rawData.json();
}

// Función para formatear los datos de un gato
function formatCatItem(catItem, index) {
  const {
    id,
    name,
    weight,
    description,
    intelligence,
    love,
    exploding_rate,
    tagline,
    years,
  } = catItem;

  return {
    listPosition: index + 1,
    id: id.replace(".webp", ""),
    url: `https://raw.githubusercontent.com/0x10-z/One-Cat-a-Day/master/scrap/cataas_webp_365/${id}`,
    weight: weight,
    tagline: tagline,
    description: description,
    lifeSpan: years,
    name: name,
    intelligence: intelligence,
    love: love,
    exploding_rate: exploding_rate,
  };
}

export async function getCatGif() {
  const response = await fetch(
    // eslint-disable-next-line prettier/prettier
    "https://raw.githubusercontent.com/0x10-z/One-Cat-a-Day/master/scrap/gifs.json"
  );

  if (!response.ok) {
    throw new Error(`Error al cargar los gifs: ${response.statusText}`);
  }

  const gifs = await response.json();
  const randomIndex = Math.floor(Math.random() * gifs.length);
  return `https://raw.githubusercontent.com/0x10-z/One-Cat-a-Day/master/scrap/gifs/${gifs[randomIndex]}`;
}

// Función para obtener un gato por día (rotación cíclica)
export async function getCatADay() {
  const sinceDate = "2024-09-15";
  const list = await fetchCatList();

  const today = new Date();
  const startDate = new Date(sinceDate);

  today.setHours(0, 0, 0, 0);
  startDate.setHours(0, 0, 0, 0);

  const daysSinceStart = Math.floor(
    (today - startDate) / (1000 * 60 * 60 * 24)
  );

  return list[daysSinceStart % list.length];
}


  // Índice cíclico basado en el día
  const index = daysSinceStart % list.length;

  // Devuelve el gato correspondiente formateado
  return formatCatItem(list[index], index);
}

// Función para obtener detalles de un gato por su ID
export async function getCatDetails(catId) {
  const list = await fetchCatList();

  // Encuentra el índice y el item por ID
  const index = list.findIndex(
    (item) => item.id.replace(".webp", "") === catId
  );
  const catItem = list[index];

  if (!catItem) {
    throw new Error(`Cat with ID ${catId} not found`);
  }

  return formatCatItem(catItem, index);
}

// Función para obtener la lista de todos los gatos con sus posiciones
export async function getCatImages() {
  const list = await fetchCatList();

  return list.map((catItem, index) => formatCatItem(catItem, index));
}
