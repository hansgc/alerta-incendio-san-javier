// En tu archivo script.js

// Crear el mapa
var map = L.map('mapid').setView([latitud, longitud], zoom);

// Añadir la capa base (ej. OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Array de rutas de archivos GeoJSON
const geojsonFiles = [
    'path/to/municipio1.geojson',
    'path/to/municipio2.geojson'
];

// Recorrer el array y cargar cada archivo
geojsonFiles.forEach(file => {
    fetch(file)
        .then(response => response.json())
        .then(data => {
            L.geoJSON(data).addTo(map);
        })
        .catch(error => {
            console.error('Error al cargar el archivo GeoJSON:', error);
        });
});
