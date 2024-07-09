export async function fetchCountries(name) {
    const url = `https://restcountries.com/v2/name/${name}?fields=name;capital;population;flags;languages`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Country not found');
            } else {
                throw new Error('An error occurred while fetching the data');
            }
        }

        const countries = await response.json();

        return countries.map(country => ({
            name: country.name,
            capital: country.capital,
            population: country.population,
            flag: country.flags.svg,
            languages: Object.values(country.languages).join(', ')
        }));
    } catch (error) {
        console.error('Error fetching countries:', error);
        throw error;
    }
}
