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
      name: getRandomName(),
      breedInfo,
      lifeSpan: Math.floor(Math.random() * 25),
    };
  });
}
