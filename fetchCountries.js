// Plik fetchCountries.js

// Funkcja fetchCountries, która wysyła żądanie do API Rest Countries
// i zwraca przetworzone dane o krajach lub zgłasza błąd
export async function fetchCountries(name) {
    const response = await fetch(`https://restcountries.com/v2/name/${name}?fields=name;capital;population;flags;languages`);
    
    // Sprawdzenie, czy odpowiedź z serwera jest prawidłowa
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    // Pobranie danych z odpowiedzi jako tablicę obiektów krajów
    const countries = await response.json();

    // Jeśli tablica krajów jest pusta, zgłoszenie błędu "Country not found"
    if (countries.length === 0) {
        throw new Error('Country not found');
    }

    // Przetworzenie danych krajów i zwrócenie ich w odpowiednim formacie
    return countries.map(country => ({
        name: country.name,
        capital: country.capital,
        population: country.population,
        flag: country.flags.svg,
        languages: Object.values(country.languages).join(', ')
    }));
}
