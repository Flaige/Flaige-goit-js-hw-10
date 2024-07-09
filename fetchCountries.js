const Countries_API_URL = "https://restcountries.com/v3.1/name/";
export async function fetchCountries(name) {
    const url = `https://restcountries.com/v2/name/${name}?fields=name;capital;population;flags;languages`;

    try {
    const response = await fetch(
      `${Countries_API_URL}${name}?fields=name,capital,population,flags,languages`
    );
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Country not found');
            } else {
                throw new Error('An error occurred while fetching the data');
            }
        }

        const countries = await response.json();

        return countries.map(country => ({
            name: country.name.official,
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
