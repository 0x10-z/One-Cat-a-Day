export async function getCatADay() {
  const CAT_API_URL =
    "https://raw.githubusercontent.com/0x10-z/One-Cat-a-Day/master/scrap/cataas.json";

  const rawData = await fetch(CAT_API_URL);
  const list = await rawData.json();

  const today = new Date("2024-09-15"); //list will start today;

  const startDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  ); // Fijamos la referencia al día de hoy a las 00:00

  // Obtén el número de milisegundos desde la referencia
  const msSinceStartDate = today - startDate;

  // Convierte a días
  const daysSinceStart = Math.floor(msSinceStartDate / (1000 * 60 * 60 * 24));

  // Calcula el índice: empieza en 0 hoy y avanza un día cada día
  const index = daysSinceStart % list.length;

  // Devuelve el elemento correspondiente
  const catItem = list[index];

  const {
    id,
    name,
    description,
    tagline,
    weight,
    intelligence,
    love,
    exploding_rate,
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

export async function getCatDetails(catId) {
  // TODO IMPROVE ONLY GET JSON FROM THAT ID
  const CAT_API_URL =
    "https://raw.githubusercontent.com/0x10-z/One-Cat-a-Day/master/scrap/cataas.json";

  const rawData = await fetch(CAT_API_URL);
  const json = await rawData.json();

  const index = json.findIndex(
    (item) => item.id.replace(".webp", "") === catId,
  );

  const catItem = json.find((item) => item.id.replace(".webp", "") === catId);

  // Select a random cat detail from the list
  if (!catItem) {
    throw new Error(`Cat with ID ${catId} not found`);
  }

  const {
    id,
    name,
    description,
    tagline,
    weight,
    intelligence,
    love,
    exploding_rate,
  } = catItem;

  console.log(catItem);

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

export async function getCatImages() {
  const CAT_API_URL =
    "https://raw.githubusercontent.com/0x10-z/One-Cat-a-Day/master/scrap/cataas.json";

  const rawData = await fetch(CAT_API_URL);
  const json = await rawData.json();

  return json.map((item, index) => {
    const {
      id,
      name,
      description,
      tagline,
      weight,
      intelligence,
      love,
      exploding_rate,
    } = item;

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
  });
}
