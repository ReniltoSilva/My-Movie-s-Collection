const apiKey = 'api_key=d85fc3f866e5fc77be2f384a028b16d3';
const apiURL = 'https://api.themoviedb.org/3/movie/16?api_key=d85fc3f866e5fc77be2f384a028b16d3'
const apiGenreURL = 'https://api.themoviedb.org/3/genre/movie/list?api_key=d85fc3f866e5fc77be2f384a028b16d3'
const apiPopular = 'https://api.themoviedb.org/3/movie/popular?api_key=d85fc3f866e5fc77be2f384a028b16d3&append_to_response=images,'
const searchAPI = 'https://api.themoviedb.org/3/search/keyword?query=${query}&page=1'
const genreApi = 'https://api.themoviedb.org/3/genre/movie/list?api_key=d85fc3f866e5fc77be2f384a028b16d3'

const homeGridContainer = document.querySelector('.main-Home-grid-container')





//--------------------------------------API FETCHING FUNCTION--------------------------------------//

document.addEventListener('DOMContentLoaded', fetchMovies(displayMovieHomePage))


//Here I fetch both APIs, notice that I can fetch an API inside another API being fetched.
//So, after one API is fetched the other one will be called after.
function fetchMovies(){

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
                console.log(movieDataResults)


                //API to fetch Genre List
                fetch(genreApi)
                .then(resp => { 
                    //(!resp.ok) convert o bolean. Se a resposta for True, converte p/ false.
                    //se converter para false, executa o "return resp.json", 
                    //se converter para true, cai dentro do IF() e executa o código dentro dele.
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

                    displayMovieHomePage(movieDataResults, genreList)
                    console.log(genreData)
                })
                .catch(err => console.log('Genre Fetch Error:', err))
        })
        
    .catch(err => console.log('Movie Fetch Error:', err))
}



//--------------------------------------MOVIE SEARCH FUNCTION---------------------------------------//  

    const searchBTN = document.querySelector('.search-button')
    const searchInput = document.querySelector('.searchForm')
    

    //In this function I will fetch both APIs(This time using Promise.all which is the same thing as calling them separate) 
    //Then I pass in displayMovieHomePage as a callback with the data from both fetched APIs.
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

                displayMovieHomePage(movieDataResults, genreList)
            })
            .catch(err => {
                console.log('Error:', err);
            });
    }
}





//---------------------------------------------DISPLAY MOVIES ON SCREEN FUNCTION-----------------------------//
const arrListMovies = [];

function displayMovieHomePage(movieDataResults, genreList){

            const genreIdToName = {}

            genreList.forEach((genre) => {
                genreIdToName[genre.id] = genre.name
            })


    movieDataResults.forEach(movie => {

        const genreMovies = movie.genre_ids; // Array of genre IDs for the movie
        const movieYear = new Date(movie.release_date).getFullYear();

        const movieContainer = document.createElement('div')
        movieContainer.classList.add('movie-grid-container')

        const moviePoster = movie.poster_path
        const movieOverview = movie.overview


        const dropdownButton = document.querySelector('.littleIconMenu')
                console.log(dropdownButton)
            

        // Create an array to store the genre names for this movie
        //Here, map is looking for the element(genreId) inside array genreMovies and comparing to genreId in the genreIdToName
        //and returnin the value to the new array genreNames
        const genreNames = genreMovies.map(genreId => genreIdToName[genreId]).join(', ');
        console.log(genreNames)
    
        

        movieContainer.innerHTML = `
                <div class="img-container">
                    <div class="littleIconContainer">
                    <img src="little icon.svg" class="littleIconMenu" >
                        <div class="dropdownMenuContainer">
                        ${dropdownMenuContent(movie.title)}                          
                        </div>
                    </div>
                        ${displayMoviePoster(moviePoster, movieOverview, genreNames)}
                    </div>
                </div>
    
                <div class="info-container">
                    <p class="movie-title">${movie.title}</p>
                    <p class="movie-year">${movieYear}</p>
                </div>`

        homeGridContainer.appendChild(movieContainer)
    })
}


function dropdownMenuContent(movieTitleParam){

    return  `
        <a href="#" class="dropDownContent" 
        onclick="arrListMovies.push('${movieTitleParam}'); 
        console.log('${movieTitleParam} is added to the list'); 
        localStorage.setItem('MovieList', JSON.stringify(arrListMovies))">List one</a>
        
        
        <a href="#" class="dropDownContent createNewList" 
        onclick="const listName = prompt('Enter list name'); 
        console.log(listName)">New list +</a>
        `
}

function displayMoviePoster(moviePoster, movieOverview, genreNames){

    return  `
        <img class="imgPoster" src="https://image.tmdb.org/t/p/w500${moviePoster}" alt="" />
        <div class="figcaptionContainer">
        <p class="contentFigcaption">${movieOverview}</p>
        <p class="genreOneFigCaption">${genreNames}</p> `
}
