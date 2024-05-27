import { openPopupWithTable } from "./tabelas.js";

const criarPoligono = (base, map, info, sidebar) => {

    let geojson;

    function geojsonStyle(feature) {

        // Função para definir o estilo dos poligonos.
        return {
            // Área
            fillOpacity: 0.5,
    
            dashArray: "10. 10",
    
            // Aresta
            color: "#1C63B1",
            weight: 2,
            opacity: 1,
        };
    }
    
    function highlightFeature(e) {
        // Função para estilizar os poligonos on hover
        let layer = e.target;
    
        layer.setStyle({
            weight: 5,
            dashArray: '',
            fillOpacity: 0.7
        });
    
        layer.bringToFront();
    
    
        info.update(layer.feature.properties);
    }
    
    function resetHighlight(e) {
        // Função para estilizar o poligono out hover
        geojson.resetStyle(e.target);
    
    
        info.update();
    }
    
    function zoomToFeature(e) {
        // Função para dar foco ao poligono clicado
        map.fitBounds(e.target.getBounds());
    }
    
    function onEachFeature(feature, layer) {
        // Adição dos ouvintes ao mapa
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: (e) => {
                zoomToFeature(e);
                
                sidebar.open('home');
                // Abrir popup com a planilha em HTML
                openPopupWithTable(feature.properties);
            }
        });
    }


    geojson =  L.geoJson(base, {
        style: geojsonStyle,
        onEachFeature: onEachFeature
    }).addTo(map);

    return geojson;
}

export {criarPoligono}