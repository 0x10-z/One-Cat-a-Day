import os
import requests
import json
from tqdm import tqdm

# API de TheCatAPI
API_URL = "https://api.thecatapi.com/v1/breeds"
IMG_URL = "https://cdn2.thecatapi.com/images/"
CAT_API_URL = "https://api.thecatapi.com/v1/images/search?limit=10";

headers = {
 "x-api-key":
        "live_0IM5rNnxgOmpEGfDbUG0Xs6x0VPaGOH7DYE7pXHSEQGgTKTNGTYBwy1hy6PEJ4El",       
}

if not os.path.exists('photos'):
    os.makedirs('photos')

if not os.path.exists('cat_json'):
    os.makedirs('cat_json')

# Función para obtener los datos de la API
def get_cat_data():
    response = requests.get(API_URL, headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        print("Error al acceder a la API")
        return []

# Función para descargar la imagen del gato
def download_image(image_id, image_url):
    img_response = requests.get(image_url)
    if img_response.status_code == 200:
        with open(f'photos/{image_id}.jpg', 'wb') as img_file:
            img_file.write(img_response.content)
    else:
        print(f"Error descargando imagen {image_id}")

# Función para crear el archivo JSON para cada gato
def save_cat_info(cat):
    slug = cat["id"]
    cat_info = {
        "id": cat["id"],
        "name": cat["name"],
        "description": cat["description"],
        "temperament": cat["temperament"],
        "origin": cat["origin"],
        "life_span": cat["life_span"],
        "weight": cat["weight"],
        "url": cat.get("image", {}).get("url", ""),
    }

    # Guardar el JSON individual para cada gato
    with open(f'cat_json/{slug}.json', 'w') as json_file:
        json.dump(cat_info, json_file, indent=4)
        #print(f"Información del gato {cat['name']} guardada.")

# Función para crear el archivo JSON para cada gato
def save_cat_info(cats):
    cats_to_save = []
    for cat in cats:
        slug = cat["id"]
        cat_info = {
            "id": cat["id"],
            "name": cat["name"],
            "description": cat["description"],
            "temperament": cat["temperament"],
            "origin": cat["origin"],
            "life_span": cat["life_span"],
            "weight": cat["weight"],
            "url": cat.get("image", {}).get("url", ""),
        }
        cats_to_save.append(cat_info)

    # Guardar el JSON individual para cada gato
    with open(f'cats_json.json', 'w') as json_file:
        json.dump(cats_to_save, json_file, indent=4)
        #print(f"Información del gato {cat['name']} guardada.")

# Función principal para procesar los datos
def process_cat_data():
    cat_data = get_cat_data()

    save_cat_info(cat_data)
    # for cat in tqdm(cat_data, desc="Descargando gatetes😸"):
    #     # Descargar la imagen del gato si tiene
    #     if "image" in cat and "id" in cat["image"]:
    #         image_id = cat["image"]["id"]
    #         image_url = f"{IMG_URL}{image_id}.jpg"
    #         download_image(image_id, image_url)

    #     # Guardar la información del gato en un archivo JSON
    #     save_cat_info(cat)

if __name__ == "__main__":
    process_cat_data()