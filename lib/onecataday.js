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
      breedInfo,
    };
  });
}
