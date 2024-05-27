// === IMPLEMENTAÇÃO DE BUSCAS === //

const buscar = (geojsonLayer) => {
    const controleBusca = new L.Control.Search({
        layer: geojsonLayer,
        propertyName: 'name',
        moveToLocation: function (latlng, title, map) {
            map.setView(latlng, 17); // Centraliza o mapa no resultado da busca
        },
        textPlaceholder: 'Buscar...',
        textErr: 'Localização não encontrada',
        textCancel: 'Cancelar',
        initial: false,
    });

    return controleBusca;
}

export { buscar }