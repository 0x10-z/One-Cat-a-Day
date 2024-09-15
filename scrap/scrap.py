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

# Function to get images for a specific breed
def get_images_by_breed(breed_id, limit=5):
    url = f'https://api.thecatapi.com/v1/images/search?breed_ids={breed_id}&limit={limit}'
    response = requests.get(url, headers=headers)
    return response.json()

# Función para obtener los datos de la API
def get_breeds():
    with open('cats_json_es.json', 'r') as f:
        cats_data = json.load(f)
        return cats_data
    # response = requests.get(API_URL, headers=headers)
    # if response.status_code == 200:
    #     return response.json()
    # else:
    #     print("Error al acceder a la API")
    #     return []

# Función para descargar la imagen del gato
def download_image(image_url, breed_folder, image_name):
    img_data = requests.get(image_url).content
    with open(os.path.join(breed_folder, image_name), 'wb') as handler:
        handler.write(img_data)

# Main function to manage the download process
def download_cat_images():
    # Get all breeds
    breeds = get_breeds()

    # Loop through each breed
    for breed in breeds:
        try:
            breed_name = breed['name']
            breed_id = breed['id']
            
            # Create a folder with the breed name
            breed_folder = os.path.join('.', 'breeds', breed_id)
            if not os.path.exists(breed_folder):
                os.makedirs(breed_folder)
            
                # Get images for the breed
                images = get_images_by_breed(breed_id)

                # Download and save each image
                for idx, image in enumerate(images):
                    image_url = image['url']
                    extension = os.path.splitext(image_url)[1]  # Get the file extension (jpg, png, etc.)
                    image_name = f"{breed_name}_{idx + 1}{extension}"
                    download_image(image_url, breed_folder, image_name)
                    print(f"Downloaded: {image_name} in folder {breed_folder}")
        except Exception:
            pass

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
    cat_data = get_breeds()

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
    #process_cat_data()
    download_cat_images()
