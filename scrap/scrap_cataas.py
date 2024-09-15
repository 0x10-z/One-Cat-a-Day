import requests
import json
from tqdm import tqdm
import os
import mimetypes
import magic  # Use python-magic for accurate MIME type detection


# Base URL for the CATAAS API
base_url = "https://cataas.com"

# Function to get all cats with pagination
def get_all_cats(limit=100):
    cats_list = []
    skip = 0
    progress_bar = tqdm(total=1, desc="Fetching cats", unit="batch")  # Initial total set to 1, we'll update it
    while True:
        # Make the API request with pagination
        response = requests.get(f"{base_url}/api/cats", params={"limit": limit, "skip": skip})
        if response.status_code == 200:
            cats = response.json()
            if not cats:
                break  # If no more cats are returned, stop the loop
            cats_list.extend(cats)
            skip += limit  # Move to the next batch
             # Update progress bar
            progress_bar.total += 1
            progress_bar.update(1)

        else:
            print(f"Failed to retrieve cats. Status code: {response.status_code}")
            break
    return cats_list

# Function to save cats data to a JSON file
def save_cats_to_json(cats_data, output_file="cats_data_cataas.json"):
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(cats_data, f, ensure_ascii=False, indent=4)
    print(f"Saved data to {output_file}")

# Main function to process cats and save URLs and tags
def process_cats():
    cats = get_all_cats()
    cats_data = []
    
    for cat in cats:
        cat_info = {
            "id": cat["_id"],
            "image_url": f"{base_url}/cat/{cat['_id']}",
            "tags": cat.get("tags", [])
        }
        cats_data.append(cat_info)
    
    # Save to JSON
    save_cats_to_json(cats_data)

def read_cats():
    with open('cats_data_cataas.json', 'r', encoding='utf-8') as f:
        cats_data = json.load(f)
    print(f"Hay {len(cats_data)} gatos")
    return cats_data
    
# Function to download image temporarily and check its mimetype
def download_and_rename_image(cat):
    output_dir = './cataas/'
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    try:
        # Download the image temporarily
        temp_file_path = os.path.join(output_dir, f"{cat['id']}_temp")
        image_url = f"{base_url}/cat/{cat['id']}"
        response = requests.get(image_url)
        
        if response.status_code == 200:
            with open(temp_file_path, 'wb') as f:
                f.write(response.content)

            # Determine the mimetype of the downloaded file
            mime = magic.Magic(mime=True)
            mimetype = mime.from_file(temp_file_path) 
            # Determine file extension based on the mimetype
            file_extension = ".gif" if "gif" in mimetype else ".jpg"
            final_file_path = os.path.join(output_dir, f"{cat['id']}{file_extension}")

            # Rename the temporary file to the final file name
            os.rename(temp_file_path, final_file_path)
            print(f"Downloaded and saved: {final_file_path}")
        else:
            print(f"Failed to download {image_url}. Status code: {response.status_code}")
    except Exception as e:
        print(f"Error downloading or renaming file for cat ID {cat['id']}: {e}")



# Run the script
if __name__ == "__main__":
    #process_cats()
    cats = read_cats()
    for cat in tqdm(cats):
        download_and_rename_image(cat)
