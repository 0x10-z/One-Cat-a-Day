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
    intelligence,
    love,
    exploding_rate,
    tagline,
  } = catItem;

  return {
    listPosition: index + 1,
    id: id.replace(".webp", ""),
    url: `https://raw.githubusercontent.com/0x10-z/One-Cat-a-Day/master/scrap/cataas_webp_365/${id}`,
    weight: weight,
    tagline: tagline,
    description: getRandomDescription(),
    name: name,
    intelligence: intelligence,
    love: love,
    exploding_rate: exploding_rate,
    lifeSpan: Math.floor(Math.random() * 25),
  };
}

// Función para obtener la descripción aleatoria
const funnyDescriptions = [
  "Este gato es como un ninja: aparece de la nada, destruye tu sala y desaparece como si nada.",
  "¿Tranquilo? Más bien un huracán con patas que corre por toda la casa a las 3 AM.",
  "Tiene la elegancia de un león... si los leones se durmieran en cajas de zapatos y fueran adictos al atún.",
  "A veces te mira como si supiera algo que tú no. Probablemente tiene razón.",
  "Este gato es tan rápido que si parpadeas ya te ha robado el almuerzo.",
  "Su pasatiempo favorito: empujar cosas desde el borde de cualquier mesa... con actitud.",
  "No necesita juguetes caros, solo una caja y un rollo de papel higiénico para destruir tu casa.",
  "Es como un superhéroe con una misión secreta: evitar que trabajes cuando más lo necesitas.",
  "Este gato tiene más drama que una telenovela, especialmente cuando la comida llega 5 minutos tarde.",
  "Si no lo ves, no te preocupes... probablemente esté planeando su próxima travesura.",
  "Nunca subestimes a este gato. Podría parecer adorable, pero tiene una habilidad especial para hackear tu sofá.",
  "Es un gato con estilo, siempre caminando como si desfilara en una pasarela... de comida, claro.",
];

function getRandomDescription() {
  return funnyDescriptions[
    Math.floor(Math.random() * funnyDescriptions.length)
  ];
}

// Función para obtener un gato por día (rotación cíclica)
export async function getCatADay() {
  const list = await fetchCatList();

  const today = new Date(); // Puedes usar una fecha específica si quieres
  const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  // Días desde la referencia
  const daysSinceStart = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));

  // Índice cíclico basado en el día
  const index = daysSinceStart % list.length;

  // Devuelve el gato correspondiente formateado
  return formatCatItem(list[index], index);
}

// Función para obtener detalles de un gato por su ID
export async function getCatDetails(catId) {
  const list = await fetchCatList();

  // Encuentra el índice y el item por ID
  const index = list.findIndex((item) => item.id.replace(".webp", "") === catId);
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
