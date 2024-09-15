export async function getCatADay() {
  return {
    id: "aah",
    name: "Pantera",
    origin: "Desconocido, pero probablemente de las sombras",
    temperament:
      "Misterioso, independiente, leal cuando quiere, y siempre listo para aparecer de la nada y asustarte a las 3 de la mañana",
    life_span:
      "10 - 14 años (o toda la eternidad, si las leyendas son ciertas)",
    weight: {
      imperial: "6 - 12 lbs (aunque parece más cuando está sobre tu teclado)",
      metric: "3 - 5.5 kg",
    },
    intelligence: 4, // "Lo suficientemente listo como para meterse en problemas, pero también para escapar sin que lo veas"
    affection_level: 4, // "Te dará cariño, pero sólo cuando no lo estés esperando"
    social_needs: 3, // "Te observará desde lejos, evaluando si vale la pena acercarse"
    image: {
      id: "blk_cat",
      url: "https://cdn2.thecatapi.com/images/aah.jpg", // Puedes cambiar esta URL por una real
    },
  };
}

export async function getCatDetails(catId) {
  // TODO IMPROVE ONLY GET JSON FROM THAT ID
  const CAT_API_URL =
    "https://raw.githubusercontent.com/0x10-z/One-Cat-a-Day/master/scrap/cataas.json";

  const rawData = await fetch(CAT_API_URL);
  const json = await rawData.json();

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

  return json.map((item) => {
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
