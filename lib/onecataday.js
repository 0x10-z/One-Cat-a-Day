const funnyCatNames = [
  "Bigotes",
  "Don Gato",
  "Capitán Ronroneo",
  "Pelusa McPatas",
  "Señor Maullido",
  "Gaturrón",
  "Felino de la Mancha",
  "Gatito McMiau",
  "Patas Suaves",
  "Misi Misi",
  "Gatozilla",
  "Miau Skywalker",
  "Garfio",
  "Princesa Pelusa",
  "Señor Pelos",
  "Purrtugal",
  "Gatastico",
  "Gatástrofe",
  "Misi Potter",
  "Gato Márquez",
];

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

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

export async function getCatDetails() {
  await sleep(2000);

  return {
    id: "beng",
    name: "Bengala",
    origin: "Estados Unidos",
    description:
      "El gato Bengala es como si alguien hubiera pensado '¿y si hacemos un leopardo, pero para la sala de estar?' Nació de la mezcla de un gato doméstico y uno salvaje, porque... ¿por qué no?",
    temperament:
      "Alerta, ágil, enérgico, exigente, con más inteligencia que muchos humanos",
    life_span: "12 - 15 años (o hasta que domine el mundo)",
    adaptability: 5, // "¡Se adapta hasta a vivir en tu teclado cuando estás trabajando!"
    affection_level: 5, // "Nivel de cariño: te perseguirá hasta el baño"
    child_friendly: 4, // "Le encantan los niños... cuando no están demasiado ruidosos"
    grooming: 2, // "Casi no necesita un spa... casi."
    intelligence: 5, // "Más listo que tu jefe"
    health_issues: 3, // "Algún achaque de gato estrella, pero nada grave"
    social_needs: 5, // "Necesita tanta atención como un influencer"
    stranger_friendly: 3, // "Amigo de los extraños, pero sólo si traen comida"
    weight: {
      imperial: "8 - 15 lbs (más cuando roba tu cena)",
      metric: "4 - 7 kg",
    },
    image: {
      id: "O3btzLlsO",
      url: "https://cdn2.thecatapi.com/images/O3btzLlsO.png",
    },
    wikipedia_url: "https://es.wikipedia.org/wiki/Gato_bengal%C3%AD",
    indoor: 0, // "Prefiere correr por la casa a toda velocidad"
    lap: 1, // "Se sentará en tu regazo... solo cuando él quiera"
    hypoallergenic: 1, // "¡Apto para alérgicos! (más o menos)"
    country_codes: "US",
    country_code: "US",
    vocalisation: 4, // "Te maullará como si te estuviera dando órdenes"
    experimental: 0,
    hairless: 0, // "¡Con pelo, como cualquier buen minino!"
    natural: 0,
    rare: 0,
    rex: 0,
    suppressed_tail: 0,
    short_legs: 0, // "Patas normales, pero que te hacen correr detrás de él"
    bidability: 3, // "Hará lo que le pidas... si está de humor"
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

function getRandomName() {
  return funnyCatNames[Math.floor(Math.random() * funnyCatNames.length)];
}

export async function getCatImages() {
  const CAT_API_URL = "https://api.thecatapi.com/v1/images/search?limit=10";

  const rawData = await fetch(CAT_API_URL, {
    headers: {
      "x-api-key":
        "live_0IM5rNnxgOmpEGfDbUG0Xs6x0VPaGOH7DYE7pXHSEQGgTKTNGTYBwy1hy6PEJ4El",
    },
  });
  const json = await rawData.json();

  return json.map((item) => {
    const { id, url, breeds, width, height } = item;

    const breedInfo = breeds.length > 0 ? breeds[0] : null;

    return {
      id,
      url: url,
      width: width,
      height: height,
      description: getRandomDescription(),
      name: getRandomName(),
      breedInfo,
      lifeSpan: Math.floor(Math.random() * 25),
    };
  });
}
