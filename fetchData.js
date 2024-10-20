const fs = require('fs'); // Allows us to work with files
const axios = require('axios'); // Allows us to fetch data from the internet

// Replace this with your actual TMDB API key
const apiKey = 'd85fc3f866e5fc77be2f384a028b16d3';
const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

// This function will fetch data from TMDB and save it as a local file
async function fetchAndSaveData() {
    try {
        // Fetch data from the TMDB API
        const response = await axios.get(apiUrl);
        const data = response.data;

        // Save the fetched data to a local file called 'movies.json'
        fs.writeFileSync('movies.json', JSON.stringify(data, null, 2), 'utf-8');
        console.log('Data saved successfully!');
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchAndSaveData();
