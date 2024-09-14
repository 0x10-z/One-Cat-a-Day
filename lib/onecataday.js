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

export async function getCatDetails() {
  alert();
  console.error("ASDAS");
  return {};
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
