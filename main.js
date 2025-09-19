// main.js

// 1. Inicializa el mapa
// Define el centro y el nivel de zoom inicial
const map = L.map('map').setView([40.7128, -74.0060], 13);

// Agrega la capa base de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// 2. Lista manualmente los archivos de coordenadas
// AÑADE o ELIMINA los nombres de los archivos aquí
const archivosCoordenadas = [
    'data/san-javier.geojson'
];

// 3. Carga y dibuja cada archivo
// fetch() carga el archivo, .then() lo procesa
archivosCoordenadas.forEach(archivo => {
    fetch(archivo)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Asegúrate de que 'data' sea un array de coordenadas
            if (Array.isArray(data)) {
                data.forEach(coordenada => {
                    // Dibuja un marcador para cada par de coordenadas (lat, lon)
                    if (coordenada.lat && coordenada.lon) {
                        L.marker([coordenada.lat, coordenada.lon]).addTo(map)
                            .bindPopup(`Archivo: ${archivo}<br>Lat: ${coordenada.lat}<br>Lon: ${coordenada.lon}`);
                    }
                });
            } else {
                console.error(`El archivo ${archivo} no contiene un array de coordenadas.`);
            }
        })
        .catch(error => console.error(`No se pudo cargar el archivo ${archivo}:`, error));
});
