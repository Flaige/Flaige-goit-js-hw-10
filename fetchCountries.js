export async function fetchCountries(name) {
    const response = await fetch(`https://restcountries.com/v2/name/${name}?fields=name;capital;population;flags;languages`);

    if (!response.ok) {
        throw new Error('Country not found');
    }

    const countries = await response.json();

    return countries.map(country => ({
        name: country.name,
        capital: country.capital,
        population: country.population,
        flag: country.flags.svg,
        languages: Object.values(country.languages).join(', ')
    }));
}
