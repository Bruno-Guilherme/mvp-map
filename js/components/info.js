const info = L.control();

info.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
  this.update();
  return this._div;
};


info.update = function (props) {
  this._div.innerHTML = `
  <h4>Localidade</h4> ${props ?
      '<b>' + props.name + '</b> <br />' + 'Área: ' + (props['Área Projeto (ha)'] === 'null' || props['Área Projeto (ha)'] === null ? 0 : props['Área Projeto (ha)']) + '.' :
      'Coloque o mouse sobre um Estado'
    }
  `;
};

export { info }