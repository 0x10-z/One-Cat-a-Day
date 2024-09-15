import os
import json
import random
from funny_names import funny_names



# Function to generate JSON data from images in a directory
def generate_cat_json(directory):
    cat_data = []
    cats_tags = read_cats_tags()
    total_names = len(funny_names)
    funny_names_list = list(funny_names.items())

    for idx, filename in enumerate(os.listdir(directory)):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.webp')):
            _, cat = funny_names_list[idx % total_names]
            print(cat)
            cat_info = {
                "id": filename,
                "name":  cat['name'],
                "description": cat['description'],
                "tagline": cat['tagline'],
                "weight": cat['weight'],
                "intelligence": cat['intelligence'],
                "love": cat['love'],
                "exploding_rate": cat['exploding_rate'],
                "tags": cats_tags[filename.split('.')[0]].get('tags', [])
            }
            cat_data.append(cat_info)
    
    return cat_data

def read_cats_tags():
    with open('cats_data_cataas.json', 'r', encoding='utf-8') as f:
        cats_data = json.load(f)
    print(f"Hay {len(cats_data)} gatos")
    cats_dict = {}
    for cat in cats_data:
        cats_dict[cat['id']] = cat
    return cats_dict

# Main function to create JSON file from directory of images
def main(directory, output_file="cataas.json"):
    cat_data = generate_cat_json(directory)
    print(f"Se van a almacenar {len(cat_data)} gatos")
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(cat_data, f, ensure_ascii=False, indent=4)
    
    print(f"JSON data saved to {output_file}")

# Directory containing your images
image_directory = "cataas_webp_365"

# Generate the JSON file
main(image_directory)
