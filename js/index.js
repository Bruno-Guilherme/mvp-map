import json_base_final_v01_3 from '../data/base_final_v01_3.js';


// === CONFIGURAÇÕES GERAIS === //

const map = L.map('map', {
  zoomControl: true, maxZoom: 28, minZoom: 1
}).fitBounds([[-8.145613789548003, -34.97560602091026], [-8.10941480853255, -34.93623795524364]]);

const osmLayer = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
});

const satelliteLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://opentopomap.org">OpenTopoMap</a> contributors'
});

osmLayer.addTo(map);


// === CONFIGURAÇÕES DE ESTILO === //

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

let geojson;

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
      const stateName = feature.properties.name;
      const density = feature.properties.density;

      // Criar dados para a planilha
      const data = [
        { Attribute: "State", Value: stateName },
        { Attribute: "Density", Value: density },
      ];

      // Abrir popup com a planilha em HTML
      openPopupWithTable(feature.properties);
    }
  });
}

json_base_final_v01_3.features.forEach((feature) => {
  // Verifica se feature.properties.name é uma string válida
  const name = feature.properties.name && typeof feature.properties.name === 'string' ? feature.properties.name.toLowerCase() : '';
  
  // Verifica se feature.properties['Município'] é uma string válida
  const municipio = feature.properties['Município'] && typeof feature.properties['Município'] === 'string' ? feature.properties['Município'].toLowerCase() : '';

  feature.properties.textoBusca = name + " " + municipio;
});


geojson = L.geoJson(json_base_final_v01_3, {
  // Implementação dos estilos e eventos aos poligonos
  style: geojsonStyle,
  onEachFeature: onEachFeature
}).addTo(map);


// === CONFIGURAÇÕES DE CONTROLE === //

const info = L.control();

info.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
  this.update();
  return this._div;
};


info.update = function (props) {
  this._div.innerHTML = '<h4>Localidade</h4>' + (props ?
    '<b>' + props.name + '</b><br />' + props.density + '.'
    : 'Hover over a state');
};

info.addTo(map);


// === CONFIGURAÇÕES DE TABELAS === //

function openPopupWithTable(data) {
  const popup = window.open("", "_blank", "width=800px,height=800");

  if (!popup) {
    alert("Popup blocked! Please allow popups for this website.");
    return;
  }

  const htmlContent = `
    <html>
    <head>
      <title>${data.name}</title>
      <style>
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 8px 12px; border: 1px solid #ddd; text-align: left; }
        th { background-color: #f2f2f2; }
      </style>
    </head>
    <body>
      <h2>${data.name} Population Density</h2>
      <table>
        <thead>
          <tr>
            <th>Attribute</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          ${Object.keys(data).map(key => `
            <tr>
              <td>${key}</td>
              <td>${key === "nota técnica (NEN/SRI)" && data[key] ? `<a href="${data[key]}" target="_blank">Nota Técnica</a>` : data[key]}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </body>
    </html>
  `;

  popup.document.write(htmlContent);
  popup.document.close();
}


// === IMPLEMENTAÇÃO DE BUSCAS === //



const controleBusca = new L.Control.Search({
  layer: geojson,
  propertyName: 'textoBusca',
  moveToLocation: function (latlng, title, map) {
    map.setView(latlng, 17); // Centraliza o mapa no resultado da busca
  },
  textPlaceholder: 'Buscar...',
  textErr: 'Localização não encontrada',
  textCancel: 'Cancelar'
});

map.addControl(controleBusca);
// === CONFIGURAÇÕES DE CAMADAS === //

const baseMaps = {
  "Mapas de Ruas": osmLayer,
  "Satélite": satelliteLayer
};

const overlayMaps = {
  "GeoJSON Layer": geojson
};

L.control.layers(baseMaps, overlayMaps).addTo(map);
geojson.addTo(map);

L.control.locate({ setView: true, maxZoom: 16 }).addTo(map);