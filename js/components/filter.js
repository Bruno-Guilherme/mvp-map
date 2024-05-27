import { criarPoligono } from "./layerDesign.js";

// Função para filtrar o GeoJSON
const filtro = (map, geojsonData, info) => {
    const html = `
    <div class="input-group">
    <input id="search-input" type="text" class="form-control input-sm" placeholder="Pesquisar">
    <span class="input-group-btn">
        <button id="search-button" class="btn btn-default btn-sm" type="button">Go!</button>
    </span>
    </div>
    `;

    const css = {
        position: 'absolute',
        left: '50px',
        top: '0px',
        width: '200px',
        float: 'right'
    };

    // Função para tratar caracteres especiais em regex
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function filterGeoJSON(searchText) {
        const sanitizedText = escapeRegExp(searchText).toLowerCase();
        return {
            "type": "FeatureCollection",
            "features": geojsonData.features.filter(feature => feature.properties.name.toLowerCase().includes(sanitizedText))
            /* 
            "features": geojsonLayer.eachLayer((layer) => {
                layer.feature.filter(feature => feature.properties.name.toLowerCase().includes(sanitizedText))
            })
                geojson.eachLayer(function(layer) {
    console.log(layer.feature); // Acessando os dados GeoJSON da feature
    console.log(layer.feature.properties.name); // Acessando um atributo específico
});
            */
        };
    }

    const eventos = {
        click: function(data) {
            if (data.target && data.target.id === 'search-button') {
                const inputValue = document.getElementById('search-input').value;

                // Filtrar o GeoJSON
                const filteredData = filterGeoJSON(inputValue);
            

                // Verificar se há dados filtrados
                if (filteredData.features.length > 0) {
                    // Remover o layer antigo
                    map.eachLayer(layer => {
                        if (layer instanceof L.GeoJSON) {
                            map.removeLayer(layer);
                        }
                    });

                    // Adicionar o novo layer filtrado
                    const geojsonLayer = L.geoJSON(filteredData).addTo(map);
                    const testeLayer = criarPoligono(filteredData, map, info);

                    // Ajustar o zoom do mapa para o novo layer
                    map.fitBounds(testeLayer.getBounds());
                } else {
                    console.log('No matching features found.');
                }
            }
        },
        contextmenu: function(data) {
            console.log('wrapper div element contextmenu');
            console.log(data);
        },
    };

    const filtrar = L.control.custom({
        position: 'topleft',
        content: html,
        classes: '',
        style: css,
        events: eventos,
    });

    filtrar.addTo(map);
}

export { filtro };
