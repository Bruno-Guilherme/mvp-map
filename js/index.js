import json_base_final_v01_3 from '../data/base_final_v01_3.js';
import { filtro } from './components/filter.js';
import { info } from "./components/info.js";
import { buscar } from "./components/busca.js"
import {criarPoligono} from './components/layerDesign.js'


// === CONFIGURAÇÕES GERAIS === //

const map = L.map('map', {
  zoomControl: true, maxZoom: 28, minZoom: 1
}).fitBounds([[-8.145613789548003, -34.97560602091026], [-8.10941480853255, -34.93623795524364]]);


// === Configuração de camadas === //
const osmLayer = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
});

const satelliteLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://opentopomap.org">OpenTopoMap</a> contributors'
});

osmLayer.addTo(map);

L.control.zoom({
  position: 'bottomright'
}).addTo(map);

// === CONFIGURAÇÕES DE CONTROLE === //
info.addTo(map);

// SideBar
const sidebar = L.control.sidebar('sidebar').addTo(map);
// Camada
let geojson = criarPoligono(json_base_final_v01_3, map, info, sidebar)


// === IMPLEMENTAÇÃO DE BUSCAS === //
map.addControl(buscar(geojson));

// === Implementar Filtro === ///
filtro(map, json_base_final_v01_3, info);


//


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

export { map };