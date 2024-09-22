const apiKey = 'api_key=d85fc3f866e5fc77be2f384a028b16d3';
const apiURL = 'https://api.themoviedb.org/3/movie/16?api_key=d85fc3f866e5fc77be2f384a028b16d3'
const apiGenreURL = 'https://api.themoviedb.org/3/genre/movie/list?api_key=d85fc3f866e5fc77be2f384a028b16d3'
const apiPopular = 'https://api.themoviedb.org/3/movie/popular?api_key=d85fc3f866e5fc77be2f384a028b16d3&append_to_response=images,'
const searchAPI = 'https://api.themoviedb.org/3/search/keyword?query=${query}&page=1'
const genreApi = 'https://api.themoviedb.org/3/genre/movie/list?api_key=d85fc3f866e5fc77be2f384a028b16d3'


const homeGridContainer = document.querySelector('.main-Home-grid-container')


//--------------HOME PAGE SECTION ORIGINAL---------------------------//
document.addEventListener('DOMContentLoaded', fetchMovies(displayMovieHomePage))


function fetchMovies(){

// //THis is a shorter way of fetching 2 or more APIs at the same time.
//  Promise.all([
//     fetch(apiPopular).then(response => response.json()),
//     fetch(genreApi).then(resp => resp.json())
//  ])
//     .then(([movieData, genreData])=> {
//         const movieDataResults = movieData.results;
//         const genreList = genreData.genres;

//         displayMovieHomePage(movieDataResults, genreList)
//  })


//--------------------------------------API FETCHING FUNCTION--------------------------------------//
    //API to fetch Movie List
    fetch(apiPopular)
        .then(response => {
            if(!response.ok){
                throw new Error("Failed to fetch movies");
            }
            return response.json()
        })
        .then(data => {
                const mainHomeGrid = document.querySelector('.main-Home-grid-container')
                mainHomeGrid.innerHTML = '';

                let movieDataResults = data.results;
                if(!movieDataResults || movieDataResults.length === 0){
                    console.error('No movies found')
                }

                //API to fetch Genre List
                fetch(genreApi)
                .then(resp => {
                    if(!resp.ok){
                        throw new Error('Failed to fetch genres')
                    }
                    return resp.json()
                })
                .then(genreData => {
                    let genreList = genreData.genres
                    if(!genreList || genreList.length === 0){
                        console.log('No genres found')
                    }
                    console.log(genreList)

                    displayMovieHomePage(movieDataResults, genreList)

                })
                .catch(err => console.log('Genre Fetch Error:', err))
        })
        
    .catch(err => console.log('Movie Fetch Error:', err))
}


//--------------------------------------MOVIE SEARCH FUNCTION---------------------------------------//  
    const searchBTN = document.querySelector('.search-button')
    const searchInput = document.querySelector('.searchForm')
    
    searchBTN.addEventListener('click', () => fetchMoviesSearch(displayMovieHomePage))
    
    function fetchMoviesSearch(){

        const inputValue = searchInput.value;

        if(inputValue === ''){

            alert("Please, write something") 
            
            }else{
                const searchAPI = `https://api.themoviedb.org/3/search/movie?api_key=d85fc3f866e5fc77be2f384a028b16d3&language=en-US&query=${inputValue}&page=1`;
                const genreApi = 'https://api.themoviedb.org/3/genre/movie/list?api_key=d85fc3f866e5fc77be2f384a028b16d3'

                    //This is to clean the home screen from previous search.
                    homeGridContainer.innerHTML = ''

                    // Fetch both movies and genres in parallel
                    Promise.all([
                        fetch(searchAPI).then(response => response.json()),//Fetch movies
                        fetch(genreApi).then(resp => resp.json())//Fetch genres
                    ])

                    .then(([movieData, genreData]) => {
                        const movieDataResults = movieData.results;
                        const genreList = genreData.genres;
                    

                        // if(!movieDataResults || movieDataResults.length === 0){
                        //     console.log('No movies found')
                        // }

                        // if(!genreList || genreList.length === 0){
                        //     console.log('No genres found')
                        // }

                        displayMovieHomePage(movieDataResults, genreList)
                    })
                    .catch(err => {
                        console.log('Error:', err);
                    });
            }
    }



//---------------------------------------------DISPLAY MOVIES ON SCREEN FUNCTION-----------------------------//
   
function displayMovieHomePage(movieDataResults, genreList){

// console.log('movieDataResults:', movieDataResults)
// console.log('genreList:', genreList)

        const genreIdToName = {}

    genreList.forEach(genre => {
        genreIdToName[genre.id] = genre.name;
    });

    
    movieDataResults.forEach(movie => {

        const genreMovies = movie.genre_ids; // Array of genre IDs for the movie
        const convertDate = movie.release_date;
        const movieYear = new Date(convertDate).getFullYear();


        const movieContainer = document.createElement('div')
        movieContainer.classList.add('movie-grid-container')

        
        // Create an array to store the genre names for this movie
        const genreNames = genreMovies.map(genreId => genreIdToName[genreId]).join(', ');


        movieContainer.innerHTML = `
                <div class="img-container">
                    <div class="littleIconContainer">
                    <img src="little icon.svg" class="littleIconMenu">
                    </div>
                    <img class="imgPoster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="" />
                    <div class="figcaptionContainer">
                    <p class="contentFigcaption">${movie.overview}</p>
                    <p class="genreOneFigCaption">${genreNames}</p>
                    </div>
                </div>
    
                <div class="info-container">
                    <p class="movie-title">${movie.title}</p>
                    <p class="movie-year">${movieYear}</p>
                </div>`
    
        homeGridContainer.appendChild(movieContainer)
    })
}

