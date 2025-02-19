document.addEventListener("DOMContentLoaded", function () {
    let map = L.map('map').setView([-23.5505, -46.6333], 13); // São Paulo como ponto inicial

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    let selectedMarker = null; // Variável para armazenar o marcador

    // Evento de clique no mapa
    map.on('click', function (e) {
        let { lat, lng } = e.latlng;

        // Remove o marcador anterior, se existir
        if (selectedMarker) {
            map.removeLayer(selectedMarker);
        }

        // Adiciona um novo marcador na posição clicada
        selectedMarker = L.marker([lat, lng]).addTo(map)
            .bindPopup(`📍 Local Selecionado<br>Lat: ${lat.toFixed(5)}<br>Lng: ${lng.toFixed(5)}`)
            .openPopup();

        // Atualiza o texto com as coordenadas
        document.getElementById("coordinates").innerText = `Coordenadas: ${lat.toFixed(5)}, ${lng.toFixed(5)}`;

        // Salva as coordenadas na variável global
        window.selectedCoordinates = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
    });

    // Evento para copiar coordenadas ao clicar no botão
    document.getElementById("copyButton").addEventListener("click", function () {
        if (window.selectedCoordinates) {
            navigator.clipboard.writeText(window.selectedCoordinates)
                .then(() => alert("📋 Coordenadas copiadas com sucesso!"))
                .catch(() => alert("❌ Erro ao copiar as coordenadas."));
        } else {
            alert("❗ Selecione um local no mapa primeiro.");
        }
    });
});
