Aquí tienes un ejemplo de un **README.md** para tu proyecto donde explicas cómo guardar la información de todos los gatos disponibles en un archivo JSON en GitHub, y luego por cada gato individualmente, un archivo JSON con su información detallada y foto.

---

# One Cat a Day - Aplicación Estática con JSON

Este proyecto está diseñado para funcionar de manera estática utilizando archivos JSON que contienen la información de los gatos. El objetivo es tener un archivo JSON que contenga una lista de todos los gatos disponibles, y luego, para cada gato, un archivo JSON individual que almacene su información y foto.

## Estructura del proyecto

El proyecto está estructurado para que puedas agregar y gestionar gatos estáticamente sin necesidad de una base de datos dinámica. Esto permite que la aplicación sea completamente estática y se sirva desde un repositorio de GitHub o cualquier otro hosting que sirva contenido estático.

### 1. Archivo `gatos.json` - Lista de todos los gatos disponibles

Este archivo contiene una lista de todos los gatos con su identificador (`id`), nombre y una referencia al archivo JSON individual de cada gato.

#### Ejemplo de `gatos.json`:

```json
{
  "cats": [
    {
      "id": "1",
      "name": "Bengala",
      "file": "cats/bengala.json"
    },
    {
      "id": "2",
      "name": "Siamés",
      "file": "cats/siames.json"
    },
    {
      "id": "3",
      "name": "Persa",
      "file": "cats/persa.json"
    }
  ]
}
```

### 2. Archivo JSON por cada gato - Información detallada de cada gato

Para cada gato, se debe crear un archivo JSON individual que contenga su información detallada como nombre, raza, origen, descripción, y la URL de la foto del gato.

#### Ejemplo de `bengala.json`:

```json
{
  "id": "1",
  "name": "Bengala",
  "origin": "Estados Unidos",
  "description": "El gato Bengala es una mezcla única entre gato doméstico y gato salvaje.",
  "temperament": "Alerta, ágil, enérgico, inteligente.",
  "life_span": "12 - 15 años",
  "weight": {
    "imperial": "8 - 15 lbs",
    "metric": "4 - 7 kg"
  },
  "affection_level": 5,
  "social_needs": 5,
  "intelligence": 5,
  "image": "https://cdn2.thecatapi.com/images/O3btzLlsO.png"
}
```

#### Ejemplo de `siames.json`:

```json
{
  "id": "2",
  "name": "Siamés",
  "origin": "Tailandia",
  "description": "El gato Siamés es una de las razas más antiguas y populares.",
  "temperament": "Cariñoso, vocal, juguetón.",
  "life_span": "12 - 20 años",
  "weight": {
    "imperial": "6 - 14 lbs",
    "metric": "3 - 6 kg"
  },
  "affection_level": 4,
  "social_needs": 4,
  "intelligence": 4,
  "image": "https://cdn2.thecatapi.com/images/Siamese.png"
}
```

### 3. Cómo añadir nuevos gatos

Para añadir un nuevo gato, sigue estos pasos:

1. **Añadir al archivo `gatos.json`**:

   - Añade una nueva entrada con el `id` del gato, su `name`, y la referencia al archivo JSON donde se guarda la información completa del gato.

   Ejemplo:

   ```json
   {
     "id": "4",
     "name": "Maine Coon",
     "file": "cats/maine_coon.json"
   }
   ```

2. **Crear un nuevo archivo JSON para el gato**:

   - Crea un archivo JSON en el directorio `cats/` con el nombre correspondiente, por ejemplo, `maine_coon.json`.
   - Asegúrate de incluir toda la información del gato (nombre, descripción, foto, etc.).

   Ejemplo de archivo `maine_coon.json`:

   ```json
   {
     "id": "4",
     "name": "Maine Coon",
     "origin": "Estados Unidos",
     "description": "El Maine Coon es conocido por su gran tamaño y su pelaje largo.",
     "temperament": "Amigable, cariñoso, juguetón.",
     "life_span": "12 - 15 años",
     "weight": {
       "imperial": "10 - 25 lbs",
       "metric": "4.5 - 11 kg"
     },
     "affection_level": 5,
     "social_needs": 3,
     "intelligence": 4,
     "image": "https://cdn2.thecatapi.com/images/maine_coon.png"
   }
   ```

### 4. Cómo usar esta estructura en la aplicación

En tu aplicación, puedes leer el archivo `gatos.json` para obtener la lista de gatos disponibles y luego cargar los detalles individuales del gato desde su archivo JSON correspondiente.

#### Ejemplo de carga de gatos en tu aplicación:

```javascript
// Cargar la lista de gatos
fetch("/gatos.json")
  .then((response) => response.json())
  .then((data) => {
    // Mostrar la lista de gatos
    console.log(data.cats);
  });

// Cargar la información de un gato específico
fetch("/cats/bengala.json")
  .then((response) => response.json())
  .then((catData) => {
    // Mostrar los detalles del gato
    console.log(catData);
  });
```

### 5. Despliegue en GitHub Pages

1. Sube los archivos JSON y el código de tu aplicación a un repositorio de GitHub.
2. Activa **GitHub Pages** en la configuración del repositorio para que se sirva como una aplicación estática.
3. Asegúrate de que las rutas a los archivos JSON sean relativas para que funcionen en GitHub Pages (o cualquier hosting estático).

---

### Conclusión

Con esta estructura de archivos JSON, puedes construir y gestionar una aplicación completamente estática, donde la información de los gatos se almacena en archivos JSON y se sirve directamente desde un repositorio de GitHub o cualquier otro hosting estático. Esto simplifica el despliegue y la gestión de los datos de los gatos sin necesidad de una base de datos dinámica o servidor backend.
