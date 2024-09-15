import json
import datetime

# Cargar el archivo JSON
with open('cataas.json', 'r', encoding='utf-8') as f:
    cats_data = json.load(f)

# Obtener la fecha actual
today = datetime.datetime.now()

# Iterar sobre los gatos y asignarles una fecha
for cat in cats_data:
    cat['expected_date_to_publish'] = today.strftime("%d/%m/%Y")
    today += datetime.timedelta(days=1)  # Sumar 1 día

# Guardar el archivo JSON actualizado
with open('cataas.json', 'w', encoding='utf-8') as f:
    json.dump(cats_data, f, ensure_ascii=False, indent=4)
