const apiKey = 'd85fc3f866e5fc77be2f384a028b16d3';
const apiURL = 'https://api.themoviedb.org/3/movie/16?api_key=d85fc3f866e5fc77be2f384a028b16d3'
const apiGenreURL = 'https://api.themoviedb.org/3/genre/movie/list?api_key=d85fc3f866e5fc77be2f384a028b16d3'
const apiPopular = 'https://api.themoviedb.org/3/movie/popular?api_key=d85fc3f866e5fc77be2f384a028b16d3&&append_to_response=images'
const searchAPI = 'https://api.themoviedb.org/3/search/keyword?query=${query}&page=1'


//---------------MOVIE SEARCH SECTION---------------------//  
    const searchBTN = document.querySelector('.search-button')
    const searchInput = document.querySelector('.searchForm')
    
    
    searchBTN.addEventListener('click', () => fetchMoviesSearch(displayMovieHomePage))
    
    function fetchMoviesSearch(){

        const inputValue = searchInput.value;

        if(inputValue === ''){

            alert("Please, write something") 
            
        }else{
                const searchAPI = `https://api.themoviedb.org/3/search/movie?api_key=d85fc3f866e5fc77be2f384a028b16d3&language=en-US&query=${inputValue}&page=1`
                
                fetch(searchAPI)
                .then(response => response.json())
                .then(data => {
                    const movieDataResults = data.results;
                    const mainHomeGrid = document.querySelector('.main-Home-grid-container')

                    mainHomeGrid.innerHTML = '';

                    displayMovieHomePage(movieDataResults)
                })
                .catch(err => console.log(err))
            }
    }

   
//------------------------------------------------------------//



//--------------HOME PAGE SECTION ORIGINAL---------------------------//
    document.addEventListener('DOMContentLoaded', fetchMovies(displayMovieHomePage))


    function fetchMovies(){
        
        fetch(apiPopular)
        .then(response => response.json())
        .then(data => {
            const mainHomeGrid = document.querySelector('.main-Home-grid-container')
            mainHomeGrid.innerHTML = '';

            let movieDataResults = data.results;
            console.log(movieDataResults)

            displayMovieHomePage(movieDataResults)
        })
    }

//------------------------------------------------------------//
    
   
function displayMovieHomePage(movieDataResults){

    movieDataResults.forEach(index => {
        
        const homeGridContainer = document.querySelector('.main-Home-grid-container')
                   
        const convertDate = index.release_date;
        movieYear = new Date(convertDate).getFullYear();
    
        const movieContainer = document.createElement('div')
        movieContainer.classList.add('movie-grid-container')
        movieContainer.innerHTML = `
                <div class="img-container">
                    <div class="littleIconContainer">
                    <img src="little icon.svg" class="littleIconMenu">
                    </div>
                    <img class="imgPoster" src="https://image.tmdb.org/t/p/w500${index.poster_path}" alt="" />
                    <div class="figcaptionContainer">
                    <p class="contentFigcaption">${index.overview}</p>
                    </div>
                </div>
    
                <div class="info-container">
                    <p class="movie-title">${index.title}</p>
                    <p class="movie-year">${movieYear}</p>
                </div>`
    
        homeGridContainer.appendChild(movieContainer)
    
    })

}




