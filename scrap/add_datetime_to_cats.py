import json
import datetime

# Cargar el archivo JSON
with open('cataas.json', 'r', encoding='utf-8') as f:
    cats_data = json.load(f)

# Obtener la fecha actual
since = datetime.datetime(2024,9,15)

# Iterar sobre los gatos y asignarles una fecha
for cat in cats_data:
    cat['expected_date_to_publish'] = since.strftime("%d/%m/%Y")
    since += datetime.timedelta(days=1)  # Sumar 1 día

# Guardar el archivo JSON actualizado
with open('cataas.json', 'w', encoding='utf-8') as f:
    json.dump(cats_data, f, ensure_ascii=False, indent=4)
