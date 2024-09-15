import os
import re
from PIL import Image
import unicodedata
from tqdm import tqdm

# Directory where the images are stored
input_dir = './cataas'
output_dir = './cataas_webp'

# Create the output directory if it doesn't exist
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# Function to sanitize filenames
def sanitize_filename(filename):
    # Normalize the filename to remove accents and special characters
    nfkd_form = unicodedata.normalize('NFKD', filename)
    only_ascii = nfkd_form.encode('ASCII', 'ignore').decode('ASCII')

    # Remove all non-alphanumeric characters except underscores, hyphens, and periods
    sanitized_name = re.sub(r'[^\w\-.]', '_', only_ascii)
    return sanitized_name

# Function to convert image to webp
def convert_to_webp(image_path, output_path):
    try:
        with Image.open(image_path) as img:
            img.save(output_path, format='webp')
    except Exception as e:
        print(f"Error converting {image_path}: {e}")

# Walk through all directories and subdirectories recursively
for root, dirs, files in os.walk(input_dir):
    # Create corresponding output directory structure
    relative_path = os.path.relpath(root, input_dir)
    output_subdir = os.path.join(output_dir, relative_path)
    
    if not os.path.exists(output_subdir):
        os.makedirs(output_subdir)
    
    for filename in tqdm(files, desc="Converting to webp..."):
        # Only process image files (add more extensions if needed)
        if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp', '.gif')):
            input_path = os.path.join(root, filename)
            
            # Sanitize the filename and change extension to .webp
            sanitized_name = sanitize_filename(os.path.splitext(filename)[0]) + '.webp'
            output_path = os.path.join(output_subdir, sanitized_name)
            
            # Convert the image to webp format
            convert_to_webp(input_path, output_path)
