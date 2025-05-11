function handleSubmit() {
  const userInput = document.getElementById('userInput').value.trim();
  const result = document.getElementById('result');
  result.innerHTML = '';

  if (!userInput) {
    result.innerHTML = '<p class="text-danger">Please enter a country name.</p>';
    return;
  }

  fetch(`https://restcountries.com/v3.1/name/${userInput}?fullText=true`)
    .then(response => {
      if (!response.ok) throw new Error('Country not found');
      return response.json();
    })
    .then(data => {
      const country = data[0];
      const {
        name,
        capital,
        population,
        continents,
        currencies,
        languages,
        flags,
        borders,
        region,
        subregion,
        maps,
        coatOfArms
      } = country;

      const currencyList = currencies
        ? Object.values(currencies).map(c => `${c.name} (${c.symbol})`).join(', ')
        : 'N/A';

      const languageList = languages
        ? Object.values(languages).join(', ')
        : 'N/A';

      const borderList = borders ? borders.join(', ') : 'None';

      result.innerHTML = `
        <div class="card bg-dark text-white p-3">
          <img src="${flags.png}" alt="Flag" class="mb-3" style="width: 100px;">
          <h3 class="mb-3">${name.common}</h3>
          <p><strong>Capital:</strong> ${capital?.[0] ?? 'N/A'}</p>
          <p><strong>Continent:</strong> ${continents?.[0] ?? 'N/A'}</p>
          <p><strong>Region:</strong> ${region ?? 'N/A'} | <strong>Subregion:</strong> ${subregion ?? 'N/A'}</p>
          <p><strong>Population:</strong> ${population.toLocaleString()}</p>
          <p><strong>Languages:</strong> ${languageList}</p>
          <p><strong>Currencies:</strong> ${currencyList}</p>
          <p><strong>Borders:</strong> ${borderList}</p>
          <p><a href="${maps.googleMaps}" target="_blank" class="btn btn-sm btn-light mt-2">View on Map</a></p>
          ${coatOfArms?.png ? `<img src="${coatOfArms.png}" alt="Coat of Arms" class="mt-3" style="width: 80px;">` : ''}
        </div>
      `;
    })
    .catch(error => {
      console.error(error);
      result.innerHTML = `<p class="text-danger">Error: ${error.message}</p>`;
    });
}
