import { fetchCountries } from './fetchCountries.js';

function debounce(func, delay) {
    let debounceTimer;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
}

async function searchCountry() {
    const query = document.getElementById('search-box').value.trim();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (!query) {
        resultsDiv.innerHTML = '<p>Wpisz nazwę kraju!</p>';
        return;
    }

    try {
        const countries = await fetchCountries(query);

        if (countries.length > 10) {
            resultsDiv.innerHTML = '<p>Znaleziono zbyt wiele pasujących krajów. Wprowadź bardziej specyficzną nazwę.</p>';
            return;
        }

        if (countries.length >= 2 && countries.length <= 10) {
            countries.forEach(country => {
                const countryListItem = document.createElement('div');
                countryListItem.classList.add('country-list-item');
                countryListItem.innerHTML = `
                    <img src="${country.flag}" alt="Flaga ${country.name}" width="50">
                    <span>${country.name}</span>
                `;
                resultsDiv.appendChild(countryListItem);
            });
            return;
        }

        if (countries.length === 1) {
            const country = countries[0];
            const countryCard = document.createElement('div');
            countryCard.classList.add('country');
            countryCard.innerHTML = `
                <h2>${country.name}</h2>
                <p><strong>Stolica:</strong> ${country.capital || 'Brak'}</p>
                <p><strong>Populacja:</strong> ${country.population.toLocaleString()}</p>
                <p><strong>Flaga:</strong> <img src="${country.flag}" alt="Flaga ${country.name}" width="50"></p>
                <p><strong>Języki:</strong> ${country.languages}</p>
            `;
            resultsDiv.appendChild(countryCard);
            return;
        }
    } catch (error) {
        if (error.message === 'Country not found') {
            resultsDiv.innerHTML = '<p>Ooops, nie znaleziono kraju o takiej nazwie.</p>';
        } else {
            resultsDiv.innerHTML = '<p>Wystąpił błąd podczas wyszukiwania. Spróbuj ponownie.</p>';
        }
    }
}

const debouncedSearch = debounce(searchCountry, 300);
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('search-box').addEventListener('input', debouncedSearch);
});

