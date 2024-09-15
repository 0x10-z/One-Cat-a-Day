import requests
import os
from PIL import Image
import hashlib

def compute_hash(file_path, hash_algo):
    """Calcula el hash de un archivo usando el algoritmo especificado."""
    hash_func = hashlib.new(hash_algo)
    chunk_size = 8192
    try:
        with open(file_path, 'rb') as f:
            while chunk := f.read(chunk_size):
                hash_func.update(chunk)
    except (PermissionError, FileNotFoundError) as e:
        print(f"Error al leer el archivo {file_path}: {e}")
        return None
    return hash_func.hexdigest()

def find_duplicate_files(directory, hash_algo='sha256', ignore_empty=False):
    """Encuentra archivos duplicados en un directorio dado."""
    hash_dict = {}
    for root, _, files in os.walk(directory):
        for filename in files:
            file_path = os.path.join(root, filename)
            if ignore_empty and os.path.getsize(file_path) == 0:
                continue
            file_hash = compute_hash(file_path, hash_algo)
            if file_hash:
                hash_dict.setdefault(file_hash, []).append(file_path)
    duplicates = {hash_value: paths for hash_value, paths in hash_dict.items() if len(paths) > 1}
    return duplicates

def delete_duplicates(duplicates, dry_run=True):
    """Elimina archivos duplicados, conservando una copia de cada uno."""
    files_deleted = 0
    for hash_value, files in duplicates.items():
        original_file = files[0]  # Conserva el primer archivo encontrado
        duplicate_files = files[1:]  # Archivos duplicados a eliminar
        for file_path in duplicate_files:
            if dry_run:
                print(f"[Modo de Prueba] Se eliminaría: {file_path}")
            else:
                try:
                    os.remove(file_path)
                    files_deleted += 1
                    print(f"Eliminado: {file_path}")
                except Exception as e:
                    print(f"Error al eliminar {file_path}: {e}")
    print(f"Total de archivos duplicados {'encontrados' if dry_run else 'eliminados'}: {files_deleted}")


gifs_dir = 'gifs'
# for i in range(100):
#     response = requests.get('https://cataas.com/cat/gif')
    
#     if not os.path.exists(gifs_dir):
#         os.makedirs(gifs_dir)

#     with open(os.path.join(gifs_dir, f'cat{i}.gif'), 'wb') as f:
#         f.write(response.content)

duplicates = find_duplicate_files(gifs_dir, 'sha256', True)

if duplicates:
    print("Archivos duplicados encontrados:")
    for files in duplicates.values():
        print(" - " + "\n   ".join(files))
    delete_duplicates(duplicates, dry_run=False)

index = 0
gifs = []
for file in os.listdir(gifs_dir):
    #os.rename(os.path.join(gifs_dir, file), os.path.join(gifs_dir, f"cat{index}.gif"))
    gifs.append(f"cat{index}.gif")
    index+=1

import json
with open('gifs.json', 'w') as f:
    json.dump(gifs, f, ensure_ascii=False, indent=4)