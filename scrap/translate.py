import requests
import json
from tqdm import tqdm

# Tu clave API de OpenAI (asegúrate de tener configurada tu API Key)
api_key = 'sk-PHlWNuQNjG2A48OIu__ftS5AjpQ79Vv1sDTs5IpCYIT3BlbkFJtOLnQ-eL-LkQByMqWSSOb39ZZyeQ5yX5DnJ5kjd_UA'

# Cargar el archivo JSON
file_path = 'cats_json_es.json'
with open(file_path, 'r', encoding='utf-8') as f:
    cats_data = json.load(f)

# Función para traducir texto usando la API de OpenAI
def translate_text(text, target_language='es'):
    url = "https://api.openai.com/v1/chat/completions"
    
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}"
    }
    
    data = {
        "model": "gpt-4-turbo",
        "messages": [
            {"role": "system", "content": "You are a translation assistant from english to spanish."},
            {"role": "user", "content": f"Translate the following text to {target_language}. Respond with only the translated text: {text}"}
        ],
        "max_tokens": 500,
        "temperature": 0.5
    }
    
    response = requests.post(url, headers=headers, json=data)
    
    if response.status_code == 200:
        result = response.json()
        return result['choices'][0]['message']['content'].strip()
    else:
        print(f"Error during translation: {response.status_code} - {response.text}")
        return text   # Devolver el texto original si hay un error

# Iterar sobre cada elemento del JSON y traducir los valores deseados
for cat in tqdm(cats_data[10:]):
    if 'description' in cat:
        cat['description'] = translate_text(cat['description'])


translated_file_path = 'cats_json_es_translated.json'
with open(translated_file_path, 'w', encoding='utf-8') as f:
    json.dump(cats_data, f, ensure_ascii=False, indent=4)

print(f"Archivo traducido guardado en: {translated_file_path}")
