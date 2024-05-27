

// === CONFIGURAÇÕES DE TABELAS === //

function openPopupWithTable(data) {
  /* const popup = window.open("", "_blank", "width=800px,height=800");
 
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
              <td>${key === "nota técnica (NEN/SRI)" && data[key] ? `<a href="${data[key]}" target="_blank">Nota Técnica</a>` :
      data[key] === null || data[key] === 'null' ? 'Valor Nulo' : data[key]}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </body>
    </html>
  `; 
  
  popup.document.write(htmlContent);
  popup.document.close();
  */


  const novoHTML = `
  <style>
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 8px 12px; border: 1px solid #ddd; text-align: left; }
        th { background-color: #f2f2f2; }
  </style>
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
            <td>${key === "nota técnica (NEN/SRI)" && data[key] ? `<a href="${data[key]}" target="_blank">Nota Técnica</a>` :
      data[key] === null || data[key] === 'null' ? 'Valor Nulo' : data[key]}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>`



  const homeContent = document.getElementById('home-content');

  homeContent.innerHTML = novoHTML;
}

export { openPopupWithTable }